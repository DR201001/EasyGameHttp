import IHttpAdapter from "./IHttpAdapter";
import IHttpAdapterListener from "./IHttpAdapterListener";

/**
 * http 适配器工厂接口
 */
export default interface IHttpAdapterFactory {
    /**
     * 创建http适配器
     * @param listener 适配器监听器
     */
    build(listener: IHttpAdapterListener): IHttpAdapter;
}