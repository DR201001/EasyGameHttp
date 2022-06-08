/**
 * http 方法
 */
export default interface IHttpMethods {
    get(url: string, body: any): Promise<void>;
    post(url: string, body: any): Promise<void>;
    put(url: string, body: any): Promise<void>;
    delete(url: string, body: any): Promise<void>;
}