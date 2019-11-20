
let name='qu',age=9;
// let desc=name+"今年"+age+"岁了";
//
// console.log(desc);

//！！！模板字符串:1.字符串里可以嵌套变量，2.模板字符串可以折行，换行
//！！！模板语言很多就是这样的原理

// let dec1=`${name}今年${age}岁了`;
/*let desc1="${name}今年${age}岁了";
// console.log(dec1);
function replace(desc1) {

   return desc1.replace(/\$\{([^}]+)\}/g,function (matched,key) {

     // console.log(matched,key)
     console.log(arguments);
      return eval(key);
  })
}
console.log(replace(desc1));*/

//！！！模板字符串
//！！！模板字符串可以折行，换行

/*let users=[{id:1,name:'ququ1'},{id:2,name:'ququ2'}];
/!*
* <ul>
* <li>1:ququ1</li>
* <li>2:ququ2</li>
* </ul>
* *!/
//！！！映射，把老数组里的每一个元素映射为新数组的每一个元素

let newLis=users.map(function (user,index) {
    return `<li>${user.id}:${user.name}</li>`;
}).join('');
let ul=(
  `
 <ul>
 <li>${newLis}</li>
 </ul>
  `
);
console.log(newLis);
console.log(ul);*/
//！！！其他运算符...rest  会把后面的所有参数全都放在一个数组里
//...rest其他运算符只能作为最后一个参数
//！！！因为有些时候我们希望有自己的拼接模板字符串的逻辑
function desc(strings,...rest) {
    console.log(strings);
    console.log(rest);
    let result='';
    for(let i=0;i<rest.length;i++){
        // console.log(strings[i],'777');
        // console.log(rest[i],'888');
        result+=(strings[i]+rest[i]);
        // console.log(result,'111')
    }
    // console.log(strings,'000')
    // console.log(strings[strings.length-1],'222')
    result += strings[strings.length-1];
    return result.toUpperCase();//可以实现返回的为大写（自己可自行添加）
}
//！！！带标签的模板字符串就像一个函数调用，参数
//！！！1参数是文本的数组
let str=desc`${name} 今年 ${age} 岁了`;

console.log(str);

//！！！startsWith是否什么什么来开头的
//！！！endsWith是否用什么什么来结束的


let str3='ququw';
console.log(str3.startsWith('q'))//true,


let address1="http://www.baidu.com";
let address2="ftp://www.baidu.com";
if(address1.startsWith('http')){
    console.log('http网址')
}else if(address2.startsWith('ftp')){
    console.log('ftp网址')
}

let filename='avatar.jpg';
if(filename.endsWith('jpg')||filename.endsWith('png')){
    console.log('是一张图片')
}


let content ='abc';
//！！！includes 判断一个字符串是否包含另一个字符串
console.log(content.includes('b'));
console.log(content.indexOf('b')!=-1);

//repeat 将字符串复制几份
let x='x111';
console.log(x.repeat(3));//x111x111x111


//字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
//第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
let str5='abc';
let str6='7';
console.log( "("+str5.padStart(5)+")");//(  abc)
console.log( "("+str5.padEnd(5)+")");//(abc  )
console.log( "("+str6.padStart(2,'0')+")");//(07)