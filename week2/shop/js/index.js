// 首先把数据从后台获取到  然后渲染到页面上
(function(){
    let dataAry;
    let xhr = new XMLHttpRequest(); //创造实例
    xhr.open('get', './data.json', false);  //   ./data.json  就是数据存放地址  
    xhr.onreadystatechange = function () {     //监听请求数据  获取数据
        if (xhr.status == 200 && xhr.readyState == 4) {
            let data = JSON.parse(xhr.response)
            dataAry = data;
        }
    }
    xhr.send() // 发送请求
    let mianBox = document.querySelector('main');
    // dateAry 就是从后台获取到的数据
    function renderHtml(ary) {  
        let str = '';
        ary.forEach(item => {
            let { img, title, num, price } = item;
            str += `<div class="good_box">
          <div class="img_box">
              <img src="${img}">
          </div>
          <div class="desc">${title}</div>
          <div class="price">${price.toFixed(2)}</div>
          <div class="bot_box">
              <div class="left_box">选购</div>
              <div class="right_box">${num}</div>
          </div>
      </div>`;
        });
        // str 就是拼接好的字符串
        mianBox.innerHTML = str;
    }
    renderHtml(dataAry);
    let timeBtn = document.querySelector('.timeBtn'),
        priceBtn = document.querySelector('.priceBtn'),
        commentBtn = document.querySelector('.commentBtn');
    //先把数据铵价格排序  然后重新渲染
    let flag = 1
    timeBtn.onclick = function () {
        // 把数据按上架时间进行排序
        flag *= -1;
        dataAry.sort((a, b) => {
            return (a.time - b.time) * flag
        });
        renderHtml(dataAry);
    }
    
    priceBtn.onclick = function () {
        // 把数据按上架时间进行排序
        flag *= -1;
        dataAry.sort((a, b) => {
            return (a.price - b.price) * flag
        });
        renderHtml(dataAry);
    }
    commentBtn.onclick = function () {
        // 把数据按上架时间进行排序
        flag *= -1;
        dataAry.sort((a, b) => {
            return (a.num - b.num) * flag
        });
        renderHtml(dataAry);    
    }
})()



let dataAry ;
// 1、通过ajax获取数据
let xhr = new XMLHttpRequest();
xhr.open('get','./data.json',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status == 200){
        // 代表请求成功 
        //xhr.response 是从后台获取到的 JSON 字符串；
        dataAry = JSON.parse(xhr.response)
    }
}
xhr.send();
console.log(dataAry);

//2、把获取到的数据渲染到页面上
let box = document.querySelector('main');
function renderHtml(dataAry) {
    let str = '';//用来拼接DOM结构字符串的；
    dataAry.forEach(item=>{
        let {img,num,price,title,time} = item;
        str += `<div class="good_box" data-time=${time}>
            <div class="img_box">
                <img src="${img}"
                    alt="">
            </div>
            <div class="desc">${title}</div>
            <div class="price" data-price=${price}>￥${(price/100).toFixed(2)}</div>
            <div class="bot_box">
                <div class="left_box">选购</div>
                <div class="right_box" data-num=${num}>评价数${num}</div>
            </div>
        </div>`
    })
    box.innerHTML = str;
}
renderHtml(dataAry);

// 3、操作DOM排序
// let timeBtn = document.querySelector('.timeBtn'),
//     priceBtn = document.querySelector('.priceBtn'),
//     commentBtn = document.querySelector('.commentBtn');

// let goodBox = document.getElementsByClassName('good_box');  

// // 元素.getAttribute('行内属性名')   获取行内属性用的
// // 元素.setAttribute('行内属性名','对应的属性值')  设置行内属性用的

// timeBtn.flag = 1;
// timeBtn.onclick = function(){
//     // 按照时间进行排序
//     // 怎么获取时间？ 或每一个good_box 在这个元素上有一个 dataset的属性
//     // dataset属性值里边只有 行内属性是 data-开头的键值对；
//     this.flag *= -1;
//     let ary = [...goodBox].sort((a,b)=>{
//         return (a.dataset.time - b.dataset.time)*this.flag
//     })
//     // ary 是排好序的数组
//     // 文档碎片 
//     // document.createDocumentFragment
//     ary.forEach(item=>{
//         box.appendChild(item);
//     })
// }
// price  和  num 排序自己实现；