let wrapper = document.querySelector('.wrapper');
wrapper.innerHTML += wrapper.innerHTML;//无缝滚动
utils.css(wrapper, 'width', utils.css(wrapper, 'width') * 2);
setInterval(() => {
    let curL = utils.css(wrapper, 'left');
    curL -= 2;
    utils.css(wrapper, {
        left: curL
    });
    if (Math.abs(wrapper.offsetLeft) >= utils.css(wrapper, 'width') / 2) {
        utils.css(wrapper, 'left', 0);
    }
}, 17);