//AMD实现原理
//define 声明模块  通过require使用一个模块
let factories={};
//模块的名字， 依赖，工厂函数
function define(moduleName,dependencies,factory){
    factory.dependencies=dependencies;//将依赖记录到factory上
    factories[moduleName]=factory;
}
function require(mods,callback){
  let result=  mods.map(function (mod) {//name或age
        let factory=factories[mod];
        let exports;
        let dependencies=factory.dependencies;//['name']
      console.log(dependencies)
        //如果里面是require(['name','age'],function(name,age){})，那么变成数组，因为不知道会传几个,function里一定是一个形参，但是是一个已经返回出来的形参，也就是珠峰1和e
        require(dependencies,function () {
            console.log(arguments)
          exports=factory.apply(null,arguments)
        });
        // exports=factory();
        return exports;

    });
    callback.apply(null,result);
}
define('name',[],function () {
    return '珠峰1';
});
define('e',[],function () {
    return 'e';
});
/*简单一
define('age',[],function () {
    return 9;
});
require(['name','age'],function (name,age) {
    console.log(name,age)
});*/

define('age',['name','e'],function (name,e) {
    return name+e+9;
});
require(['age'],function (age) {
    console.log(age)
});






