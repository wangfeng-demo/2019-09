import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import obj from './hello'
import For from './if-for'
import Crt from './creatElement'
const Hello = obj.Hello;
const Hello2  = obj.Hello2;

ReactDOM.render(<div>
    {/* 这里是只能有一个根元素 组件也一样 跟vue一样 */}
    <Crt/>
    <For/>
    <Hello></Hello>
    <Hello2></Hello2>
    <App /> 
    
    </div>, document.getElementById('root'));