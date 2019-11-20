/*
* 生成器（Generator） 与 迭代器（Iterator）
* 它是理解koa的基础，另外也是现在异步解决方案async await的基础
* */

//自写
/**
 *read生成器， 用来生成迭代器的
 */
function read(books) {
    let index=0;
    return {
       next(){
           //只要能取到就为
           let done= index == books.length;
           let value= done?undefined:books[index++];
           return{
               value,
               done
           }
       }
    }
}
//迭代器 可以不停地调用next方法得到一个结果{value,done}
//当done为true的时候就表示取完了
let it=read(['js','node','mysql']);
//it有一个方法叫next，每次调用next都会返回一个结果{value,done}

/*这种一次一次调用太忙，写成如下循环*/
/*let r1=it.next();
console.log(r1);
let r2=it.next();
console.log(r2);*/

let result;
do{
    result=it.next();
  console.log(result);
}while(!result.done);


















