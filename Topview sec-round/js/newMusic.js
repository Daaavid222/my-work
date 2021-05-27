var changeMusicType = document.getElementsByClassName('new-music-nav')[0];
var musicTypes = changeMusicType.getElementsByClassName('new-music-nav-box');
// 清除灰色块
var clearMusicSytle = function() {
    for (let i = 0; i < musicTypes.length; i++) {
        musicTypes[i].className = 'new-music-nav-box';
    }
}

// 清除最新音乐页面
var newPublished = document.getElementsByClassName('new-published')[0];
var clearMusicPages = function() {
    musicList.style.display = 'none';
    newPublished.style.display = 'none';
}

// 显示不同页面
for (let i = 0; i < musicTypes.length; i++) {
    musicTypes[i].onclick = function() {
        clearMusicSytle();
        clearMusicPages();
        musicTypes[i].className = 'new-music-nav-box new-music-nav-active';
        if (i == 0) {

            musicList.style.display = 'block';
            musicSend.onscroll = null;
        } else {
            box.innerHTML = '';
            box.style.height = '0';
            total = 50;
            newPublished.style.display = 'block';
            waterFall();
            addScroll();
        }
    }
}


var pages = document.getElementsByClassName('pages')[0].getElementsByTagName('li');
var pageLen = pages.length;
var musicList = document.getElementsByClassName('music-list')[0];
var musicPages = musicList.getElementsByClassName('pages')[0];
var songsUl = document.createElement('ul');
musicList.insertBefore(songsUl, musicPages);
var songs;

// 获取歌单
var getSongs = function(i) {
    getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getSongList?current=' + i + '&size=10').then(res => {
        songs = res.data.records;
    }).then(() => {
        songsUl.innerHTML = '';
        printSongs(songs);
    })
}

// 我喜欢的列表
var myLikes = [];
// 删除/添加我喜欢
function removeArr(arr, obj) {
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        if (arr[i].id === obj.id) {
            arr.splice(i, 1); //删除下标为i的元素
            return arr;
        }
    }
}

// 匹配用户，添加我喜欢
function matchUser() {
    for (let i = 0; i < userArray.length; i++) {
        if (userName.innerText == userArray[i].username) { //有这个账号
            index = i;
            userArray[i].myLikes = myLikes;
            break;
        }
    }
    window.localStorage.userArr = JSON.stringify(userArray);
}

// 判断是否喜欢
function isLiked(song, span) {
    for (let i = 0; i < userArray.length; i++) {
        if (userName.innerText == userArray[i].username) { //有这个账号
            for (let j = 0; j < userArray[i].myLikes.length; j++) {
                let songLiking = JSON.parse(localStorage.userArr)[i].myLikes[j];
                if (song.id === songLiking.id) {
                    span.style.color = 'rgb(255, 0, 0)';
                }
            }
        }
    }
}
var isLikePage = false;
// 渲染歌单
var printSongs = function(songs) {
    for (let i = 0; i < songs.length; i++) {
        var songLi = document.createElement('li');
        if (skinStore == 'skin-top-black') {
            songLi.className = 'flex bgc black';
        } else {
            songLi.className = 'flex bgc musics';
        }
        var songInfo = document.createElement('div');
        songInfo.className = 'new-music-info flex';
        if (isLikePage == false) {
            songInfo.innerHTML = '<span class="add-like">&#xe607;</span><img src="" alt=""><p>123123123</p>';
            songInfo.getElementsByTagName('img')[0].src = songs[i].picUrl;
        } else {
            songInfo.innerHTML = '<span class="add-like">&#xe607;</span><p>123123123</p>';
        }
        songInfo.getElementsByTagName('p')[0].innerHTML = songs[i].name;

        isLiked(songs[i], songInfo.getElementsByTagName('span')[0]);

        songInfo.getElementsByTagName('span')[0].onclick = function() {
            if (userName.innerText != '未登录') {
                if (this.style.color == 'rgb(255, 0, 0)') {
                    this.style.color = '';
                    removeArr(myLikes, songs[i]);
                    matchUser();
                } else {
                    this.style.color = 'rgb(255, 0, 0)';
                    myLikes.push(songs[i]);
                    matchUser();
                }
            } else {
                registerBox.style.display = 'block';
            }
        }

        var songAuthor = document.createElement('div');
        songAuthor.className = 'music-author';
        songAuthor.innerHTML = songs[i].singer;

        var songFrom = document.createElement('div');
        songFrom.className = 'music-from';
        songFrom.innerHTML = songs[i].album;

        var songTime = document.createElement('div');
        songTime.className = 'max-time';
        songTime.innerHTML = songs[i].duration;

        songLi.appendChild(songInfo);
        songLi.appendChild(songAuthor);
        songLi.appendChild(songFrom);
        songLi.appendChild(songTime);
        if (isLikePage == false) {
            songsUl.appendChild(songLi);
        } else {
            likesUl.appendChild(songLi);
        }
    }
}
var clearPageStyle = function() {
    for (let i = 0; i < pageLen; i++) {
        pages[i].className = '';
    }
}

// 给页码添加点击事件
for (let i = 0; i < pageLen; i++) {
    pages[i].onclick = function() {
        isLikePage = false;
        songsUl.innerHTML = '';
        getSongs(i + 1);
        clearPageStyle();
        pages[i].className = 'act';
    }
}

// 拖拽登录界面
var registerMove = document.getElementsByClassName('register')[0];
registerMove.onmousedown = function(ev) {
    ev = ev || window.event;
    //1、鼠标的坐标
    var pageX = ev.pageX || scroll().left + ev.clientX;
    var pageY = ev.pageY || scroll().top + ev.clientY;
    //2、鼠标在盒子中的坐标
    var x = pageX - registerMove.offsetLeft;
    var y = pageY - registerMove.offsetTop;
    document.onmousemove = function(ev) {
        //3、进入onmousemove事件，鼠标左边不断更新
        var pageX = ev.pageX || scroll().left + ev.clientX;
        var pageY = ev.pageY || scroll().top + ev.clientY;
        ev = ev || window.event;
        registerMove.style.left = pageX - x + "px";
        registerMove.style.top = pageY - y + "px";

    }
    document.onmouseup = function() {
        document.onmousemove = null;
    }
}
registerMove.onmouseup = function() {
    registerMove.onmousemove = null;
}