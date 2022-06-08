import { RequestType } from "../config/HttpRequest";
import HttpRequest from "../request/HttpRequest";

/**
 * http适配器接口
 */
export default interface IHttpAdapter {
    /**
     * 设置请求
     * @param request 
     */
    setRequest(request: HttpRequest): void;

    /**
     * 连接
     */
    connect(): void;

    /**
     * 发送请求
     */
    send(): Promise<any>;

    /**
     * 中止请求
     */
    abort(): void;
}