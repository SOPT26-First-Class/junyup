const fs = require('fs');
const crypto = require('crypto');

(async () => {
    try{
        const password = await fs.readFileSync('./password.txt').toString();
        const salt = crypto.randomBytes(32).toString('hex')        
        const derivedKey = await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512');
        const hashed = derivedKey.toString('hex');
        await fs.writeFileSync('./hashed.txt', `${salt}\n${hashed}`);
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);
        console.log('saved!')
    } catch(e) {
        console.error(e);
    }
})();


