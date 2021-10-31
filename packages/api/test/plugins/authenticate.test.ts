import Fastify from "fastify";
import { test } from "tap";

import Authenticate from "../../src/plugins/authenticate";

test("authenticate works standalone", async (t) => {
  const fastify = Fastify();
  fastify.register(Authenticate);
  await fastify.ready();

  // check authenticate is a promise
  t.type(fastify.authenticate, "function");
});
