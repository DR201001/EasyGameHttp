import IHttpAdapter from "../interface/IHttpAdapter";
import HttpRequest from "../request/HttpRequest";
import NetInterceptor from "./NetInterceptor";

/**
 * log拦截器
 */
export default class LogInterceptor extends NetInterceptor {
    protected onNetRequest(request: HttpRequest): void {
        console.debug(`Http request url is: ${request.getUrl()}.`);
        console.debug(`Http request body is: ${request.getRequestData()}.`);
    }

    protected onNetResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        console.debug(`Http response is: ${adapter.getResponseContent()}.`);
    }

    protected onNetError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        console.error(`Http error: ${adapter.getErrorContent()}.`);
    }
}