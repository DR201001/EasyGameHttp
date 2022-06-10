import IHttpAdapter from "./IHttpAdapter";

/**
 * http adapter 监听器
 */
export default interface IHttpAdapterListener {
    /**
     * 监听器执行函数
     * @param adapter 
     * @param resolve 
     * @param reject 
     */
    onExecute(adapter: IHttpAdapter, resolve: (unknown: any) => any, reject: (reason?: any) => any): void;
}