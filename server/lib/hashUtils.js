const crypto = require('crypto');
const csprng = require('csprng');


module.exports = {
    hash :  (pwd) => {
        console.log(pwd, `in hash`)
        return crypto
            .createHash('sha256')
            .update(pwd)
            .digest('base64')
    },
    salt : () => csprng(160, 36),
    validatePassword: (pass, hash) => {
        
    }
} 