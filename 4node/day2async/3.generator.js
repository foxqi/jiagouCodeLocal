/*
* 生成器是一个函数，可以用来生成迭代器
* 生成器函数和普通函数不一样，普通函数是一旦调用一定会执行完
* 但是生成器函数中间可以暂停，可以执行一会歇一会
* */
//生成器函数有一个特点，需要加*号（不能没有空格）
//生成器有若干个阶段，如何划分这些阶段呢？
function *go(a) {
    console.log(1);
    //此处的b用来供往外界输入进来的
    //这一行代码实现输入和输出，本次的输出放在yield后面，下次的输入房子yield前面
    let b= yield a;
    console.log(2);
    let c= yield b;
    console.log(3);
    return c;
}
//生成器函数和普通的函数不一样，调用他的话函数体并不会立刻执行，
// 它会返回此生成器的迭代器，迭代器是一个对象，每调用一次next就可以返回一个值对象
let it=go("azhi");
//next第一次执行不需要参数，传参数是没有意义的
let r1=it.next();
//第一次调用next会返回一个对象，此对象有俩个属性，一个是value就是yiele后面的那个值，一个是done表示是否迭代完成
console.log(r1);//{ value: 'a', done: false }
let r2=it.next('B值');//{ value: 'B值', done: false }
console.log(r2);

/*没传参
let r3=it.next();
console.log(r3);//{ value: undefined, done: true }*/

let r3=it.next('c值');
console.log(r3);//{ value: 'c值', done: true }

//return 和yield是一样有值的



