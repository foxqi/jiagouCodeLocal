## 1.模块化
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






