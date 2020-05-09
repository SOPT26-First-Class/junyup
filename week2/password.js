const fs = require('fs');
const crypto = require('crypto');

const getSalt = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

(async () => {
    try{
        const password = await fs.readFileSync('./password.txt').toString();
        const salt = getSalt(32);
        const hashed = (await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512')).toString('hex');
        
        await fs.writeFileSync('./hashed.txt', `${salt}\n${hashed}`);
        
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);
        console.log('saved!');
    } catch(e) {
        console.error(e);
    }
})();


