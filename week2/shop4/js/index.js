    let dataAry;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data1.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dataAry = JSON.parse(xhr.response);
        }
    }
    xhr.send();
let mainBox = document.querySelector('main')
function renderHTML(ary) {
    str = '';
    ary.forEach(item => {
        let { img, title, price, num, time } = item;
        str += ` <div class="good_box">
        <div class="pic_box">
            <img src="${img}"
                alt="HUAWEI nova 5i Pro 6GB+128GB 全网通版（翡冷翠)">
        </div>
        <div class="desc">${title}</div>
        <div class="title">赠配件好礼 6期免息</div>
        <div class="price">￥${price}</div>
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
        return (a.num - b.num) * flag
    })
    renderHTML(dataAry);
}
