// npm
import test from "ava"
import got from "got"

// self
import srv from "."

test("me testo uno", async (t) => {
  const base = await srv({
    docs: require("./out-pretty.json"),
  })

  const { body } = await got(`${base}/api/pages`, { json: true })
  t.is(body.length, 24)
  const b2 = await got(`${base}/api/page/${body[0]._id}`, { json: true })
  t.is(b2.body._rev, body[0]._rev)
  t.truthy(b2.body.title)
  t.truthy(b2.body.content)
})
