import { postAPI } from "./http"
//查询分店
export let fendianjoinApi = (data) => {
    return postAPI("/shop/join", data)
} 