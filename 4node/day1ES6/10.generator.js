/*
* 生成器函数和普通函数长的不一样,返回迭代器
* 执行的时候也不一样
* 生成器函数其实是内部生产了很多小函数
* */

function *read(books) {
    console.log('开始');
   for(let i=0;i<books.length;i++){
      yield books[i]; //yield 放弃，屈服，产出
   }
   console.log('结束');
}

let it =read(['js','node']);
/*这种一次一次调用太忙，写成如下循环
let r1=it.next();
console.log(r1); //{value:'js':done:false}
let r2=it.next();
console.log(r2); //{value:'node':done:false}
let r3=it.next();
console.log(r3); //{value:undefined:done:true}*/
let result;
do{
    result=it.next();
    console.log(result);
}while(!result.done);
