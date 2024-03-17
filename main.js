const nodemailer = require('nodemailer');
const config = require('./config.json');
const axios = require('axios');

function sendMail(title, desc) {
    // 创建一个SMTP传输器对象  
    let transporter = nodemailer.createTransport({
        service: 'qq', // 使用qq服务 授权码参考文档 https://service.mail.qq.com/detail/0/75
        auth: {
            user: config.user, // 你的邮箱地址  
            pass: config.pass // 你的邮箱授权码  
        }
    });
    // 设置邮件内容  
    let mailOptions = {
        from: config.user, // 发件人地址  
        to: config.user, // 收件人列表  
        subject: title, // 邮件主题  
        text: desc, // 邮件正文为纯文本   
    };
    console.log('Email title: ' + title);
    console.log('Email desc: ' + desc);
    // 发送邮件  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// 每分钟轮询一下rq list 
let devices = undefined;
let solutions = undefined;
setInterval(() => {

    console.log("正在检查变化");

    axios.get('https://pooltemp.qubic.solutions/info?list=true&miner=' + config.id)
        .then((response) => {
            if (devices === undefined) {
                devices = response.data.devices;
                console.log("初始化设备数量：" + devices);
            }
            if (solutions === undefined) {
                solutions = response.data.solutions;
                console.log("初始化爆块数量：" + solutions);
            }

            if (response.data.devices < devices) {
                sendMail("有机器掉线了，请关注！", "当前机器列表：" + JSON.stringify(response.data.device_list.map(v => v.label)));
            }
            if (response.data.devices > devices) {
                sendMail("加卡加U!", "当前机器列表：" + JSON.stringify(response.data.device_list.map(v => v.label)));
            }
            if (response.data.solutions > config.solutions) {
                sendMail("恭喜爆块！", "当前爆块总数：" + config.solutions);
            }
            //刷新当前进度 
            devices = response.data.devices;
            solutions = response.data.solutions;
            console.log("当前在线设备数量" + devices);
            console.log("当前爆块数量" + solutions);
        })
        .catch((error) => {
            console.error(error); // 打印错误信息  
        });

}, 60 * 1000) 