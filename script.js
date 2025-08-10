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


//Players slider
const sliderInner = document.querySelector(".players__slider-inner"),
    slides = document.querySelectorAll(".players__slide"),
    slidedVal = document.querySelector(".players__slider-pagination .slider__slided"),
    totalVal = document.querySelector(".players__slider-pagination .slider__total"),
    slidesToShow = Number(window.getComputedStyle(document.body).getPropertyValue("--slides-to-show")),
    slideWidth = Number(window.getComputedStyle(slides[0]).width.match(/(-?\d+)px$/)[1]),
    slideGap = Number(window.getComputedStyle(sliderInner).gap.match(/(-?\d+)px$/)[1]),
    offsetToLastSlide = -(slides.length - slidesToShow) * (slideWidth + slideGap);

//initializing slider position(nums)
slidedVal.textContent = slides.length > slidesToShow ? slidesToShow : slides.length;
totalVal.textContent = slides.length;
function setPos(direction) {//0 - prev; 1 - next
    if(direction == 0 && slidedVal.textContent <= slidesToShow) {
        slidedVal.textContent = totalVal.textContent;
        return;
    }else if(direction == 1 && slidedVal.textContent == slides.length) {
        slidedVal.textContent = slides.length > slidesToShow ? slidesToShow : slides.length;
        return;
    }

    if(direction == 0) {
        console.log('ch0')
        slidedVal.textContent = +slidedVal.textContent - 1;
    }else {
        console.log('ch1')
        slidedVal.textContent = +slidedVal.textContent + 1;
    }
}

//next, prev
sliderInner.style.transform = "translateX(0px)";
function prevSlide() {
    //restart sliding interval
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000)

    //update slided number preview
    setPos(0);

    //slide
    const currentOffset =  sliderInner.style.transform.match(/\w+\((-?\d+)px\)$/)[1];
    if(currentOffset == 0 && slides.length > slidesToShow) {
        sliderInner.style.transform = `translateX(${offsetToLastSlide}px)`;
        return;
    }
    if(slides.length > slidesToShow) {
        sliderInner.style.transform = `translateX(${+currentOffset + (slideWidth + slideGap)}px)`;
    }
}

function nextSlide() {
    //restart sliding interval
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000)

    //update slided number preview
    setPos(1);

    //slide
    const currentOffset =  sliderInner.style.transform.match(/\w+\((-?\d+)px\)$/)[1];
    if(currentOffset == offsetToLastSlide) {
        sliderInner.style.transform = `translateX(0px)`;
        return;
    }
    if(slides.length > slidesToShow) {
        sliderInner.style.transform = `translateX(${+currentOffset - (slideWidth + slideGap)}px)`;
    }

}

//slide every 4s
let slideInterval = setInterval(nextSlide, 4000);


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
