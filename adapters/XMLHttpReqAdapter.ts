import HttpAdapter from "../base/HttpAdapter";
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

export default class XMLHttpReqAdapter extends HttpAdapter {
    private _http: XMLHttpRequest = undefined;

    constructor() {
        super();

        this._http = new XMLHttpRequest();
    }

    public sendRequest(body: any): void {
        this._http.send(body);

        this._http.onload = this._http.onreadystatechange = this._onreadystatechange.bind(this);
    }

    protected setTimeoutAndCallback(timeout: number, callback?: Function): void {
        this._http.timeout = timeout;
        this._http.ontimeout = () => {
            !!callback && callback(this);
        }
    }

    protected setRequestHeader(name: string, value: string): void {
        this._http.setRequestHeader(name, value);
    }

    protected connectServer(url: string): void {
        this._http.open(this.getRequestType(), url);
    }

    private _onreadystatechange(xhr: XMLHttpRequest, ev: Event): void {
        console.debug(`XMLHttpReqAdapter current status is ${xhr.status}.`);
        if (xhr.status !== 4) {
            return;
        }


    }
}