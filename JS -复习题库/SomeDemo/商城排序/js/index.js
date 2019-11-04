~function(){
    let mainBox = document.querySelector('main'),
        timeBtn = document.querySelector('.timeBtn'),
        priceBtn = document.querySelector('.priceBtn'),
        commentBtn = document.querySelector('.commentBtn');
        let dataAry = null;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data1.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            dataAry = JSON.parse(xhr.response);
            renderHTML(dataAry);
            bind()
        }
    }
    xhr.send();
    function renderHTML(ary) {
        let str = '';
        ary.forEach(item => {
            let { img, price, num, desc } = item;
            str += `<div class="good_box">
                <div class="pic_box">
                    <img src="${img}" alt="">
                </div>
                <div class="desc">${desc}</div>
                <div class="price">￥${price}</div>
                <div class="tab_box">
                    <div class="left">选购</div>
                    <div class="right">${num}人评价</div>
                </div>
            </div>`
        });
        mainBox.innerHTML = str;
    };
    function bind() {
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
    }
}()

