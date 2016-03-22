#!/usr/bin/env node

require('./helper')
var fs = require('fs').promise

function* ls() {
  // Use 'yield' in here
  console.log('Executing ls function...')
  var dirpath = process.argv[2]
  var files = yield listFiles(dirpath)
}

function* listFiles(dirpath) {
  var fileNames = yield fs.readdir(dirpath)
  for(var i = 0; i < fileNames.length; i++) {
    var fileName = fileNames[i]

    if(!fileName.startsWith('.')) {
      var statValue = yield fs.stat(dirpath + '/'+ fileName)
       if(statValue.isDirectory()) {
          yield listFiles(dirpath + '/'+ fileName)
       } else {
         console.log(fileName)
       }
    }
 }
}


module.exports = ls
