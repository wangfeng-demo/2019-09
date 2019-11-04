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
  swiperInt();