### Promise

> ES6 语法规范中新增加的内置类，用来处理 JS 中异步编程的，而我们所谓的 promise 设计模式，就是基于 promise 对异步操作进行管理

**异步编程中的“回调地狱”**

- AJAX 的串行

```
$.ajax({
	url:'/baseInfo',
	method:'GET',
	data:{
		name:'zhanglu'
	},
	success:result=>{
		let scoreId=result.scoreId;

		$.ajax({
			url:'/scoreInfo',
			method:'GET',
			data:{
				id:scoreId
			},
			success:result=>{
				let chinese=result.chinese;

				$.ajax({
					url:'/paiming',
					method:'GET',
					data:{
						num:chinese
					},
					success:result=>{


					}
				});
			}
		});
	}
});

//=>AJAX串行：只有第一个请求成功才能执行第二个，第二个成功才能执行第三个....最后一个请求成功后拿到了每一次请求的所有数据
```

- AJAX 的并行

```
//=>三个请求可以同时发送，但是需要等到所有请求都成功才会做一件事
let chi=100,
	eng=12,
	math=98;
let chiPai,
	engPai,
	mathPai;
let count=0;
function func(){
	if(count>=3){
		//=>处理自己要做的事情
	}
}

$.ajax({
	url:'/pai?chi='+chi,
	success:result=>{
		chiPai=result;
		count++;
		func();
	}
});
$.ajax({
	url:'/pai?eng='+eng,
	success:result=>{
		engPai=result;
		count++;
		func();
	}
});
$.ajax({
	url:'/pai?math='+math,
	success:result=>{
		mathPai=result;
		count++;
		func();
	}
});
```
