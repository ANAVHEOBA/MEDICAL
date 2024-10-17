// src/utils/db.js

import { db } from 'path-to-your-database-lib'; // Adjust import according to your setup

export const initializeDatabase = async () => {
  let initialState = {
    "canEvolve": true,
    "evolve": null,
    "secure": true,
    "version": "0.7.0",
    "data": {},
    "nonces": {},
    "ids": {},
    "indexes": {},
    "auth": {
      "algorithms": ["secp256k1", "secp256k1-2", "ed25519", "rsa256", "poseidon"],
      "name": "weavedb",
      "version": "1",
      "links": {},
    },
    "crons": {
      "lastExecuted": 0,
      "crons": {},
    },
    "contracts": {},
  };

  // single owner
  initialState.owner = walletAddress;

  // or multiple owners
  initialState.owner = [walletAddress1, walletAddress2];

  const schema = {
    type: "object",
    required: ["article_id", "date", "user_address"],
    properties: {
      article_id: {
        type: "string",
      },
      user_address: {
        type: "string",
      },
      date: {
        type: "number",
      },
    },
  };

  await db.setSchema(schema, "bookmarks");
};
