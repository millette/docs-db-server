"use strict"

// npm
const fastifyMod = require("fastify")

module.exports = ({ config = {}, docs }) => {
  const { trustProxy, logger, port, hostname, ...cfg } = config
  const fastify = fastifyMod({ trustProxy: trustProxy, logger: logger })
  fastify.register(require("fastify-docs-db"), { config: cfg, docs })
  return fastify.listen(port || 3000, hostname || process.env.HOSTNAME)
}
