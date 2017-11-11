const crypto = require('crypto-js');
// Secret message.
const secretMessage = 'I hid the chips under the couch.';
// Secret key.
const secretKey = '123abc';

let encryptedMesage = crypto.AES.encrypt(secretMessage, secretKey);
// Encrytped message.
console.log(`Encrypted Message:  ${encryptedMesage}`);
let bytes = crypto.AES.decrypt(encryptedMesage, secretKey);
// Decrypted mesage.
console.log(`Decrypted Message: ${bytes.toString(crypto.enc.Utf8)}`);