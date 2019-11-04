/* import jquery from 'expose-loader?$!jquery';
console.log($);
 */
import img1 from './static/psb.jpg';
let img2=require('./static/psb.jpg');
require('./index.less');

//=>在JS中使用图片（webpack），需要把图片先导入进来，然后在使用（使用的是相对地址，绝对地址不需要这样处理）
let img=new Image();
img.src=img2;
document.body.appendChild(img);




/* let {
	debounce
} = require('./common');

//=>CSS需要我们在入口的JS中导入后才可以使用
require('./index.less');

debounce();

@log
class A {
	constructor() {}
	sum() {
		console.log('sum');
	}
	n = 10;
	static m = 20;
	static fun() {
		console.log('fun');
	}
}

function log(target) {
	target.decorator = true;
} */


/* A.fun();
console.log(A.m);
console.log(A.decorator);
console.log(new A().n);
new A().sum(); */

/* function sum() {
	return new Promise((resolve,reject)=>{
		setTimeout(_=>{
			resolve(100);
		},1000);
	});
}

async function fn() {
	let n = await sum();
	console.log(n);
}
fn(); */