const { liCheck } = require('./qli');
const { rCheck } = require('./r');
const { send } = require('./send');

const config = require('./config.json');

console.log("https://github.com/icaruszezen/CheckQubicWechat");
console.log("项目基于https://github.com/LexOMG/CheckQubic");
console.log("Enjoy It XD");

if(config.test == "true"){
    send("测试", "恭喜你，你的推送token是正常的");
}

// 每分钟轮询 
setInterval(() => {

    if(config.type == "both"){
        rCheck();
        liCheck();
    }else if(config.type == "li"){
        liCheck();
    }else if(config.type == "r"){
        rCheck();
    }else{
        console.log("配置错误，请检查配置文件中type值");
    }


}, 60 * 1000) 

if(config.type == "both"){
    rCheck();
    liCheck();
}else if(config.type == "li"){
    liCheck();
}else if(config.type == "r"){
    rCheck();
}else{
    console.log("配置错误，请检查配置文件中type值");
}