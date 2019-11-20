class PromiseCSDN{
    constructor(fn){
        this.data=undefined;//回调成功的data
        this.error=undefined;//回调失败的error
        this.status="pending";
        this.onResolvedCallbacks=[];
        this.onRejectedCallbacks=[];
        //下面在fn中传入resolve和reject方法时，需要进行this绑定，否则在resolve和reject方法中获取到的this为undefined
        fn(this.resolve.bind(this),this.reject.bind(this));
    }
    resolve(data){
        if(this.status=="pending"){
            //充值状态为fulfilled，并置this.data为获取的数据
            this.status="fulfilled";
            this.data=data;
            this.onResolvedCallbacks.forEach(fn=>{
                fn();
            })
        }
    }
    reject(error){
        //重置状态为rejected，并置this.error为错位信息
        if(this.status="pending"){
            this.status="rejected";
            this.error=error;
            this.onRejectedCallbacks.forEach(fn=>{
                fn();
            })
        }
    }
    then(onfulfilled,onrejected){
        onfulfilled=typeof onfulfilled ==="function"?onfulfilled:data=>data;
        onrejected=typeof onrejected ==="function"?onrejected:err=>{throw err};
        //执行then方法后，应返回一个promise，以便进行链式调用
        let promise2=new PromiseCSDN((resolve,reject)=>{
            //当状态为fulfilled时，执行成功的回调
            if(this.status==="fulfilled"){
                //使用setTimeout是为了防止，在里面使用promise2的时候，promise2还没有值
                setTimeout(()=>{
                    //使用try，catch是为了，如果onFullfilled或onRejected抛出异常e，那么会走向promise2的reject方法，并传入参数e
                    try{
                        let x=onfulfilled(this.data);//获取onfulfilled的返回值
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                },0)

            }
            //当状态为rejected时，执行成功的回调
            if(this.status=="rejected"){

                setTimeout(()=>{
                    try{
                        let x= onrejected(this.error);//获取onrejected的返回值
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                },0)
            }

            //当状态为pending时，那么将onfulfilled与onrejected方法进行存储，在执行resolve或者reject时进行执行
            if(this.status==='pending'){
                //这里push onfulfilled 与 onrejected方法时，不直接push，而是push一个函数，在函数中执行onfulfilled与onrejected是为了获取resolve或者reject函数中传递的data或者error
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x=  onfulfilled(this.data);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)

                });
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x=  onrejected(this.error);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)

                });
            }

        });
        return promise2;


    }
    catch(onrejected){
        this.then(undefined,onrejected);
    }

}
// all方法的效果实际上是「谁跑的慢，以谁为准执行回调」
PromiseCSDN.all=function(values){
    return new PromiseCSDN((resolve,reject)=>{
        if(!Array.isArray(values)){
            return reject(new TypeError('arguments must be an array'));
        }
        let arr=[];
        let index=0;
        function processData(key,value) {
            index++;
            arr[key]=value;
            if(index===values.length){
                resolve(arr)
            }
        }
        values.forEach((value,index)=>{
            if(value && value.then && typeof value.then ==='function'){
                value.then(y=>{
                    processData(index,y);
                },reject)
            }else{
                processData(index,value)
            }
        })


    })
}
//race「谁跑的快，以谁为准执行回调」
PromiseCSDN.race=function (values) {
  return new PromiseCSDN((resolve,reject)=>{
      if(!Array.isArray(values)){
          return reject(new TypeError('argument must be an array'));
      }
      values.forEach((value,index)=>{
          if(value && value.then && typeof value.then ==="function"){
              value.then(resolve,reject)
          }else{
              resolve(value);
          }
      })
  })
};
//Promise的解决过程
function resolvePromise(promise2,x,resolve,reject){
    //这里的判断是为了防止then中的返回值是promise本身，否则会造成死循环，因此当返回的是promise本身，那么抛出类型错误
    if(promise2 ===x){
        return reject(new TypeError("Chaining cycle detected for promise"))
    }
    let called;//用于判断是否被多次调用
    if((x !== null&&typeof x==="object")||typeof x==="function"){
        try{
            let then=x.then;//如果取 x.then的值是会抛出错误e，则以 e 为拒因拒绝 promise
            if(typeof then ==="function"){
                //如果 then 是函数，将x作为函数的作用域 this 调用；传递俩个回调函数作为参数，第一个参数叫做 resolvePromise,第二个参数叫做 rejectPromise
                then.call(x,y=>{
                    if(called) return;
                    called=true;
                    //继续对y的返回值进行判断
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(called) return;
                    called =true;
                    reject(r);
                })
            }else{
                //then的返回值是一个普通对象，将值传递给resolve
                resolve(x);
            }
        }catch (e) {
           if(called) return;
           called =true;
           reject(e);
        }
    }else{
        //如果then的返回值为普通值，那么将这个值传递给下一个then的resolve函数中
        resolve(x)
    }
}

PromiseCSDN.deferred=function(){
    let dfd={};
    dfd.promise=new PromiseCSDN((resolve,reject)=>{
        dfd.resolve=resolve;
        dfd.reject=reject;
    });
    return dfd;
};

module.exports=PromiseCSDN;















