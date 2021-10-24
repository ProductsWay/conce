// This file contains code that we reuse between our tests.
import Fastify from "fastify";
import fp from "fastify-plugin";
import * as tap from "tap";

import App from "../src/app";

export type Test = typeof tap["Test"]["prototype"];

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {};
}

// Automatically build and tear down our instance
async function build(t: Test) {
  const app = Fastify();

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), await config());

  await app.ready();

  // Tear down our app after we are done
  t.teardown(() => app.close());

  return app;
}

export { config, build };