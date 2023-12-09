import { getAPI } from "./http"
//查询
export let dataApi = (data) => {
    return getAPI("/data/selldata", data)
} 