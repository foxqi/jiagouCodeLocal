/*
* var
* 1. 可以重复声明
* 2. 不能定义常量  var PI=3.14
* 3. 不支持块级作用域  if(true){var a=10;}
*
* */
//Identifier 'a' has already been declared
//变量名a已经定义过了，不能重复声明
/*let a=10;
let a=20;

//不能定义常量
const PI=3.14;
//试图给一个常量赋值，这是错误
PI=3.15;*/

/*
if(true){
    let a=10;
}
//a is not defined
console.log(a);
*/

//以前js只有俩个作用域，一个全局，一个函数级

//虽然说常量是不能再引用别的对象了，但是他的值如果是一个引用类型的话，引用对象的属性还是可以改的
/*
const PI=3.14;

{
    const PI=3.15;
}*/
