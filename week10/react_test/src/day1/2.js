import React from 'react'
import ReactDOM from 'react-dom'
/* function APP() {
    return (
        <div calssName = 'box'>
        <h2>yingying</h2>
           你好峰峰
        </div>
    )
} */
function APP(){
    return React.createElement('div',{className:'box'},
           React.createElement('h2',null,'hello world'),'你好世界')
}

ReactDOM.render(<APP/>,document.getElementById('root'))