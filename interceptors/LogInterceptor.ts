import IHttpAdapter from "../interface/IHttpAdapter";
import HttpRequest from "../request/HttpRequest";
import BaseNetInterceptor from "./NetInterceptor";

/**
 * log拦截器
 */
export default class LogInterceptor extends BaseNetInterceptor {
    public onRequest(request: HttpRequest): void {
        console.debug(`Http request url is: ${request.getUrl()}.`);
        console.debug(`Http request body is: ${request.getRequestData()}.`);

        this.nextRequest(request);
    }

    public onResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        console.debug(`Http response is: ${adapter.getResponseContent()}.`);
        
        this.nextResponse(adapter, reject);
    }

    public onError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        console.error(`Http error: ${adapter.getErrorContent()}.`);
        
        this.nextError(adapter, reject);
    }
}