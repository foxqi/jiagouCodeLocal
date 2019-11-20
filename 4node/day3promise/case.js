let MyPromise=require('./Promise');
let p1=new MyPromise(function (resolve,reject) {
    setTimeout(function () {
        let num=Math.random();
        if(num<.5){
            resolve(num);
        }else{
            reject('失败')
        }
    })
});
//这个叫值的穿透

/*p1.then(function (data) {
    console.log(data)
},function (reason) {
    console.log(reason);
}).then(function (data) {
    console.log(data)
},function (reason) {
    console.log(reason);
})*/

p1.then(function (data) {
    console.log(data)
},function (reason) {
    console.log(reason);
});



















