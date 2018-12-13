"use strict"

// npm
const DocsDb = require("docs-db")
const fastify = require("fastify")({ logging: true })
fastify.register(require("fastify-response-time"))
fastify.register(require("fastify-caching"))

// core
const { URL } = require("url")

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

const pagedUrl = (u, page, rel) => {
  u.searchParams.set("page", page)
  return `<${u}>; rel="${rel}"`
}

const pagination = function(len, page, f, raw) {
  const first = 0
  const previous = page > 0 && page - 1
  const last = Math.ceil(len / f.perPage) - 1
  const next = page < last && page + 1
  const u = new URL(raw.url, f.address)
  const links = [pagedUrl(u, first, "first"), pagedUrl(u, last, "last")]
  if (previous !== false) links.push(pagedUrl(u, previous, "previous"))
  if (next !== false) links.push(pagedUrl(u, next, "next"))
  return this.header("Link", links.join(", "))
}

const lastMod = function(date) {
  return this.header(
    "Last-Modified",
    typeof date === "string" ? date : new Date(date).toGMTString(),
  )
}

module.exports = (port, hostname, docs) => {
  const now = Date.now()
  console.log("Reading...")
  fastify.decorate("db", new DocsDb(docs))
  fastify.decorate("perPage", 24)
  fastify.decorateReply("pagination", pagination)
  fastify.decorateReply("lastMod", lastMod)
  console.log(`Done reading (${(Date.now() - now) / 1000}s).`)
  return fastify.listen(port, hostname).then((address) => {
    fastify.decorate("address", address)
    console.log(`Server listening on ${address}`)
    return address
  })
}
