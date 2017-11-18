// Trying to use standards from Airbnb https://github.com/airbnb/javascript

// Letting us know that npm start is outputting when running npm start.
console.log('Starting password manager');
// Load the module node-persist.
const storage = require('node-persist');
// Install Crypto module to hide password.
const crypto = require('crypto-js');
// Initalized storage.
storage.initSync();

/**
 * Create Some account using
 *   --name
 *   --username
 *   --password
 */
const args = require('yargs')
  .command('create', 'Create a new account.', (yargs) => {
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
        description: 'Your username.',
      },
      password: {
        demand: true,
        alias: 'p',
        type: 'string',
        description: 'Your password.',
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        type: 'string',
        description: 'Master password.',
      },
    }).help('help');
  })
  .command('get', 'Get an existing account by username', (yargs) => {
    yargs.options({
      username: {
        demand: true,
        alias: 'u',
        type: 'string',
        description: 'Get by username.',
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        type: 'string',
        description: 'Master password.',
      },
    }).help('help');
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
   *   string masterPassword - Set master password.
   */
  createAccount(account, masterPassword) {
    // Get encypted accounts.
    let accounts = this.getAccounts(masterPassword);
    // SetItemSync.
    // Check if anything is in storage.
    if (typeof accounts === 'undefined') {
      // Make sure account is an array to allow push new item.
      accounts = [];
    }
    const duplicateIndex = accounts.findIndex(object => object.username === account.username);

    if (duplicateIndex !== -1) {
      // Remove duplicate items
      accounts.splice(duplicateIndex, 1);
    }
    // Add new account into an array.
    accounts.push(account);

    return accounts;
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
  getAccount(accountName, masterPassword) {
    // Load account item from storage.
    const accounts = this.getAccounts(masterPassword);
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
  /**
   * Save multiple accounts.
   */
  saveAccounts(accounts, masterPassword) {
    let newAccounts = this.createAccount(accounts, masterPassword);
    if (newAccounts.length > 0) {
      // Encyrpt the accounts.
      newAccounts = crypto.AES.encrypt(JSON.stringify(newAccounts), masterPassword).toString();
      // Write the account to storage.
      storage.setItemSync('accounts', newAccounts);
    }
    return newAccounts;
  }
  /**
   * Get multiple accounts.
   */
  getAccounts(masterPassword) {
    // Use getItemSycn to fetch accounts.
    const accounts = storage.getItemSync('accounts');
    if (typeof accounts === 'undefined') {
      return [];
    }
    // Decrypt
    const bytes = crypto.AES.decrypt(accounts, masterPassword);
    // Return all accounts array.
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  }
}
// Localize everything withing this block.  Must use ES6 Coding standard.
{
  // Assign arguments as variable.
  const myArgs = args.argv;
  // Use the first word after the command, ie: node example-args.js [command]
  const command = myArgs._[0];
  // Shorthand assign object in ES6.
  const {
    name,
    username,
    password,
    masterPassword,
  } = myArgs;

  const myAccount = new Account();
  // Check what command does what.
  switch (command) {
    case 'create':
      console.log(myAccount.saveAccounts({
        name,
        username,
        password,
      }, masterPassword));
      break;

    case 'get': {
      try {
        const getAccount = myAccount.getAccount(username, masterPassword);
        if (getAccount) {
          console.log(getAccount);
        } else {
          console.log('The account does not exists');
        }
      } catch (e) {
        console.log('The master password must be the same password for geting all accounts');
      }
      break;
    }

    default: {
      break;
    }
  }
}

