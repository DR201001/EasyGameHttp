import { OverflowException } from "../exception/Exception";

/**
 * GET 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据。  
 * POST 方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用。  
 * PUT 方法用请求有效载荷替换目标资源的所有当前表示。  
 * DELETE 方法删除指定的资源。  
 * CONNECT 方法建立一个到由目标资源标识的服务器的隧道。  
 * OPTIONS 方法用于描述目标资源的通信选项。  
 * TRACE 方法沿着到目标资源的路径执行一个消息环回测试。  
 * PATCH 方法用于对资源应用部分修改。  
 */
export enum RequestType {
    GET = 0,
    HEAD,
    POST,
    PUT,
    DELETE,
    CONNECT,
    OPTIONS,
    TRACE,
    PATCH,
}

export class RequestStringType {
    private static _typeList: string[] = ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];

    public static coverTo(type: RequestType): string {
        if (!!RequestStringType._typeList[type])
            return RequestStringType._typeList[type];

        throw new OverflowException(`RequestStringType coverTo undefined type: ${type}.`);
    }
}