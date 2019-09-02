/*   let dataAry; */
let xhr = new XMLHttpRequest(); //创造实例
xhr.open('get', './data1.json', false);  //   ./data.json  就是数据存放地址  
xhr.onreadystatechange = function () {     //监听请求数据  获取数据
    if (xhr.status == 200 && xhr.readyState == 4) {
        let data = JSON.parse(xhr.response)
        console.log(data);
        dataAry = data;
    }
}
xhr.send() // 发送请求
let mainBox = document.querySelector('main')
function renderHTML(ary) {
    let str = '';
    ary.forEach(item => {
        let { img, title, price, num } = item;
        str += `<div class="good_box">
            <div class="img_box">
                <img src="${img}"
                    alt="p30">
            </div>
            <div class=desc>${title}</div>
            <div class="price">￥${price.toFixed(2)}</div>
            <div class="tab_box">
                <div class="left">选购</div>
                <div class="right">${num}人评价</div>
            </div>
        </div>`
    });
    mainBox.innerHTML = str;
}
renderHTML(dataAry);

let timeBtn = document.querySelector('.timeBtn'),
    priceBtn = document.querySelector('.priceBtn'),
    commentBtn = document.querySelector('.commentBtn');

let flag = 1;
timeBtn.onclick = function () {
    flag *= -1;
    dataAry.sort((a, b) => {

        return (a.time - b.time) * flag
    })
    renderHTML(dataAry);
}
priceBtn.onclick = function () {
    flag *= -1;
    dataAry.sort((a, b) => {

        return (a.price - b.price) * flag
    })
    renderHTML(dataAry);
}

commentBtn.onclick = function () {
    flag *= -1;
    dataAry.sort((a, b) => {

        return (a.num- b.num) * flag
    })
    renderHTML(dataAry);    
}