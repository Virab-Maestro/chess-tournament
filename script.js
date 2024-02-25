// new Swiper('.swiper');
new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    watchOverflow: true,
    pagination: {
      el: ".swiper-pagination",
      type: 'custom',
      renderCustom: function (swiper, current, total) {
          console.log(swiper);
          return 2 + current + '/' + (swiper.slides.length); 
      }
    },
    navigation:{
        nextEl: ".players-button-next",
        prevEl: ".players-button-prev"
    }
  });