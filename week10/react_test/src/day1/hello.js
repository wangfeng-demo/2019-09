import React from 'react'
//在js中写html结构 是由于babel在起作用
//zai react 中 变量是通过 {变量的 方式编写}
//react {}==>vue的{{}}   这里只能写表达式 不能写语句
import Img from './img'
var str = 'hello world'
function f1(name) {
    return <div>
        <Img></Img>
        你好 {name}
    </div>
}
function Hello() {
    return (
        <div>
            <h2>hello world</h2>
            <h1>{str}</h1>
            {f1('世界')}
        </div>
    )
}
function Hello2() {
    return (
        <h3>
            大家好才是真的好
        </h3>
    )
}
export default {
    Hello, Hello2
}