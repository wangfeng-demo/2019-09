function on(ele, type, f) {
    if (/^my/.test(type)) {
        // 如果不是原生事件，就自己创造一个事件池，
        ele[type] = ele[type] || [];
        let n = ele[type].indexOf(f);
        if (n != -1) {
            ele[type].splice(n, 1)
        }
    } else {
        type = type.replace(/^on/, '')
        ele.addEventListener(type, f, false);
        //addEventListener自带事件池 (原生事件自带事件池)
    }
}

function fire(ele, type, ...arg) {
    //不是原生事件  需要我们把石建池中的时间执行
    if (/^my/.test(type)) {
        // 如果不是原生事件，就自己创造一个事件池，
        ele[type] = ele[type] || [];
        ele[type].forEach((item) => {
            item.call(this, ...arg)
        })
    }
}

function off(ele, type, f) {
    if (/^my/.test(type)) {
        // 如果不是原生事件，就自己创造一个事件池，

    } else {
        type = type.replace(/^on/, '')
        ele.removeEventListener(type, f, false);
        //addEventListener自带事件池 (原生事件自带事件池)
    }
}