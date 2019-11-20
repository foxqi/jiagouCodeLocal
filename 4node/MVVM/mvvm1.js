//1.1写一个类
function Foxqi(options={}) {//传值为空
    this.$options = options;//将所有属性挂载上了$options，与vm.$options写法相同
    //this._data 在实例上再挂一个属性
    var data = this._data=this.$options.data;
//1.4:将值传入方法中，运行
    observe(data);

//1.7部分：将this代理this.data。意思是不用在用foxqi_data.a而是用foxqi.a获取值
//this代理了this._data
    for(let key in data){//这里的data和this._data的值是一样的，只是这样写好区分不同的作用
        Object.defineProperty(this,key,{
            enumerable:true,
            get(){
                return this._data[key];//相当于this.a={a:1}
            },
            set(newVal){
                this._data[key]=newVal;
            }
        })
    }

//3.1.1计算属性
    initComputed.call(this);

    //2.1.3:调用方法
    new Compile(options.el,this);//options.el元素，this当前实例

}

//3.1.2计算属性
function initComputed() {//具有缓存功能
    let vm=this;
    let computed=this.$options.computed;//使用Object.keys  {name:1,age:2} =>[name,age]
    Object.keys(computed).forEach(function (key) {
        Object.defineProperty(vm,key,{//computed[key]
            //判断值是函数，如果是直接放回去，如果不是就调用get方法
            get:typeof computed[key]==='function'?computed[key]:computed[key].get,
            //因为计算属性并不能更改数据，所以不用管
            set(){

            }
        })
    })

}

//观察对象给对象增加ObjectDefineProperty
//1.3：这里写我们的主要逻辑
function Observe(data) {
//2.2.3 创建一个Dep实例
    let dep=new Dep();

    for(let key in data){//把data属性通过object。defineProperty的方式定义属性
        let val=data[key];

        //1.5传入的数据如果是{a:{a:1}}，要在子{a:1}也要加入get和set方法
        observe(val);

        Object.defineProperty(data,key,{
            enumerable:true,//可枚举，就可以使用for in循环
            get(){//没有更改值的时候

//2.2.4 将要执行的函数放入数组中，等待执行
                Dep.target && dep.addSub(Dep.target);//因为把this（实例）赋值给了Dep.target，要判断它是否存在，将this（实例）放在数组里。  也就是[watcher]


                return val;
            },
            set(newVal){//更改值的时候
                if(newVal===val){//设值的值和以前是一样的东西，不做处理
                    return;
                }
                val = newVal;//如果以后在获取值的时候，将刚才设置的值在丢回去，这样如果在取的val的话就是刚才的设置的新值

//1.6修改过后的值也需要有get和set方法
                observe(newVal);

//2.2.5 让所有的watch的update方法执行即可
                dep.notify();

            }
        })
    }

}

//2.1.2：数据替换
function Compile(el,vm) {
    //el表示替换的范围,先创建一个文档碎片，把每一下移动到文档碎片里
    vm.$el=document.querySelector(el);//获取元素
    let fragment=document.createDocumentFragment();//创建文档碎片
    while (child = vm.$el.firstChild){//将app中的内容 移入到内存中

        fragment.appendChild(child)//将获取到的元素插入到文档碎片中,fragment里的东西会越来越多，而vm.$el会越来越少

    }

    replace(fragment);

    function replace(fragment){
        Array.from(fragment.childNodes).forEach(function (node) {//类数组转换成数组后，循环每一层
            let text = node.textContent;//拿到节点内容
            let reg=/\{\{(.*)\}\}/;
            if(node.nodeType === 3 && reg.test(text)){//判断是不是文本节点并且里面有{{}}
                // console.log(RegExp.$1);// 会得到a.a和b。b通过vm.b即可拿到，但是a.a要通过vm.a.a才能拿到比较麻烦，就通过下面方法取到
                let arr=RegExp.$1.split('.');//变成[a.a]
                let val=vm;
                arr.forEach(function (k) {//取到this.a.a和this.b
                    val=val[k];
                });

//2.2.2 这里是 数据更改替换的逻辑重点
                new Watcher(vm,RegExp.$1,function (newVal) {//函数里需要接收一个新的值
                    node.textContent=text.replace(reg,newVal);//数据替换
                });


                node.textContent=text.replace(reg,val);//数据替换
            }

//2.3.1  实现双向数据绑定
            if(node.nodeType === 1){//判断是不是元素节点
                let nodeAttrs=node.attributes;//获取当前dom节点的属性
                Array.from(nodeAttrs).forEach(function (attr) {
                    let name=attr.name;//type="text"
                    let exp=attr.value;//v-model="b"
                    if(name.indexOf('v-')==0){//判断是否v-开头
                        node.value=vm[exp];
                    }
                    new Watcher(vm,exp,function (newVal) {
                        node.value=newVal;//当watcher触发时，会自动将内容放到输入框内
                    });
//监听input是否发生改变，如果改变同时更改相同数据
                    node.addEventListener('input',function (e) {
                        let newVal=e.target.value;
                        vm[exp] = newVal;

                    })
                })
            }

            if(node.childNodes){//如果每一项节点里面还有子节点的话，再次执行replace()
                replace(node);
            }

        });
    }

    vm.$el.appendChild(fragment)//将文档碎片插入到元素中
}

//1.2此方法是为了方便有多个{a:{a:1}}多层对象的时候，方便调用
function observe(data) {

    //2.1.1:防止当值不是对象的时候，不进行1.5步骤，阻止程序执行避免报错
    if(typeof data!=='object') return;

    return new Observe(data);
}


//2.2.1：发布订阅：实现更改数据后的实时更改
function Dep() {
    this.subs = [];
}
Dep.prototype.addSub=function (sub) {//将方法存在一个数组里
    this.subs.push(sub);
};

Dep.prototype.notify=function () {
    this.subs.forEach(sub=>sub.update());//执行方法
};


function Watcher(vm,exp,fn) {
    this.fn=fn;
    this.vm=vm;
    this.exp=exp;
    Dep.target =this;
    let val=vm;
    let arr =exp.split('.');
    arr.forEach(function (k) {//取到this.a.a，会走到1.3的get方法
        val=val[k];
    });
    Dep.target=null;//置空是为了以后再修改新值的时候出现的this，不为原来的this；

}
Watcher.prototype.update=function () {
    let val=this.vm;
    let arr =this.exp.split('.');
    arr.forEach(function (k) {//取到this.a.a，会走到1.3的get方法
        val=val[k];
    });
    this.fn(val);//会走到3.1，拿到新值，再次替换{{}}，更改值
};