const config = require('./config.json');
const axios = require('axios');
let devices = undefined;
let solutions = undefined;
exports.rCheck = function () {
    if (!config.id) {
        console.log("id空，不进行r池轮询");
        return;
    }
    axios.get('https://pooltemp.qubic.solutions/info?list=true&miner=' + config.id)
        .then((response) => {

            console.log("正在检查 r池状态");

            if (devices === undefined) {
                devices = response.data.devices;
                console.log("初始化r池设备数量：" + devices);
            }
            if (solutions === undefined) {
                solutions = response.data.solutions;
                console.log("初始化r池爆块数量：" + solutions);
            }

            if (response.data.devices < devices) {
                sendMail("r池有机器掉线了，请关注！", "当前r池机器列表：" + JSON.stringify(response.data.device_list.map(v => v.label)));
            }
            if (response.data.devices > devices) {
                sendMail("r池增加设备", "当前r池机器列表：" + JSON.stringify(response.data.device_list.map(v => v.label)));
            }
            if (response.data.solutions > solutions) {
                sendMail("恭喜r池爆块！", "当前r池爆块总数：" + response.data.solutions);
            }
            //刷新当前进度 
            devices = response.data.devices;
            solutions = response.data.solutions;
            console.log("当前r池在线设备数量" + devices);
            console.log("当前r池爆块数量" + solutions);
        })
        .catch((error) => {
            console.error(error); // 打印错误信息  
        });
}