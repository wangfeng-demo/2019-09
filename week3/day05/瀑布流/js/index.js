let { getCss, setCss, winH, offset,fadeIn } = utils
let flag = false;//数据已经请求完  true 代表正在请求
var oLis = document.querySelectorAll('.box>li')
function init() {
    [...oLis].forEach(item => item.innerHTML = '')
}
init();
//==> 第一步获取数据 
function getData() {
    flag = true;
    var xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            //代表请求成功
            flag = false
            let data = JSON.parse(xhr.response)
            //JSON.stringify()转字符串
            renderHTML(data) //把后台给的数据渲染了
            loadAll();// 保证首屏图片加载出来
        }
    }
    xhr.send();
}
getData();
//==>第二步   渲染数据  renderHTML函数什么时候执行？
function renderHTML(ary) {
    // ary 存储的是每一条数据  那渲染到哪里？渲染到写好的五列中
    ary.forEach((item, index) => {
        //item代表了每一条要去显示的数据
        let { pic, author, height, desc } = item;
        let str = `
                <div class="img">
                    <img style="height:${height}px" src="./img/default.jpg" realSrc = "${pic}"alt="">
                </div>
                <p class="desc">${desc}</p>
                <div class="author">${author}</div>
               `
        //  字符串拼接好之后 怎么想结构里添加
        // 1.挨个添加
        // let n = index % 5//01234
        // oLis[n].innerHTML += str
        //2.每一次都向那个最矮的li里添加
        let temp = getMinLi();
        let div = document.createElement('div');
        div.className = 'pic_box'
        // temp.innerHTML += str;
        div.innerHTML = str;
        temp.appendChild(div)
    })
}
//挑选最矮的li
function getMinLi() {
    //怎么从五个li中挑选最低的  clintHeight
    var ary = [...oLis].sort((a, b) => {
        return a.clientHeight - b.clientHeight
    })
   /*  console.log(ary); */
    return ary[0];
}
//==>第三步 滚动加载新数据
function loadMore() {
    if(flag)return;// flag 为 ture 代表数据正在加载  这是我们不应该在去加载数据
    // 1.什么时候加载新数据？ ---  当最短的li露出底部的时候
    // 2.怎么加载新数据    ---  
    let srcT = document.documentElement.scrollTop;//卷去的高度
    let wH = winH()//一屏幕的高度
    let temp = getMinLi()//获取最低的li
    let tarT = offset(temp).top + temp.clientHeight//元素到body的距离，加上元素本身的高度，就是元素底边到body的距离
    if (tarT < srcT + wH) {
        // 底部露出之后 加载新数据
        console.log(111);
        getData();
    }
}
window.onscroll = function () {
    loadMore();
  this.loadAll();// 保证首屏图片加载出来
}
function loadImg(ele) {
    if(ele.loaded)return;
    let scrT = document.documentElement.scrollTop;
    let wH = winH();
    let tarT = offset(ele).top;
    if (tarT < scrT+wH) {
        //图片更换地址
        let realSrc = ele.getAttribute('realSrc');  
        let temp = new Image()
        temp.src = realSrc;
        temp.onload = function(){
            ele.src = realSrc;
            temp = null;
            ele.loaded = true;
            fadeIn(ele);
        }
    }
}
function loadAll() {
    //  获取的img 然后挨个执行 loadImg()
    let imgs = document.querySelectorAll('.box img');
    [...imgs].forEach(item=>loadImg(item))
}

function fadeIn(ele) {
    ele.style.opacity = 0;
    let a = 0;
    ele.timer = setInterval(() => {
        a += 0.05;
        if (a > 1) {
            a = 1;
            clearInterval(ele.timer)
        }
        ele.style.opacity = a;
    }, 20);
}




