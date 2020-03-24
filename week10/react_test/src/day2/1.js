import React from 'react'
var str = '珠峰';
var ary = [1, 2, 3, 4];
var obj = { a: 111, b: 222, color: 'red' };
var cln = 'box'
function fn(arr) {
    let t = [];
    for (var i = 0; i < arr.length; i++) {
        t.push(<li key={i + '0'}>{arr[i]}</li>)
    }
    return t
}
function Hello() {
    return (
        <div>
            <h1 className={cln + ' qqq'}>hello world</h1>
            <h2 style={obj}>{str}</h2>
            <h3 style={{ color: 'pink', backgronud: '#ccc' }}>{ary}</h3>
            <h4>{Object.keys(obj)}</h4>
            <ul>
                {
                    ary.map(item => {
                        return (
                            <li>{item + 10}</li>
                        )
                    })
                }
                {
                    fn(ary)
                }
                {
                    'false' == true ?
                        <h1>成立</h1> :
                        <h2>不成立</h2>
                }
            </ul>
        </div>
    )
}
export default Hello
