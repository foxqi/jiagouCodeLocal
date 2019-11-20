/*
* 函数
* */
//1 默认参数   1.必填项不填报错 2.有些参数没有给传参的话可以有默认值
/*function ajax(url,method,dataType) {
    console.log(url);
    console.log(method);
    console.log(dataType);
}*/
/*function ajax(url,method,dataType) {
  if(typeof  url =='undefined') throw Error ('url不能为空');
  method =method?method:'GET';
    dataType =dataType?dataType:'JSON';
}*/

// function ajax(url=new Error('url不能为空'),method='GET',dataType='JSON') {
//     console.log(url);
//     console.log(method);
//     console.log(dataType);
// }

/*
* function ajax() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error('url不能为空');
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'JSON';
  console.log(url);
  console.log(method);
  console.log(dataType);
}
* */
// ajax('/user','POST');


// function sum(prefix,...rest) {
    // rest=[1,2,3,6]
    //1.循环求合
   /* let result=0;
    //循环数组中的每个元素，把它们依次传入对应的函数
    rest.forEach(function (item) {
        result+=item;
    });
  */

   //reduce 计算 汇总 收敛  把一个数组中的一堆计算出来的一个值

    // return prefix+result;
// }
// console.log(sum('$',1,2,3,   6));

let arr4=[1,2,3,4];
//可以传一个参数，也可以传二个参数
//第二个参数表示初始值
//上一次的执行结果会成为下一次的初始值
//origin就是元素本身

//如果没有给初始值的话，第一次执行函数的时候，  val=第一个元素  item=第二个元素（还是相同的结果，只是少了一轮和初始值相加的运算）
//reduce从左往右算 reduceRight从右往左算
/*
* right
* 3 2
* 2 1
* 1 0
* reduce
* 1 0
* 2 1
* 3 2
* */
/*let result=arr4.reduce(function (val,item,index,origin) {

   return val+item;//返回值会成为下一次函数执行的时候的val
},0);

console.log(result);


//平均值
let result1=arr4.reduce(function (val,item,index,origin) {
    console.log(item,index);
    let sum= val+item;//返回值会成为下一次函数执行的时候的val
    if(index==origin.length-1){
        return sum/origin.length;
    }else{
        return sum;
    }
},0);
console.log(result1);*/

//reduce原理
/*
Array.prototype.reduce222=function (reducer,initialVal) {
    for(let i=0;i<this.length;i++){
        initialVal= reducer(initialVal,this[i]);
    }

    /!*
    * 从右往左算reduceRight原理
    * for(let i=this.length-1;i>=0;i--){
        initialVal= reducer(initialVal,this[i],i,this);
    }
    * *!/
    return initialVal;
};

let result=arr4.reduce222(function (val,item) {
    return val+item;
},0);
console.log(result);
*/


//展开运算符  相当于把数组中的每个元素依次取出放在这

/*let arr5=[1,2,3];
let arr6=[4,5,6];
// let arr7=[].concat(arr5,arr6);
let arr7=[...arr5,...arr6];
console.log(arr7);

// let max=Math.max(1,2,3);
// let max=Math.max.apply(null,arr6);
let max=Math.max(...arr6);
console.log(max);*/



let obj1={name:'1'};
let obj2={age:2};
/*
* 1.循环赋值
*
* */
let obj3={};
/*for(let key in obj1){
   obj3[key]=obj1[key];
}
for(let key in obj2){
    obj3[key]=obj2[key];
}*/

/*2. assign
*  参数一是target,后面都是来源对象
* */
// Object.assign(obj3,obj1,obj2);
/*
* 3.对象解构
* */
/*obj3={...obj1,...obj2};
console.log(obj3);*/

//深度拷贝
let obj5={name:"qu",home:{
    city:'beijing'
 },hobby:['学习','睡觉']};

// let obj6={};
 // obj6=Object.assign(obj6,obj5);
//这种深拷贝浪费内存空间，因为有俩个一样的内存
// let obj6=JSON.parse(JSON.stringify(obj5));

//这种深层拷贝值得用，但没写完，因为涉及到很多类型处理，先不讲
function clone(origin){
    let newObj={};
    for(let key in origin){
        if(typeof  origin[key] =='object'){
            newObj[key]=clone(origin[key])
        }else{
           newObj[key]=origin[key];
        }
    }
    return newObj
}
let obj6=clone(obj5);
obj6.home.city='guangzhou';
obj6.hobby.push('上网');
console.log(obj5);
console.log(obj6);
