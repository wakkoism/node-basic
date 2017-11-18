const crypto = require('crypto-js');
// Secret message.
const secretMessage = {
  name: 'John',
  secretName: '007',
};
// Secret key.
const secretKey = '123abc';

let encryptedMesage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
// Encrytped message.
console.log(`Encrypted Message:  ${encryptedMesage}`);
let bytes = crypto.AES.decrypt(encryptedMesage, secretKey);
// Decrypted mesage.
let decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));
console.log(`Decrypted Message: ${decryptedMessage.secretName}`);