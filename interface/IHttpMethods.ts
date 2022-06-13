/**
 * http 方法
 */
export default interface IHttpMethods {
    /**
     * get
     * @param url 
     * @param body 
     */
    get(url: string, body: any): Promise<any>;

    /**
     * post
     * @param url 
     * @param body 
     */
    post(url: string, body: any): Promise<any>;

    /**
     * put
     * @param url 
     * @param body 
     */
    put(url: string, body: any): Promise<any>;

    /**
     * delete
     * @param url 
     * @param body 
     */
    delete(url: string, body: any): Promise<any>;
}