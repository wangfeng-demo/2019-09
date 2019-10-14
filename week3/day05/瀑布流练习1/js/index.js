/* let { getCss, setCss, winH, offset } = utils;
let oLis = document.querySelectorAll('.main>li');
let flag = false
function init() {
    [...oLis].forEach(item => { item.innerHTML = '' })
};
init()
function getdata() {
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /304|200/.test(xhr.status)) {
            flag = false;
            let data = JSON.parse(xhr.response)
            renderHTML(data);
            loadAll();
        }
    }
    xhr.send();
}
getdata();
function renderHTML(ary) {
    ary.forEach(item => {
        let { pic, desc, height, author } = item;
        let str = `
                      <div class="img_box">
                        <img style = 'height:${height}' src="./1.gif" realSrc = '${pic}'>
                      </div>
                      <p class="desc">${desc}</p>
                      <div class="author">${author}</div>
                   `
        let temp = getMinLi()
        let div = document.createElement('div')
        div.className = 'pic_box';
        div.innerHTML = str;
        temp.appendChild(div);
    })
}
function getMinLi() {
    let ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight;
    }) 
    return ary[0];
};
function loadMore() {
    if (flag) return;
    let winh = winH();
    let srcT = document.documentElement.scrollTop;
    let temp = getMinLi()
    let targ = offset(temp).top + temp.clientHeight;
    if (targ < winh + srcT) {
        getdata()
    }
}
window.onscroll = function () {
    loadAll();
    loadMore();
}
function loadImg(ele) {
    if (ele.loaded) return;
    let wiH = winH();
    let srcT = document.documentElement.scrollTop;
    let tar = offset(ele).top;
    if (tar < wiH + srcT) {
        let realSrc = ele.getAttribute('realSrc')
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            temp = null;
            fadeIn(ele);
        }
        ele.loaded = true;
    }
}
function loadAll() {
    let imgs = document.querySelectorAll('.img_box img');
    [...imgs].forEach(item => loadImg(item))
}

function fadeIn(ele) {
    ele.style.opacity = 0;
    let a = 0
    ele.timer = setInterval(() => {
        a += 0.01;
        if (a >= 1) {
            clearInterval(ele.timer);
            a = 1
        }
        ele.style.opacity = a;
    }, 17)
} */



let { getCss, setCss, winH, offset } = utils;
let oLis = document.querySelectorAll('.main>li');
let flag = false
function init() {
    [...oLis].forEach(item => { item.innerHTML = '' })
};
init()
function getdata() {
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /304|200/.test(xhr.status)) {
            flag = false;
            let data = JSON.parse(xhr.response)
            renderHTML(data);
            loadAll();
        }
    }
    xhr.send();
}
getdata();
function renderHTML(ary) {
    ary.forEach(item => {
        let { pic, desc, height, author } = item;
        let str = `
                      <div class="img_box">
                        <img style = 'height:${height}' src="./1.gif" realSrc = '${pic}'>
                      </div>
                      <p class="desc">${desc}</p>
                      <div class="author">${author}</div>
                   `
        let temp = getMinLi()
        let div = document.createElement('div')
        div.className = 'pic_box';
        div.innerHTML = str;
        temp.appendChild(div);
    })
}
function getMinLi() {
    let ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight;
    }) 
    return ary[0];
};
function loadMore() {
    if (flag)return;
    let winh = winH();
    let srcT = document.documentElement.scrollTop;
    let temp = getMinLi();
    let tarT = offset(temp).top + temp.clientHeight;
    if (tarT < winh + srcT) {
        getdata()
    }
};
window.onscroll = function() {
    loadMore();
    loadAll(); 
}
function loadImg(ele) {
    if (ele.loaded) return;
    let win = winH();
    let srcT = document.documentElement.scrollTop;
    let tar = offset(ele).top;
    if (tar < win + srcT) {
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            temp = null;
            fadeIn(ele);
        }
        ele.loaded = true;
    }
}
function loadAll() {
    let imgs = document.querySelectorAll('.img_box img');
    [...imgs].forEach(item => loadImg(item))
}
function fadeIn(ele) {
    ele.style.opacity = 0;
    let a = 0;
    ele.timer = setInterval(() => {
        a += 0.01;
        if (a >= 1) {
            clearInterval(ele.timer)
            a = 1
        }
        ele.style.opacity = a
    }, 17)
}

