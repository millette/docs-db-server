"use strict"

const makeSorter = (sort) => (a, b) => {
  const af = a[sort]
  const bf = b[sort]
  if (af > bf) return 1
  if (af < bf) return -1
  return 0
}

const sorterLastMod = makeSorter("_updated")

const format = ({ _id, _rev, _created, _updated }) => ({
  _id,
  _rev,
  _created: new Date(_created).toISOString(),
  _updated: new Date(_updated).toISOString(),
})

module.exports = async function(req, reply) {
  const docs = this.db.docMetas
  if (!docs.length) return []
  if (!req.query.sort) return docs.slice(0, 10)
  const sort = "_" + req.query.sort
  if (!(sort in docs[0])) throw new Error("Unknown sort field")

  const d2 = docs.sort(sorterLastMod)
  const d2a = sort === "_updated" ? d2 : docs.sort(makeSorter(sort))
  const d3 = req.query.desc ? d2a.reverse() : d2a

  const { _rev, _updated } = d2.slice(-1)[0]
  reply.lastMod(_updated).etag(_rev)
  return d3.slice(0, 10).map(format)
}
