const server1 = ['kim', 'son', 43, null, true];
const server2 = Array('shin', 'you', 13);
const server3 = new Array('lee', 'jo', false, undefined);

console.log('server1: ', server1);
console.log('server2: ', server2);
console.log('server3: ', server3);



server1.push(123);
server2[server2.length] = '?';
server3[99] = 'length?';

console.log('server1: ', server1);
console.log('server2: ', server2);
console.log('server3: ', server3);


let str1 = 'server1에는 "';
for(let item of server1) {
    str1 += item + ', ';
}
str1 += '"이 있음';
console.log(str1);

let str2 = 'server2에는 "'
for (let item in server2) {
    str2 += server2[item] + ', ';
}
str2 += '"이 있음';
console.log(str2);

let str3 = 'server3에는 "';
server3.forEach( item => str3 += item + ', ');
str3 += '"이 있음';
console.log(str3);