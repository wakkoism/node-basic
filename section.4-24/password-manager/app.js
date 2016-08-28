"use strict";
// Letting us know that npm start is outputting when running npm start.
console.log('Starting password manager');
// Load the module node-persist.
const storage = require('node-persist');
// INstall Crypto module to hide password.
const crypto = require('crypto');
// Initalized storage.
storage.initSync();
var Account = Object.create(null);
// Function to create Account
Account.prototype = {
  /**
   * Create an account
   *
   * @param object account
   *   string name - Set account name,
   *   string username - Set user name.
   *   string password - Set password.
   */
  createAccount: function (account) {
    // Fetch an array
    var accounts = storage.getItemSync('accounts');
    // Check if anything is in storage.
    if (typeof accounts === 'undefined') {
      // Make sure account is an array to allow push new item.
      accounts = [];
    }
    // Add new account into an array.
    accounts.push(account);
    // Write the account to storage.
    storage.setItemSync('accounts', accounts);

    return account;
  },
  /**
   * Get the account item.
   *
   * @param string accoutName
   *   Get the account with matching account name.
   *
   * @return object|false
   *   Return the matching account that matches account name
   *   if no match, it will return false.
   */
  getAccount: function (accountName) {
    // Load account item from storage.
    var accounts = storage.getItemSync('accounts');
    // Iterate over array and return matching account.
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].name === accountName) {
        return accounts[i];
        break;
      }
    }
    // No match.
    return false;
  },
};
// Initialized an object with prototype properties.
var myAccount = Object.create(Account.prototype);
var accountInfo = {
  name: 'John',
  username: 'wakko',
  password: 'moo cow',
};
// Create the account
//-- myAccount.createAccount(accountInfo);
// Retrieve the account.
console.log(myAccount.getAccount('John'));

