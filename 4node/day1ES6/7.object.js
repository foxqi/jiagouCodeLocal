let name='ququ';
let age=9;
// let obj={name:name,age:age};
//如果对象的属性名和变量名如果一样的话，可以二合一
let obj={name,age};
console.log(obj);

/*let obj1={age:1,getFood(){}};
let obj2={age:2};
let obj3={};

//Object.setPrototypeOf(obj3,obj1);
//原理  设置obj3的原型为obj1
// obj3.__proto__=obj1;
//或者
// let obj3={
//     __proto__:obj1
// }
 console.log(obj3.age);*/


let obj1={age:1,getFood(){
    return '面包';
    }};
let obj2={age:2};
let obj3={
    __proto__:obj1,
    getFood(){
        //通过super可以调用父亲的方法
        return '牛奶'+super.getFood();
    }
};

//Object.setPrototypeOf(obj3,obj1);
//原理  设置obj3的原型为obj1
// obj3.__proto__=obj1;
//或者

 console.log(obj3.age);
 console.log(obj3.getFood());




