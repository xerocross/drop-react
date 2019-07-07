import Observable from "./Observable";
import  axios from "axios";

export default {
    executeRequest : function(configObject, successStatus) {
        const { numTries, method, url, dataType, config, data } = configObject;
        let iteration = 0;
        let delay = 1000;
        let observable = new Observable((observer)=> {
            let attempt = function() {
                if (iteration >= numTries) {
                    observer.next({
                        status: "FAIL",
                        url: url
                    });
                } else {
                    observer.next({
                        status: "ATTEMPTING",
                        data : {
                            attemptNum : iteration,
                            url : url
                        }
                    });
                    iteration++;
                    axios(configObject)
                        .then((response) => {
                            if (response.status === successStatus) {
                                observer.next({
                                    status: "SUCCESS",
                                    data : response.data,
                                    url : url
                                })
                            } else {
                                observer.next({
                                    status: "FAILED_ATTEMPT",
                                    attemptNum: iteration,
                                    statusCode : response.status,
                                    url : url
                                })
                                setTimeout(()=>{
                                    attempt();
                                    delay+= delay;
                                }, delay);
                            
                            }
                        })
                        .catch((errorThrown) =>{
                            observer.next({
                                status: "FAILED_ATTEMPT",
                                attemptNum: iteration,
                                error : errorThrown,
                                url : url
                            })
                            setTimeout(()=>{
                                attempt();
                                delay+= 1000;
                            }, delay);
                        })
                }
            }
            attempt();
        })
        return observable;
    },
    get : function(configObject) {
        configObject.method = "get";
        let successStatus = configObject.successStatus || 200;
        return this.executeRequest(configObject, successStatus);
    },
    delete : function(configObject) {
        configObject.method = "delete";
        let successStatus = configObject.successStatus || 204;
        return this.executeRequest(configObject, successStatus);
    },
    post : function(configObject) {
        configObject.method = "post";
        let successStatus = configObject.successStatus || 201;
        return this.executeRequest(configObject, successStatus);
    },
}
