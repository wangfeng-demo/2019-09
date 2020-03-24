import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <div className="btnBox">
            <div className="leftBtn"> &lt;</div>
            <div className="rightBtn"> &gt;</div>
        </div>;
    }
}

export default App
// ReactDOM.render(<App />, document.getElementById('root'))