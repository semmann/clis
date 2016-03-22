process.nextTick(() => {
  require('safeguards').noSynchronousIO(require.main)
})

require('trycatch').configure({'long-stack-traces': true})
require('songbird')
require('safeguards')

var co = require('co')

process.on('uncaughtException', logError)

process.on('uncaughtApplicationException', logError)

process.on('unhandledRejection', logError)

function logError(err) {
  console.log(err.stack)
}

process.nextTick(() => co(module.parent.exports()))
