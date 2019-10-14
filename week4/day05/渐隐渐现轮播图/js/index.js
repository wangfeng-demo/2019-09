let $box = $('#box'),
    $ul = $('#box .img_box ul'),
    $lis = $('#box .img_box ul li'),
    $tipBox = $('#box .tip_box'),
    $tips = $('#box .tip_box .tip'),
    $leftBtn = $('#box .left_btn'),
    $rightBtn = $('#box .right_btn');
let timer = null,
    n = 0;

function getData() {
    $.ajax({
        type: 'get',
        url: './data.json',
        success: function (data) {
            render(data);
            init();
            aotuMove();
            topClick()
        }
    })
}
getData();

function render(ary) {
    let str = '',
        tipSrc = '';
    ary.forEach((item, index) => {
        str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.desc}</p>
        </li>`
        tipSrc += (index == 0 ? `<span class="tip current"></span>` : `<span class="tip"></span>`)
    });
    $ul.html(str);
    $tipBox.html(tipSrc)
}

function init() {
    $lis = $('#box .img_box ul li')
    $tips = $('#box .tip_box .tip')
    $lis.eq(0).siblings().hide()
}

function aotuMove() {
    timer = setInterval(() => {
        move();
    }, 2000)
}

function move() {
    n++;
    if (n >= $lis.length) {
        n = 0;
    }
    $lis.eq(n).css({
        opacity: 0
    }).show().animate({
        opacity: 1
    }, 1000).siblings().animate({
        opacity: 0
    }, 300, function () {
        $lis.eq(n).siblings().hide();
    })
    autoFocus()
}

function autoFocus() {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}
$box.on('mouseenter', function () {
    clearInterval(timer);
})
$box.on('mouseleave', function () {
    aotuMove();
})

$rightBtn.on('click',_.throttle( function () {
    move()
},500))
$leftBtn.on('click',_.throttle( function () {
    n--;
    if (n < 0) {
        n = $lis.length - 1;
    }
    n--;
    move();
},500))
/* $tips.on('click',function(){
    
}) */
function topClick(){
    $tips.on('click', function () {
        let m = $(this).index();
        n = m;
        n--
        move();
     })
}
