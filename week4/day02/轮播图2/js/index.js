let ul = document.querySelector('#box .img_box ul'),
    box = document.querySelector('#box'),
    tipBox = document.querySelector('#box .tip_box');
let tips = document.getElementById('box').getElementsByClassName('tip')
let leftBtn = document.querySelector('#box .left_btn')
let rightBtn = document.querySelector('#box .right_btn');
function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response);
            renderHTML(data);//渲染数据
            move();//数据渲染完执行动画
            tipClick();
        }
    }
    xhr.send();
}
getData();

function renderHTML(data) {
    data = data || [];
    let str = '';
    let tipStr = '';
    data.push(data[0]);//加入一张伪第一行 实现武无缝滚动
    data.forEach((item, index) => {
        let { img, desc } = item;
        str += `<li>
                    <img src="${img}" alt="">
                    <p>${desc}</p>
                </li>`
        if (index != data.length - 1) {
            if (index == 0) {
                tipStr += `<span class="tip current"></span>\n`
            } else {
                tipStr += `<span class="tip"></span>\n`
            }
        }
    });
    tipBox.innerHTML = tipStr;
    ul.innerHTML = str;
    ul.style.width = data.length * 530 + 'px';
}

let n = 0;
let timer = null;
function move() {
    timer = setInterval(() => {
        change();
    }, 2000);
}

function change() {
    n++
    if (n == tips.length + 1) {
        ul.style.left = 0;
        n = 1;
    }
    tipClass(n)
    animate(ul, { left: -530 * n }, 500, function () { console.log(666) })
}

box.onmouseenter = function () {
    clearInterval(timer)
}
box.onmouseleave = function () {
    move()
}
function tipClass(m) {
    m = m >= tips.length ? 0 : m;//当m指向了伪第一张的时候   我们要让第一个高亮
    for (let i = 0; i < tips.length; i++) {
        tips[i].className = 'tip'
    }
    tips[m].className = 'tip current';
}
//点击左右按钮
rightBtn.onclick = function () {
    change();
}
leftBtn.onclick = function () {
    n--;
    //n == -1 时 闪到最后一张
    if (n < 0) {
        ul.style.left = -530 * (tips.length) + 'px';
        n = tips.length - 1;
    }
    tipClass(n)
    animate(ul, { left: -530 * n }, 500, function () { console.log(666) })
}
function tipClick() {
    for (let i = 0; i < tips.length; i++) {
        tips[i].onclick = function () {
            n = i;
            tipClass(n)
            animate(ul, { left: -530 * n }, 500, function () { console.log(666) })
        }
    }
}
