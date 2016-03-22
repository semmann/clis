#!/usr/bin/env node

require('./helper')
var fs = require('fs').promise

function* cat() {
    var filename = process.argv[2] ? process.argv[2] : __filename
    var fileContent = yield fs.readFile(filename)
    process.stdout.write(fileContent + '\n')
}

module.exports = cat
