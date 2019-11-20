/*
*promise为了解决 如下的嵌套异步回调
* */

/*$.ajax('url',success(){
    $.ajax('url2',success(){
        $.ajax('url3',success(){
            $.ajax('url4',success(){

            })
        })
    })
})*/

/*
* Promise是一个类。可以创建实例
* 代表承诺，什么时候会用到承诺，一般是异步任务，就是需要很长时间执行的事
* */
let p1=new Promise(function (resolve,reject) {
    //pending
    setTimeout(function () {
      let num=Math.random();//生成一个随机数
        if(num>.5){
            //如果这个promise成功了，会调用成功的回调 fulfilled
            resolve('大成功')
        }else{
            //如果这个promise失败了，会调用失败的回调 rejected
            reject('小失败')
        }
    },2000)
});

p1.then(function (value) {
    console.log('成功='+value);
},function (reason) {
    console.log('失败='+reason);
})







