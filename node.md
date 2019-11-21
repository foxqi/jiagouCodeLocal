# 多种跨域方案详解

- 同源策略：协议，域名，端口，同域
###### 为什么浏览器不支持跨域
 - cookie LocalStorage
 - DOM元素也有同源策略 iframe
 - ajax 也不支持跨域

###### 实现跨域
 - jsonp
 - cors（纯后端提供）
 - postMessage
 - window.name
 - location.hash
 - document.domain（domain是域名的意思,用此 方法必须是同一个一级和二级域名的关系）
 - websocket（没有域的问题。高级api,但不兼容）
 - nginx(这是个包下载，http://nginx.org/en/download.html，具体看架构课01公开课02多种跨域方案中一小时30分钟的讲解)
 - http-proxy





  `//设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin',origin);
        //允许携带哪个头访问我
        res.setHeader('Access-Control-Allow-Headers','name');
        //允许携带哪个方法访问我
        res.setHeader('Access-Control-Allow-Methods','PUT');
        //允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials',true);
        //预检的存活时间
        res.setHeader('Access-Control-Max-Age',6);
        //允许返回的头
        res.setHeader('Access-Control-Expose-Headers','name');`

##### 配置本机域名
`C:\Windows\System32\drivers\etc\hosts用笔记本打开，
输入 127.0.0.1 b.zf1.cn即可本地访问此域名`

# OAuth（问的一般，但是都会微信登录，微博登录用到的很多）
 1. 什么是OAuth
    - 开放式授权协议
 2. 应用场景
    - 比如现在有一个微信应用朝夕日历想获取你的微信昵称和头像，那么这个应用如何获得用户授权呢？
    - 你可以把你的用户名和密码告诉这个朝夕日历，但是它有以下问题
     1. 朝夕日历会保存你的用户名和密码，如果朝夕日历数据泄露，则你的账户不安全
     2. 如果你修改了密码还需要实时通知朝夕日历，如果不通知则此应用无法继续获取资料
     3. 朝夕日历获得了你账户的所有能力，我们没法限定朝夕日历的授权访问的信息和有效期
     4. OAuth就是为了解决上面这些问题而诞生的
 3. OAuth设计思路
    - OAuth在朝夕日历与微信之间设置了一个授权层，朝夕日历不能直接登录微信，只能访问授权层，用户在授权层进行登录，然后发放给此用户一个令牌，指定授权层的权限范围和有效期。在应用登陆授权层后，此应用就可以根据令牌的权限范围和有效期，向此用户开放用户昵称和头像
 4. OAuth工作流程
    1. 用户启动朝夕日历后，朝夕日历会跳转到授权层要求用户登录
    2. 用户同意授权
    3. 朝夕日历使用上一步得到授权向微信申请令牌
    4. 微信对朝夕日历认证后发送令牌
    5. 此应用使用令牌，想微信请求昵称和头像
    6. 微信确认令牌无误，向朝夕日历发回此用户的昵称和头像 
 5. 授权码模式（有个图片分析在这里G:\zhangyanqi\jiagouCodeLocal\0gongkaiA\2.oauth\img\OAuth授权码模式.jpg）
    - 授权码模式是功能最完整、流程最严密的授权模式。它的特点是通过朝夕日历的后台服务器与微信的认证服务器进行互动。它的步骤如下 
     1. 用户访问朝夕日历，朝夕日历将页面跳转换微信认证服务器
     2. 用户选择是否要授权
     3. 假设用户同意授权，认证服务器将用户导向到朝夕日历事先指定的“重定向URL”中，并且会提供一个授权码
     4. 客户端收到授权码并追加“重定向URL”，向认证服务器申请令牌
     5. 认证服务器核对授权码和“重定向URL”，确认无误后，向客户端发送访问令牌和更新令牌 
 6. qq互联    




# 1.模块化
模块化是指把一个复杂的系统分解到多个模块以方便编码

###1.1 命名空间
 开发网页要通过命名空间的方式来组织代码
 - 命名空间冲突，俩个库可能会使用同一个名称
 - 无法合理的管理项目的依赖和版本
 - 无法方便的控制依赖的加载顺序
 
###1.2 CommonJS
CommonJS 是一种使用广泛的`Javascript`模块化规范，核心思想是通过`require`方法来同步的加载依赖的其他模块，通过 module.exports 导出需要暴露的接口。
####1.2.1 用法
采用 CommonJS 导入及导出时的代码如下：
```
//导入
const moduleA =require('./moduleA');

//导出
module.exports=moduleA.someFunc;

```
#### 1.2.2原理
a.js
```javascript
let fs=require('fs');
let path=require('path');
let b=req('./b.js');
function req(mod){
    let filename=path.join(__dirname,mod);
    let content=fs.readFileSync(filename,'utf8');
    let fn=new Function('exports','require','module','__filename','__dirname',content+ '\n return module.exports;');
    let module={
        export:{}
    };
    return fn(module.exports,req,module,__filename,__dirname)
}
```
b.js
```javascript
console.log('bbb');
exports.name='zfpx';
```

###1.3 AMD
AMD也是一种 Javascript 模块化规范，与CommonJS 最大的不同在于它采用异步的方式去加载依赖的模块。AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是requirejs。

AMD的优点
-可在不转换代码的情况下直接在浏览器中运行
-可加载多个依赖
-代码可运行在浏览器环境和Node.js环境下

AMD的缺点
- Javascript运用环境没有原生支持AMD，需要先导入实现了AMD的库后才能正常使用。

####1.3.1用法
```javascript
//定义一个模块
define('a',[],function() {
  return 'a';
});
define('b',['a'],function(a) {
  return a+'b';
});
//导入和使用
require(['b'],function(b) {
   console.log(b);
});
```
####1.3.2原理
```javascript
let factories={};
function define(modName,dependencies,factory) {
   factory.dependencies=dependencies;
   factories[modName]=factory;
}
function require(modNames,callback) {
  let loadedModNames=modNames.map(function(modName) {
    let factory=factories[modName];
    let dependencies=factory.dependencies;
    let exports;
    require(dependencies,function(...dependencyMods) {
      exports=factory.apply(null,dependencyMods);
    });
    return exports;
  });
  callback.apply(null,loadedModNames);
}

```


### 1.4 ES6模块化
ES6 模块化是`ECMA`提出的`JavaScript`模块化规范，它在语言的层面上实现了模块化。浏览器厂商和`Node.js` 都宣布要原生支持该规范。它将逐渐取代`CommonJS`和`AMD`规范，成为浏览器和服务器通用的模块解决方案。
采用ES6模块化导入及导出时的代码如下
    ```javascript
    //导入
    import {name} form './person.js';
    //导出
    export const name='zfpx';
    ```
ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在大部分JavaScript运行环境下，必须通过工具转换成标准的ES5后才能正常运行。

##2.自动化构建
构建就死做这件事情，把源代码转换成发布到线上的可执行JavaScript、CSS、HTML代码，包括如下内容。

- 代码转换：ECMASCRIPT6 编译成EAMASCRIPT5、LESS编译成CSS等。
- 文件优化：压缩JavaScript、CSS、HTML代码，压缩合成图片等。
- 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能吧模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
-代码校验：在代码被提交到仓库前需啊哟校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

## 3.Webpack
Webpack是一个打包模块化JavaScript的工具，在Webpack里一切文件皆模块，通过Loader转换文件，通过Plugin注入钩子，最后输出由多个模块组合成的文件。Webpack专注于构建模块化项目。

一切文件：JavaScript、CSS、SCSS、图片、模板在Webpack眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便Webpack对模块进行组合和打包。经过Webpack的处理，最终会输出浏览器能使用的静态资源。

## 3.1 安装 Webpack
在用Webpack执行构建任务是需要通过webpack可执行文件去启动构建任务，所以需要安装webpack可执行文件

## 3.1.1  安装 Webpack 到本项目
    ```javascript
    # 安装最新稳定版
    npm i -D webpack webpack-cli
    
    # 安装制定版本
    npm i -D webpack@<version>
    
    #安装最新体验版本
    npm i -D  webpack@beta
    ```

>npm i -D 是 `npm install --save-dev` 的简写，是指安装模块并保持到 `package.json` 的 `devDependencies`

## 3.1.2   安装 Webpack 到全局
安装到全局后你可以在任何一个地方共用一个Webpack 可执行文件，而不用各个项目重复安装
    ```javascript
    npm i -g webpack
    ```

## 3.1.2 使用 webpack
- 本地安装

        ```javascript
        npm init -y 先初始化
        npm i webpack webpack-cli -D
        ```
        
        
- 首先目录不能为中文，自己写的代码要在src目录下
- npx 会帮你执行依赖包里的二进制文件(了解webpack配置文件webpack.config.js当然，即使没有配置文件，直接运行webpack命令，同样可以直接对js文件完成打包工作，这里是一篇分析webpack打包后的代码的文章：简要分析webpack打包后代码，其中用到的一个新命令npx)
- 运行 npx webpack,即可在目录中生成dist文件下，打包好的压缩文件，供`线上使用`
- 运行 npx webpack --mode development即可在目录中生成dist文件下，打包好的没有压缩的代码，供线上使用`开发使用`

---https://segmentfault.com/a/1190000012631766(如何使用webpack)

## 3.1.3 使用 Webpack
```javascript
(function(modules) {
      function require(moduleId){
          var module={
              export:{}
          };
          modules[moduleId].call(module.exports,module,module.exports,require);
          return module.exports;
      }
      return require("./index.js");
     
})
```
丢丢丢

#### 自己封装
 - 1.如果想自己写一个webpack,首先创建一个和src同级的文件夹如zfpakc,里面创建一个bin,在创建一个zfpack.js
 - 2.在zfpack中打开cmd,输入 npm init -y,创建依赖，并修改"bin": {"zfpack": "bin/zfpack.js"},使其在bin下，路径一致
 - 3.编写zfpack.js文件
 
 - 4.运行npm link，在运行自定义的文件夹名字为类似于运行命令如：zfpack,即可运行（只要zfpack.js有更改，便在运行一次）



### MVVM
- MVVM 双向数据绑定 
  - angular 靠脏值检测
  -vue 靠 数据劫持+发布订阅模式（不兼容低版本，因为核心实现的方式是 Object.defineProperty）
  
  
  
# 4.git  
  
### git本地操作


##### 1.版本控制

###### 1.1备份文件
   - 以前不停的创造文件进行备份（没有修改的提示），git可以帮我们管理我们的代码保证代码不丢失。
   - 类似于网盘备份
   - 我们的代码也需要备份，修改完了以后提交给版本库进行保管，哪一天代码没了也可以找回来。
###### 1.2记录历史
   - 比如我们打游戏就要存档,万一挂了还可以从上个存档的地方重玩
   - 和网盘不同，网盘保留的是最新的状态，历史的记录都没有了，修改的记录也都找不回来了
   - 网盘无法知道文件里的某行代码是何人在哪个时间添加进去的
   - 记录历史：只要代码提交到git上就永远不会丢失，可以随时“穿越”
###### 1.3回到过去
- 如果我有一天不小心删除了某个文件，我们可以通过历史备份找回来
###### 1.4多端共享
   - Git仓库可以通过PC端、Android、IOS、移动端等各个终端访问
   - 可以随时随地修改代码，公司没干完的工作回家接着干
###### 1.5团队协作
   - 多个人或团队合作编写一个项目
   - 合并代码处理冲突 
   - 俩个人修改了同一个文件的同一行，也需要手动解决冲突，可以实现自动合并（模块化，组件化）
###### 1.6拥有强大的  分支管理系统   
   
  
##### 2.什么是git
   - 为了告别手动方式管理Linux代码，并且符合开源和免费，Linus花了俩周时间自己用C写了一个分布式版本控制系统，这就是Git
   - Git迅速成为了最流行的分布式版本控制系统，尤其是在2008年GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等的
   
#### 3.svn,git的区别
   1. 版本控制系统不一样
      - svn是一个集中式的，把代码集中起来。需要有一台中央服务器，每个人都需要将代码提交或拉取到这台中央服务器上。但是a就没有b的代码，b也没有a的代码。他们同意在中央服务器上，但是如果有一天中央服务器挂了，就什么都没有了。 
      - git是一个分布式的，把代码分撒到各地。俩个人存在的都是完整的版本库，会有一个远程的仓库用来暂时存放代码，a的代码更新了会在远程仓库中有提示，即使远程仓库挂了，每个人也都有完整的版本库
   2. git速度比svn快（比如svn用三分钟，git用几秒） 
   3. svn中每个文件夹都会有一个文件 .svn文件，但是git有一个单独的文件夹 .git文件夹
   
  (看笔记本) 
   工作区      |  暂存区/过渡区  |  历史区/版本库  
   存放本地代码的 |               | 保证代码不丢失  
   
   
##### 4.git的安装 （网上下载新版本）  
   - windows:http://git-scm.com
   - mac 如果安装过xcode自带git，homebre是mac的包管理器;https://brew.sh;可能会发下命令行特比丑，这时候会下载个插件 https://ohmyz.sh/;还有一个必备的插件https://www.iterm2.com/

- 右键点击 Git Bash Here 出现命令窗口
- Administrator@CJ-201812271008 MINGW64 ~/Desktop
  - ~当前用户；Desktop桌面
  - linyx命令
    - pwd:print working directory 打印当前工作目录

  1. 配置用户（不配置用户不能提交代码）
    - 查看git的配置文件，是否以前安装过:git config --list;
    如果没有user.name和user.email就没有配置过
    - 配置全局地址：git config --global user.name "你的名字“，git config --global user.email "你的邮箱";以上命令输入完后点击回车，没有提示，就为成功
    
   2. git初始化：
     - git init（你在哪里敲入这一样，那里就被git管理，比如在桌面敲入，桌面就被git进行管理。）告诉git哪个文件夹被git所管理。
       - 如果出现Administrator@CJ-201812271008 MINGW64 ~/Desktop(master)，蓝色的有括号的master就说明当前的文件夹被git所管理了
       - 一个项目初始化一次，不能嵌套
     - git status 查看git状态 （红色为工作区，绿色为暂存区）
     - 删除暂存区   git rm --cached 文件名/（. -r ）全删除 
     - 添加到暂存区  git add ./-A/文件名
     - 添加到历史区  git commit -m '消息'
     - 查看版本号    git log 
     - 只要提交过一次，就可以从工作区直接到历史区  git commit -a -m "消息"
   3. git不同区的代码比较
     - git diff  (默认是工作区和暂存区比较)
     - git diff 分支名（因为有的时候可能不是master）  (工作区和历史区比较)
     - git diff --cached (暂存区和历史区比较)
   4. 撤销(撤销后不能回去了)
     - 从暂存区中将工作区内容覆盖掉  git checkout ./文件名  
   5. 暂存区回滚到暂存区的上一条(只能一次)  git reset HEAD ./文件名  
   6. 将历史操作过的命令放到文件里   history > 文件名 
   7. - 回滚历史区版本  git reset --hard 版本号
        - 回滚到上一个历史版本 git reset --hard HEAD^ 
      - 查看所有版本  git reflog 
   8. 查看git的分支  git branch 
      - * master(当前在哪个分支上)
      - git branch 分支名      创建分支
      - git checkout 分支名    切换分支
      - git branch -D 分支名   删除分支（删除分支时，当前用户不能在当前要删除的分支上） 
      - git checkout -b 分支名 创建分支并切换分支
      - 假如我创建一个新的文件 touch 1.js此时这个文件即属于master,也属于分支，如果完全想属于分支的话，创建文件后，切到分支，在git add .然后 git commit -m 'add 1.js'。
      - 分支有更改不能直接切换，可以提交更改或者暂存更改，暂存使用过渡区覆盖掉工作区。git stash pop还原暂存的内容
        - 如果一个分支修改了代码，切换到另一个分支，要先保存到暂存区 git stash(暂存文件)
      - 合并  git merge 分支名
      - 解决冲突
        - 遇到冲突时只能手动的解决冲突，留下想要的结果再次提交
        - 解决完冲突后，在按照原来上传 git add . -> git commit -m 'merge' ->git push origin master 
   
##### 推送到github
   
   - 日志显示一行 git log --graph --online
   
   ## 本地-> github
   - 先有github账号
   ## 本地提交
   - README.md
   - 创建一个 .gitignore    (忽略文件)
     - .idea
     - node_modules
     - .DS_Store
   - git 不会上传空文件夹
     - 创建.gitkeep文件，此空文件夹即可上传  
   
   ## 关联远程仓库
   - git remote add origin 远程仓库的地址
     - 查看远程信息  git remote -v 
    
   - 删除关联  git remote rm 名字
   - 推送代码  git push origin master 
   
   - 线上和线下代码不一样的时候，先拉取在推送
     -  拉取最新的代码  git pull origin master
       - pull=git fetch(拉取最新内容) +git merge(合并)
    
   ## gh-pages  在github里创建分支来发布我们的静态页   
   - 在项目中创建一个gh-pages的分支
   - 将分支提到线上仓库
   - 找到提供给你的网站  settings github-pages
     1. git checkout -b gh-pages
     2. touch index.html
     3. git add .
     4. git commit -m 'xxx'
     5. git push origin gh-pages
   
   ## issue 问题
    - 可以提交对项目，自己的信息
    
   ## 更改别人代码 
   - fork是在当前项目下克隆了一份，如果代码更新，不会随之更新
   > 只有fork关系才能发送pull request请求
   ## 拉取本地
   - git clone 项目地址  项目别名（别名可起也可不起用原来的名字）
   > 默认就是git仓库而且有origin地址，可以将代码提交到自己的仓库上
   
   ## collaborators
   - 添加贡献者，被添加的人拥有最大权限
   
   ## GUI界面化（此处是讲的如何配置webstorm中的git）

##### git与github 工作流程
1. git工作流总结
    1. 创建一个空目录 mkdir
    2. 进入目录： cd 目录名
    3. git init 初始化仓库
    4. 新建文件到工作区
    5. git add 添加到暂存区
    6. git commit -m"注释" 添加到历史区
2. 本地仓库和远程仓库关联起来
    - git remote add origin 远程仓库的地址
    - git remote add origin https://github.com/zhufengpeixun/JavaScript201606.git
    - 查看远程仓库地址：git remote -v
    - 解除关联:git remote rm origin
3. 远程仓库内容更新到本地仓库
    - git pull origin master
4. 把本地内容提交到远程仓库
    - git push origin master    
       
       
    `（这一下都是linyx命令）`
     - 如果出现了：Initialized empty Git repository in C:/Users/Administrator/Desktop/.git/（初始化的空的git文件夹）
     - 强制删除（文件夹） rm -rf（如果只是这俩行代码一定要`慎重`，强制删除，就什么都没有了，并且无法恢复）。所以要敲的是 rm -rf .git
     - 删除文件 rm 文件名
     - 创建目录  mkdir 文件夹名 
     - 清屏  clear 
     - 进入文件夹 cd 文件夹名 叫做change directory(如果文件目录太深，就可以直接拖进去)
     - 进入d盘   cd d:(注意这个命令是linyx的)，我们常用的那个shift+右键，点击`在此处打开命令窗口`(或者运行cmd)的对话框叫DOS命令是直接进盘符是  直接用 `d:`
     - 显示目录下所有的文件 ls(不显示隐藏文件（点开头的叫隐藏文件）); ls -al可以看到所有文件
     - 创建文件 touch 文件名
     - 查看文件是否是空的  cat 文件名
     - 编辑文件 vi 文件名，出现很多波浪线，如有有OL,OC是不可编辑的，点击 i键（o旁边的i）,出现 INSERT 即可在波浪线中编辑。 点击 Esc键 退出编辑模式， 敲入:q,如果已经写东西了会报红，告诉你 你已经修改了不能退出；:q!就要退出，这个文件就是没有保存的退出，强制退出；  ：wq 保存在退出，在点击回车
     - echo 输入文件内容
       - echo '内容' > 1.txt 一个>表示输入
       -echo '内容' >> 1.txt 俩个>>表示追加
     - mv 项目名 ~/Desktop/ 把该项目移动到桌面上


# 5.es6


##### let 和const
```javascript
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
```
##### 解构  分解一个对象的结构
```javascript

//数组解构
/*
let arr=[1,2,3];
/!*let a=arr[0];
let b=arr[1];
let c=arr[2];*!/

//解构的时候，等号的两边结构类似。右边还必须是一个真实的值
let [a,b,c]=arr;

console.log(a,b,c);


let arr2=[{name:'qu',age:8},[1,2],3];
// let [{name,age},[d,e],f]=arr2;
// console.log(name,age,d,e,f)
let [json,arr3,f]=arr2;
console.log(json,arr3,f);
*/


//对象解构

/*let obj1={name:'qu',age:9};
let {name,age}=obj1;
let {name:myname,age:aa}=obj1;
/!*原理
let myname=obj1.name;
let aa=obj1.age;*!/
// console.log(name,age);
console.log(myname,aa);*/


//默认解构:如果能取出来值就用取出来的值，如果取不出来就用默认值
/*let obj2={name:'zfpx'};
let {name,age}=obj2;
console.log(name,age);*/


//省略赋值
let arr4=[1,2,3];
let [,,j]=arr4;
console.log(j)

```


##### 模板字符串
- 模板字符串:1.字符串里可以嵌套变量，2.模板字符串可以折行，换行
- 其他运算符...rest  会把后面的所有参数全都放在一个数组里
  - ...rest其他运算符只能作为最后一个参数
  - 因为有些时候我们希望有自己的拼接模板字符串的逻辑
  ```javascript
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
    ```



- 带标签的模板字符串就像一个函数调用，参数
- startsWith是否什么什么来开头的
- endsWith是否用什么什么来结束的
- includes 判断一个字符串是否包含另一个字符串
- repeat 将字符串复制几份
- padStart()用于头部补全
- padEnd()用于尾部补全。
```javascript
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
``` 

##### 函数
- 1 默认参数   1.必填项不填报错 2.有些参数没有给传参的话可以有默认值
```javascript
 function ajax(url=new Error('url不能为空'),method='GET',dataType='JSON') {
     console.log(url);
     console.log(method);
     console.log(dataType);
 }
```

- reduce 计算 汇总 收敛  把一个数组中的一堆计算出来的一个值

```javascript
//可以传一个参数，也可以传二个参数
//第二个参数表示初始值
//上一次的执行结果会成为下一次的初始值
//origin就是元素本身

//如果没有给初始值的话，第一次执行函数的时候，  val=第一个元素  item=第二个元素（还是相同的结果，只是少了一轮和初始值相加的运算）
//reduce从左往右算 reduceRight从右往左算

let result=arr4.reduce(function (val,item,index,origin) {

   return val+item;//返回值会成为下一次函数执行的时候的val
},0);

console.log(result);


//平均值
let result1=arr4.reduce(function (val,item,index,origin) {
    console.log(item,index);
    let sum= val+item;//返回值会成为下一次函数执行的时候的val
    if(index==origin.length-1){
        return sum/origin.length;
    }else{
        return sum;
    }
},0);
console.log(result1);
```

- 展开运算符  相当于把数组中的每个元素依次取出放在这
```javascript
let arr5=[1,2,3];
let arr6=[4,5,6];
// let arr7=[].concat(arr5,arr6);
let arr7=[...arr5,...arr6];
console.log(arr7);

// let max=Math.max(1,2,3);
// let max=Math.max.apply(null,arr6);
let max=Math.max(...arr6);
console.log(max);
```

```javascript
let obj1={name:'1'};
let obj2={age:2};
/*
* 1.循环赋值
*
* */
let obj3={};
/*for(let key in obj1){
   obj3[key]=obj1[key];
}
for(let key in obj2){
    obj3[key]=obj2[key];
}*/
//Object.assign
/*2. assign
*  参数一是target,后面都是来源对象
* */
// Object.assign(obj3,obj1,obj2);
/*
* 3.对象解构
* */
/*obj3={...obj1,...obj2};
console.log(obj3);*/
```

- 箭头函数 1.声明函数的更简单的方法
  - 箭头函数，如果有且只有一个参数，可以省略小括号
  - 如果只有返回值，没有函数体代码，则可以省略{}
```javascript
let sum=(a,b)=>{
    return a+b;
};
console.log(sum(1, 2));
```
- 箭头函数没有自己的this，它会使用上层的this
```javascript
let obj={
    name:'zfpx',
    getName(){
       setTimeout(()=>{
           console.log(this.name);
       },1000)
    }
}
```
- 箭头函数的this是定死的，指向外层（代码块外层）的this
- 箭头函数虽然好，但不能应用到所有的情况。（比如this不能根据调用者的变化而变化的时候，因为this会被定死）
```javascript

let obj8={
    name:'ququ',
    getName:()=>{
        console.log(this.name);
    }
};
let obj9={
    name:'9',
    gN:obj8.getName
};
obj9.gN();//undefined
```

##### 数组 (day1ES6/6.array.js中有部分原理)
- indexOf 类似字符串的indexOf()方法
```javascript
stringObject.indexOf(searchvalue,fromindex)

var data = [2, 5, 7, 3, 5];
console.log(data.indexOf(5, "x")); // 1 ("x"被忽略)
console.log(data.indexOf(5, "3")); // 4 (从3号位开始搜索)
console.log(data.indexOf(4)); // -1 (未找到)
console.log(data.indexOf("5")); // -1 (未找到，因为5 !== "5")
```

- lastIndexOf 类似indexOf()方法（顺序相反）

- forEach 
```
Array在ES5新增的方法中，参数都是function类型，默认有传参(遍历的数组内容,对应的数组索引,数组本身)

[].forEach(function(value, index, array) {
    // ...
});
forEach方法 遍历数组元素
 var colors = ['red', 'green', 'blue'];
 colors.forEach(function(color) { 
     console.log(color);
 });
forEach除了接受一个必须的回调函数参数，还可以接受一个可选的上下文参数（改变回调函数里面的this指向）（第2个参数）如果这第2个可选参数不指定，则使用全局对象代替（在浏览器是为window），严格模式下甚至是undefined

array.forEach(callback,[ thisObject]
```
- map 
```
映射（一一对应）。[].map();基本用法跟forEach方法类似：
   array.map(callback,[ thisObject]);
   
   但是callback需要有return值（如果没有，就像会返回undefined）
    var a1 = ['a', 'b', 'c'];
    var a2 = a1.map(function(item) { 
        return item.toUpperCase(); 
    });
    console.log(a2); // logs A,B,C
```
- filter 过滤筛选（callback在这里担任的是过滤器的角色，当元素符合条件，过滤器就返回true，而filter则会返回所有符合过滤条件的元素）。

```javascript
var a1 = ['a', 10, 'b', 20, 'c', 30];
var a2 = a1.filter(function(item) { 
     return typeof item == 'number'; 
 });
 console.log(a2); // logs 10,20,30
```

- every(且) every(callback[, thisObject])当数组中每一个元素在callback上被返回true时就返回true。
```javascript
function isNumber(value){ 
    return typeof value == 'number';
}
var a1 = [1, 2, 3];
console.log(a1.every(isNumber)); // logs true
var a2 = [1, '2', 3];
console.log(a2.every(isNumber)); // logs false
```


- some(或) some(callback[, thisObject]) 只要数组中有一项在callback上被返回true，就返回true。

```javascript
function isNumber(value){ 
return typeof value == 'number';
}
var a1 = [1, 2, 3];
console.log(a1.some(isNumber)); // logs true
var a2 = [1, '2', 3];
console.log(a2.some(isNumber)); // logs true
var a3 = ['1', '2', '3'];
console.log(a3.some(isNumber)); // logs false
```

- from 用来将其他对象转换成数组。
```javascript
function print(a,b) {

   /*原理
   Array.prototype.forEach.call(arguments,function (item) {
        console.log(item);
    });*/
//把一个类数组转数组
    Array.from(arguments).forEach(function (item) {
        console.log(item);
    });

}
print('a','b','c');
```

- find
```javascript
Array.prototype.find=function (fn) {
    for(let i=0;i<this.length;i++){
        let flag=fn(this[i]);
        if(flag){
            return this[i];
        }
    }
};
let result=arr4.find(function (item) {
    return item==2
});
console.log(result);
```

- findIndex
```javascript
//原理
Array.prototype.findIndex=function (fn) {
    for(let i=0;i<this.length;i++){
        let flag=fn(this[i]);
        if(flag){
            return i;
        }
    }
};
let index=arr4.findIndex(function (item) {
    return item==2
});
console.log(index);
```
- fill 使用制定的元素填充数组，其实就是用默认内容初始化数组。
```javascript
let arr3=Array(3);//原理：三个空元素
console.log(arr3);//[ 1, 1, 1 ]
arr3.fill(1);
console.log(arr3);//[ 1, 1, 1 ]
```

- of 希望把一个类数组变成一个数组
```javascript
// let arr6=Array(3);
let arr6=Array.of(3);
console.log(arr6);

```

##### 对象

- 对象字面量
- Object.is 比较俩个值是否相等

- Object.setPrototypeOf 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null （相当于是有了父级的属性和方法）
- super 通过super可以调用父亲的方法

```javascript
let name='ququ';
let age=9;
// let obj={name:name,age:age};
//如果对象的属性名和变量名如果一样的话，可以二合一
let obj={name,age};
console.log(obj);

/*let obj1={age:1,getFood(){}};
let obj2={age:2};
let obj3={};

//Object.setPrototypeOf(obj3,obj1);
//原理  设置obj3的原型为obj1
// obj3.__proto__=obj1;
//或者
// let obj3={
//     __proto__:obj1
// }
 console.log(obj3.age);*/


let obj1={age:1,getFood(){
    return '面包';
    }};
let obj2={age:2};
let obj3={
    __proto__:obj1,
    getFood(){
        //通过super可以调用父亲的方法
        return '牛奶'+super.getFood();
    }
};

//Object.setPrototypeOf(obj3,obj1);
//原理  设置obj3的原型为obj1
// obj3.__proto__=obj1;
//或者

 console.log(obj3.age);
 console.log(obj3.getFood());
```

##### 类
```javascript
//定义一个类
/*
* 以前JS里类和构造函数是一体的
* 类里可以定义构造函数,当你创建一个类的实例的时候就会调用构造函数
* */
class Parent{
    constructor(name){
       this.name=name;//实例的私有属性
    }
    //静态属性是类的属性
    static hello(){
        console.log('hello');
    }
    //属于实例的公有属性，也就是相当于原型上的属性
    getName(){
        console.log(this.name);
    }
}

//类的继承，子类继承父类
class Child extends Parent{
    constructor(name,age){
        //super指的是父类的构造函数
        super(name);
        this.age=age;
    }
    getAge(){
        console.log(this.age);
    }
}
//如果执行Parent('ququ');这会报错
// Class constructor Parent cannot be invoked without 'new'
//类的构造函数Parent 不能在不通过new的情况下调用

// let p=new Parent('ququ');
// p.getName();



//create原理
Object.create=function (prototype) {
    //先创建一个 空的函数
    function Fn() {};
    Fn.prototype=prototype;
    //返回这个函数的实例
    return new Fn();

}

//类  和类的实例
//一个属性如果放在原型上的话，是可能通过实例来调用的
//但是放在类上的，不能通过实例来调用，只能通过类名来调用
```

##### 迭代器
```javascript
/*
* 生成器函数和普通函数长的不一样,返回迭代器
* 执行的时候也不一样
* 生成器函数其实是内部生产了很多小函数
* */

function *read(books) {
    console.log('开始');
   for(let i=0;i<books.length;i++){
      yield books[i]; //yield 放弃，屈服，产出
   }
   console.log('结束');
}

let it =read(['js','node']);
/*这种一次一次调用太忙，写成如下循环
let r1=it.next();
console.log(r1); //{value:'js':done:false}
let r2=it.next();
console.log(r2); //{value:'node':done:false}
let r3=it.next();
console.log(r3); //{value:undefined:done:true}*/
let result;
do{
    result=it.next();
    console.log(result);
}while(!result.done);

```


- promise-aplus-tests Promise.js




# 6.移动端
- https://mp.weixin.qq.com/s/y2kzv5S2TvkMwgwZPbSyKA
- https://mp.weixin.qq.com/s/DFOrEUsVqmujHW7tADsH0g
- https://mp.weixin.qq.com/s/N2vRHKOE9WH_TAtwBaiX_Q

##### viewPort (视口)

 - MDN:https://developer.mozilla.org/zh-CN/docs/Mobile/Viewportmetatag
 
- PPK大神，国内好多资料都是基于这位大神的理论写的 
https://www.quirksmode.org/mobile/viewports.html
https://www.quirksmode.org/mobile/viewports2.html
https://www.quirksmode.org/mobile/metaviewport/

- 国内优秀文章
http://www.w3cplus.com/css/viewports.html
http://www.cnblogs.com/2050/p/3877280.html

- ideal viewport (最理想情况下的理想视口，是meta标签中的device-width指定的宽度)
  - window.screen.width
- visual viewport (代表浏览器可是区域的大小，缩放会改变可是区域) 
  - window.innerWidth
- layout viewport(也就是官方所说的viewport，即100%的宽度有多少个像素)
  - 在没有viewport的meta标签进行移动端适配的时候，为了能够让PC端网页展示在移动端不出现水平滚动条，为了解决证问题，手机会就会吧viewport值默认为980px，即页面宽度默认为980px

- 其实官方说法只有一个layout viweport一种说法，PPK大神为了让大家更好的理解viewport，定了上面三种viewport。
- 就如前人通过时域和频域俩个概念让大家更好的理解谐波

 
# 7.node

## node的安装
- https://nodejs.org/en/

## mac homebrew
- brew install node

> 安装后重新启动cmd命令行，
   NVM  可以安装多个node版本，但只能在mac上安装;
   nvm-win这个是window专用的管理多个node版本

##配置环境变量的过程
- add to path
- 我的电脑 ->属性->环境变量->path

## 用node运行一个js文件
- 控制台中运行文件
```
node 文件名
```
- 在编辑器中使用node


## nodejs
 1. Node能够解决什么问题？
- Node的首要目标是提供一种简单的，用于创建高性能服务器的开发工具
- Web服务器的瓶颈在于并发的用户量，对比Java和Php的实现方式
 2. Node是什么？
- Node.js是一个基于Chrome V8引擎的JavaScript运行环境，让JavaScript的执行效率与低端的c语言的相近的执行效率。
- Node.js使用了一个事件驱动、非阻塞式I/O的模型，使其轻量又高效
- Node.js的包管理器npm，是全球最大的开源库生态系统
 3. Node特点
- 3.1 为什么JavaScript是单线程
  - 这是由JavaScript这门脚本语言的用途决定的
  - Web Worker并没有改变JavaScript单线程的本质
- 3.2 浏览器模型
  - 用户界面-包括地址栏、前进/后退按钮、书签菜单等
  - 浏览器引擎-在用户界面和成仙引擎之间传送指令
  - 呈现引擎-又称渲染引擎，也被称为浏览器内核，在线程方面又成为UI线程
  - 网络-用于网络调用，比如HTTP请求
  - 用户界面后端-用于绘制基本的窗口小部件，UI线程和JS共用一个线程
  - JavaScript解释器-用于分析和执行JavaScript代码
  - 数据存储-这是持久层。浏览器需要在硬盘上保存各种数据，例如Cookie  
- 3.3除JS线程和UI线程之外的其它线程
  - 浏览器事件触发线程
  - 定时触发器线程
  - 异步HTTP请求线程
- 3.4 任务队列
   1. 所有同步任务都在主线程上执行，形成一个执行栈
   2. 主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列之中放置一个事件。
   3. 一旦执行栈中的所有 同步任务 执行完毕，系统就会读取任务队列，看看里面有哪些事件。那修对应的异步任务，玉石结束等待状态，进入执行栈，开始执行
   4. 主线程不断重复上面的第三步 
- 3.5 Event Loop
  - 主线程从 任务队列 中读取事件，这个过程是循环不断的，所以整个这种运行机制有称为Event Loop(事件循环)      
- 3.6 Node.js和Event Loop 
   1. V8引擎解析JavaScript脚本
   2. 解析后的代码，调用Node API
   3. libuv库负责Node API的执行，它将不同的任务分配给不同的线程，形成一个Event Loop(事件循环)，以异步的方式将任务执行结果返回给V8引擎
   4. V8引擎再将结果返回给用户
- 3.7 同步与异步（是由被调用方决定，他来决定是马上给你答案，还是回头再给）
  - 同步和异步关注的是消息通知机制
  - 同步就是发出调用后，没有得到结果之前，该调用不返回，就得到返回值了。简而言之就是调用者主动等待这个调用的结果
  - 而异步则相反，调用者在发出调用后这个调用就直接返回了，所以没有返回结果。换句话说当一个异步过程调用发出后，调用者不会立刻得到结果，而是调用发出后，被调用者通过状态，通知或回调函数处理这个调用
- 3.8 阻塞与非阻塞（是由调用放来决定，在等待答案的过程，调用放是否可以干别的事）
  - 阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态
  - 阻塞调用是指调用结果返回之前，当前线程会被挂起，调用线程只有在得到结果之后才会返回
  - 非阻塞调用指在不能立刻得到结果之前，改调用不会阻塞当前线程  
- 3.9 组合
  - 同步异步取决于被调用者，阻塞非阻塞取决于调用者
  - 同步阻塞
  - 异步阻塞
  - 同步非阻塞
  - 异步非阻塞


`姜文讲`

         ## node.js
         - 主线程是单线程（异步）callback,将后续的逻辑写成函数，传入到当前执行的函数中，当执行的函数得到了结果后，执行传入的函数（回调函数）
         - 阻塞不能异步（阻塞是针对内核说的）
         - i/o操作 ，读写操作，异步读写（能用异步绝不用同步）
         - event-driven  事件驱动(发布订阅)
         
         ## web异步
         - setTimeout
         - callback
         - onclick
         - ajax
         
         ## 同步和异步
          - 同步是指发起调用之后主线程只能挂起、调用者主动等待这个调用的结果
          - 异步是指发起调用之后主线程可以做别的事情，被调用者通过通知来告知调用者结果
         
         ## 什么是阻塞和非阻塞
          - 针对内核来说的，想内核发起请求的时候不会阻塞主线程的执行
          - 非阻塞是实现异步的前置条件
          - 针对内核来说的，向内核发起请求的时候不会阻塞主线程的执行
          - 非阻塞是实现异步的前置条件 
 
    
- 杂点小知识
- 在node里，如果一个线程崩了，那么整个服务器就完了。
- 浏览器里UI线程+JS线程是共用一个线程

 
- 主线程是单线程（异步），主要靠 callback,将后续的逻辑写成函数，传入到当前执行的函数中，当执行的函数得到了结果，执行传入的函数（回调函数）
- 阻塞不能异步（阻塞是针对内核说的）
- i/o操作 读写操作，异步读写（能用异步绝不用同步）
- event-driven 事件驱动（发布订阅）

###### 进程是操作系统分配资源和调度任务的基本单位

## 异步
- setTimeout
- callback
- 事件 onclick
- ajax

##### 1.REPL
- 在Node.js中为了使开发者方便测试JavaScript代码，提供了一个名为REPL的可交互式运行环境。开发者可以在该运行环境下输入任何JavaScript表达式，当用户暂行回车键后，REPL运行环境将显示改表达式的运行结果
##### 2.如何进入REPL
- 在命令行容器中输入node命令并按下回车键，即可进入REPL运行环境
##### 3.REPL操作
- 变量的操作，声明普通变量和对象
- eval
- 函数的书写
- 下划线访问最近使用的表达式
- 多行书写
- REPL运行环境中的上下文对象

##### 2.全局作用域
- 全局作用域（global）可以定义一些不需要通过任何模块的加载即可使用的变量、函数或类
- 定义全局变量时变量会成为global的属性
- 永远不要使用var关键字定义变量，以免污染全局作用域
- setTimeout clearTimeout
- setInterval cleatInterval
- unre和ref


###### 1. Node.js中有四种基本的流类型
  - Readable -可读的流（例如 fs.createReadStream()）
  - Writable -可写的流（例如 fs.createWriteStream()）
  - Duplex -可读写的流（例如 net.Socket）
  - Transform -在读写过程中可以修改和变换数据的 Duplex 流（例如 zlib.createDeflate()）
###### 2. 流中的数据有俩种模式，二进制模式和对象模式
  - 二进制模式，每个分块都是buffer或者string对象
  - 对象模式，流内部处理的是一系列普通对象
    - 所有使用Node.js API创建的流对象都只能操作 string和Buffer对象。但是，通过一些第三方流的实现，你依然能够处理其他类型的 JavaScript值（除了null，它在流处理中有特殊意义）。这些流被认为是工作在“对象模式”（object mode）。在创建流的实例时，可以通过 objectMode选项使流的实例切换到对象模式。试图将已经存在的流切换到对象模式是不安全的 
###### 3.可读流的俩种模式
  - 可读流事实上工作在下面俩种模式之一：flowing和paused
  - 在flowing模式下，可读流自动从系统底层读取数据，并通过EventEmitter接口的事件尽快将数据提供给应用
  - 在paused模式下，必须显示调用stream.read()方法来从流中读取数据片段
  - 所有初始工作模式为paused的Readable流，可以通过下面三种途径切换到flowing模式
    - 监听'data'事件
    - 调用 stream.resume()方法
    - 调用stream.pipe()方法将数据发送到writable
  - 可读流可以通过下面途径切换到paused模式
    - 如果不存在管道目标（pipe destination）,可以通过调用stream.pause()方法实现 
  - 如果 Readable切换到flowing模式，且没有消费者处理流中的数据，这些数据将会丢失。比如，调用了readable.resume()方法却没有监听'data'事件，或是取消了'data'事件监听，就有可能出现这种情况  
###### 4缓冲区
 - 缓存区 
 





  
 ### process(区分环境变量)
 ```
     //在webstorm中设置环境变量，点击左上角的文件名，找到Edit confinurations  ->Environment variables(环境变量)  -> 点后面的三个点  -> 点加号  -> name填你起的名字，比如NODE_ENV ；value填在dev  ->  ok。在webstorm就可以打印成功了。
     // 如果代码放到服务器上，那就没有此环境变量，取不到可以走上线环境
     console.log(process.env.NODE_ENV);
     
     let url ='';
     // if(开发){
     //     url='http://localhost:3000';
     // }else{
     //     url='http://www.zhufengpeixun.cn'
     // }
     
     if(process.env.NODE_ENV=='dev'){//本地
         url='http://localhost:3000';
     }else{
         url='http://www.zhufengpeixun.cn'
     }
     console.log(url); 
  ```



