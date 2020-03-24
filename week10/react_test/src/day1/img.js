import React from 'react'
var imgUrl = 'http://www.zhufengpeixun.cn/main/img/banner01.png';
function Img(){
    //在react中 行内属性的值 也是通过{}赋予的
    //在react中class 属性 必须写成className
    //zai react中 编写行内属性是必须使用对象的方式
    return (<img 
        src = {imgUrl}
        // className = 'qqq'
        className = {'qqq '+ (1>2?'www':'yyy')}
        style = {{width:500 +'px'}}
        />  
    )
}
export default Img