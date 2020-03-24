import React from 'react';
import '../less/dialog.less'
class Diaglog extends React.Component {
    constructor() {
        super();
        this.state = {
          flag:false 
        }
    }
    render() {
        let {title,visible,children,onOk,onCancel} = this.props; 
        let {flag} = this.state;
        let _this = this;
        function ok() {
          _this.setState({
            flag:true
          })
          setTimeout(() => {
            onOk();
            // _this.state.flag = false;
            _this.setState({
                flag:false
            })
          }, 500);
        }
        function cancel() {
          _this.setState({
            flag:true
          })
          setTimeout(() => {
            onCancel();
            _this.state.flag = false;
          }, 500);
        }
        return <div className={'mask'+(flag ? ' reverse' : '')} style={{display:visible ? 'block' : 'none'}}>
          <div className='contentBox'>
            <header>
              {title||"默认title"}
            </header>
            <main>
              {children}
            </main>
            <footer>
              <button onClick={()=>{cancel()}}>取消</button>
              <button onClick={()=>{ok()}}>确定</button>
            </footer>
          </div>
        </div>
    }
}

export default Diaglog