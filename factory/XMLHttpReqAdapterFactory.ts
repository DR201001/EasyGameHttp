import XMLHttpReqAdapter from "../adapters/XMLHttpReqAdapter";
import IHttpAdapter from "../interface/IHttpAdapter";
import IHttpAdapterFactory from "../interface/IHttpAdapterFactory";

export default class XMLHttpReqAdapterFactory implements IHttpAdapterFactory {
    public build(): IHttpAdapter {
        return new XMLHttpReqAdapter();
    }
}