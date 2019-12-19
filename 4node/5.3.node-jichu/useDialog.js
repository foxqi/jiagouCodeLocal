//调用写好的方法
//如果自己写的文件要通过./的方式，文件模块,如果是js，node，json后缀可以省略，他会自动添加.js  .json  .node依次匹配
//如果异步方法一般会有回调函数
let Dialog=require('./dialog-es5');
console.log(Dialog);
let dialog=new Dialog.Dialog;
dialog.show();














