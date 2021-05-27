var heightArray = [], //存储每列的高度。
    columns = 5; //假设为5列;
var box = document.getElementsByClassName('water-fall')[0];
var total = 50;



function waterFall() {
    for (let i = 0; i < 50; i++) { //先定50个div
        var div = document.createElement('div');
        var img = document.createElement("img");
        div.className = "item";
        img.style.width = '100%';
        img.src = imgs[i];
        div.appendChild(img);
        box.appendChild(div);
    }
    changeStyle(total);
}


function changeStyle(total) {
    for (let i = total - 50; i < total; i++) {
        // 遍历所有div，对他们设置left和top值
        var currentDiv = document.getElementsByClassName("item")[i];
        if (i < columns) { //i<columns说明为第一排
            currentDiv.style.top = 0; //第一排top值为0
            currentDiv.style.left = i * 22 + "%"; // 第一张left:0,第二张left:100...
            heightArray[i] = currentDiv.offsetHeight; // 第1排直接设置
        } else { // 非第1排
            var minHeight = Math.min.apply(null, heightArray); //找到高度最小值
            var minIndex = heightArray.indexOf(minHeight); //找到最小值所在列
            currentDiv.style.top = minHeight + 10 + "px"; // 设置top值
            currentDiv.style.left = minIndex * 22 + '%'; //设置left值
            heightArray[minIndex] = heightArray[minIndex] + currentDiv.offsetHeight + 10; // 更新高度数组。
            box.style.height = Math.max.apply(null, heightArray) + 'px';
        }
    }
}
var waterFallBox = document.getElementsByClassName('new-published')[0];
var backTopBtn = document.getElementsByClassName('backTop')[0];

function addScroll() {
    musicSend.onscroll = function() {
        if (musicSend.scrollTop > 3000) {
            backTopBtn.style.display = 'block';
        } else {
            backTopBtn.style.display = 'none';
        }
        if ((waterFallBox.offsetHeight + musicSend.scrollTop - box.offsetHeight - 20) > 20) {
            total += 50;
            waterFall();
        }
    }
}

backTopBtn.onclick = function() {
    musicSend.scrollTop = 0;
}