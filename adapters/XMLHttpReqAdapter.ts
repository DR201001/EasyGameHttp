import HttpAdapter from "./HttpAdapter";

export default class XMLHttpReqAdapter extends HttpAdapter {
    private _http: XMLHttpRequest = undefined;

    constructor() {
        super();

        this._http = new XMLHttpRequest();
        this._http.timeout = 3000;
    }

    public abort(): void {
        this._http?.abort();
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
            this.setErrorContent(error);
            this.getAdapterListener()?.onError(this, reject);
        }
    }

    protected setRequestHeader(name: string, value: string): void {
        this._http?.setRequestHeader(name, value);
    }

    protected connectServer(url: string): void {
        this._http?.open(this.getRequestType(), url, true);
    }

    private _onreadystatechange(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        console.debug(`XMLHttpReqAdapter current readyState is ${this._http.readyState}.`);
        if (this._http.readyState !== 4) {
            return;
        }

        this.setResponseContent(this._http.responseText);
        this._responseListener(resolve, reject);
    }

    private _responseListener(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        this.getAdapterListener()?.onResponse(this, resolve, reject);
    }
}