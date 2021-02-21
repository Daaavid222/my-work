function nextpic() {
    var imgs = document.querySelectorAll('ul li'),
        i = 0;
    for (i = 0; i < imgs.length; i++) {
        if (imgs[i].className == 'after') {
            imgs[(i + 1) % 4].className = 'after';
            imgs[i].className = 'now';
            if (i - 1 < 0) {
                imgs[3].className = 'before';
            } else {
                imgs[i - 1].className = 'before';
            }
            if (i == 0) {
                imgs[2].className = '';
            } else if (i == 1) {
                imgs[3].className = '';
            } else {
                imgs[i - 2].className = '';
            }
            break;
        }
    }
}

function prepic() {
    var imgs = document.querySelectorAll('ul li'),
        i = 0;
    for (i = 0; i < imgs.length; i++) {
        if (imgs[i].className == 'before') {
            if (i - 1 < 0) {
                imgs[3].className = 'before';
            } else {
                imgs[i - 1].className = 'before';
            }
            imgs[i].className = 'now';
            imgs[(i + 1) % 4].className = 'after';
            imgs[(i + 2) % 4].className = '';
            break;
        }
    }
}

function nextcircle() {
    var circle = document.getElementsByClassName('circle');
    for (var i = 0; i < circle.length; i++) {
        if (circle[i].className.indexOf('active') != -1) {
            circle[i].className = 'circle';
            circle[(i + 1) % 4].className = ' circle active';
            break;
        }
    }
}

function precircle() {
    var circle = document.getElementsByClassName('circle');
    for (var i = 0; i < 4; i++) {
        if (circle[i].className.indexOf('active') != -1) {
            circle[i].className = 'circle';
            if (i - 1 < 0) {
                circle[3].className = 'active circle';
            } else {
                circle[i - 1].className = 'active circle'
            }
            break;
        }
    }
}

function prev() {
    prepic();
    precircle();
}

function next() {
    nextpic();
    nextcircle();
}

var timer = setInterval(next, 3000);

document.getElementsByClassName('imgs')[0].addEventListener('mouseover', function() {
    clearInterval(timer);
    document.getElementsByClassName('left')[0].style.display = 'block';
    document.getElementsByClassName('right')[0].style.display = 'block';
}, false)

document.getElementsByClassName('imgs')[0].addEventListener('mouseleave', function() {
    timer = setInterval(next, 3000);
    document.getElementsByClassName('left')[0].style.display = 'none';
    document.getElementsByClassName('right')[0].style.display = 'none';
}, false)

document.querySelector('.left').addEventListener('click', function() {
    prev();
}, false)

document.querySelector('.right').addEventListener('click', function() {
    next();
}, false)

document.querySelector('ul').addEventListener('click', function(e) {
    if (e.target.parentNode.className == 'before') {
        prev();
    } else if (e.target.parentNode.className == 'after') {
        next();
    }
}, false)

document.getElementsByClassName('circles')[0].addEventListener('mouseover', function(e) {
        if (e.target.className == 'circle' || e.target.className == 'active circle') {
            clearInterval(timer);
            var circles = this.querySelectorAll('.circle'),
                len = circles.length,
                target,
                temp,
                acitve;
            //找到active的位置和鼠标的位置
            active = index(circles, this.querySelector('.active'));
            target = index(circles, e.target);
            //进行移动
            temp = Math.abs(target - active);
            if (active > target) {
                while (temp) {
                    prev();
                    temp--;
                }
            } else {
                while (temp) {
                    next();
                    temp--;
                }
            }
        }

    }, false)
    //离开线，重新开始定时切换
document.getElementsByClassName('circles')[0].addEventListener('mouseout', function(e) {
    if (e.target.className == 'circle' || e.target.className == 'active circle') {
        timer = setInterval(next, 3000);
    }
}, false)

function index(father, target) {
    var i,
        len = father.length;
    for (i = 0; i < len; i++) {
        father[i].index = i;
    }
    for (i = 0; i < len; i++) {
        if (father[i].index == target.index) {
            return father[i].index;
        }
    }
}