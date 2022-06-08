import { RequestType } from "../../config/HttpRequest";
import HttpRequest from "../../request/HttpRequest";

let request = new HttpRequest();

test('HttpRequest init test', () => {
    expect(request).not.toBe(undefined);
    expect(request.getRequestHeaders()).not.toBe(undefined);
    expect(request.getTimeoutCallback()).toBe(undefined);
    expect(request.getTimeout()).toBe(3000);
    expect(request.getUrl()).toBe(undefined);
    expect(request.getRequestType()).toBe("GET");
});

test('HttpRequest url test', () => {
    expect(request.getUrl()).toBe(undefined);
    expect(()=> request.setUrl("callback")).toThrowError("url is callback");
    expect(()=> request.setUrl(1)).toThrowError("url is 1");
    expect(()=> request.setUrl(null)).toThrow();
    expect(request.getUrl()).toBe(undefined);
    expect(()=> request.setUrl("")).toThrowError("url is");
    expect(()=> request.setUrl("https://wwww.baidu.com")).not.toThrow();
    expect(()=> request.setUrl("https://baidu.com")).not.toThrow();
    expect(()=> request.setUrl("http://baidu.com")).not.toThrow();
    expect(()=> request.setUrl("https://baidu.com")).not.toThrow();
});

test('HttpRequest setTimeout test', () => {
    expect(()=> request.setTimeout(null)).toThrowError("time is null");
    expect(()=> request.setTimeout(-1)).toThrowError("time is -1");
    expect(()=> request.setTimeout(0)).toThrowError("time is 0");
    expect(()=> request.setTimeout("haha")).toThrowError("time is haha, type is string");
    expect(request.getTimeout()).toBe(3000);
    request.setTimeout(4000);
    expect(request.getTimeout()).toBe(4000);
});

test('HttpRequest setTimeoutCallback test', () => {
    expect(request.getTimeoutCallback()).toBe(undefined);
    expect(()=> request.setTimeoutCallback("callback")).toThrowError("callback is callback");
    expect(()=> request.setTimeoutCallback(-1)).toThrowError("callback is -1");
    expect(()=> request.setTimeoutCallback(null)).not.toThrow();
    expect(request.getTimeoutCallback()).toBe(null);
    request.setTimeoutCallback(undefined);
    expect(request.getTimeoutCallback()).toBe(undefined);
    expect(()=> request.setTimeoutCallback(()=> {})).not.toThrow();
    expect(request.getTimeoutCallback()).not.toBe(null);
    expect(request.getTimeoutCallback()).not.toBe(undefined);
});