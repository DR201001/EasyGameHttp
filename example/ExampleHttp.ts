import EasyHttp from "../EasyHttp";
import LogInterceptor from "./LogInterceptor";
import IHttpAdapter from "../interface/IHttpAdapter";

export default class ExampleHttp extends EasyHttp {
    public constructor() {
        super();

        // 添加log拦截器
        this.addInterceptor(new LogInterceptor());
    }

    public onTimeout(adapter: IHttpAdapter, reject: (reason?: any) => any): void { }

    protected error(content: any, reject: (reason?: any) => any): void { }

    protected response(content: any): void { }
}

// new ExampleHttp().post("http://qqazx-z.mmmrz.com/config");