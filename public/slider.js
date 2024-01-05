const delay = 500;
let currentSlide = 1;
const animatedDelay = 3000;

const slider = document.querySelector('.slider')
slider.addEventListener('click', (event) => {
    if(!event.target.classList.contains('slider__icon')) return ;
    currentSlide = parseInt(event.target.dataset.id)
    showSliderId(currentSlide)
    console.log(currentSlide, 'currentSlide')
})

initSlider()

function showSliderId(id) {
    const current = slider.querySelector('[data-slide = "' + id + '"]')
    slider.querySelectorAll('.slider__slide').forEach((slide) => {
        slide.style.opacity = 0
        setTimeout(() => {
            slide.classList.add('hide')
        }, delay)
    })

    setTimeout(() => {
        current.classList.remove('hide')
        current.style.opacity = 1
    }, delay)
}

function initSlider() {
    setInterval(() => {
        showSliderId(getSliderId())
    }, animatedDelay)
}

function getSliderId() {
    currentSlide++
    currentSlide = currentSlide % 4 === 0 ? 1 : currentSlide
    return currentSlide
}
