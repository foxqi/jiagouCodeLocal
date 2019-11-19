#! /usr/bin/env node
//上面这段话，是告诉根据node运行此包
// 这个文件是描述如何打包的
let entry='../src/index.js';//入口文件
let output='../dist/main.js';//出口文件
let fs=require('fs');
let script=fs.readFileSync(entry,'utf8');
let ejs=require('ejs');

let template=` (function(modules) {
 	function require(moduleId) {//moduleId代表的就是文件名
 		var module = {
            exports: {}
 		};

 		modules[moduleId].call(module.exports, module, module.exports, require);
 		return module.exports;
 	}

 	return require("<%-entry%>");
 })

({

 "./src/index.js":
 (function(module, exports) {

eval(\`<%-script%>\`);

})

 });`;
let result=ejs.render(template,{
    entry,
    script,
});
// result为替换后的结果，最终要写到output中
fs.writeFileSync(output,result);
console.log('编译成功');



