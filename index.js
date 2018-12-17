"use strict"

// npm
const fastifyMod = require("fastify")

module.exports = ({ config = {}, docs }) => {
  const { trustProxy, logger, port, hostname, ...cfg } = config
  const fastify = fastifyMod({ trustProxy, logger })
  fastify.register(require("fastify-docs-db"), { config: cfg, docs })
  return fastify.listen(port, hostname)
}
