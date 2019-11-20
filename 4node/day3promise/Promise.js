//https://promisesaplus.com/ 根据这个英文文档编写的代码

const PENDING='pending';//初始态
const FULFILLED='fulfilled';//成功态
const REJECTED='rejected';//失败态（拒绝的）
function Promise(executor) {
    let self=this;//先缓存当前promise实例
    self.status=PENDING;//设置状态
    //定义存放成功的回调的数组；
    self.onResolvedCallBacks=[];
    //定义存放失败的回调的数组；
    self.onRejectedCallBacks=[];
    //当调用此方法的时候，如果promise状态为pending，的话可以转成  成功态，如果已经是成功态或者失败态了，则什么都不做
    //2.1
    function resolve(value) {//2.1.1
        if(value instanceof  Promise){
           return value.then(resolve,reject)
        }
        //如果是初始态，则转成 成功态
        if(self.status==PENDING){
            self.status=FULFILLED;
            self.value=value;//成功后会得到一个值，这个值不能改
            //调用所有成功的回调
            self.onResolvedCallBacks.forEach(cb=>cb(self.value))
        }

    }
    function reject(reason) {//2.1.2
        //如果是初始态，则转成 失败态
        if(self.status==PENDING){
            self.status=REJECTED;
            self.value=reason;//把失败的原因给了value
            //调用所有失败的回调
            self.onRejectedCallBacks.forEach(cb=>cb(self.value))
        }

    }

    try{
        //因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误，对象reject
        executor(resolve,reject);
    }catch (e) {
        //如果这个函数执行失败了，则用失败的原因reject这个promise
        reject(e)
    }
}

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('循环引用'))
    }
    let called=false;//promise2是否已经resolve 或reject了
    if(x!=null&&((typeof  x=='object')||(typeof  x=='function'))){
        //当我们的promise和别的promise进行交互，编写这段代码的时候尽量的考虑兼容性，允许别人瞎写
         try{
             let then=x.then;
             if(typeof then =='function'){
                 //有些promise会同时执行成功和失败的回调
                 then.call(x,function (y) {
                     //如果promise2已经成功或失败了，则不会在处理了
                     if(called)return;
                     called=true;
                    resolvePromise(promise2,y,resolve,reject);
                 },function (err) {
                     if(called)return;
                     called=true;
                    reject(err);
                 });
             }else{
                 //到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
                 resolve(x);
             }
         }catch (e) {
             if(called)return;
             called=true;
             reject(e)
         }
    }else{
        //如果x是一个普通的值，则用x的值去 resolve promise2
        resolve(x);
    }
}

//onFulfilled 是用来接收promise成功的值或者失败的原因
Promise.prototype.then=function (onFulfilled,onRejected) {
    //如果成功和失败的回调没有传，则表示这个then没有任何逻辑，只会把值往后抛
    //2.2.2.1
    onFulfilled=typeof onFulfilled=='function'?onFulfilled:value=>value;
    onRejected=typeof onRejected=='function'?onRejected:reason=>{throw reason};
    //如果当前promise状态已经是成功态了,onFulfilled直接取值
    let self=this;
    let promise2;
    if(self.status==FULFILLED){
        return promise2=new Promise(function (resolve,reject) {
            setTimeout(function () {
                try{
                    let x = onFulfilled(self.value);
                    if(x instanceof Promise){
                        //如果获取到了返回值x，会走解析promise的过程
                        resolvePromise(promise2,x,resolve,reject)
                    }
                }catch(e){
                    //如果执行成功的回调过程中出错了，用错误原因把promise2 reject
                    reject(e);
                }
            });


        })

    }
    if(self.status==REJECTED){
        return promise2=new Promise(function (resolve,reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.value);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            });

        })
    }
    if(self.status==PENDING){
        return promise2=new Promise(function (resolve,reject) {
            self.onResolvedCallBacks.push(function () {
                setTimeout(function () {
                    try{
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                });

            });
            self.onRejectedCallBacks.push(function () {
                setTimeout(function () {
                    try{
                        let x = onRejected(self.value);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                });

            })

      });

    }
};

//catch原理就是只传失败的回调
Promise.prototype.catch=function(onRejected){
    this.then(null,onRejected)
};
Promise.deferred=Promise.defer=function(){
    let defer={};
    defer.promise=new Promise((function (resolve,reject) {
        defer.resolve=resolve;
        defer.reject=resolve;
    }));
    return defer;
}
module.exports=Promise;






