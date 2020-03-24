import React from 'react';
import ReactDOM from 'react-dom'
class Button extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onChange}>点我啊</button>
            </div>
        )
    }
}
class Dialog extends React.Component {
    render() {
        return (
            <div className='dialogBox'>
                <div className='conentBox'>
                    <header>这是一条好消息</header>
                    <main>我很帅</main>
                    <footer>
                        <span onClick={this.props.onFn}>取消</span>
                        <span onClick={this.props.onFn}>确定</span>
                    </footer>
                </div>
            </div>
        )
    }
}
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            flag: false
        }
    }
    change = () => {
        let n = !this.state.flag
        this.setState({
            flag: n
        })
    }
    render() {
        return <div className=''>
            <Button onChange={this.change}></Button>
            {this.state.flag ? <Dialog onFn={this.change}></Dialog> : null}
        </div>;
    }
}

// export default App
ReactDOM.render(<App />, document.getElementById('root'))