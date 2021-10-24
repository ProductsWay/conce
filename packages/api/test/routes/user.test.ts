import { test } from "tap";

import { build } from "../helper";

test("user is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/user",
  });

  t.equal(res.payload, '{"hello":"world"}');
});
