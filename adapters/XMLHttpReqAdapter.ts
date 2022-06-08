import HttpRequest from "../request/HttpRequest";
import HttpAdapter from "./HttpAdapter";
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export default class XMLHttpReqAdapter extends HttpAdapter {
    private _http: XMLHttpRequest = undefined;

    constructor() {
        super();

        this._http = new XMLHttpRequest();
    }

    public abort(): void {
        this._http?.abort();
    }

    public sendRequest(resolve: (value: unknown) => any, reject: (reason?: any) => any): void {
        this._http?.send(this.getRequestData());

        this._http.onload = this._http.onreadystatechange = this._onreadystatechange.bind(this, resolve, reject);
    }

    protected setRequestHeader(name: string, value: string): void {
        this._http?.setRequestHeader(name, value);
    }

    protected connectServer(url: string): void {
        this._http?.open(this.getRequestType(), url);
    }

    private _onreadystatechange(resolve: (value: unknown) => any, reject: (reason?: any) => any, xhr: XMLHttpRequest, ev: Event): void {
        console.debug(`XMLHttpReqAdapter current status is ${xhr.status}.`);
        if (xhr.status !== 4) {
            return;
        }
    }
}