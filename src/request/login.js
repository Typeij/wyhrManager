// 将所有的请求 集中管理 分模块管理 login
import { postAPI } from "./http"
// 1、请求登录接口
export let loginApi = (data) => {
    return postAPI("/shop/login", data)
} 