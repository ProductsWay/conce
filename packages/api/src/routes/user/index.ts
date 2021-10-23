import { FastifyPluginAsync } from "fastify";

const user: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async (_request, reply) => {
    reply.send({ hello: "world" });
  });
};

export default user;
