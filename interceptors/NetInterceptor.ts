import IHttpAdapter from "../interface/IHttpAdapter";
import INetInterceptor from "../interface/INetInterceptor";
import HttpRequest from "../request/HttpRequest";

/**
 * 网络拦截器基类
 */
export default abstract class NetInterceptor implements INetInterceptor {
    private _next: NetInterceptor = undefined;

    public setNext(next: NetInterceptor): void {
        this._next = next;
    }

    public getNext(): NetInterceptor {
        return this._next;
    }

    private _hasNext(): boolean {
        return !!this._next;
    }

    protected nextRequest(request: HttpRequest, reject: (reason?: any) => void): void {
        if (this._hasNext()) {
            this.getNext().onRequest(request, reject);
        }
        else {
            console.log("INetInterceptor onRequest finished.");
        }
    }

    protected nextResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        if (this._hasNext()) {
            this.getNext().onResponse(adapter, reject);
        }
        else {
            console.log("INetInterceptor onResponse finished.");
        }
    }

    protected nextError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        if (this._hasNext()) {
            this.getNext().onError(adapter, reject);
        }
        else {
            console.log("INetInterceptor onError finished.");
            reject(adapter.getErrorContent());
        }
    }

    public abstract onRequest(request: HttpRequest, reject: (reason?: any) => void): void;

    public abstract onResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void;

    public abstract onError(adapter: IHttpAdapter, reject: (reason?: any) => void): void;
}