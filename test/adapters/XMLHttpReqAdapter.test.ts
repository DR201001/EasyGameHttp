import XMLHttpReqAdapter from "../../adapters/XMLHttpReqAdapter";
import HttpRequest from "../../request/HttpRequest";

let adapter = new XMLHttpReqAdapter();
let req_1 = new HttpRequest();

test('XMLHttpReqAdapter init test', () => {
    expect(adapter).not.toBe(undefined);
});

test('XMLHttpReqAdapter setRequest test', () => {
    expect(adapter.getRequest()).toBe(undefined);
    adapter.setRequest(null);
    expect(adapter.getRequest()).toBe(undefined);
    adapter.setRequest("Just Test");
    expect(adapter.getRequest()).toBe(undefined);
    adapter.setRequest(adapter);
    expect(adapter.getRequest()).toBe(undefined);
    adapter.setRequest(req_1);
    expect(adapter.getRequest()).toBe(req_1);
});

test('XMLHttpReqAdapter setRequest test', () => {
    
});

// test('XMLHttpReqAdapter setTimeout test', () => {
//     expect(()=> adapter.setTimeout(null)).toThrowError("time is null");
//     expect(()=> adapter.setTimeout(-1)).toThrowError("time is -1");
//     expect(()=> adapter.setTimeout(0)).toThrowError("time is 0");
//     expect(()=> adapter.setTimeout("haha")).toThrowError("time is haha, type is string");
//     expect(adapter._http.timeout).toBe(undefined);
//     adapter.setTimeout(3000);
//     expect(adapter._http.timeout).toBe(3000);
// });

// test('XMLHttpReqAdapter bindTimeoutListener test', () => {
//     expect(adapter._timeoutListener).toBe(undefined);
//     expect(()=> adapter.bindTimeoutListener("callback")).toThrowError("listener is callback");
//     expect(()=> adapter.bindTimeoutListener(-1)).toThrowError("listener is -1");
//     expect(()=> adapter.bindTimeoutListener(null)).not.toThrow();
//     expect(adapter._timeoutListener).toBe(null);
//     adapter.bindTimeoutListener(undefined);
//     expect(adapter._timeoutListener).toBe(undefined);
//     expect(()=> adapter.bindTimeoutListener(()=> {})).not.toThrow();
//     expect(adapter._timeoutListener).not.toBe(null);
//     expect(adapter._timeoutListener).not.toBe(undefined);
// });

// test('XMLHttpReqAdapter url test', () => {
//     expect(adapter._url).toBe(undefined);
//     expect(()=> adapter.url("callback")).toThrowError("url is callback");
//     expect(()=> adapter.url(1)).toThrowError("url is 1");
//     expect(()=> adapter.url(null)).toThrow();
//     expect(adapter._url).toBe(undefined);
//     expect(()=> adapter.url("")).toThrowError("url is");
//     expect(()=> adapter.url("https://wwww.baidu.com")).not.toThrow();
//     expect(()=> adapter.url("https://baidu.com")).not.toThrow();
//     expect(()=> adapter.url("http://baidu.com")).not.toThrow();
//     expect(()=> adapter.url("https://baidu.com")).not.toThrow();
// });