import IHttpAdapterListener from "./IHttpAdapterListener";

/**
 * 适配器观察者接口
 */
export default interface IHttpAdapterObserver {
    /**
     * 注册超时监听器
     * @param timeout 超时时长
     * @param listener 超时监听器
     */
    registerTimeoutListener(timeout: number, listener: IHttpAdapterListener): void;

    /**
     * 注册异常监听器
     * @param listener 异常监听器
     */
    registerErrorListener(listener: IHttpAdapterListener): void;
 
    /**
     * 注册响应监听器
     * @param listener 响应监听器
     */
    registerResponseListener(listener: IHttpAdapterListener): void;

    /**
     * 获取超时时长
     */
    getTimeout(): number;

    /**
     * 获取超时监听器
     */
    getTimeoutListener(): IHttpAdapterListener;

    /**
     * 获取异常监听器
     */
    getErrorListener(): IHttpAdapterListener;

    /**
     * 获取响应监听器
     */
    getResponseListener(): IHttpAdapterListener;
}