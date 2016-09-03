"use strict";
// Loading the yargs module.
const args = require('yargs');
// Assign arguments as variable.
var myArgs = args.argv;
// Use the first word after the command, ie: node example-args.js [command]
var command = myArgs._[0];
// Check what command does what.
switch (command) {
  case 'hello':
    if (typeof myArgs.firstname !== 'undefined') {
      let lastName = '';
      if (typeof myArgs.lastname !== 'undefined') {
        lastName = myArgs.lastname;
      }
      // Using ES6, string interpoliation.
      console.log(`Hello ${myArgs.firstname} ${lastName}!`);
    }
}
