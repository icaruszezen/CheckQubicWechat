# CheckQubicForWechat
基于项目https://github.com/LexOMG/CheckQubic开发
新增如下功能：
1、使用微信推送爆块信息
2、可选择只使用li池或r池

# CheckQubic
降低挖矿焦虑，不用在每时每刻看设备有没有掉线，哪个池子有没有爆块 = 解放自己，享受人生

一个基于nodejs的 rqiner池 + li池 监控小工具

可以在机器掉线以及爆块的时候及时发到你指定的邮箱，如果邮箱绑定了微信/QQ，即可第一时间收到消息

# Step.0 
https://nodejs.org/en 安装Nodejs 

# Step.1 （如果选择微信推送请跳过这一步）
https://service.mail.qq.com/detail/0/75 
去QQ邮箱开启授权码
要支持其他邮箱可以自己魔改 代码在send.js

# Step.2 使用微信推送
关注公众号 【pushplus 推送加】
发送token到公众号获取你的专用token
将token复制于本项目的 config.json 中
设置公众号消息推送提醒
 

# Step.3
在 config.json 中配置信息  如不配置li池账号信息则不进行轮询

    "type": "选择矿池", //"both"选择两个矿池，"li"只选择li池，"r"只选择r池

    "wechat": "true", //为true则使用微信，不使用qq邮箱。为false则不使用微信推送。
    "token": "你的token", //输入公众号获取的token
    "test":"true", //为true则启动时发送一条测试消息

    "user": "你的邮箱@qq.com", //使用邮箱推送才需要输入
    "pass": "授权码", 

    "id": "钱包地址" //使用r池时才需要输入

    "li_user": "li池账号", //使用li池时才需要输入
    "li_pass": "li池密码"

# Step.3
打开cmd, 找到这个文件夹 

    npm i
    node main.js