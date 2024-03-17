const { liCheck } = require('./qli');
const { rCheck } = require('./r');

// 每分钟轮询 
setInterval(() => {

    rCheck();

    liCheck();

}, 60 * 1000) 