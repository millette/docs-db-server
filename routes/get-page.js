"use strict"

module.exports = async function(req, reply) {
  const doc = this.db.getDoc(req.params.page, req.query.rev)

  if (!doc) {
    reply.code(404)
    throw new Error("API: Niet")
  }

  if (doc._deleted && !req.query.deleted) {
    reply.code(404)
    throw new Error("API: Niet (deleted)")
  }

  reply.lastMod(doc._updated).etag(doc._rev)
  return doc
}
