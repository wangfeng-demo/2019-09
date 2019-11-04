//=>浏览器中不能识别ES6Modelu/CommonJS模块导入导出规范的代码
//=>ES6Modelu规范（引入必须在最开始）
import {
	bind
} from './nav';

//=>CommonJS规范（NODE）
let {
	debounce
} = require('./common');

//=>CSS需要我们在入口的JS中导入后才可以使用
require('./index.less');

debounce();
bind();
console.log('我是中国人');