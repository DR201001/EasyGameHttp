import XMLHttpReqAdapter from "../adapters/XMLHttpReqAdapter";
import IHttpAdapter from "../interface/IHttpAdapter";
import IHttpAdapterFactory from "../interface/IHttpAdapterFactory";
import IHttpAdapterListener from "../interface/IHttpAdapterListener";

export default class XMLHttpReqAdapterFactory implements IHttpAdapterFactory {
    public build(listener: IHttpAdapterListener): IHttpAdapter {
        let _abapter: XMLHttpReqAdapter =  new XMLHttpReqAdapter();
        _abapter.bindAdapterListener(listener);

        return _abapter;
    }
}