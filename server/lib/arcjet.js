import arcjet, { tokenBucket, shield, detectBot } from "arcjet";

import "dotenv/config";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),

    tokenBucket({
      refillRate:5,
      interval:10,
      capacity:15,
      mode: "LIVE",
    }),
  ],
});
