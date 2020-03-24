import React from 'react'
// function Crt() {
//     return (
//         <div>
//             hello
//         </div>
//     )
// }
function Crt() {
    let ele = React.createElement('div',{className:'qqq','t':'123'},'hello')
    return ele
}
export default Crt
