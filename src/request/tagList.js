import { getAPI } from "./http"
//开方接口
export let kaifApi = (data) => {
    return getAPI("/tag/query", data)
} 
//处方详情接口
export let chufDatApi = (data) => {
    return getAPI("/tag/detail", data)
} 