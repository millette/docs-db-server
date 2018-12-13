"use strict"

// npm
const DocsDb = require("docs-db")
const fastify = require("fastify")({ logging: true })
fastify.register(require("fastify-response-time"))
fastify.register(require("fastify-caching"))

// self
const { getPage, getPages, deletePage } = require("./routes")

fastify.get("/pages", getPages)
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
  fastify.decorate("perPage", 24)
  fastify.decorateReply("lastMod", function(date) {
    return this.header(
      "Last-Modified",
      typeof date === "string" ? date : new Date(date).toGMTString(),
    )
  })
  console.log(`Done reading (${(Date.now() - now) / 1000}s).`)
  return fastify
    .listen(port, hostname)
    .then((address) => console.log(`Server listening on ${address}`))
}
