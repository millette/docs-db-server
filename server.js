"use strict"

// self
const srv = require(".")

srv({
  config: {
    trustProxy: "127.0.0.1",
    logger: true,
  },
  docs: require("./out-fake.json"),
}).catch(console.error)
