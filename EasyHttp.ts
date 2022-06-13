import { RequestType } from "./config/HttpRequest";
import InterceptorQueueFactory from "./factory/InterceptorQueueFactory";
import XMLHttpReqAdapterFactory from "./factory/XMLHttpReqAdapterFactory";
import IHttpAdapter from "./interface/IHttpAdapter";
import IHttpAdapterFactory from "./interface/IHttpAdapterFactory";
import IHttpAdapterListener from "./interface/IHttpAdapterListener";
import IHttpMethods from "./interface/IHttpMethods";
import IInterceptorsFactory from "./interface/IInterceptorsFactory";
import INetInterceptor from "./interface/INetInterceptor";
import HttpRequest from "./request/HttpRequest";

export default abstract class EasyHttp implements IHttpMethods, IHttpAdapterListener {
    // 拦截器
    private _interceptor: INetInterceptor = undefined;

    // http适配器工厂
    private _factory: IHttpAdapterFactory = undefined;

    public constructor() {
        this.initFactory(new XMLHttpReqAdapterFactory(), new InterceptorQueueFactory());
    }

    /**
     * 初始化工厂
     * @param adapterFactory 适配器工厂
     * @param interceptorsFactory 拦截器工厂
     */
    protected initFactory(adapterFactory: IHttpAdapterFactory, interceptorsFactory: IInterceptorsFactory): void {
        this._factory = adapterFactory;
        this._interceptor = interceptorsFactory?.build();
    }

    private _createRequest(url: string, body: any, type: RequestType): HttpRequest {
        const _request: HttpRequest = new HttpRequest();
        _request.setUrl(url);
        _request.setRequestType(type);
        _request.setRequestData(body);

        return _request;
    }

    public async get(url: string, body: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.GET);
        return await this._send(_request);
    }

    public async post(url: string, body: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.POST);
        return await this._send(_request);
    }

    public async put(url: string, body: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.PUT);
        return await this._send(_request);
    }

    public async delete(url: string, body: any): Promise<any> {
        const _request: HttpRequest = this._createRequest(url, body, RequestType.DELETE);
        return await this._send(_request);
    }

    private async _send(request: HttpRequest): Promise<void> {
        const _adapter: IHttpAdapter = this._factory.build(this);
        
        this._interceptor.onRequest(request);
        _adapter.setRequest(request);
        _adapter.connect();
        return await _adapter.send();
    }

    public onError(adapter: IHttpAdapter, reject: (reason?: any) => any): void {
        this._interceptor.onError(adapter, reject);
        this.error(adapter.getErrorContent(), reject);

        reject("");
    }

    public onResponse(adapter: IHttpAdapter, resolve: (unknown: any) => any, reject: (reason?: any) => any): void {
        this._interceptor.onResponse(adapter, reject);
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