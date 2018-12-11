"use strict"

module.exports = {
  getPage: async function(req, reply) {
    const doc = this.db.getDoc(req.params.page)
    if (!doc) {
      reply.code(404)
      throw new Error("API: Niet")
    }

    reply.etag(doc._rev)
    return doc
  },
}
