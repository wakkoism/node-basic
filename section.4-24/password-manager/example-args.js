"use strict";
// USAGE: node example-args.js hello --firstname [first name] --lastname [last name]
//
// Loading the yargs module.
const args = require('yargs')
  .command('hello', 'Greets the user', function (yargs) {
    yargs.options({
      firstname: {
        demand: true,
        alias: 'f',
        type: 'string',
        description: 'Your first name here.',
      },
      lastname: {
        demand: true,
        alias: 'l',
        type: 'string',
        description: 'Your last name here.'
      }
    })
    .help('help');
  })
  .help('help');
// Assign arguments as variable.
var myArgs = args.argv;
// Use the first word after the command, ie: node example-args.js [command]
var command = myArgs._[0];
// Check what command does what.
switch (command) {
  case 'hello':
    if (typeof myArgs.firstname === 'string') {
      // Set place holder for last name in case no last name argument is passed.
      let lastName = '';
      // Check if string and not ture, boolean or undefined.
      if (typeof myArgs.lastname === 'string') {
        lastName = ' ' + myArgs.lastname;
      }
      // Using ES6, string interpoliation.
      console.log(`Hello ${myArgs.firstname + lastName}!`);
    }
    else{
      console.log(`Hello world!`);
    }
}