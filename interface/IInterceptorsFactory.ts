import INetInterceptor from "./INetInterceptor";

/**
 * http 拦截器工厂接口
 */
export default interface IInterceptorsFactory {
    /**
     * 创建http拦截器
     */
     build(): INetInterceptor;
}