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
  if (!docs.length) {
    reply.code(404)
    throw new Error("No content at all")
  }
  const d2 = docs.sort(sorterLastMod)
  let d3
  if (req.query.sort) {
    const sort = "_" + req.query.sort
    if (!(sort in docs[0])) throw new Error("Unknown sort field")
    d3 = sort === "_updated" ? d2 : docs.sort(makeSorter(sort))
    if (req.query.desc) d3 = d3.reverse()
  } else {
    d3 = docs
  }

  const page = req.query.page || 0

  const d4 = d3
    .slice(page * this.perPage, page * this.perPage + this.perPage)
    .map(format)

  if (!d4.length) {
    reply.code(404)
    throw new Error("No content found")
  }

  const { _rev, _updated } = d2.slice(-1)[0]
  reply.lastMod(_updated).etag(`${this.perPage}-${_rev}`)
  return d4
}