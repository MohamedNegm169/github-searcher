import BaseService from "../BaseServices";
import http from "../HttpServices";
 
const apiEndPoint=""

class HomeService extends BaseService{
    constructor(){
        super(apiEndPoint)
    }

    getData(type,params){
        return http.get(`${this.apiEndPoint}${type}`,{params})
     }
}

export default HomeService