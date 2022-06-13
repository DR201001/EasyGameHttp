import InterceptorQueue from "../interceptors/InterceptorQueue";
import LogInterceptor from "../interceptors/LogInterceptor";
import NetInterceptor from "../interceptors/NetInterceptor";
import IInterceptorsFactory from "../interface/IInterceptorsFactory";
import INetInterceptor from "../interface/INetInterceptor";

export default class InterceptorQueueFactory implements IInterceptorsFactory{
    build(): INetInterceptor {
        let _queue: InterceptorQueue<NetInterceptor> = new InterceptorQueue<NetInterceptor>();
        this.initInterceptorQueue(_queue);

        return _queue;
    }

    /**
     * 初始化拦截器队列
     * @param queue 
     */
    protected initInterceptorQueue(queue: InterceptorQueue<NetInterceptor>): void {
        // log拦截器
        queue.enqueue(new LogInterceptor());
    }
}