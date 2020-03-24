import React from 'react'
var ary = [1, 2, 3, 4, 5];
var obj = { q: 123, b: 234 }//不能再结构中展示对象
// 在react 中的循环结构 我们一般使用 map
//在 react中的判断 我们一般是哟宁三元运算符；
function For() {
    return (
        <ul >
            {Object.keys(obj).map(item => {
                return <h3 key={item}> 属性名{item} 属性值{obj[item]}</h3>
            })
            }

            {
                ary.map(item => {
                    return (
                        <li key={item}>{item}</li>
                    )
                })
            }
        </ul>
    )
}
export default For