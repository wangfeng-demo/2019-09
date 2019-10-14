let { getCss, setCss, winH, offset,} = utils;
let flag = false;
let oLis = document.querySelectorAll('.main>li');
[...oLis].forEach(item => item.innerHTML = '');
let dataAry = null;
function getdata() {
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /304|200/.test(xhr.status)) {
            flag = false
            dataAry = JSON.parse(xhr.response)
            renderHTML(dataAry);
            loadAll();
        }
    }
    xhr.send();
}
getdata();
function renderHTML(ary) {
    str = '';
    ary.forEach((item) => {
        let { pic, desc, height, author, } = item;
        str = `
                <img style="height:${height}px" src="./img/default.jpg" realSrc = "${pic}" alt="">
                <p class="desc">${desc}</p>
                <div class="author">${author}</div>
                `
        let temp = mainLi();
        let div = document.createElement('div');
        div.className = 'pic_box';
        div.innerHTML = str;
        temp.appendChild(div);
    })
}
function mainLi() {
    let ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight;
    })
    return ary[0];
}
function loadMore() {
    if (flag) return;
    let wH = winH();
    let temp = mainLi();
    let scrT = document.documentElement.scrollTop;
    let tarT = offset(temp).top + temp.clientHeight;
    if (tarT < wH + scrT) {
        getdata();
    }
}
window.onscroll = function () {
    loadMore();
    loadAll();
}
function loadImg(ele) {
    if (ele.loaded) return;
    let scrT = document.documentElement.scrollTop;
    let WH = winH();
    let tarT = offset(ele).top;
    if (tarT < scrT + WH) {
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            fadeIn(ele)
            temp = null;
        }
        ele.loaded = true;
    }
}
function loadAll() {
    let imgs = document.querySelectorAll('.pic_box>img');
    for (let i = 0; i < imgs.length; i++) {
        loadImg(imgs[i])
    }
}
function fadeIn(ele) {
    ele.style.opacity = 0;
    let a = 0;
    ele.timer = setInterval(() => {
        a += 0.01;
        if (a >= 1) {
            clearInterval(ele.timer);
            a = 1;
        }
        ele.style.opacity = a
    },17)
}