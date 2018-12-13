"use strict"

const makeSorter = (sort) => (a, b) => {
  const af = a[sort]
  const bf = b[sort]
  if (af > bf) return 1
  if (af < bf) return -1
  return 0
}

const sorterLastMod = makeSorter("_updated")

const format = ({ _created, _updated, ...rest }) => ({
  _created: new Date(_created).toISOString(),
  _updated: new Date(_updated).toISOString(),
  ...rest,
})

module.exports = async function(req, reply) {
  const docs = this.db.docMetas
  if (!docs.length) return []
  const page = req.query.page || 0
  const d2 = docs.sort(sorterLastMod)
  const { _rev, _updated } = d2.slice(-1)[0]
  const etag = `${this.perPage}-${_rev}`
  if (!req.query.sort) {
    reply.lastMod(_updated).etag(etag)
    return docs
      .slice(page * this.perPage, page * this.perPage + this.perPage)
      .map(format)
  }
  const sort = "_" + req.query.sort
  if (!(sort in docs[0])) throw new Error("Unknown sort field")
  const d2a = sort === "_updated" ? d2 : docs.sort(makeSorter(sort))
  const d3 = req.query.desc ? d2a.reverse() : d2a
  reply.lastMod(_updated).etag(etag)
  return d3
    .slice(page * this.perPage, page * this.perPage + this.perPage)
    .map(format)
}
