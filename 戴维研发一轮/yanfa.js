var imgs = document.getElementsByClassName('slider')[0].getElementsByTagName('img');
var slider = document.getElementsByClassName('slider')[0];
var circles = document.getElementsByClassName('slider')[0].getElementsByTagName('li');
var goodlist = document.getElementsByClassName('goods')[0].getElementsByTagName('ul')[0];
var len = circles.length;
var count = 0;
var speed = 0;


var clearImg = function() {
    for (var i = 0; i < len; i++) {
        imgs[i].style.opacity = '0';
    }
}

var clearCircle = function() {
    for (var i = 0; i < len; i++) {
        circles[i].className = 'circle';
    }
}

var imgDown = function() {

    clearImg();
    imgs[count % 2].style.opacity = '1';
    if (count % 2 == 0) {
        imgs[count % 2 + 1].style.opacity = '0';
    } else {
        imgs[count % 2 - 1].style.opacity = '0';
    }
}

var circleChange = function() {
    clearCircle();
    circles[count % 2].className = 'circle active';
    if (count % 2 == 0) {
        circles[count % 2 + 1].className = 'circle';
    } else {
        circles[count % 2 - 1].className = 'circle';
    }
}


var next = function() {
    count++;
    imgDown();
    circleChange();
}

for (var i = 0; i < len; i++) {
    (function(i) {
        circles[i].onclick = function() {
            count = i;
            clearCircle();
            clearImg();
            circles[i].className = 'circle active';
            imgs[i].style.opacity = '1';
        }
    }(i))
}
var roll = function() {

    speed = speed - 1;

    goodlist.style.transform = 'translate3d(' + speed + 'px,' + 0 + 'px,' + 0 + 'px)';

    if (speed == -648) {
        speed = 0;
        goodlist.ontransitionend = function(event) {
            console.log('a');

            goodlist.style.transform = 'translate3d(' + speed + 'px,' + 0 + 'px,' + 0 + 'px)';
        }
    }
}

var timer1 = setInterval(next, 2000);
var timer2 = setInterval(roll, 30);

slider.onmouseover = function() {
    clearInterval(timer1);
}
slider.onmouseout = function() {
    timer1 = setInterval(next, 2000);
}

goodlist.onmouseover = function() {
    clearInterval(timer2);
}
goodlist.onmouseout = function() {
    timer2 = setInterval(roll, 30);
}