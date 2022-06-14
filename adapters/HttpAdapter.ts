import HttpRequest from "../request/HttpRequest";
import IHttpAdapter from "../interface/IHttpAdapter";
import IHttpAdapterListener from "../interface/IHttpAdapterListener";

export default abstract class HttpAdapter implements IHttpAdapter {
    private _isConnected: boolean = false;

    private _request: HttpRequest = undefined;

    private _listener: IHttpAdapterListener = undefined;

    private _errContent: any = undefined;

    private _respContent: any = undefined;

    public setRequest(request: HttpRequest): void {
        if (this._isConnected) {
            console.warn("Adapter setRequest failed, http was already connected.");
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
        return new Promise((resolve: (unknown: any) => any, reject: (reason?: any) => any) => {
            this.sendRequest(resolve, reject);
        });
    }

    public setErrorContent(content: any): void {
        this._errContent = content;
    }

    public setResponseContent(content: any): void {
        this._respContent = content;
    }

    public getErrorContent(): any {
        return this._errContent;
    }

    public getResponseContent(): any {
        return this._respContent;
    }

    /**
     * 绑定 adapter 监听对象
     * @param listener 
     */
    public bindAdapterListener(listener: IHttpAdapterListener): void {
        this._listener = listener;
    }

    protected getAdapterListener(): IHttpAdapterListener {
        return this._listener;
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