//1、
var str= "我是MT";
function test() {
    console.log(str);0
    var str= "哈哈哈";
    console.log(str);
}
test();
console.log(str);//undefined 'hahaha''woshiMT'

//2、
console.log(a);
a=12;
function fn(a){
    console.log(a);
    a=13
}
fn();
var a;
console.log(a);//undefined undefined 12

//3、
function test(){
    if("a" in window){
     var a = 10;
    }
    console.log(a);
}
test();//undefined

//4、
var a = 1;
function fn() {
    console.log(a);//undefined
    var a = 5;
    console.log(a);//5
    a++;
    var a ;
    fn3();//1
    fn2();//6
    console.log(a);
    function fn2() {
        console.log(a);//20
        a = 20;
    }
}
function fn3() {
    console.log(a);
    a = 200;
};
fn();
console.log(a);//200


//5、
var n = 10;
function outer(){
    var n = 15;
    function inner(n){
        console.log(n)
        function center(){
            n++;
            console.log(n);//16
        }
        center();
    }
    inner(n);//15
}
outer();

//6、
var n = 10;
function outer(){
    n = 15;
    function inner(){
        console.log(n++);//15
        function center(){
            n+=2;
            console.log(n);//18
        }
        center();
    }
    inner();
};
outer();
console.log(n)//18



//----------------------------------------------------
alert(a);//undefined
console.log("a" in window);//true
if(!("a" in window)){
    var a = 10;
}
alert(a);//undefined

console.log(fn);//undefined
if(9==8){
    function fn(){
        alert(2);
    }
}
//    ---------------------------------
f = function(){return true};
g = function(){return false};
(function (){
    console.log(g);
    if(g()&&[]==![]){
        f = function f(){return false};
        function g(){return true};
    }
})();
alert(f());
alert(g())
