(function () {
    let dataAry;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data1.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dataAry = JSON.parse(xhr.response)
            renderHTML(dataAry);
        }
    }
    xhr.send();


    let mainBox = document.querySelector('main'),
        timeBtn = document.querySelector('.timeBtn'),
        priceBtn = document.querySelector('.priceBtn'),
        commentBtn = document.querySelector('.commentBtn');
    function renderHTML(ary) {
        let str = '';
        ary.forEach(item => {
            let { num, price, title, time, img } = item;
            str += `<div class="good_box">
            <div class="pic_box">
                <img src="${img}" alt="">
            </div>
            <div class="desc">${title}</div>
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
    let flag = 1;
    timeBtn.onclick = function () {
        flag *= -1;
        dataAry.sort((a, b) => {
            return (a.time - b.time) * flag
        });
        renderHTML(dataAry);
    }
    priceBtn.onclick = function () {
        flag *= -1;
        dataAry.sort((a, b) => {
            return (a.price - b.price) * flag
        });
        renderHTML(dataAry);
    }
    commentBtn.onclick = function () {
        flag *= -1;
        dataAry.sort((a, b) => {
            return (a.num - b.num) * flag
        });
        renderHTML(dataAry);
    }
})()