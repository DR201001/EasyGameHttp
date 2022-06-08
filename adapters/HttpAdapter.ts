import HttpRequest from "../request/HttpRequest";
import IHttpAdapter from "../interface/IHttpAdapter";

export default abstract class HttpAdapter implements IHttpAdapter {
    private _isConnected: boolean = false;

    private _request: HttpRequest = undefined;

    public setRequest(request: HttpRequest): void {
        if (this._isConnected) {
            console.warn("setRequest failed, http was already connected.");
            return;
        }
        
        this._request = request;
        this._setRequestHeaders(request?.getRequestHeaders());
    }

    private _setRequestHeaders(headers: Map<string, string>): void {
        for (const entry of headers.entries()) {
            this.setRequestHeader(entry[0], entry[1]);

			console.debug("XMLHttpReqAdapter set request header:",entry[0], entry[1]);
        }
    }

    public connect(): void {
        const url = this.getRequest()?.getUrl();

        try {
            this.connectServer(url);
            this._isConnected = true;
        } catch (error) {
            this._isConnected = false;
            throw new Error("HttpAdapter connect failed, exception is " + error);
        }
    }

    public async send(): Promise<any> {
        return new Promise((resolve: (value: unknown) => any, reject: (reason?: any) => any) => {
            this.sendRequest(resolve, reject);
        });
    }

    /**
     * 获取请求
     * @returns HttpRequest
     */
     protected getRequest(): HttpRequest {
        return this._request;
    }

    /**
     * 获取请求数据
     * @returns any
     */
    protected getRequestData(): any {
        return this.getRequest()?.getRequestData();
    }

    /**
     * 获取请求类型
     * @returns 
     */
    protected getRequestType(): string {
        return this.getRequest()?.getRequestType() || "GET";
    }

    public abstract abort(): void;

    /**
     * 通过url连接服务器
     * @param url 
     */
    protected abstract connectServer(url: string): void;

    /**
     * 设置HTTP请求头部
     * @param name 
     * @param value 
     */
    protected abstract setRequestHeader(name: string, value: string): void;

    /**
     * 发送请求、
     * @param resolve 
     * @param reject 
     */
    protected abstract sendRequest(resolve: (value: unknown) => any, reject: (reason?: any) => any): void;
}