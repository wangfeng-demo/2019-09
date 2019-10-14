let $box = $('#box'),
    $ul = $('#box .img_box ul'),
    $tipBox = $box.find('.tip_box'),
    $tips = $tipBox.children('.tip'),
    $leftBtn = $box.find('.left_btn'),
    $rightBtn = $box.find('.right_btn');

let n = 0,
    timer = null;


//获取数据
function getData() {
    $.ajax({
        type: 'get',
        url: './data2.json',
        success: function (data) {
            render(data);
            tipClick()
        },
        error: function () {

        }
    })
}
getData()
//渲染数据
function render(data) {
    let tipStr = '';
    let str = '';
    data.push(data[0]); //补图
    data.forEach((item, index) => {
        let {
            img,
            desc
        } = item;
        str += `<li>
                <img src="${img}" alt="">
                <p class="desc">${desc}</p>
            </li>`
        if (index == 0) {
            tipStr += `<span class="tip current"></span>\n`
        } else if (index < data.length - 1) {
            tipStr += `<span class="tip"></span>\n`
        }
    });
    $ul.html(str);
    $ul.width(590 * data.length);
    $tipBox.html(tipStr);
    $tips = $tipBox.children('.tip') //更新  $tip
}
//轮播模块
function move() {
    n++;
    if (n > $tips.length) {
        $ul.css('left', 0) //闪到第一张
        n = 1;
    }
    $ul.animate({
        left: -590 * n
    }, 300);
    autoFocus(n)
}

function autoMove() {
    timer = setInterval(() => {
        move();
    }, 2000)
}
autoMove();

//焦点模块
function autoFocus(m) {
    if (m >= $tips.length) {
        m = 0; // $tips.length显示的是伪第一张
    }
    //m就是要有点的那个索引
    $tips.eq(m).addClass('current').siblings().removeClass('current')
}
//鼠标划入
$box.on('mouseenter', function () {
    clearInterval(timer)
})
//鼠标划出
$box.on('mouseleave', function () {
    autoMove()
})

//左按钮
$leftBtn.on('click', function () {
    n--;
    if (n < 0) {
        $ul.css({
            left: -$tips.length * 590
        }); //闪到最后一张
        n = $tips.length - 1;
    }
    $ul.animate({
        left: -n * 590
    }, 200);
    autoFocus(n)
})

//右按钮
$rightBtn.on('click', function () {
    move()
})

function tipClick() {
    $tips.on('click', function () {
       let m = $(this).index();
       n = m;
       $ul.animate({left:-590*m},200)
       autoFocus(m)
    })
}
