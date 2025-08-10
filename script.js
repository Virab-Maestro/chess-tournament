//Players slider
const pSliderInner = document.querySelector(".players__slider-inner"),
    pSlides = document.querySelectorAll(".players__slide"),
    pSlidedVal = document.querySelector(".players__slider-pagination .slider__slided"),
    pTotalVal = document.querySelector(".players__slider-pagination .slider__total"),
    pSlidesToShow = Number(window.getComputedStyle(document.body).getPropertyValue("--player-slides-to-show")),
    pSlideWidth = Number(window.getComputedStyle(pSlides[0]).width.match(/(-?\d+)px$/)[1]),
    pSlideGap = Number(window.getComputedStyle(pSliderInner).gap.match(/(-?\d+)px$/)[1]),
    pOffsetToLastSlide = -(pSlides.length - pSlidesToShow) * (pSlideWidth + pSlideGap);

//initializing slider position(nums)
pSlidedVal.textContent = pSlides.length > pSlidesToShow ? pSlidesToShow : pSlides.length;
pTotalVal.textContent = pSlides.length;
function pSetPagination(direction) {//0 - prev; 1 - next
    if(direction == 0 && pSlidedVal.textContent <= pSlidesToShow) {
        pSlidedVal.textContent = pTotalVal.textContent;
        return;
    }else if(direction == 1 && pSlidedVal.textContent == pSlides.length) {
        pSlidedVal.textContent = pSlides.length > pSlidesToShow ? pSlidesToShow : pSlides.length;
        return;
    }

    if(direction == 0) {
        console.log('ch0')
        pSlidedVal.textContent = +pSlidedVal.textContent - 1;
    }else {
        console.log('ch1')
        pSlidedVal.textContent = +pSlidedVal.textContent + 1;
    }
}

//next, prev
pSliderInner.style.transform = "translateX(0px)";
function pPrevSlide() {
    //restart sliding interval
    clearInterval(slideInterval);
    slideInterval = setInterval(pNextSlide, 4000)

    //update slided number preview
    pSetPagination(0);

    //slide
    const currentOffset =  pSliderInner.style.transform.match(/\w+\((-?\d+)px\)$/)[1];
    if(currentOffset == 0 && pSlides.length > pSlidesToShow) {
        pSliderInner.style.transform = `translateX(${pOffsetToLastSlide}px)`;
        return;
    }
    if(pSlides.length > pSlidesToShow) {
        pSliderInner.style.transform = `translateX(${+currentOffset + (pSlideWidth + pSlideGap)}px)`;
    }
}

function pNextSlide() {
    //restart sliding interval
    clearInterval(slideInterval);
    slideInterval = setInterval(pNextSlide, 4000)

    //update slided number preview
    pSetPagination(1);

    //slide
    const currentOffset =  pSliderInner.style.transform.match(/\w+\((-?\d+)px\)$/)[1];
    if(currentOffset == pOffsetToLastSlide) {
        pSliderInner.style.transform = `translateX(0px)`;
        return;
    }
    if(pSlides.length > pSlidesToShow) {
        pSliderInner.style.transform = `translateX(${+currentOffset - (pSlideWidth + pSlideGap)}px)`;
    }

}
//slide every 4s
let slideInterval = setInterval(pNextSlide, 4000);

//Steps slider
const stSliderInner = document.querySelector(".steps__slider-inner"),
    stSlides = document.querySelectorAll(".steps__slide"),
    stSliderPos = document.querySelector(".steps__pag-info"),
    stSliderBtns = document.querySelectorAll(".steps__slider-btn"),
    stSliderPrev = document.querySelector(".steps__slider-btn.slider-button-prev"),
    stSliderNext = document.querySelector(".steps__slider-btn.slider-button-next"),
    stSlidesToShow = Number(window.getComputedStyle(document.body).getPropertyValue("--step-slides-to-show")),
    stSlideWidth = Number(window.getComputedStyle(stSlides[0]).width.match(/(-?\d+)px$/)[1]),
    stSlideGap = Number(window.getComputedStyle(stSliderInner).gap.match(/(-?\d+)px$/)[1]),
    stOffsetToLastSlide = -(stSlides.length - stSlidesToShow) * (stSlideWidth + stSlideGap);

//initializing slider position(dots)
for(let i = 0; i < stSlides.length; i++) { //insert dots to dom
    stSliderPos.innerHTML += `<span class="slider-dot"></span>`
}
stSliderDots = document.querySelectorAll(".slider-dot"); //get dots from dom
let activeSlideIdx = null; // active dot
if(stSlides.length > stSlidesToShow) { //find active dot idx
    activeSlideIdx = stSlidesToShow - 1;
}else {
    activeSlideIdx = stSlides.length - 1;
}
stSliderDots[activeSlideIdx].classList.add("slider-dot--active"); //color active dot

function stSetPos(direction) {//0 - prev; 1 - next
    // disable current active dot
    for(let dot of stSliderDots) {
        dot.classList.remove("slider-dot--active");
    }
    // color new active dot
    if(direction == 0) {
        activeSlideIdx--;
    }else {
        activeSlideIdx++;
    }
    stSliderDots[activeSlideIdx].classList.add("slider-dot--active");

    //update disable button
    for(let btn of stSliderBtns) {
        btn.classList.remove("button-disabled");
    }
    if(activeSlideIdx == 0) {
        stSliderPrev.classList.add("button-disabled");
    }else if(activeSlideIdx == stSlides.length - 1) {
        stSliderNext.classList.add("button-disabled");
    }
}

//next, prev
stSliderInner.style.transform = "translateX(0px)";
function stPrevSlide() {
    //slide
    const currentOffset =  stSliderInner.style.transform.match(/\w+\((-?\d+)px\)$/)[1];
    if(currentOffset == 0) {
        return;
    }

    //update slided number preview
    stSetPos(0);
    if(stSlides.length > stSlidesToShow) {
        stSliderInner.style.transform = `translateX(${+currentOffset + (stSlideWidth + stSlideGap)}px)`;
    }
}

function stNextSlide() {
    //slide
    const currentOffset =  stSliderInner.style.transform.match(/\w+\((-?\d+)px\)$/)[1];
    if(currentOffset == stOffsetToLastSlide) {
        return;
    }

    //update slided number preview
    stSetPos(1);
    if(stSlides.length > stSlidesToShow) {
        stSliderInner.style.transform = `translateX(${+currentOffset - (stSlideWidth + stSlideGap)}px)`;
    }

}

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
