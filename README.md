# CheckQubic
降低挖矿焦虑，不用在每时每刻看设备有没有掉线，哪个池子有没有爆块 = 解放自己，享受人生

一个基于nodejs的 rqiner池 + li池 监控小工具

可以在机器掉线以及爆块的时候及时发到你指定的邮箱，如果邮箱绑定了微信/QQ，即可第一时间收到消息

# Step.0 
https://nodejs.org/en 安装Nodejs 

# Step.1
https://service.mail.qq.com/detail/0/75 
去QQ邮箱开启授权码
要支持其他邮箱可以自己魔改 代码在send.js

# Step.2
在 config.json 中配置信息  如不配置li池账号信息则不进行轮询

    "user": "你的邮箱@qq.com",
    "pass": "授权码", 
    "id": "钱包地址"
    "li_user": "li池账号",
    "li_pass": "li池密码"

# Step.3
打开cmd, 找到这个文件夹 

    npm i
    node main.js