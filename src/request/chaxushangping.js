import { getAPI } from "./http"
//menu
export let menuApi = (data) => {
    return getAPI("/shop/menu", data)
} 
//数据接口
export let shangpingApi = (data) => {
    return getAPI("/drug/query", data)
} 
//药品分类
export let yaopTypeApi = (data) => {
    return getAPI("/drug/drugtype", data)
}
//药品分类
export let peopleApi = (data) => {
    return getAPI("/drug/commonperson", data)
} 
//商品上下架
export let groundingApi = (data) => {
    return getAPI("/drug/grounding", data)
} 
