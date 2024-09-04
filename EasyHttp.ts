import { RequestType } from "./config/HttpRequest";
import HttpRequestFactory from "./factory/HttpRequestFactory";
import XMLHttpReqAdapterFactory from "./factory/XMLHttpReqAdapterFactory";
import HeaderInterceptor from "./interceptors/HeaderInterceptor";
import InterceptorQueue from "./interceptors/InterceptorQueue";
import NetInterceptor from "./interceptors/NetInterceptor";
import IHttpAdapter from "./interface/IHttpAdapter";
import IHttpAdapterFactory from "./interface/IHttpAdapterFactory";
import IHttpAdapterListener from "./interface/IHttpAdapterListener";
import IHttpMethods from "./interface/IHttpMethods";
import IHttpRequestFactory from "./interface/IHttpRequestFactory";
import HttpRequest from "./request/HttpRequest";

export default abstract class EasyHttp implements IHttpMethods, IHttpAdapterListener {
    // 拦截器队列
    private _queue: InterceptorQueue<NetInterceptor>;

    // http适配器工厂
    private _adapterFactory: IHttpAdapterFactory = undefined;

    private _requestFactory: IHttpRequestFactory = undefined;

    public constructor() {
        this._queue = new InterceptorQueue<NetInterceptor>();
        // 消息头部拦截器
        this.addInterceptor(new HeaderInterceptor());

        this.initAdapterFactory();
        this.initRequestFactory();
    }

    /**
     * 初始化适配器工厂
     * @param factory 适配器工厂
     */
    protected initAdapterFactory(factory: IHttpAdapterFactory = new XMLHttpReqAdapterFactory()): void {
        this._adapterFactory = factory;
    }
    
    /**
     * 初始化 request 工厂
     * @param factory request工厂
     */
     protected initRequestFactory(factory: IHttpRequestFactory = new HttpRequestFactory()): void {
        this._requestFactory = factory;
    }

    /**
     * 增加拦截器
     * @param interceptor 
     */
    protected addInterceptor(interceptor: NetInterceptor): void {
        this._queue?.enqueue(interceptor);
    }

    /**
     * 设置拦截器
     * @param queue 
     */
    protected setInterceptorQueue(queue: InterceptorQueue<NetInterceptor>): void {
        this._queue = queue;
    }

    private _createRequest(url: string, body: any, type: RequestType): HttpRequest {
        return this._requestFactory?.build(url, body, type);
    }

    public async get(url: string, body?: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.GET);
        return await this._send(_request);
    }

    public async post(url: string, body?: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.POST);
        return await this._send(_request);
    }

    public async put(url: string, body?: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.PUT);
        return await this._send(_request);
    }

    public async delete(url: string, body?: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.DELETE);
        return await this._send(_request);
    }

    private async _send(request: HttpRequest): Promise<void> {
        const _adapter: IHttpAdapter = this._adapterFactory.build(this);
        
        this._queue?.netRequest(request);
        _adapter.setRequest(request);
        _adapter.connect();
        return await _adapter.send();
    }

    public onError(adapter: IHttpAdapter, reject: (reason?: any) => any): void {
        this._queue?.netError(adapter, reject);
        this.error(adapter.getErrorContent(), reject);

        reject("");
    }

    public onResponse(adapter: IHttpAdapter, resolve: (unknown: any) => any, reject: (reason?: any) => any): void {
        this._queue?.netResponse(adapter, reject);
        this.response(adapter.getResponseContent());

        resolve(adapter.getResponseContent());
    }

    public abstract onTimeout(adapter: IHttpAdapter, reject: (reason?: any) => any): void;

    /**
     * 异常回调
     * @param content 异常内容
     * @param reject 
     */
    protected abstract error(content: any, reject: (reason?: any) => any): void;

    /**
     * 响应回调
     * @param content 响应内容
     */
    protected abstract response(content: any): void;
}