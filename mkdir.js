#!/usr/bin/env node

require('./helper')
var fs = require('fs').promise

function* mkdir() {
  var dirpath = process.argv[2]

  var current_dir = __dirname

   yield fs.mkdir(current_dir + '/' +  dirpath,function(error){

if (error){
process.stdout.write('Directory is already exist ' +  current_dir + '/' +  dirpath + '\n' ) ;
  
}else{

process.stdout.write('Directory Created ' + current_dir + '/' + dirpath + '\n')
}
});

}
module.exports = mkdir
