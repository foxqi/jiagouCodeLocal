//手写简版Promise

//构造函数的参数是一个异步任务
function  Promise(task) {
  let that=this;//缓存this
    //默认状态为pending
  that.status='pending';
  //此变量里放着此promise的结果
  that.value=undefined;
  //存放的着所有成功的回调函数
  that.onResolvedCallBacks=[];

  //存放的着所有失败的回调函数
  that.onRejectedCallBacks=[];

    //调用此方法可以把Promise变成功态
    //resolve的时候把值传进来
  function resolve(value) {
      if(that.status=='pending'){
          that.status='fulfilled';
          that.value=value;
          that.onResolvedCallBacks.forEach(item=>item(that.value));
      }
  }
    //调用此方法可以把当前的Promise变成失败态
  function reject(reason) {
      //如果当前状态是初始态，则转成失败态
    if(that.status=='pending'){
        that.status='rejected';
        that.value=reason;
        that.onResolvedCallBacks.forEach(item=>item(that.value));
    }
  }
  //立即执行传入的任务
    try{
        task(resolve,reject)
    }catch(e){
      reject(e);
    }
//onFulfilled成功的回调，onReject调用失败的回调
    Promise.prototype.then=function (onFulfilled,onReject) {
        let that=this;
        if(that.status=='fulfilled'){
            onFulfilled(that.value);
        }
        if(that.status=='reject'){
            onReject(that.value);
        }
        if(that.status=='pending'){
            that.onResolvedCallBacks.push(onFulfilled);
            that.onRejectedCallBacks.push(onReject);
        }

    }
}
module.exports=Promise;
















