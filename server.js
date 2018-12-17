"use strict"

// self
const srv = require(".")

srv({
  config: {
    trustProxy: "127.0.0.1",
    logger: true,
    port: 3000,
    hostname: process.env.HOSTNAME,
  },
  docs: require("./out-fake.json"),
}).catch(console.error)
