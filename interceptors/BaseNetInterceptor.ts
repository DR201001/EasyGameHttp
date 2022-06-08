import INetInterceptor from "../base/INetInterceptor";

export default class NetInterceptor implements INetInterceptor {
    onRequest(resolve: (value: unknown) => void, reject: (reason?: any) => void): void {
    }

    onResponse(resolve: (value: unknown) => void, reject: (reason?: any) => void): void {  
    }

    onError(resolve: (value: unknown) => void, reject: (reason?: any) => void): void {
    }
}