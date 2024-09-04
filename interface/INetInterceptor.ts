import HttpRequest from "../request/HttpRequest";
import IHttpAdapter from "./IHttpAdapter";

/**
 * 网络拦截器接口
 */
export default interface INetInterceptor {
    /**
     * 请求拦截接口
     * @param request 
     */
    netRequest(request: HttpRequest): void;

    /**
     * 响应拦截器
     * @param adapter 
     * @param reject 
     */
    netResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void;

    /**
     * 异常拦截器
     * @param adapter 
     * @param reject 
     */
    netError(adapter: IHttpAdapter, reject: (reason?: any) => void): void;
}