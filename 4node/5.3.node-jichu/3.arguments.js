console.log(arguments);

//exports require module __filename,__dirname
//模块化  低耦合 高内聚，方便维护，防止代码冲突（命名冲突）
// （闭包）  单例（不能保证一定不冲突，导致调用过长）
//CMD seajs 就近依赖 AMD 依赖前置 requirejs(浏览器端的模块化)


//node基于规范commonjs，文件的读写，node天生自带模块化
//1.定义如何创建一个模块，一个js文件就是一个模块
//2.如果使用一个模块   你要使用一个文件只需要require一个文件
//3.如何导入一个模块  export/module.exports


