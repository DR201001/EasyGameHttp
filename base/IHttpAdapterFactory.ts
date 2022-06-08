import IHttpAdapter from "./IHttpAdapter";

/**
 * http 适配器工厂接口
 */
export default interface IHttpAdapterFactory {
    /**
     * 创建http适配器
     */
    createHttpAdapter(): IHttpAdapter;
}