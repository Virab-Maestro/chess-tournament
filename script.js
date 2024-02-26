//Desktop slider steps
const steps = new Swiper(".steps__slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
    //   type: 'custom',
    },
    navigation:{
        nextEl: ".players-button-next",
        prevEl: ".players-button-prev"
    }
});

//Desktop slider players
let players = new Swiper(".swiper__desktop", {
    slidesPerView: 3,
    spaceBetween: 30,

    pagination: {
      el: ".swiper-pagination",
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return 2 + current + '<span>' + '/' + (swiper.slides.length) + '</span>'; 
      }
    },
    navigation:{
        nextEl: ".players-button-next",
        prevEl: ".players-button-prev"
    }
});
//laptop slider players
players = new Swiper(".swiper__laptop", {
    slidesPerView: 2,
    spaceBetween: 30,

    pagination: {
      el: ".swiper-pagination",
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return 1 + current + '<span>' + '/' + (swiper.slides.length) + '</span>'; 
      }
    },
    navigation:{
        nextEl: ".players-button-next",
        prevEl: ".players-button-prev"
    }
});
//mobile slider players
players = new Swiper(".swiper__mobile", {
    slidesPerView: 1,
    spaceBetween: 30,

    pagination: {
      el: ".swiper-pagination",
      type: 'custom',
      renderCustom: function (swiper, current, total) {
          return current + '<span>' + '/' + (swiper.slides.length) + '</span>'; 
      }
    },
    navigation:{
        nextEl: ".players-button-next",
        prevEl: ".players-button-prev"
    }
});

//Animations

const animatedElements = document.querySelectorAll('.animation-hide');

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('animation-show');
        }
    })
})

animatedElements.forEach(el=>{
    observer.observe(el);
})

// slidesPerView according to the screen size (for test)
// window.addEventListener('resize', function() {
//     if (screen.width > 1024) {
//         slidesPerView = 3;
//     }else if(screen.width <= 1024){
//         slidesPerView = 2;
//     }
//     else if(screen.width <= 768){
//         slidesPerView = 1;
//     }
//     // console.log('resized')
//     players = new Swiper(".swiper", {
//         slidesPerView: slidesPerView,
//         spaceBetween: 30,
//         watchOverflow: true,
//         pagination: {
//           el: ".swiper-pagination",
//           type: 'custom',
//           renderCustom: function (swiper, current, total) {
//               console.log(swiper);
//               return 2 + current + '/' + (swiper.slides.length); 
//           }
//         },
//         navigation:{
//             nextEl: ".players-button-next",
//             prevEl: ".players-button-prev"
//         }
//     });
// })

// slidesPerView according to the screen size
// if (screen.width > 1024) {
//     slidesPerView = 3;
//     changePlayersSlidesCount(slidesPerView);
// }else if(screen.width <= 1024 && screen.width > 640){
//     slidesPerView = 2;
//     changePlayersSlidesCount(slidesPerView);
// }
// else if(screen.width <= 640){
//     slidesPerView = 1;
//     changePlayersSlidesCount(slidesPerView);
// }