"use strict"

// npm
const DocsDb = require("docs-db")
const fastify = require("fastify")({ logging: true })
fastify.register(require("fastify-response-time"))
fastify.register(require("fastify-caching"))

// self
const { getPage, deletePage } = require("./routes")

fastify.get("/page/:page", getPage)
// fastify.get("/api/delete/:page", deletePage)
fastify.delete("/page/:page", deletePage)

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
