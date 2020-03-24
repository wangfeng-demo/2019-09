import React from 'react'
import ReactDOM from 'react-dom'
function Clock(){
    return (
        <h3>
            当前时间是：{new Date().toLocaleString()}
        </h3>
    )
}
setInterval(()=>{
    ReactDOM.render(<Clock/>,document.getElementById('root'))
},1000)
export default Clock