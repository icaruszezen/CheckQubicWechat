const axios = require('axios');
const { sendMail } = require('./send');
const config = require('./config.json');
const fs = require('fs');
const filePath = './ck';

async function getToken() {
    const url = "https://api.qubic.li/Auth/Login";
    const requestPayload = {
        "userName": config.li_user,
        "password": config.li_pass
    };
    const requestHeaders = {
        "Content-Type": "application/json",
        "Origin": "https://app.qubic.li",
        "Referer": "https://app.qubic.li/"
    };
    const minerData = await axios.post(url, requestPayload, { headers: requestHeaders });
    return minerData.data.token;
}

async function getCkToken() {
    try {
        // 使用 fs.readFileSync 方法同步读取文件内容  
        const data = fs.readFileSync(filePath, 'utf8');
        // 输出文件内容  
        // console.log(data);
        return data;
    } catch (err) {
        // 如果读取过程中发生错误，会抛出异常  
        console.error('读取文件时发生错误:', err);
        return undefined;
    }
}

async function setCkToken(data) {
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log('token已经保存' + data);
    });
}



// token存档  
async function minerInfo(getTokenFlag = false) {

    try {
        let token = await getCkToken();
        if (!token || getTokenFlag === true) {
            console.log("重新获取token");
            token = await getToken();
            // console.log("token = " + token);
            setCkToken(token);
        } else {
            console.log("缓存中获取token");
        }
        const headers = {
            'Accept': 'application/json',
            "Authorization": `Bearer ${token}`
        };

        const minerPerformanceUrl = "https://api.qubic.li/My/Pool/f4535705-eeac-4c4f-9ddc-4c3a91b40b13/Performance";
        const minerPerformanceResponse = await axios.get(minerPerformanceUrl, { headers: headers });
        const minerPerformance = minerPerformanceResponse.data;

        return minerPerformance;
    } catch (error) {
        console.error("li池 请求失败，下次请求之前会重刷token");
        setCkToken("");
        throw error;
    }
}

// 请求开始 
let arr = undefined;
let solutions = undefined;
exports.liCheck = function () {

    if (!config.li_pass || !config.li_user) {
        console.log("li池账号信息空，不进行轮询");
        return;
    }

    minerInfo(false)
        .then(minerPerformance => {
            console.log("正在检查 li池状态");
            if (arr === undefined) {
                arr = minerPerformance.miners;
                console.log("正在初始化 li池 设备数量：" + minerPerformance.miners.length)
            }
            if (solutions === undefined) {
                solutions = minerPerformance.foundSolutions;
                console.log("正在初始化 li池 solutions：" + solutions)
            }

            // 生成一个新状态查询表
            let map = [];
            minerPerformance.miners.forEach(element => {
                map[element.id] = element;
            });

            // 遍历旧数组 看下丢了哪些
            let lost = [];
            arr.forEach(element => {
                // console.log("正在检查 li池 机器状态 " + element.alias);
                if (map[element.id]) {
                    //看下active状态是不是由true变成了false
                    if (element.isActive === true && map[element.id] === false) {
                        lost.push(element.alias);
                    }
                } else {
                    //连id都没了
                    lost.push(element.alias);
                }
            });

            if (lost.length > 0) {
                sendMail("li池有机器掉线了", "掉线机器列表 " + JSON.stringify(lost));
            }

            if (minerPerformance.foundSolutions > solutions) {
                sendMail("恭喜li池爆块！", "当前li池爆块总数：" + minerPerformance.foundSolutions);
            }

            //刷新最终状态
            arr = minerPerformance.miners;
            solutions = minerPerformance.foundSolutions;
            console.log("当前li池在线设备数量" + arr.length);
            console.log("当前li池爆块数量" + solutions);
        })
        .catch(error => {
            console.error('Error fetching miner info:', error);
        });
}




