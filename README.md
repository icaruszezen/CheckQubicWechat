# CheckQubic

一个基于nodejs的rqiner监控小工具
可以在机器掉线以及爆块的时候及时发到你指定的邮箱，如果邮箱绑定了微信/QQ，即可第一时间收到消息

# Step.1
https://service.mail.qq.com/detail/0/75 
去QQ邮箱开启授权码

# Step.2
在 config.json 中配置信息

    "user": "你的邮箱@qq.com",
    "pass": "授权码", 
    "id": "钱包地址"

# Step.3

    npm i
    node main.js