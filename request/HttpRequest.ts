import { NumberFormatException, OverflowException, StringFormatException, UrlFormatException } from "../exception/Exception";
import { RequestStringType, RequestType } from "../config/HttpRequest";

export default class HttpRequest {
    private _headers: Map<string, string> = undefined;

    private _timeout: number = undefined;

    private _url: string = undefined;

    private _reqType: RequestType = undefined;

    // http请求内容
    private _body: any = undefined;

    constructor() {
        this._headers = new Map();
        this._timeout = 3000;
        this._reqType = RequestType.GET;
    }

    /**
     * 设置HTTP请求头部
     * @param name 
     * @param value 
     */
    public setRequestHeader(name: string, value: string): void {
        if (typeof(name) !== "string" || typeof(value) !== "string")
            throw new StringFormatException(`HttpRequest setRequestHeader name is ${name} type is ${typeof(name)}, value is ${value} type is ${typeof(value)}.`);
        
        this._headers.set(name, value);
    }

    /**
     * 获取HTTP请求头部
     * @returns Map<string, string>
     */
    public getRequestHeaders(): Map<string, string> {
        return this._headers;
    }

    /**
     * 设置url
     * @param url 
     */
    public setUrl(url: string): void {
        if (typeof(url) !== "string")
            throw new StringFormatException(`HttpRequest setUrl url is ${url}, type is ${typeof(url)}.`);

        // const reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        // if (!reg.test(url))
        //     throw new UrlFormatException(`HttpRequest setUrl url is ${url}.`);

        this._url = url;
    }

    /**
     * 获取url
     * @returns string
     */
    public getUrl(): string {
        return this._url;
    }
 
    /**
     * 设置请求类型
     * @param type 
     */
    public setRequestType(type: RequestType): void {
        this._reqType = type;
    }

    /**
     * 获取请求类型
     * @returns string
     */
    public getRequestType(): string {
        return RequestStringType.coverTo(this._reqType);
    }
     
    /**
     * 设定超时时长
     * @param time 超时时长
     */
    public setTimeout(time: number): void {
        if (time == null || time == undefined || typeof(time) !== "number")
            throw new NumberFormatException(`HttpRequest setTimeout time is ${time}, type is ${typeof(time)}.`);

        if (time <= 0)
            throw new OverflowException(`HttpRequest setTimeout time is ${time}.`);

        this._timeout = time;
    }

    /**
     * 获取超时时长
     * @returns number
     */
    public getTimeout(): number {
        return this._timeout;
    }

    /**
     * 设置http请求数据
     * @param data 
     */
    public setRequestData(data: any): void {
        this._body = data;
    }

    /**
     * 获取http请求数据
     * @returns any
     */
    public getRequestData(): any {
        return this._body;
    }
}