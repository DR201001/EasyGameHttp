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

    protected nextRequest(request: HttpRequest): void {
        if (this._hasNext()) {
            this.getNext().netRequest(request);
        }
        else {
            console.log("INetInterceptor onRequest finished.");
        }
    }

    protected nextResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        if (this._hasNext()) {
            this.getNext().netResponse(adapter, reject);
        }
        else {
            console.log("INetInterceptor onResponse finished.");
        }
    }

    protected nextError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        if (this._hasNext()) {
            this.getNext().netError(adapter, reject);
        }
        else {
            console.log("INetInterceptor onError finished.");
            reject(adapter.getErrorContent());
        }
    }

    public netRequest(request: HttpRequest): void {
        this.onNetRequest(request);

        this.nextRequest(request);
    }

    public netResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        this.onNetResponse(adapter, reject);

        this.nextResponse(adapter, reject);
    }

    public netError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        this.onNetError(adapter, reject);

        this.nextError(adapter, reject);
    }

    protected abstract onNetRequest(request: HttpRequest): void;

    protected abstract onNetResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void;

    protected abstract onNetError(adapter: IHttpAdapter, reject: (reason?: any) => void): void;
}