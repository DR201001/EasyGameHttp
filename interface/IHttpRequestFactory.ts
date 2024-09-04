import { RequestType } from "../config/HttpRequest";
import HttpRequest from "../request/HttpRequest";

/**
 * http request 工厂接口
 */
export default interface IHttpRequestFactory {
    /**
     * 创建 http request
     * @param url 
     * @param body 
     * @param type 
     */
    build(url: string, body: any, type: RequestType): HttpRequest;
}