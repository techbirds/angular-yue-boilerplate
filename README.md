# Angular Yue Boilerplate [![](https://travis-ci.org/techbirds/angular-yue-boilerplate.svg)](https://travis-ci.org/techbirds/angular-yue-boilerplate)

### Install and Running

1. 克隆仓库 `https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate.git`
2. 执行 `npm install`
3. 执行 `npm run dev`
4. 浏览器会自动打开
5. 执行 `npm run tests` 来运行测试

### AngularJS

```
├── app.module.js
├── app.templates.js
├── common
│   └── common.module.js
├── core
│   ├── core.html
│   └── core.module.js
├── home
│   ├── home.module.js
│   └── template-home.html
└── utils
    └── utils.js
```

### Gulp

- [x] Angular单个模块多个文件加载的
- [x] 目录清理
- [x] 压缩混淆js文件
- [x] 压缩css
- [x] 动态监听
- [x] gulp加载bower模块
- [x] 图片处理(非压缩)
- [x] 字体处理
- [x] ESLint支持
- [x] 测试支持
- [x] gulp编写的模块化处理
- [x] gulp参数配置编写
- [x] 设置生产或者开发变量
- [x] 将所有Angular的模板文件编译成单独的js文件
- [x] sourcemaps
- [x] 合并文件
- [x] liveload支持
- [x] html注入script
- [x] Angular依赖预处理
- [ ] 支持ES6
- [ ] 自定义样式sass或者less支持

### Utils

- [x] [lodash 4.16.4](https://lodash.com/)
- [x] 唯一字符串生成
- [x] 轻松操作浏览器的本地存储和cookie
- [x] [moment.js](http://momentjs.com/)
- [x] 各种加密算法支持[`CryptoJS`](https://github.com/brix/crypto-js)

### Testing

运行所有的测试 `npm karma`

### Tips

#### `main-bower-files` 插件使用注意

利用`main-bower-files`插件来引入项目中的bower依赖库,我们只需要通过配置根目录中的`bower.json`中的`overrides`配置项即可。
*而不需要在具体模块中定义`bower.json`文件*,主要利用它的两大特性:
1. 可配置多个文件
2. 可区分开发`development`和生产`production`

### Problem

#### 首次自动打开页面时,控制台(`console`)无法获取对象(例如`angular`,`_`,`moment`)

起初我还怀疑注入可能会有问题,但是代码中的`log`能够正常打印,而`console`需要重新刷新页面才可以获取,猜测应该不是程序的问题吧。
如果有清楚的小伙伴告知下,感激不尽。


