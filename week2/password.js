const fs = require('fs');
const crypto = require('crypto');


const password = fs.readFileSync('./password.txt').toString();
console.log(password);

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt, 1, 32, 'sha512', async (err, derivedKey) => {
            if (err) throw err;
            const hashed = derivedKey.toString('hex');
            await fs.writeFileSync('./hashed.txt', `${salt}\n${hashed}`);
            console.log('salt : ', salt);
            console.log('hashed : ', hashed);
        });
    };

encrypt(crypto.randomBytes(32).toString('hex'), password);
