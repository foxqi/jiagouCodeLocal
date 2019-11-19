
let fs=require('fs');
//common.js实现原理
function req(moduleName) {
    //content代表的文件内容
    let content=fs.readFileSync(moduleName,'utf8');
    //最后一个参数是函数的内容体
    //__dirname当前文件夹的路径
    //__filename当前文件的路径
    //  \n为换行导出内容体
    let fn=new Function('exports','module','require','__dirname','__filename',content+'\n return module.exports');
    let module={
        export:{}
    };
    //content+'\n return module.exports'
    // 相当于fn执行了一个匿名函数，返回了一个module.exports
    return fn(module.export,module,req,__dirname,__filename)
}

let str=req('./a.js');
// let str=require('./a.js');
console.log(str);
/*fn相当于写了一个函数
* funtion('exports','module','require','__dirname','__filename'){
*    module.exports='欢迎参加珠峰架构公开课'
*    return module.exports
*
* };
* */


