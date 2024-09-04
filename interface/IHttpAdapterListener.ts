import IHttpAdapter from "./IHttpAdapter";

/**
 * http adapter 监听器
 */
export default interface IHttpAdapterListener {
    /**
     * 超时
     * @param adapter 
     * @param reject 
     */
    onTimeout(adapter: IHttpAdapter, reject: (reason?: any) => any): void;

    /**
     * 异常
     * @param adapter 
     * @param reject 
     */
    onError(adapter: IHttpAdapter, reject: (reason?: any) => any): void;

    /**
     * 响应
     * @param adapter 
     * @param resolve 
     * @param reject 
     */
    onResponse(adapter: IHttpAdapter, resolve: (unknown: any) => any, reject: (reason?: any) => any): void;
}