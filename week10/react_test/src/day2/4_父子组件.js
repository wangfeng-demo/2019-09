import React, { Component } from 'react';
import ReactDOM from 'react-dom'
class Button extends Component {
    render() {
        console.log(this.props);
        let { onAdd, onMinus } = this.props
        return (
            <div>
                <button onClick={onAdd}>增加</button>
                <button onClick={onMinus}>减少</button>
            </div>
        )
    }
}
class Show extends Component {
    render() {
        return (
            <div>
                <h2>当前数字是：{this.props.num}</h2>
                {/* <button onClick={onInit}>初始化</button> */}
            </div>
        )
    }
}
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 100
        }
    }
    add = () => {
        console.log('点击了增加');

        this.setState({
            num: ++this.state.num
        })
    }
    minus = () => {
        this.setState({
            num: --this.state.num
        })
    }
    // init = () => {
    //     this.setState({
    //         num: this.stete.num = 0
    //     })
    // }
    render() {
        let { num } = this.state
        return <div className=''>
            {num}
            <Show num={num} />
            <Button onAdd={this.add} onMinus={this.minus}/>
        </div>;
    }
}

// export default App
ReactDOM.render(<App></App>, document.getElementById('root'))