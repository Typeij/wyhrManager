import { getAPI } from "./http"
//查询
export let doclistApi = (data) => {
    return getAPI("/doctor/query", data)
    } 

//删除医师
export let deldocApi = (data) => {
    return getAPI("/doctor/remove", data)
}
//查询所有分店
export let fendianallApi = (data) => {
    return getAPI("/shop/queryAll", data)
}

//添加修改医师接口
import { postAPI } from "./http"

export let updatedocApi = (data) => {
    return postAPI("/doctor/save", data)
} 