/*
* 解构  分解一个对象的结构
*
* */

//数组解构
/*
let arr=[1,2,3];
/!*let a=arr[0];
let b=arr[1];
let c=arr[2];*!/

//解构的时候，等号的两边结构类似。右边还必须是一个真实的值
let [a,b,c]=arr;

console.log(a,b,c);


let arr2=[{name:'qu',age:8},[1,2],3];
// let [{name,age},[d,e],f]=arr2;
// console.log(name,age,d,e,f)
let [json,arr3,f]=arr2;
console.log(json,arr3,f);
*/


//对象解构

/*let obj1={name:'qu',age:9};
let {name,age}=obj1;
let {name:myname,age:aa}=obj1;
/!*原理
let myname=obj1.name;
let aa=obj1.age;*!/
// console.log(name,age);
console.log(myname,aa);*/


//默认解构:如果能取出来值就用取出来的值，如果取不出来就用默认值
/*let obj2={name:'zfpx'};
let {name,age}=obj2;
console.log(name,age);*/


//省略赋值
let arr4=[1,2,3];
let [,,j]=arr4;
console.log(j)


