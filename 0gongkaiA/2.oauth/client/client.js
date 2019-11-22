//这是自己的服务器
var express=require('express');
var request=require('request');
var app=express();
//当应用的回调地址
//如果qq服务器认证通过后会进行回调我这个地址，会掉的时候会把授权码code传过来
// http://localhost:8080/callback?1=1&code=xxxxxx
app.get('/callback',function (req,res) {

  //  在客户端回调接口中获取服务器颁发的code
  var code=req.query.code;

//  客户端拿着圣旨去找元帅领令牌 token,带着code像服务器申请令牌
    request('http://localhost:3000/token?code='+code,function (err,response,body) {

        var tokenInfo=JSON.parse(body);
        var token=tokenInfo.token;
        request('http://localhost:3000/userInfo?token='+token,function (err,response,body) {
           res.send(body)
        })
    })

});

app.listen(8080);

