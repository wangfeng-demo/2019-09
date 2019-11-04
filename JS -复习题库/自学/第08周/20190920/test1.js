//=>获取全局环境变量
let n = process.env.NODE_EVN;
console.log(n.length, typeof n);
if (n === 'dev') {
	console.log('我是在开发环境下执行~~');
} else {
	console.log('我是在生产环境下执行~~');
}