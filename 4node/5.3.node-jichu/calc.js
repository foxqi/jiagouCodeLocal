// 写一个求和方法
// function sum(...args) {
//     return args.reduce((prev,next)=>prev+next
//     )
// }
let sum =(...args)=> args.reduce((prev,next)=>prev+next)
global.sum=sum;

// module.exports=sum
// exports.b=sum;
//
// module.exports.b=sum