import { getAPI } from "./http"
//商品接口
export let kucunApi = (data) => {
    return getAPI("/stock/query", data)
} 
//出入库接口
export let outApi = (data) => {
    return getAPI("/stock/stockput", data)
} 