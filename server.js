"use strict"

// self
const srv = require(".")
const docs = require("./out-fake.json")

const config = {
  fastify: {
    trustProxy: "127.0.0.1",
  },
  // cors: false,
  caching: false,
}

srv({ config, docs }).catch(console.error)
