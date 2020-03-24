import React from 'react';
import ReactDOM from 'react-dom';
import Diaglog from './common/dialog'
import './less/dialog.less'
class Dialog extends React.Component {
    render() {
        let { title, visible, onOk, onCancel, children } = this.props;
        //从 props中解构出想要的  获取到
        return (
            <div className='mask' style={{ display: visible ? 'block' : 'none' }}>
                <div className="contentBox">
                    <header>
                        {title || '默认title'}
                    </header>
                    <main>
                        {children}
                    </main>
                    <footer>
                        <button onClick={onCancel}>取消</button>
                        <button onClick={onOk}>确定</button>
                    </footer>
                </div>
            </div>
        )
    }
}
/* v-show:dispaly:none会触发当前节点的回流 */
/* v-if: 会触发整个页面的回流：开销较大 */
class App extends React.Component {
    constructor() {
        super();
        this.state={
            isShow:false
        }
    }
    ok=()=>{
        console.log('点击确定');
        
    }
    Cancel=()=>{
        console.log('点击取消');
        this.setState({
            isShow:false
        })
    }
    render() {
        let {isShow} = this.state;
        return <div className=''>
        <button onClick={()=>{this.setState({isShow:true})}}>显示dialog</button>
            <Dialog
                title='这是标题'
                visible={isShow}
                onOk={this.ok}
                onCancel={this.Cancel}
            >
                <h2>这是内容部分</h2>
                <h2>这是内容部分</h2>
                <h2>这是内容部分</h2>
            </Dialog>
        </div>;
    }
}

// export default App
ReactDOM.render(<App />, document.getElementById('root'))
