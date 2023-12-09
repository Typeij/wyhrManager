import { getAPI } from "./http"
//医师登录dotag接口
export let yishiApi = (data) => {
    return getAPI("/drug/druglist", data)
} 
//开方接口
import { postAPI } from "./http"
export let createApi = (data) => {
    return postAPI("/tag/dotag", data)
} 