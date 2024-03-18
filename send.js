const nodemailer = require('nodemailer');
const config = require('./config.json');

exports.sendMail = function (title, desc) {
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