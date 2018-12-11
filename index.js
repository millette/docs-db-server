"use strict"

// npm
const fastify = require("fastify")({ logging: true })
const DocsDb = require("docs-db")
fastify.register(require("fastify-response-time"))
fastify.register(require("fastify-caching"))

// self
const { getPage } = require("./routes")

fastify.get("/api/page/:page", getPage)

/*
fastify.put("/api/page/:page", async (req, reply) => {
  const page = req.params.page
})
*/

module.exports = (port, hostname, docs) => {
  const now = Date.now()
  console.log("Reading...")
  fastify.decorate("db", new DocsDb(docs))
  console.log(`Done reading (${(Date.now() - now) / 1000}s).`)
  return fastify
    .listen(port, hostname)
    .then((address) => console.log(`Server listening on ${address}`))
}
