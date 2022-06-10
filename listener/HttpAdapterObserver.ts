import { NumberFormatException, OverflowException } from "../exception/Exception";
import IHttpAdapterListener from "../interface/IHttpAdapterListener";
import IHttpAdapterObserver from "../interface/IHttpAdapterObserver";

export default class HttpAdapterObserver implements IHttpAdapterObserver {
    private _timeout: number = 3000;

    private _timeoutListener: IHttpAdapterListener = undefined;

    private _errorListener: IHttpAdapterListener = undefined;

    private _responseListener: IHttpAdapterListener = undefined;

    public registerTimeoutListener(timeout: number, listener: IHttpAdapterListener): void {
        if (!timeout || typeof(timeout) !== "number")
            throw new NumberFormatException(`registerTimeoutListener timeout is ${timeout}.`);
        if (timeout <= 0)
            throw new OverflowException(`registerTimeoutListener timeout is ${timeout}.`);
            
        this._timeout = timeout;
        this._timeoutListener = listener;
    }

    public registerErrorListener(listener: IHttpAdapterListener): void {
        this._errorListener = listener;
    }

    public registerResponseListener(listener: IHttpAdapterListener): void {
        this._responseListener = listener;
    }

    public getTimeout(): number {
        return this._timeout;
    }

    public getTimeoutListener(): IHttpAdapterListener  {
        return this._timeoutListener;
    }

    public getErrorListener(): IHttpAdapterListener {
        return this._errorListener;
    }

    public getResponseListener(): IHttpAdapterListener {
        return this._responseListener;
    }
}