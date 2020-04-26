const sum  = (a, b) => {
    return a+b;
};
const substract = (a, b) => {
    return a - b;
};
const multiply = (a, b) => {
    return a * b;
}
const divide = (a, b) => {
    return a / b;
}

// 1
// module.exports = sum;
// module.exports = (a, b) => {
//     return a+b;
// }

// 2
// module.exports = {
//     sum,
//     substract,
//     multiply,
//     divide,
// };


// 3
module.exports = {
    sum: (a, b) => {
        return a+b;
    },
    substract: (a, b) => {
        return a - b;
    },
    multiply: (a, b) => {
        return a * b;
    },
    divide: (a, b) => {
        return a / b;
    },
}