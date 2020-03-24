import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <ul className="dotBox">
            <li></li>
            <li></li>
            <li></li>
        </ul>;
    }
}

export default App
// ReactDOM.render(<App />, document.getElementById('root'))