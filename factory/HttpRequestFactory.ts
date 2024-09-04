import IHttpRequestFactory from "../interface/IHttpRequestFactory";
import HttpRequest from "../request/HttpRequest";

export default class HttpRequestFactory implements IHttpRequestFactory {
    public build(url?: any, body?: any, type?: any): HttpRequest {
        const _request: HttpRequest = this._createRequest();

        _request.setUrl(url);
        _request.setRequestType(type);
        _request.setRequestData(body);

        return _request;
    }

    private _createRequest(): HttpRequest {
        const _request: HttpRequest = new HttpRequest();
        this.initRequestTimeout(_request);

        return _request;
    }

    protected initRequestTimeout(request: HttpRequest): void {
        request?.setTimeout(3000);
    }
}