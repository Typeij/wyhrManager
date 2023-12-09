// 封装axios z中接口请求的方式

import request from "./request";

// 封装一个get 请求
export const getAPI = (url, data = {}) => {
    return request.get(url, { params: { ...data } })
}

// 封装post 请求
export const postAPI = (url, data = {}) => {
    return request.post(url, { ...data })
}

// put 请求 
export const putAPI = (url, data = {}) => {
    return request.put(url, { ...data })
}

// delete 请求
export const deleteAPI = (url, data = {}) => {
    return request.delete(url, { param: { ...data } })
}