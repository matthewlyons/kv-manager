const CryptoJS = require('crypto-js');

let hash = CryptoJS.SHA1('76.115.30.28, 35.224.69.177');
let string = hash.toString().substring(0, 10);

console.log(hash);
console.log(string);
