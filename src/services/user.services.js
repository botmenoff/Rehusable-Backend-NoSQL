const bcrypt = require('bcrypt');

require('dotenv').config();

function hashString(string) {
    const saltRounds = 10;
    const secretKey = process.env.SECRET_KEY;
    const hashedString = bcrypt.hashSync(string + secretKey, saltRounds);
    return hashedString;
}

module.exports = {
    hashString
};