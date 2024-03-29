> 首要一定要完成“【重要】实战训练素材”中的两个扩展训练案例
>
> 其次把本周做过的案例都好好的重新做一遍

#### 一、HTML5 / CSS3部分

1. 介绍一下BFC及其应用，IFC、GFC 和 FFC你都了解吗？

2. 怎么让一个 div 水平垂直居中

3. 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

4. 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

   ```html
   <img src="1.jpg" style="width:480px!important;”>
   ```
  img.computed
5. 用CSS实现三栏布局 ，左定右定中间自适应？ 
6. 使用CSS，让一个div消失在视野中，发挥想象力 ？

7. 如何用css绘制一个三角(不允许使用图片)？ 
8. css有哪些盒子模型？它们对应的样式是什么？如何让IE以标准模型渲染？
9. CSS优先级算法如何计算？
10. 请解释一下CSS3的flexbox（弹性盒布局模型）,以及适用场景？ 

#### 二、JAVASCRIPT部分

1. call 和 apply 的区别是什么，哪个性能更好一些

2. 实现 (5).add(3).minus(2) ，使其输出结果为：6

3. 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

4. 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 

5. 实现一个字符串匹配算法，从字符串 S 中，查找是否存在字符串 T，若存在返回所在位置，不存在返回-1！（如果不能基于indexOf/includes等内置的方法，你会如何处理呢？）
 
6. 输出下面代码运行结果

   ```javascript
   //example 1
   var a={}, b='123', c=123;  
   a[b]='b';
   a[c]='c';  
   console.log(a[b]);
   
   ---------------------
   //example 2
   var a={}, b=Symbol('123'), c=Symbol('123');  
   a[b]='b';
   a[c]='c';  
   console.log(a[b]);
   
   ---------------------
   //example 3
   var a={}, b={key:'123'}, c={key:'456'};  
   a[b]='b';
   a[c]='c';  
   console.log(a[b]);
   ```

7. 在输入框中如何判断输入的是一个正确的网址，例如：用户输入一个字符串，验证是否符合URL网址的格式

8. 下面代码输出的结果

   ```javascript
   function Foo() {
       Foo.a = function() {
           console.log(1)
       }
       this.a = function() {
           console.log(2)
       }
   }
   Foo.prototype.a = function() {
       console.log(3)
   }
   Foo.a = function() {
       console.log(4)
   }
   Foo.a();
   let obj = new Foo();
   obj.a();
   Foo.a();
   ```

9. 编写代码实现图片的懒加载

10. 编写一条正则，用来验证此规则：一个6~16位的字符串，必须同时包含有大小写字母和数字

11. 完成如下需求

    ```javascript
    /* 实现一个$attr(name,value)遍历
     * 属性为name
     * 值为value的元素集合
     * 
     * 例如下面示例:
     */
    let ary = $attr('class','box'); //=>获取页面中所有class为box的元素
    ```

12. 英文字母汉字组成的字符串，用正则给英文单词前后加空格

#### 三、烧脑的算法题（注意不要揪头发）(\*^▽^\*)

1. 算法题（携程）

   ```javascript
   /*编写一个程序，将数组扁平化，并去除其中重复部分数据，最终得到一个升序且不重复的数组*/
   let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9,[11, 12, [12, 13, [14]]]], 10];
   ```

2. 情人节福利题：重构内置new方法

   ```javascript
   function Dog(name) {
   	this.name = name;
   }
   Dog.prototype.bark = function () {
   	console.log('wangwang');
   }
   Dog.prototype.sayName = function () {
   	console.log('my name is ' + this.name);
   }
   
   let sanmao = new Dog('三毛');
   sanmao.sayName();
   sanmao.bark();
  
   //=>基于内置的new关键词，我们可以创建Dog的一个实例sanmao，实例可以调取原型上的属性和方法，现在的需求是：自己实现一个_new方法，也能模拟出内置new后的结果
   function _new() {
   	//=>完成你的代码
   	
   }
   let sanmao = _new(Dog, '三毛');
   sanmao.bark(); //=>"wangwang"
   sanmao.sayName(); //=>"my name is 三毛"
   console.log(sanmao instanceof Dog); //=>true
   ```

3. 两个数组和并为一个数组

   ```javascript
   let ary1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
   let ary2 = ['A', 'B', 'C', 'D']; 
   //=>合并后的数组为：['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']
   ```

4. 改造下面代码，使之输出0-9

   ```javascript
   for (var i = 0; i < 10; i++) {
   	setTimeout(() => {
   		console.log(i);
   	}, 1000);
   }
   ```

5. 下面代码输出的结果是多少，为什么？如何改造一下，就能让其输出 20 10？

   ```javascript
   var b = 10;
   (function b() {
   	b = 20;
   	console.log(b);
   })();
   console.log(b);
   ```

6. 下面代码a在什么值情况下会输出1

   ```javascript
   var a = ?;
   if (a == 1 && a == 2 && a == 3) {
   	console.log(1);
   }
   ```

7. 下面代码的输出结果？为什么？

   ```javascript
   let obj = {
   	2: 3,
   	3: 4,
   	length: 2,
   	push: Array.prototype.push
   }
   obj.push(1);
   obj.push(2);
   console.log(obj);
   ```

8. 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？

9. 完成如下需求

   ```javascript
   /* 
   某公司1到12月份的销售额存在一个对象里面
   如下： {
   	1: 222,
   	2: 123,
   	5: 888
   }，
   请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null] 
   */
10. 给定两个数组， 写一个方法来计算它们的交集

    ```javascript
    let nums1 = [1, 2, 2, 1];
    let nums2 = [2, 2];
    //=> 输出结果 [2,2]
    ```

11. 算法题「旋转数组」

    ```javascript
    /* 
    给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数
    输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
    输出: [5, 6, 7, 1, 2, 3, 4]
    解释:
    向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
    向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
    向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
    
    输入: [-1, -100, 3, 99] 和 k = 2
    输出: [3, 99, -1, -100]
    解释: 
    向右旋转 1 步: [99, -1, -100, 3]
    向右旋转 2 步: [3, 99, -1, -100] 
    */
    ```

12. 请实现一个 add 函数，满足以下功能

    ```javascript
    add(1);       //1
    add(1)(2);    //3
    add(1)(2)(3); //6
    add(1)(2,3);  //6
    add(1,2)(3);  //6
    add(1,2,3);   //6
    ```

