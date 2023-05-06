import http from "./HttpServices";
import {API_BASE_URL_ENV} from "../helpers/common"

export default class BaseService {
    constructor(apiEndPoint){
         this.apiEndPoint=`${API_BASE_URL_ENV}/${apiEndPoint}`
    }
    
    getData(params){
       return http.get(`${this.apiEndPoint}`,{params})
    }

    //here we can define post ,put and delete methods and we can you it in all apps
}