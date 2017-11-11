"use strict";
// Letting us know that npm start is outputting when running npm start.
console.log('Starting password manager');
// Load the module node-persist.
const storage = require('node-persist');
// INstall Crypto module to hide password.
const crypto = require('crypto');
// Initalized storage.
storage.initSync();

/**
 * Create Some account using
 *   --name
 *   --username
 *   --password
 */
const args = require('yargs')
  .command('create', 'Create a new account.', function (yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        type: 'string',
        description: 'Your first and last name.',
      },
      username: {
        demand: true,
        alias: 'u',
        type: 'string',
        description: 'Your username.'
      },
      password: {
        demand: true,
        alias: 'p',
        type: 'string',
        description: 'Your password.'
      }
    })
    .help('help');
  })
  .command('get', 'Get an existing account by username', (yargs) => {
    yargs.options({
      username: {
        demand: true,
        alias: 'u',
        type: 'string',
        description: 'Get by username.',
      }
    })
    .help('help');
  })
  .help('help');

// Creating a class.
class Account {
  /**
   * Create an account
   *
   * @param object account
   *   string name - Set account name,
   *   string username - Set user name.
   *   string password - Set password.
   */
  createAccount (account) {
    // Fetch an array
    var accounts = storage.getItemSync('accounts');
    // Check if anything is in storage.
    if (typeof accounts === 'undefined') {
      // Make sure account is an array to allow push new item.
      accounts = [];
    }
    var duplicateIndex = accounts.findIndex(function (object) {
      //console.log(account.username);
      return object.username === account.username
    });

    if (duplicateIndex !== -1 ) {
      // Remove duplicate items
      accounts.splice(duplicateIndex, 1);
    }
    // Add new account into an array.
    accounts.push(account);
    // Write the account to storage.
    storage.setItemSync('accounts', accounts);

    return account;
  }
  /**
   * Get the account item.
   *
   * @param string accoutName
   *   Get the account with matching username.
   *
   * @return object|false
   *   Return the matching account that matches user name
   *   if no match, it will return false.
   */
  getAccount (accountName) {
    // Load account item from storage.
    var accounts = storage.getItemSync('accounts');
    // Iterate over array and return matching account.
    if (typeof accounts !== 'undefined') {
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username === accountName) {
          return accounts[i];
          break;
        }
      }
    }
    // No match.
    return false;
  }
}
// Localize everything withing this block.  Must use ES6 Coding standard.
{
  // Assign arguments as variable.
  let myArgs = args.argv;
  // Use the first word after the command, ie: node example-args.js [command]
  let command = myArgs._[0];
  // Initialized class.
  let myAccount = new Account();
  // Check what command does what.
  switch(command) {
    case 'create':
      // Shorthand assign object in ES6.
      var { name, username, password } = myArgs
      console.log(myAccount.createAccount({ name, username, password }));
      break;

    case 'get':
      console.log(myAccount.getAccount( myArgs.username ));
      break;
  }

}

