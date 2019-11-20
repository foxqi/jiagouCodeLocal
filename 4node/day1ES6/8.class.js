
//定义一个类
/*
* 以前JS里类和构造函数是一体的
* 类里可以定义构造函数,当你创建一个类的实例的时候就会调用构造函数
* */
class Parent{
    constructor(name){
       this.name=name;//实例的私有属性
    }
    //静态属性是类的属性
    static hello(){
        console.log('hello');
    }
    //属于实例的公有属性，也就是相当于原型上的属性
    getName(){
        console.log(this.name);
    }
}

//类的继承，子类继承父类
class Child extends Parent{
    constructor(name,age){
        //super指的是父类的构造函数
        super(name);
        this.age=age;
    }
    getAge(){
        console.log(this.age);
    }
}
//如果执行Parent('ququ');这会报错
// Class constructor Parent cannot be invoked without 'new'
//类的构造函数Parent 不能在不通过new的情况下调用

// let p=new Parent('ququ');
// p.getName();



//create原理
Object.create=function (prototype) {
    //先创建一个 空的函数
    function Fn() {};
    Fn.prototype=prototype;
    //返回这个函数的实例
    return new Fn();

}

//类  和类的实例
//一个属性如果放在原型上的话，是可能通过实例来调用的
//但是放在类上的，不能通过实例来调用，只能通过类名来调用











