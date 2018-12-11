"use strict"

// self
const srv = require(".")
const docs = require("./out-fake.json")

srv(3000, process.env.HOSTNAME, docs).catch(console.error)
