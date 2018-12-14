"use strict"

// npm
const fastifyMod = require("fastify")

module.exports = ({ config = {}, docs }) => {
  const fastify = fastifyMod({
    trustProxy: config.trustProxy,
    logger: config.logger,
  })
  fastify.register(require("fastify-docs-db"), { config, docs })
  return fastify.listen(
    config.port || 3000,
    config.hostname || process.env.HOSTNAME,
  )
}
