// 封装axios 请求 :产生一个 新的axios

import axios from "axios";
import { Message } from "element-ui"
import { whiteArr } from "./whiteApi";

// 创建一个axios  实例对象：

const request = axios.create({
    // 基础的接口访问地址：
    // 本地  预发布  生产环境
    // 线上接口:
    baseURL: "http://localhost:3000/",
    timeout: 10000, // 设置请求超时事件
    // http:"http://1.0.42.1:5000"
})

// 配置拦截器 ： 接口 配置 token 
// 请求在正常发送到服务器之前做什么操作
// 接口鉴权
request.interceptors.request.use(function (configs) {
    console.log(configs.url)
    // 不拦截白名单的请求接口
    if (whiteArr.includes(configs.url)) {
        return configs
    } else {
        // 接口鉴权操作
        let token = localStorage.getItem("token");
        let userId = localStorage.getItem("userID");
        if (!token) {
            // token 失效
            Message({
                message: 'token异常或失效!',
                type: 'warning'
            });

            setTimeout(() => {
                // 跳转至登录页
                window.location.assign("http://localhost:8080/#/login")
            }, 1000)

        } else {
            // 有token 
            configs.headers.Authorization = token
            configs.headers.userId = userId
        }

        return configs;
    }


}, function (err) {
    // 请求失败
    return Promise.reject(err)
})

// 响应拦截 ： 对接口响应结果做处理
request.interceptors.response.use(function (res) {
    // 对接口进行处理
    return res.data;
})

export default request;
