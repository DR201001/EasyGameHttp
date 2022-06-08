/**
 * http request type
 */
export enum RequestType {
    GET = 0,
    POST,
    PUT,
    DELETE,
}

export class RequestStringType {
    public static coverTo(type: RequestType): string {
        switch (type) {
            case RequestType.GET:
                return "GET";
            case RequestType.POST:
                return "POST";
            case RequestType.PUT:
                return "PUT";
            case RequestType.DELETE:
                return "DELETE";
            default:
                return null;
        }
    }
}