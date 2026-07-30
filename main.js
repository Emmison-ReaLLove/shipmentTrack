const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});

let valueDisplays = document.querySelectorAll(".num");
let interval = 2000;

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor (interval / endValue);
    let counter = setInterval(function () {
        startValue +=1;
        valueDisplay.textContent = startValue;

        if (startValue == endValue){
            clearInterval(counter);
        }
    }, duration);
});

// const preloaderWrapper = document.querySelector('.preloader-wrapper');
// window.addEventListener('load', function(){
//     preloaderWrapper.classList.add('fade-out-animation');
// });