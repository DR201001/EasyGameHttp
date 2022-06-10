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
        this._setTimeoutListener(resolve, reject);
        this._setErrorListener(resolve, reject);

        this._http?.send(this.getRequestData());
        this._http.onload = this._http.onreadystatechange = this._onreadystatechange.bind(this, resolve, reject);
    }

    private _setTimeoutListener(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        this._http.timeout = this.getAdapterObserver()?.getTimeout() || 3000;
        this._http.ontimeout = () => {
            !!this.getAdapterObserver()?.getTimeoutListener() 
                && (this.getAdapterObserver()?.getTimeoutListener().onExecute(this, resolve, reject));
        };
    }

    private _setErrorListener(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        this._http.onerror = (error) => {
            this._errorContent = error;
            !!this.getAdapterObserver()?.getErrorListener() 
                && (this.getAdapterObserver()?.getErrorListener().onExecute(this, resolve, reject));
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

        this._setResponseListener(resolve, reject);
    }

    private _setResponseListener(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        !!this.getAdapterObserver()?.getResponseListener() 
            && (this.getAdapterObserver()?.getResponseListener().onExecute(this, resolve, reject));
    }
}