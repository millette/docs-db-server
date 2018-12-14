"use strict"

// self
const srv = require(".")

srv({
  config: {
    fastify: {
      trustProxy: "127.0.0.1",
    },
  },
  docs: require("./out-fake.json"),
}).catch(console.error)
