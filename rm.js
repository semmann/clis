#!/usr/bin/env node

require('./helper')
var fs = require('fs').promise

function* rm() {
  var dirnames = process.argv[2]

  var current_dir = __dirname
  if(dirnames) {
    var dirs = dirnames.split('/')

    for(var i = 0; i < dirs.length; i++) {
      var dirname = dirs[i]
      if( dirname == '.' || dirname == '') {
        continue
      }
      var path = current_dir + '/'+ dirname
      var statValue = yield fs.stat(path)
      if(statValue.isFile()) {
        yield fs.unlink(path)
        process.stdout.write('Delete file ' + path + '\n' )
      } else {
        yield deleteAllFiles(path)
          // yield fs.unlink(path)
        process.stdout.write('Delete dir ' + path + '\n' )
      }
    }
  }
}

function* deleteAllFiles(dirname) {
  //read files in current directory
  var files = yield fs.readdir(dirname)
  if(files.lenght>0) {
    for(var f = 0; f < files.length; f++) {
        var path = dirname + '/' + files[f]
        var statValue = yield fs.stat(path)
        if(statValue.isDirectory()) {
          yield deleteAllFiles( path)
         
          process.stdout.write('Delete dir ' + path + '\n' )
        } else if(statValue.isFile()) {
           yield fs.unlink(path)
          process.stdout.write('Delete file ' + path + '\n' )
        }

      }

  }
else{
var dir = yield fs.rmdir(dirname,function(error){

if (error){
process.stdout.write('Error occured while deleting the directory')
}
else{
process.stdout.write("Directory "+ dirname + " deleted successfully") 
}

});
}

}

module.exports = rm
