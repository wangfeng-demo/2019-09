import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
    render() {
        //怎么拿到onAdd onMinus
        //通过 this.props  this.state react的两个数据源
        let { onAdd, onMinus } = this.props
        return (<div>
            <button onClick={onAdd}>按钮+</button>
            <button onClick={onMinus}>按钮-</button>
        </div>)
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 0
        }

    }
    //性能最高的是 吧箭头函数写在这个位置 这样可以保证每次更新的DOM的时候
    //我们传递的函数不用重新赋值
    add = () => {
        this.setState({
            num: ++this.state.num
        })
    }
    minus = () => {
        this.setState({
            num: --this.state.num
        })
    }
    render() {
        let { num } = this.state
        return <div className=''>
            <h1>{num}</h1>
            {/* 组件的数据传递 子传父 */}
            <Button onAdd={this.add} onMinus={this.minus}></Button>
        </div>;
    }
}

// export default App
ReactDOM.render(<App />, document.getElementById('root'))