/**
 * 网络拦截器接口
 */
export default interface INetInterceptor {
    onRequest(resolve: (value: unknown) => void, reject: (reason?: any) => void): void;
    onResponse(resolve: (value: unknown) => void, reject: (reason?: any) => void): void;
    onError(resolve: (value: unknown) => void, reject: (reason?: any) => void): void;
}