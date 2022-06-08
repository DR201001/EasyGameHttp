import { StringFormatException, UrlFormatException } from "../../exception/Exception";
import HttpRequest from "../request/HttpRequest";
import IHttpAdapter from "./IHttpAdapter";

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
        // this.setTimeoutAndCallback(request?.getTimeout(), request?.getTimeoutCallback());
    }

    private _setRequestHeaders(headers: Map<string, string>): void {
        for (const entry of headers.entries()) {
            this.setRequestHeader(entry[0], entry[1]);

			console.debug("XMLHttpReqAdapter set request header:",entry[0], entry[1]);
        }
    }

    protected getRequestType(): string {
        return this._request?.getRequestType() || "GET";
    }

    public connect(): void {
        const url = this._request?.getUrl();

        try {
            this._checkUrl(url);
            this.connectServer(url);
            this._isConnected = true;
        } catch (error) {
            this._isConnected = false;
            throw new Error("HttpAdapter connect failed, exception is " + error);
        }
    }

    private _checkUrl(url: string): void {
        if (!url)
            throw new StringFormatException(`HttpAdapter url is invaild, url is ${url}.`);

        const reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if (!reg.test(url))
            throw new UrlFormatException(`HttpAdapter url is invaild, url is ${url}.`);
    }

    public send(body: any): void {
        this.sendRequest(body);
    }
    

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
     * 设置超时时间和回调
     * @param timeout 
     * @param callback 
     */
    protected abstract setTimeoutAndCallback(timeout: number, callback?: Function): void;

    /**
     * 发送请求
     * @param body 
     */
    protected abstract sendRequest(body: any): void;
}