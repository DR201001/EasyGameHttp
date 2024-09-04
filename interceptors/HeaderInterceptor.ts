import IHttpAdapter from "../interface/IHttpAdapter";
import HttpRequest from "../request/HttpRequest";
import NetInterceptor from "./NetInterceptor";

/**
 * 
 */
export default class HeaderInterceptor extends NetInterceptor {
    protected onNetRequest(request: HttpRequest): void {
        request?.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    }

    protected onNetResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        
    }

    protected onNetError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        
    }
}