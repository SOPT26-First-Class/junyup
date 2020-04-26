let isMomHappy = true;
let phone = {
    brand: 'Samsung',
    color: 'black'
};

const willGetNewPhone = new Promise((resolve, reject) => {
    if(isMomHappy) resolve(phone);
    else reject(new Error('mom is not happy'));
});

willGetNewPhone
    .then(res => console.log(res))
    .catch(e => console.error(e));
