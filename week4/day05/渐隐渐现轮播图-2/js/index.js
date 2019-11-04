let $box = $('#box'),
    $ul = $box.find('ul'),
    $olis = $box.find('li'),
    $tipBox = $box.find('.tip_box'),
    $tips = $tipBox.children('.tip'),
    $leftBtn = $box.find('.left_btn'),
    $rightBtn = $box.find('.right_btn');
let timer = null,
    n = 0;
    function throttle(fn, wait = 500) {
        let flag = true;
        return function () {
            if (!flag) return;
            flag = false;
            setInterval(() => {
                flag = true;
                fn.call(this, ...argument)
            }, wait)
        }
    }

function getData() {
    $.ajax({
        url: './data.json',
        type: 'get',
        success: function (data) {
            render(data)
            init();
            autoMove();
            tipClick()
        }
    })
}
getData();

function render(ary) {
    let str = '',
        tipSrc = '';
    ary.forEach((item, index) => {
        str += `<li><img src="${item.pic}" alt="">
            <p class="desc">${item.desc}</p></li>`
        tipSrc += (index == 0 ? `<span class="tip current"></span>` : ` <span class="tip"></span>`)
    })
    $ul.html(str);
    $tipBox.html(tipSrc);
}

function init() {
    $olis = $box.find('li'),
        $tips = $tipBox.children('.tip'),
        $olis.eq(0).siblings().hide();
}

function autoMove() {
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
        aotuFoucs()
    })
}

function aotuFoucs() {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}

$box.on('mouseenter', function () {
    clearInterval(timer)
})
$box.on('mouseleave', function () {
    autoMove()
})

$rightBtn.on('click',function () {
    move();
})
$leftBtn.on('click',function () {
    n--;
    if (n < 0) {
        n = $olis.length - 1;
    }
    n--;
    move();
})

function tipClick() {
    $tips.on('click', function () {
        let index = $(this).index()
        n = index;
    })
    n--;
    move();
}
