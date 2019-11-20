let Promise=require('./11-2.Promise自写函数');

let p1=new Promise(function (resolve,reject) {
    resolve(1000)
    //pending
    // throw Error('出异常了')
   /* setTimeout(function () {
        let num=Math.random();//生成一个随机数
        if(num>.5){
            //如果这个promise成功了，会调用成功的回调 fulfilled
            resolve('大成功')
        }else{
            //如果这个promise失败了，会调用失败的回调 rejected
            reject('小失败')
        }
    },2000)*/
});

p1.then(function (value) {
    console.log('成功1=',value);
},function (reason) {
    console.log('失败1=',reason);
});
p1.then(function (value) {
    console.log('成功2=',value);
},function (reason) {
    console.log('失败2=',reason);
});


















