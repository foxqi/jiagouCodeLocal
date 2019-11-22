//这是模拟qq互联的服务器
/*
* 1.提供一个授权窗口
* */
var express=require('express');
var path=require('path');
var uuid=require('uuid');//生成不重复的随机字符串
var USERS={
    'zfpx':{
        name:'珠峰培训',
        avatar:'11'
    }
}
var app=express();
//设置模板的存放目录
app.set('views',path.resolve('views'));
app.set('view engine','ejs');
//写一个中间件，模拟用户已经登录
app.use(function (req,res,next) {
    req.loginUserId='zfpx';
    next()
});
var appInfo={
    appId:'zhufengpeixun',//服务器自己生成的应用ID
    secret:'123456',//用户器自己生成的秘钥
    name:'珠峰大前端网校',//网站的名称
    desc:'学习前端的网校'//网站的描述
}
app.get('/authorize',function (req,res) {
    res.render('auth',{
        loginUserId:req.loginUserId,
        appInfo:appInfo
    })
});
var CODES={};
var TOKENS={};
//http://localhost:3000/authorize?clientId=zhufengpeixun&redirectUri=http://localhost:8080/callback?1=1
//当点击确认授权的时候想此地址提交请求
//1.生成一个授权码
//2.调用回调URL地址，并把授权码追加上去
app.post('/authorize',function (req,res) {
   /* 8888这里是验证var username=req.body.username;
    var userId=req.body.userId;
    if(username==='zfpx'){*/
        //生成授权码，像皇帝颁发的圣旨
        var code=uuid.v4();

//   在服务器端保存此code以及其对应的应用ID  用户ID
        CODES[code]={
            clientId:req.query.clientId,//从参数中获取客户端ID
            userId:req.loginUserId//从请求中获取写死的用户ID
        }
//   重定向到redirectUri,并传递授权码 code
        res.redirect(req.query.redirectUri+'&code='+code)
   /*8888这里是验证 }else{
        res.send('登录失败')
    }
*/
});
//通过code获取token
app.get('/token',function (req,res) {
   var code=req.query.code;
   var token=uuid.v4();
    //记录此token对应的应用ID 用户ID
    TOKENS[token]={
        clientId:CODES[code].clientId,
        userId:CODES[code].userId
    }
   res.send({token:token});
});
//根据token获取用户的信息，包括头像，昵称
app.get('/userInfo',function (req,res) {
  var token=req.query.token;
  var userId=TOKENS[token].userId;
  res.send(USERS[userId])
});
app.listen(3000);