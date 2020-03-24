import React from 'react';
import ReactDOM from 'react-dom'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    add(n) {
        this.setState({
            num: this.state.num += n
        })
    }   
    add2 = () => {
        let n = this.state.num
        //setState更新  在react事件中是异步的
        //setState 是可以触发视图更新的
        this.setState({
            num: n += 2
        }, () => {
            console.log(this.state.num)
        })
    }
    minus = () => {
        this.setState({
            num: this.state.num -= 2
        })
    }
    render() {
        let { num } = this.state;
        return <div className='box'>
            <h2>当前数字是：{num}</h2>
            {/* <button onClick={this.add}>+</button> */}
            {/* bind写法 事件的一项是处在实参的最后一个位置 */}
            {/* <button onClick={this.add.bind(this, 100)}>+</button> */}
            <button onClick={(e) => { this.add(10, e) }}>+</button>
            <button onClick={this.add2}>+</button>
            <button onClick={this.minus}>-</button>
        </div>;
    }
}

// export default App
ReactDOM.render(<App></App>, document.getElementById('root'))