//React.createElement
//ReactDOM.render(组件，根元素)
const React = {
    //第一个参数是标签名 第二个是行内属性 在后边都是子元素
    createElement(tagName, props, ...children) {
        return new Element(tagName, props, children) {
            this.tagName = tagName;
            this.props = props;
            this.children = children
        }
        render() {
            let ele = document.createElement(this.tagName);
            for (let k in this.tprops) {
                ele.setAttribute(k, this.props[k])
            }
            this.children.forEach(item => {
                //需要判断 当前这个节点 到底是 元素还是文本
                item instanceof Element ?
                ele.appendChild(item.render());
                ele.appendChild(document.createTextNode(item))
            });
            return ele
        }
    }
}
const ReactDOM = {
    render(ele, root) {
        root.appendChild(ele.render())
    }
}
let App = React.createElement('div', {className: 'box' },
    React.createElement('h2', null, 'hello world'), '你好世界')
    ReactDOM.render(App, document.getElementById('root'))