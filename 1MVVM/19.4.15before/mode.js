//发布订阅模式  订阅   在有发布[fn1,fn2,fn3]

//绑定的方法  都有一个update属性
function Dep() {
    this.subs=[];
}
Dep.prototype.addSub=function (sub) {//订阅
    this.subs.push(sub);
};
Dep.prototype.notify=function () {
    this.subs.forEach(sub=>sub.update());
};
function Watcher(fn) {
    this.fn=fn;

}
Watcher.prototype.update=function () {//Watch是一个类  通过这个类创建的都拥有update方法
    this.fn();
};
let watcher =new Watcher(function () {//监听函数
    console.log(1)
});
let dep=new Dep();
dep.addSub(watcher);//watcher放到了数组中[watcher.update]
dep.addSub(watcher);//watcher放到了数组中[watcher.update]
console.log(dep.subs);
dep.notify();//数组关系
//订阅是在一个数组中扔函数，发布是让这些函数依次执行

