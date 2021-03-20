var imgs = document.querySelector('.imgs');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var circle = document.querySelectorAll('.circle');
var num = 0;

left.onclick = function() {
    move(1);
}

right.onclick = function() {
    move(-1);
}

function move(step) {
    num += step;
    if (num < -2) {
        num = 0;
    }
    if (num > 0) {
        num = -2;
    }
    imgs.style.left = num * 800 + 'px';
    clearstyle();
    addstyle(-num);
}

function addstyle(tip) {
    circle[tip].classList.add('active');

}

function clearstyle() {
    for (var i = 0; i < 3; i++) {
        circle[i].classList.remove('active');
    }
}

for (let j = 0; j < circle.length; j++) {
    circle[j].index = j;
    circle[j].onclick = function() {
        clearstyle();
        addstyle(j);
        imgs.style.left = -j * 800 + 'px';
        num = -circle[j].index;
    }



    circle[j].onmouseover = function() {
        clearstyle();
        addstyle(j);
        imgs.style.left = -j * 800 + 'px';
    }

    circle[j].onmouseout = function() {
        clearstyle();
        console.log(num);
        addstyle(-num);
        imgs.style.left = num * 800 + 'px';

    }

}