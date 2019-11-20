let MyPromise=require('./PromiseCSDN');

let p=new MyPromise(function (resolve,reject) {
    resolve("成功的回调");
    reject('失败的回调');
});
p.then().then().then(data => {
    console.log('success-'+data)
},err=>{
    console.log("error-"+err);
});


function runAsync1() {
    return new MyPromise(function (resolve,reject) {
        setTimeout(function () {
            resolve('随便什么数据1')
        },0)
    })
}
function runAsync2() {
    return new MyPromise(function (resolve,reject) {
        setTimeout(function () {
            resolve('随便什么数据2')
        },0)
    })
}
function runAsync3() {
    return new MyPromise(function (resolve,reject) {
        setTimeout(function () {
            resolve('随便什么数据3')
        },0)
    })
}
MyPromise
    // .all([runAsync1(),runAsync2(),runAsync3()])
    .race([runAsync1(),runAsync2(),runAsync3()])
    .then(results=>{
     console.log(results)
    },err=>{
        console.log("err--"+err)
    });



