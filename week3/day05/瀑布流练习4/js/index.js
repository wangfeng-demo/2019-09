let { getCss, setCss, winH, fadeIn, offset } = utils;
let flag = false
let oLis = document.querySelectorAll('.main>li');
[...oLis].forEach(item => item.innerHTML = '');
let dataAry = null;
function getData() {
    flag = true
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /304|200/.test(xhr.status)) {
            flag = false;
            dataAry = JSON.parse(xhr.response)
            renderHTML(dataAry)
            loadAll()
        }
    }
    xhr.send()
}
getData();
function renderHTML(ary) {
    let str = ''
    ary.forEach(item => {
        let { pic, author, height, desc } = item;
        str = `
                <img style = "height:${height}" src="./img/default.jpg" realSrc = "${pic}" alt="">
                <p class="desc">${desc}</p>
                <div class="author">${author}</div>
           `
        let temp = mainLi()
        let div = document.createElement('div');
        div.className = "pic_box";
        div.innerHTML = str;
        temp.appendChild(div);
    })
}
function mainLi() {
    let arr = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight;
    })
    return arr[0]
}
function loadMore() {
    if (flag) return;
    let winh = winH();
    let temp = mainLi();
    let srcT = document.documentElement.scrollTop;
    let tarT = offset(temp).top + temp.clientHeight;
    if (tarT < srcT + winh) {
        getData()
    }
}
window.onscroll = function () {
    loadAll();
    loadMore();
}
function loadImg(ele) {
    if (ele.loaded) return;
    let win = winH();
    let srcT = document.documentElement.scrollTop;
    let tarT = offset(ele).top
    if (tarT < win + srcT) {
        let realSrc = ele.getAttribute("realSrc");
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
function loadAll(){
    let imgs = document .querySelectorAll('.pic_box>img')
    for (let i = 0; i < imgs.length; i++) {
      loadImg(imgs[i])
    }
}