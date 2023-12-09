import { getAPI } from "./http"
//查询分店
export let fendianListApi = (data) => {
    return getAPI("/shop/query", data)
} 
//删除接口
export let delApi = (data) => {
    return getAPI("/shop/remove", data)
} 

//编辑接口
import { postAPI } from "./http"

export let emitApi = (data) => {
    return postAPI("/shop/update", data)
} 