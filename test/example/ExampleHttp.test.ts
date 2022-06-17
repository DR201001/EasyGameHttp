import ExampleHttp from "../../example/ExampleHttp";
import IHttpMethods from "../../interface/IHttpMethods";

let ehttp: IHttpMethods = new ExampleHttp();


test('ExampleHttp get test', async () => {
    await ehttp.get("https://www.baidu.com");
    // await ehttp.get("https://forum.cocos.org/uploads/default/original/3X/7/a/7ac704385ca592fd41be29b0dff29dd20884c58d.png");
});