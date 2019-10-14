let $box = $('#box'),
    $ul = $('#box .img_box ul'),
    $olis = $('#box img_bx ul li'),
    $btnBox = $('#box .btn_box'),
    $tipBox = $('#box .tip_box'),
    $tips = $('#box .tip_box .tip')
$leftBtn = $('#box .left_btn'),
    $rightBtn = $('#box .right_btn');
let timer = null,
    n = 0;

function getData() {
    $.ajax({
        url: './data.json',
        type: 'get',
        success: function (data) {
            render(data);
            init();
            aotuMove();
            tipClass();
        }
    })
}
getData();

function render(ary) {
    let str = '',
        tipStr = '';
    ary.forEach((item, index) => {
        str += `
             <li><img src="${item.pic}" alt="">
               <p class="desc">${item.desc}</p>
              </li>`
        tipStr += (index == 0 ? `<span class="tip current"></span>` : ` <span class="tip"></span>`)
    });
    $ul.html(str);
    $tipBox.html(tipStr);
}

function init() {
    $olis = $('#box .img_box ul li');
    $tips = $('#box .tip_box .tip');
    $olis.eq(0).siblings().hide();
}

function aotuMove() {
    timer = setInterval(() => {
        move();
    }, 2000)
}

function move() {
    n++;
    if (n >= $olis.length) {
        n = 0;
    }
    $olis.eq(n).css({
        opacity: 0
    }).show().animate({
        opacity: 1
    }, 1000).siblings().animate({
        opacity: 0
    }, 300, function () {
        $olis.eq(n).siblings().hide();
        aotuFoucs();
    })
}

function aotuFoucs() {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}

$box.on('mouseenter', function () {
    clearInterval(timer);
})
$box.on('mouseleave', function () {
    aotuMove();
})

$rightBtn.on('click', _.throttle(function () {
    move();
}, 500))
$leftBtn.on('click', _.throttle(function () {
    n--;
    if (n < 0) {
        n = $olis.length - 1;
    }
    n--;
    move()
}, 500))

function tipClass() {
    $tips.on('click', function () {
        let m = $(this).index();
        n = m;
        n--;
        move()
    })
}