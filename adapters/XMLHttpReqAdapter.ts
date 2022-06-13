import HttpAdapter from "./HttpAdapter";
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export default class XMLHttpReqAdapter extends HttpAdapter {
    private _http: XMLHttpRequest = undefined;

    private _errorContent: any = undefined;

    constructor() {
        super();

        this._http = new XMLHttpRequest();
        this._http.timeout = 3000;
    }

    public abort(): void {
        this._http?.abort();
    }

    public getErrorContent(): any {
        return this._errorContent;
    }

    public getResponseContent(): any {
        return this._http.responseText;
    }

    protected sendRequest(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        this._setTimeoutListener(reject);
        this._setErrorListener(reject);

        this._http?.send(this.getRequestData());
        this._http.onload = this._http.onreadystatechange = this._onreadystatechange.bind(this, resolve, reject);
    }

    private _setTimeoutListener(reject: (reason?: any) => any): void {
        this._http.timeout = this.getRequest().getTimeout() || 3000;
        this._http.ontimeout = () => {
            this.getAdapterListener()?.onTimeout(this, reject);
        };
    }

    private _setErrorListener(reject: (reason?: any) => any): void {
        this._http.onerror = (error) => {
            this._errorContent = error;
            this.getAdapterListener()?.onError(this, reject);
        }
    }

    protected setRequestHeader(name: string, value: string): void {
        this._http?.setRequestHeader(name, value);
    }

    protected connectServer(url: string): void {
        this._http?.open(this.getRequestType(), url, true);
    }

    private _onreadystatechange(resolve: (value: unknown) => any, reject: (reason?: any) => any, xhr: XMLHttpRequest, ev: Event): void {
        console.debug(`XMLHttpReqAdapter current status is ${xhr.status}.`);
        if (xhr.status !== 4) {
            return;
        }

        this._responseListener(resolve, reject);
    }

    private _responseListener(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        this.getAdapterListener()?.onResponse(this, resolve, reject);
    }
}