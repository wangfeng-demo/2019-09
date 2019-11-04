let slideBox = document.querySelector('#slideBox');

function swiperInt() {
  var swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    loop: true,
    autoplay: true
  });
}

function getData(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
      let data = JSON.parse(xhr.response)
      cb && cb(data)
    }
  }
  xhr.send();
}
getData('./data/banner.json', function (data) {
  render(data);
  swiperInt()
})
getData('./data/list.json', function (data) {
  renderList(data);
})
let listBox = document.querySelector('.list_box');

function renderList(ary) {
  let str = '';
  ary.forEach(item => {
    if (item.type == 0) {
      str += `
      <div class="list">
      <div class="textBox">
      <p>搜到收到佛</p>
      <div class="commentBox">
          <span class="icon_com"></span>
          <span>${item.commentNum}</span>
          <span>环球书包</span>
      </div>
  </div>
  </div>`
    } else {
      str += `
      <div class="list">
      <div class="textBox">
            <p>搜到收到佛</p>
            <div class="commentBox">
                <span class="icon_com"></span>
                <span>${item.commentNum}</span>
                <span>环球书包</span>
            </div>
        </div>
        <div class="imgBox">
            <img src="${item.img[0]}" alt="">
        </div>
        </div>`
    }
    listBox.innerHTML = str; 
  })
}

function render(ary) {
  let str = '';
  ary.forEach(item => {
    let {
      img,
      title
    } = item;
    str += `<div class="swiper-slide">
   <img src="${img}" alt="">
   <p>${title}</p>
   </div>
   `
  });
  slideBox.innerHTML = str;
}