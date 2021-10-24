import { Static, Type } from "@sinclair/typebox";
import { mnemonicToSeed } from "ethereum-cryptography/bip39";
import { HDKey } from "ethereum-cryptography/hdkey";
import EthereumWallet from "ethereumjs-wallet";
import { FastifyPluginAsync } from "fastify";

import WalletBody from "../../schemas/wallet_body.json";
import { countWallets, getUserAddress, insertUserAddress } from "../../supabase";
import { WalletBodySchema } from "../../types/wallet_body";

const Wallet = Type.Object({
  address: Type.String(),
});
type WalletType = Static<typeof Wallet>;

const user: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async (_request, reply) => {
    reply.send({ hello: "world" });
  });

  // create new user wallet
  fastify.post<{ Body: WalletBodySchema; Reply: WalletType }>(
    "/wallet",
    {
      schema: {
        body: WalletBody,
      },
    },
    async (request, reply) => {
      const totalWallets = await countWallets();

      const seed = await mnemonicToSeed(process.env.MNEMONIC_SEED || "");
      const hdKey = HDKey.fromMasterSeed(seed);

      const childKey = hdKey.derive(`m/44'/60'/0'/0'/${totalWallets}'`);

      const wallet = EthereumWallet.fromExtendedPrivateKey(childKey.privateExtendedKey!);

      const createdWallet = await insertUserAddress(wallet.getAddressString(), request.body.profile_id);

      if (createdWallet.error) {
        throw new Error(createdWallet.error.message);
      }

      reply.send({ address: createdWallet?.data?.[0]?.address ?? "" });
    }
  );

  fastify.get<{
    Params: {
      profileId: string;
    };
  }>("/wallet/:profileId", async (request, reply) => {
    const userWallet = await getUserAddress(request.params.profileId);

    if (userWallet.error) {
      throw new Error(userWallet.error.message);
    }

    // throw error if user does not exist
    if (!userWallet?.data?.address) {
      throw new Error("user does not exist");
    }

    reply.send({ address: userWallet?.data?.address ?? "" });
  });
};

export default user;
