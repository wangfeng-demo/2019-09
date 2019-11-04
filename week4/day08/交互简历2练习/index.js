function loadBox() {
    let loadingBox = document.querySelector('.loadingBox');
    let progress = document.querySelector('.progress');
    let btn = loadingBox.querySelector('.btn');
    let ary = ['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'
    ];
    //通过滚动条加载来判断 按钮出现
    let n = 0; //记录过得张数；
    ary.forEach(item => {
        let img = new Image();
        img.src = `./images/${item}`; //获取每张图片的路径
        img.onload = function () {
            n++; //图片加载
            let per = n / ary.length;
            progress.style.width = per * 100 + '%';
            if (n === ary.length) {
                btn.classList.remove('hide'); //按钮显示
            }
        }
    })
    btn.ontouchend = function (e) {
        //点击按钮让第一屏透明度为0;通过监听动画完成来阻止冒泡
        loadingBox.style.opacity = 0;
        loadingBox.addEventListener('transitionend', function (e) {
            if (e.propertyName === 'opacity') {
                loadingBox.classList.add('hide'); //第一屏隐藏
                phoneBoxFn(); //第一屏完成后进行第二屏
                chatBox(); //第二屏完成之后进行第三屏；
                bell.play();
            }
        }, false)
    }
}
loadBox()

function phoneBoxFn() {
    let phoneBox = document.querySelector('.phoneBox');
    let cirlce = document.querySelector('.phoneBox .cirlce');
    let callOver = document.querySelector('.phoneBox .callOver');
    let overBtn = document.querySelector('.callOver .overBtn');
    let timeBox = document.querySelector('.phoneBox header h3');
    let footer = document.querySelector('.phoneBox footer');
    let clearFn = null;
    cirlce.addEventListener('touchend', function () {
        timeBox.classList.remove('hide');
        footer.classList.add('hide');
        callOver.classList.remove('bot');
        clearFn = changetime();
        say.play();
    }, false)

    function changetime() {
        let timer = setInterval(() => {
            let t = parseInt(say.currentTime);
            timeBox.innerHTML = `00:${t < 10 ? '0' + t : t}`;
            if (say.ended) {
                clearInterval(timer);
                phoneBox.style.transform = `translateY(110%)`
            }
        }, 1000)
        return function () {
            clearTimeout(timer)
        }
    }

    overBtn.addEventListener('touchend', function () {
        phoneBox.style.transform = 'translateY(110%)';
        clearFn();
    })
}

function chatBox() {
    let chatMsgBox = document.querySelector('.chatMsgBox');
    let oLi = document.querySelectorAll('ul li');
    let keyboard = document.querySelector('.chatBox .keyboard');
    let p = keyboard.querySelector('p');
    let chatBtn = keyboard.querySelector('.chatBtn')
    let timer = null;
    let n = 0;
    timer = setInterval(() => {
        oLi[n].classList.remove('opa')
        n++;
        if (n === 3) {//当第四条消息要出现的时候停止加载 让键盘升起来
            clearInterval(timer);
            setTimeout(() => {
                keyboard.classList.remove('bot');
            }, 500)
            input();//文字输入
        }
    }, 2000)

    function input() {
        let str = '学完了 找不到工作';
        let n = 0,
            timer = null;
        timer = setInterval(() => {
            p.innerHTML += str[n]
            n++;
            if (n >= str.length) {
                clearInterval(timer);
                chatBtn.classList.remove('hide')//发送键出现;
            }
        }, 500)
    }

    chatBtn.ontouchend = function () {
        p.innerHTML = '';//清空输入空的内容;
        keyboard.classList.add('bot');//键盘隐藏
        oLi[n].classList.remove('opa');//第四条消息出来
        n++;
        timer = setInterval(() => {
            oLi[n].classList.remove('opa');//接着显示后面的内容
            move();//每次显示 后边的li  盒子就向上移动对应li的高度
            n++;
            if (n == oLi.length) {
                clearInterval(timer);
            }
        }, 1000)
    }
    let t = 0;

    function move() {
        let h = oLi[n].clientHeight;
        t += h;
        chatMsgBox.style.transform = `translateY(${-t}px)`
    }
}