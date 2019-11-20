//process  进程 设置环境变量
// NODE_ENV这是自己起的，在命令行里可以配置NODE_ENV，mac 通过export来导出，windows用set
//打开命令行 set NODE_ENV=dev(等号俩边不能空格)，node 文件名就有了dev了

//在webstorm中设置环境变量，点击左上角的文件名，找到Edit confinurations  ->Environment variables(环境变量)  -> 点后面的三个点  -> 点加号  -> name填你起的名字，比如NODE_ENV ；value填在dev  ->  ok。在webstorm就可以打印成功了。
// 如果代码放到服务器上，那就没有此环境变量，取不到可以走上线环境
console.log(process.env.NODE_ENV);

let url ='';
// if(开发){
//     url='http://localhost:3000';
// }else{
//     url='http://www.zhufengpeixun.cn'
// }

if(process.env.NODE_ENV=='dev'){//本地
    url='http://localhost:3000';
}else{
    url='http://www.zhufengpeixun.cn'
}
console.log(url);


//异步的，在当前队列的底部
process.nextTick(function () {
    console.log('nextTick')
});

//第二个队列中的
setImmediate(function () {
    console.log('setImmediate')
});

//形参（剩余运算符），将剩余的内容放到一个数组中，arg中['11']
//拓展运算符   展开运算符 [...[1,2,3],...[4,5,6]]=[1,2,3,4,5,6]  es6语法
setTimeout((...arg) =>{//如果不用箭头函数，this指向的是timeout自己；箭头函数中没有this指向，没有arguments
    // console.log('setTimeout')
    // console.log(this)//{}
    console.log(arg.length)//{}
},100,'11');
//nextTick最快，当setTimeout为0秒时，与setImmediate不一定谁快；但是如果设置其他时间，则setImmediate快
