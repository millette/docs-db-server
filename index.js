"use strict"

// npm
// const DocsDb = require("docs-db")
const fastifyMod = require("fastify")

/*
const fastify = require("fastify")({
  // trustProxy: config.fastify.trustProxy,
  // logger: config.fastify.logger,
  trustProxy: "127.0.0.1",
  logger: true,
})
*/

/*
const deepMerge = require("deepmerge")

// core
const { URL } = require("url")

// self
const { getPage, getPages, deletePage } = require("./routes")

const pagedUrl = (u, page, rel) => {
  u.searchParams.set("page", page)
  return `<${u}>; rel="${rel}"`
}

const pagination = function(
  len,
  page,
  perPage,
  { raw: { url }, headers: { host, ...h } },
) {
  const first = 0
  const previous = page > 0 && page - 1
  const last = Math.ceil(len / perPage) - 1
  const next = page < last && page + 1

  // FIXME: add support for local https
  const u = new URL(url, `${h["x-forwarded-proto"] || "http"}://${host}`)
  const links = [pagedUrl(u, first, "first"), pagedUrl(u, last, "last")]
  if (previous !== false) links.push(pagedUrl(u, previous, "previous"))
  if (next !== false) links.push(pagedUrl(u, next, "next"))
  return this.header("Link", links.join(", "))
}

const lastMod = function(date, etag) {
  return this.etag(etag).header(
    "Last-Modified",
    typeof date === "string" ? date : new Date(date).toGMTString(),
  )
}

const configDefault = {
  fastify: {
    logger: true,
  },
  responseTime: true,
  caching: true,
  cors: true,
  main: {
    perPage: 24,
    port: 3000,
    hostname: process.env.HOSTNAME,
  },
}

const nop = function() {
  return this
}
*/

module.exports = ({ config = {}, docs }) => {
  /*
  const n0 = Date.now()
  config = deepMerge(configDefault, config)
  const fastify = fastifyMod({
    trustProxy: config.fastify.trustProxy,
    logger: config.fastify.logger,
  })
  fastify.log.info("Starting...")
  if (config.responseTime) fastify.register(require("fastify-response-time"))
  if (config.caching) {
    fastify.register(require("fastify-caching"))
    fastify.decorateReply("lastMod", lastMod)
  } else {
    fastify.decorateReply("etag", nop)
    fastify.decorateReply("lastMod", nop)
  }
  if (config.cors) fastify.register(require("fastify-cors"))

  // routes
  fastify.head("/pages", getPages)
  fastify.get("/pages", getPages)
  fastify.head("/page/:page", getPage)
  fastify.get("/page/:page", getPage)
  // fastify.get("/api/delete/:page", deletePage)
  fastify.delete("/page/:page", deletePage)

  // fastify.put("/api/page/:page", async (req, reply) => {
    // const page = req.params.page
  // })

  fastify.log.info(`Done starting (${(Date.now() - n0) / 1000}s).`)
  const now = Date.now()

  fastify.log.info("Reading...")
  fastify.decorate("db", new DocsDb(docs))
  fastify.decorate("perPage", config.main.perPage)
  fastify.decorateReply("pagination", pagination)
  fastify.log.info(`Done reading (${(Date.now() - now) / 1000}s).`)
  */

  const fastify = require("fastify")({
    // trustProxy: config.fastify.trustProxy,
    // logger: config.fastify.logger,
    trustProxy: config.trustProxy,
    logger: config.logger,
  })

  fastify.register(require("./plugin"), { config, docs })

  // return fastify.listen(config.main.port, config.main.hostname)
  // return fastify.listen(3000, process.env.HOSTNAME)
  return fastify.listen(
    config.port || 3000,
    config.hostname || process.env.HOSTNAME,
  )
}
