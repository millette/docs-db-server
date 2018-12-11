"use strict"

module.exports = async function(req, reply) {
  const doc = this.db.getDoc(req.params.page)
  if (!doc) {
    reply.code(404)
    throw new Error("API: Niet")
  }

  if (doc._deleted && !req.query.deleted) {
    reply.code(404)
    throw new Error("API: Niet (deleted)")
  }

  // const doc2 = this.db.deleteDoc(doc._id, doc._rev)
  reply.header("Last-Modified", doc2._updated).etag(doc2._rev)
  return doc2
}
