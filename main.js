const { liCheck } = require('./qli');
const { rCheck } = require('./r');

console.log("https://github.com/LexOMG/CheckQubic");
console.log("Enjoy It XD");

// 每分钟轮询 
setInterval(() => {

    rCheck();

    liCheck();

}, 60 * 1000) 

rCheck();

liCheck();