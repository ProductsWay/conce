import fastifyJWT from "fastify-jwt";
import "fastify-jwt";
import fp from "fastify-plugin";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthenticatePluginOptions {
  // Specify authenticate plugin options here
  secret?: string;
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<AuthenticatePluginOptions>(async (fastify, opts) => {
  fastify.register(fastifyJWT, {
    secret: opts?.secret ?? "my-secret-key",
  });
  fastify.decorate(
    "authenticate",
    async (request: { jwtVerify: () => any }, reply: { send: (arg0: unknown) => void }) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): Promise<void>;
  }
}
