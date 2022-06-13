import IHttpAdapter from "../interface/IHttpAdapter";
import INetInterceptor from "../interface/INetInterceptor";
import HttpRequest from "../request/HttpRequest";
import NetInterceptor from "./NetInterceptor";

export default class InterceptorQueue<T extends NetInterceptor> implements INetInterceptor {
    private _array: T[] = [];

    public enqueue(element: T) {
        if (!this.isEmpty()) {
            this._array[this.size() - 1].setNext(element);
        }
        this._array.push(element);
    }

    public dequeue() {
        return this._array.shift();
    }
    
    public front(): T {
        return this.isEmpty() ? null : this._array[0];
    }
    
    public isEmpty(): boolean {
        return this.size() == 0;
    }

    public size(): number {
        return this._array.length;
    }

    public onRequest(request: HttpRequest): void {
        this.front()?.onRequest(request);
    }

    public onResponse(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        this.front()?.onResponse(adapter, reject);
    }

    public onError(adapter: IHttpAdapter, reject: (reason?: any) => void): void {
        this.front()?.onError(adapter, reject);
    }
}