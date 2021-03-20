var enterInputValue = function() {
    var value = document.querySelector('.newtodo').value;
    if (value != '') {
        var checkbox = document.createElement("input");
        var li = document.createElement("li");
        var btn = document.createElement('button');
        var label = document.createElement('label');
        var ul = document.getElementsByClassName('lis');
        li.appendChild(btn);
        li.appendChild(checkbox);
        li.appendChild(label);
        ul[0].appendChild(li);
        li.setAttribute('class', 'active');
        btn.setAttribute('class', 'destroy')
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute('class', 'checkbox');
        label.innerHTML = value;
        document.querySelector('.newtodo').value = '';
    }
}
var footer = document.getElementsByClassName('footer')[0];

var destroy = document.getElementsByClassName('destroy');
var active = document.getElementsByClassName('active');

document.querySelector('.newtodo').onkeydown = function(event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
        enterInputValue();
        items();
        select();
        changebtn();

        for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].index = i;
            checkbox[i].onclick = function() {
                console.log(i);
                items();
                checkboxclick();
                selectcheck();
                clearbtn();
            }
        }
        mouseactivity();

        for (var i = 0; i < destroy.length; i++) {
            (function(i) {
                destroy[i].onclick = function() {
                    active[i].parentNode.removeChild(active[i]);
                    mouseactivity();
                    select();
                    items();
                }
            })(i)
        }
    }
}

var mouseactivity = function() {
    for (var i = 0; i < active.length; i++) {
        (function(i) {
            active[i].onmouseover = function(arg) {
                destroy[i].style.display = 'block';
            }
        })(i)
    }
    for (var i = 0; i < active.length; i++) {
        (function(i) {
            active[i].onmouseout = function(arg) {
                destroy[i].style.display = 'none';
            }
        })(i)
    }
}


document.querySelector('.clearboth').onclick = function() {
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            console.log(i);
            active[i].parentNode.removeChild(active[i]);
            select();
            selectcheck();
        }
    }
}
var clearbtn = function() {
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            document.getElementsByClassName('clearboth')[0].style.display = 'block';
            break;
        } else {
            document.getElementsByClassName('clearboth')[0].style.display = 'none';
        }
    }
}

var select = function() {
    if (checkbox.length == 0) {
        selectall.style.display = 'none';
        footer.style.display = 'none';
        selectall.checked = 'false';
    } else {
        selectall.style.display = 'block';
        footer.style.display = 'block';
    }
}


var selectcheck = function() {

    if (selectall.checked == true) {
        selectall.style.color = '#737373';
    } else {
        selectall.style.color = '#e6e6e6';
    }
    clearbtn();
}

var selectall = document.getElementsByClassName('selectall')[0];
var checkbox = document.getElementsByClassName('checkbox');
var change = document.getElementsByClassName('change');
selectall.onclick = function() {
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = selectall.checked;
    }
    selectcheck();
    items();

}



var checkboxclick = function() {
    var flag = false;
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            flag = true;
        } else {
            flag = false;
            break;
        }
    }
    selectall.checked = flag;
}

var items = function() {
    var count = 0;
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].index = i;
        var flag = !checkbox[i].checked;
        if (flag) {
            count++;
        }
    }
    document.getElementById('num').innerHTML = count;
    if (count == 0 || count == 1) {
        document.getElementById('items').innerHTML = 'item left';
    } else {
        document.getElementById('items').innerHTML = 'items left';
    }
}


var changebtn = function() {
    change[0].onclick = function() {
        clearborder();
        change[0].style.border = '1px solid #efd5d5';
        for (var i = 0; i < active.length; i++) {
            active[i].style.display = 'block';
        }
    }

    change[1].onclick = function() {
        clearborder();
        change[1].style.border = '1px solid #efd5d5';
        for (var i = 0; i < active.length; i++) {
            if (checkbox[i].checked) {
                active[i].style.display = 'none';
            } else {
                active[i].style.display = 'block';
            }
        }

    }
    change[2].onclick = function() {
        clearborder();
        change[2].style.border = '1px solid #efd5d5';
        for (var i = 0; i < active.length; i++) {
            if (checkbox[i].checked) {
                active[i].style.display = 'block';
            } else {
                active[i].style.display = 'none';
            }
        }
    }
}

var clearborder = function() {
    for (var i = 0; i < change.length; i++) {
        change[i].style.border = '1px solid rgb(255, 255, 255)';
    }
}