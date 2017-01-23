const CLOTH = document.getElementById("cloth");

function respons() {
    if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
        CLOTH.style.width = 80 + "vw";
        CLOTH.style.height = 80 + "vw";
    }else{
        CLOTH.style.width = 80 + "vh";
        CLOTH.style.height = 80 + "vh";
    }
};

respons();

const CLOTHCOORDS = CLOTH.getBoundingClientRect();
const CLOTHINNERCOORDS = {
    top: CLOTHCOORDS.top + CLOTH.clientTop,
    left: CLOTHCOORDS.left + CLOTH.clientLeft
};

window.addEventListener('resize', function(CLOTHCOORDS){
    CLOTHCOORDS=CLOTH.getBoundingClientRect();
    CLOTHINNERCOORDS.top= CLOTHCOORDS.top + CLOTH.clientTop;
    CLOTHINNERCOORDS.left= CLOTHCOORDS.left + CLOTH.clientLeft;
    respons();
}, true);


function Create() {
    let Animate = document.createElement('div');
    Animate.className = "animate-block";
    let centrAnimateCoords = document.documentElement.clientHeight * 1.2;
    Animate.style.top = event.clientY - CLOTHINNERCOORDS.top - centrAnimateCoords + "px";
    Animate.style.left = event.clientX - CLOTHINNERCOORDS.left - centrAnimateCoords + "px";

    let changeColor = document.createElement('div');
    changeColor.className = "change-color";

    Animate.appendChild(changeColor);
    CLOTH.appendChild(Animate);

    const RANDOMCOLOR = randomColor();

    changeColor.style.background = RANDOMCOLOR;

    animate(function () {
        changeColor.style.width = 100 + "%";
        changeColor.style.height = 100 + "%";
    });

    setTimeout(function () {
        CLOTH.removeChild(Animate);
    }, 3000);

    setTimeout(function () {
        CLOTH.style.background = RANDOMCOLOR;
    }, 2000);
}

CLOTH.addEventListener("click", Create);

function randomColor() {
    return ('#' + Math.floor(Math.random() * 16777215).toString(16))
}

function animate(draw, duration) {
    let start ;
    requestAnimationFrame(function animate(time) {
        let timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }
    });
}