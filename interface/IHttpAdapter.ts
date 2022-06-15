import HttpRequest from "../request/HttpRequest";

/**
 * http适配器接口
 */
export default interface IHttpAdapter {
    /**
     * 设置请求
     * @param request http请求
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

    /**
     * 设置错误内容
     * @param content 
     */
    setErrorContent(content: any): void;

    /**
     * 获取异常内容
     */
    getErrorContent(): any;

    /**
     * 设置响应内容
     * @param content 
     */
    setResponseContent(content: string): void;

    /**
     * 获取响应内容
     */
    getResponseContent(): string;
}