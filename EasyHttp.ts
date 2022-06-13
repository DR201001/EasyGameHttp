import XMLHttpReqAdapterFactory from "./factory/XMLHttpReqAdapterFactory";
import InterceptorQueue from "./interceptors/InterceptorQueue";
import NetInterceptor from "./interceptors/NetInterceptor";
import IHttpAdapterFactory from "./interface/IHttpAdapterFactory";

export default class EasyHttp {
    // 拦截器队列
    private _iQueue: InterceptorQueue<NetInterceptor> = undefined;

    // http适配器工厂
    private _factory: IHttpAdapterFactory = undefined;

    public constructor() {
        this.setInterceptorQueue(new InterceptorQueue<NetInterceptor>());
        this.setAdapterFactory(new XMLHttpReqAdapterFactory());
    }

    /**
     * 设置拦截器队列
     * @param queue 
     */
    public setInterceptorQueue(queue: InterceptorQueue<NetInterceptor>): void {
        this._iQueue = queue;
    }

    /**
     * 添加拦截器
     * @param interceptor 
     */
    public addInterceptor(interceptor: NetInterceptor): void {
        this._iQueue?.enqueue(interceptor);
    }

    /**
     * 设置http适配器工厂
     * @param factory 
     */
    public setAdapterFactory(factory: IHttpAdapterFactory): void {
        this._factory = factory;
    }
}