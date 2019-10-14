let { winH, offset, fadeIn } = utils;
let oLis = document.querySelectorAll('.main>li');
[...oLis].forEach(item => item.innerHTML = '');
let flag = false
function getData() {
    flag = true
    let dataAry = null;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)){
            dataAry = JSON.parse(xhr.response)
            flag = false;
            renderHTML(dataAry);
            loadAll()
        }
    }
    xhr.send();
}
getData();
function renderHTML(ary) {
    let str = '';
    ary.forEach(item => {
        let { pic, height, author, desc } = item;
        str = ` <img style = "height:${height}px" realSrc = "${pic}" src="./img/default.jpg" alt="">
            <p class="desc">${desc}</p>
            <div class="author">${author}</div>`
        let temp = minLi();
        let div = document.createElement('div');
        div.className = 'pic_box';
        div.innerHTML = str;
        temp.appendChild(div)
    })
}
function minLi() {
    let ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight;
    })
    return ary[0];
}
function loadMore() {
    if(flag)return;
    let srcT = document.documentElement.scrollTop;
    let win = winH();
    let temp = minLi()
    let tarT = offset(temp).top + temp.clientHeight;
    if (tarT < win + srcT) {
        getData();
    }
}
window.onscroll = function () {
    loadMore();
    loadAll()
}
function loadImg(ele) {
    if(ele.loaded)return;
    let srcT = document.documentElement.scrollTop;
    let win = winH();
    let tarT = offset(ele).top;
    if (tarT < win + srcT){
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src= realSrc;
        temp.onload = function(){
            ele.src = realSrc;
            temp = null;
        ele.loaded = true;
            fadeIn(ele);
        }
    }
}
function loadAll(){
    let imgs = document.querySelectorAll('.pic_box>img');
    [...imgs].forEach(item=>loadImg(item))
}