import React, { Component } from 'react';
import ReactDOM from 'react-dom'
class Clock extends Component {
    constructor() {
        super()
        this.state = {
            time: new Date().toLocaleString(),
            timer: null
        }
    }
    init = () => {
        clearInterval(this.state.timer)
        setInterval(() => {
            this.setState({
                time: new Date().toLocaleString()
            })
        }, 1000);
    }
    render() {
        let { time } = this.state;
        return (
            <div>
                <h1>当前时间是{time}</h1>
                <button onClick={this.init}>计时开始</button>
            </div>
        )
    }
}
class App extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <div className=''>
            <Clock></Clock>
        </div>;
    }
}

// export default App
ReactDOM.render(<App />, document.getElementById('root'))