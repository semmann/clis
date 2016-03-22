#!/usr/bin/env node

require('./helper')

function* echo() {
   var input = process.argv[2] ? process.argv[2] : 'Hello World'
    process.stdout.write(input + '\n')
}

module.exports = echo
