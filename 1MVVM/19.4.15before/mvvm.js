function Zhufeng(options={}) {
  this.$options=options;//将所有属性挂在在了$options;
    //this._data
    var data=this._data=this.$options.data;
    observe(data);
    //this 代理了 this._data
    for(let key in data){
        Object.defineProperty(this,key,{
            enumerable:true,
            get(){
                return this._data[key];//this.a={a:1}
            },
            set(newVal){
                this._data[key]=newVal;
            }
        })
    }
    new Compile(options.el,this);
}

function Compile(el,vm) {
    //el表示替换的范围
    vm.$el = document.querySelector(el);
    let fragment=document.createDocumentFragment();
    while(child = vm.$el.firstChild){//将app中的内容移入到内存中
        fragment.appendChild(child);
    }
    replace(fragment);
    function replace(fragment){
        Array.from(fragment.childNodes).forEach(function (node) {//循环每一层
            let text=node.textContent ;
            let reg=/\{\{(.*)\}\}/;
            if(node.nodeType===3 && reg.test(text)){
                //console.log(RegExp.$1)// a.a   vm.b
                let arr=RegExp.$1.split('.');//[a,a]
                let val=vm;
                arr.forEach(function (k) {//取this  a.a  this.b
                    val=val[k];
                });
                new Watcher(vm,RegExp.$1,function (newVal) {//函数需要接收一个新的值
                    node.textContent = text.replace(reg,newVal)
                });
                //这里是  替换的逻辑
                node.textContent = text.replace(reg,val)
            }
            if(node.childNodes){
                replace(node);
            }
        });
    }
    vm.$el.appendChild(fragment);
}
//vm.$options
//观察对象给对象增加ObjectDefineProperty
function Observe(data) {//这里写我们的主要逻辑
    let dep=new Dep();
    for(let key in data){//把data属性通过object.defineProperty的方式 定义属性
        let val=data[key];
        observe(val);
        Object.defineProperty(data,key,{
            enumerable:true,
            get(){
                Dep.target&&dep.addSub(Dep.target);//[watcher]
                return val;
            },
            set(newVal){//更改值得时候
                if(newVal===val){//设置的值和以前的是一样的东西
                    return;
                }
                val=newVal;//如果以后再获取值得时候，将刚才设置的值在丢回去
                observe(newVal);
                dep.notify();//让所有的watch的update方法执行即可
            }
        })
    }

}

function observe(data) {
    if(typeof data!=='object')  return;
    return new Observe(data)
}

//vue特点不能新增不存在的属性， 不能存在的属性没有get和set
//深度响应： 因为每次赋予一个新对象时，会给这个新对象增加数据劫持




//订阅发布
function Dep() {
    this.subs=[];
}
Dep.prototype.addSub=function (sub) {//订阅
    this.subs.push(sub);
};
Dep.prototype.notify=function () {
    this.subs.forEach(sub=>sub.update());
};

function Watcher(vm,exp,fn) {
    this.fn=fn;
    this.vm=vm;
    this.exp=exp;//添加到订阅中
    Dep.target=this;
    let val=vm;
    let arr=exp.split('.');
    arr.forEach(function (k) {//this.a.a
        val = val[k];
    });
    Dep.target =null;

}
Watcher.prototype.update=function () {
    let val=this.vm;
    let arr=this.exp.split('.');
    arr.forEach(function (k) {//this.a.a
        val = val[k];
    });
    this.fn(val);//newVal
};



