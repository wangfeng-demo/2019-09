/*
  react项目创建：create-react-app 脚手架
  create-react-app + 项目名
  npx create-react-app + 项目名 //不用安装脚手架

  npm run eject  //暴露配置文件  前提是吧项目提交到历史区git
  我们要修改的配置文件就在config下的webpack.config.js中

  主入口文件是 src/index.js

  ReactDOM.render(组件,html中的根元素)
  react中的组件都是函数或者类
*/
import React from 'react';

import ReactDOM from 'react-dom';

function Button(props) {
    return (
        <div className={props.className}>
            <button>按钮</button>
        </div>
    )
}


class App extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <div className=''>
            <h2>你好 世界</h2>
            <Button className='box'></Button>
        </div>;
    }
}

// export default App
ReactDOM.render(<App />, document.getElementById('root'))