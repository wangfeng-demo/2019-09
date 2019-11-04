// var banner =(function () {
//     let idSelector='';
//     let $box=null,
//         $ul=null,
//         $lis=null,
//         $tipBox=null,
//         $tips=null,
//         $leftBtn=null,
//         $rightBtn=null;
    
//     let n=0,timer=null;
//     function throttle(fn, wait = 500) {
//         var flag = true;
//         return function () {
//             if (!flag) return;
//             flag = false;
//             setTimeout(() => {
//                 flag = true;
//                 fn.call(this, ...arguments)
//             }, wait)
//         }
//     }
//     function initEle() {
//         $box=$(idSelector);    
//         $ul=$box.find('.img_box ul'),
//         $lis=$box.find('.img_box ul li'),
//         $tipBox=$box.find('.tip_box'),
//         $tips=$tipBox.children('.tip'),
//         $leftBtn=$box.find('.left_btn'),
//         $rightBtn=$box.find('.right_btn'); 
//         $lis.eq(0).siblings().hide();   
//     }

//     function getData() {
//         $.ajax({
//             type: 'get',
//             url: './data.json',
//             success: function (data) {
//                 render(data)
//                 initEle();
//                 autoMove();
//                 evenBind()
              
//             },
//             error:function () {
//                 alert('error');
//             }
//         })
//     }

//     function render(data) {
//         let str = '';
//         let tipstr = '';
//         data.forEach((item, index) => {
//             str += `<li>
//             <img src="${item.pic}" alt="">
//             <p>${item.desc}</p>
//             </li>`;
//             tipstr += (index == 0 ? `<span class="tip current"></span> ` : `<span class="tip"></span> `);
//         });
//         $ul.html(str);
//         $tipBox.html(tipstr);
//     }

//     function move() {
//         n++;
//         if (n>$lis.length-1) {
//             n=0;
//         }
//         $lis.eq(n).css({opacity:0}).show().animate({opacity:1},300).siblings().animate({opacity:0},200,function () {
//             $lis.eq(n).siblings().hide()
//         })
//         aotoFoucs()
//     }

//     function autoMove() {
//         timer=setInterval(() => {
//             move();
//         }, 1000);
//     }

//      function aotoFoucs(){
//          $tips.eq(n).addClass('current').siblings().removeClass('current')
//      }

//      function evenBind(){
//         $box.on('mouseenter', function () {
//             clearInterval(timer);
//         })
//         $box.on('mouseleave', function () {
//             autoMove()
//         })
        
//         $rightBtn.on('click',throttle(function () {
//             move();
//         }))

//         $leftBtn.on('click',throttle(function () {
//             n--;
//             if (n < 0) {
//                 n = $lis.length - 1;
//             }
//             n--;
//             move()
//         }))

//         $tips.on('click', function () {
//                 let m = $(this).index();
//                 n = m;
//                 n--;
//                 move()
//             })
//      }
//     return {
//         init(id){
//             idSelector=id;
//             getData();
//             initEle();
//         }
//     }
// })()
// banner.init('#box');

// 封装成jq插件

// $.extend({
//     qqq(){
//         console.log(666);
        
//     }
// })
// $.fn.extend({
//     bannerInit:banner.init
// })
// $('#box').bannerInit()


let bannerMoudle = (function () {
    let idSelector='';
    let $box=null,
        $ul=null,
        $lis=null,
        $tipBox=null,
        $tips=null,
        $leftBtn=null,
        $rightBtn=null;

    let n = 0,timer = null;

//节流
    function throttle(fn, wait = 500) {
                 var flag = true;
                 return function () {
                     if (!flag) return;
                     flag = false;
                     setTimeout(() => {
                         flag = true;
                         fn.call(this, ...arguments)
                     }, wait)
                 }
             }

    //获取元素

    function initEle() {
        $box=$(idSelector);    
        $ul=$box.find('.img_box ul'),
        $lis=$box.find('.img_box ul li'),
        $tipBox=$box.find('.tip_box'),
        $tips=$tipBox.children('.tip'),
        $leftBtn=$box.find('.left_btn'),
        $rightBtn=$box.find('.right_btn'); 
        $lis.eq(0).siblings().hide();   
    }
// 获取数据
    let queryData = function (callback) {
        $.ajax({
            url: './data.json',
            type: 'get',
            async: true,
            success: result => {
                callback && callback(result);
            }
        })
    }
// 渲染数据
    function render(data) {
        let str = '';
        let tipstr = '';
        data.forEach((item, index) => {
            str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.desc}</p>
            </li>`;
            tipstr += (index == 0 ? `<span class="tip current"></span> ` : `<span class="tip"></span> `);
        });
        $ul.html(str);
        $tipBox.html(tipstr);
    }
//轮播
    function move() {
        n++;
        if (n>$lis.length-1) {
            n=0;
        }
        $lis.eq(n).css({opacity:0}).show().animate({opacity:1},300).siblings().animate({opacity:0},200,function () {
            $lis.eq(n).siblings().hide()
        })
        aotoFoucs()
    }
//自动轮播
    function autoMove() {
        timer=setInterval(() => {
            move();
        }, 1000);
    }
    function aotoFoucs(){
        $tips.eq(n).addClass('current').siblings().removeClass('current')
    }
//绑定事件
    function evenBind(){
       $box.on('mouseenter', function () {
           clearInterval(timer);
       })
       $box.on('mouseleave', function () {
           autoMove()
       })
       
       $rightBtn.on('click',throttle(function () {
           move();
       }))

       $leftBtn.on('click',throttle(function () {
           n--;
           if (n < 0) {
               n = $lis.length - 1;
           }
           n--;
           move()
       }))

       $tips.on('click', function () {
               let m = $(this).index();
               n = m;
               n--;
               move()
           })
    }
    return {
        init(id) {
            idSelector=id;
            initEle();
            queryData(function anonymous(data) {
                render(data)
                initEle();
                autoMove();
                evenBind()
            })
        }
    }
})()
bannerMoudle.init('#box');