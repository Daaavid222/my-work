var audio = document.getElementsByTagName('audio')[0]; //获取音频
var audioBar = document.getElementsByClassName('bar')[0]; //歌曲进度条
var audioNow = document.getElementsByClassName('now')[0]; //歌曲走过的红色进度
var audioCube = audioNow.getElementsByTagName('span')[0]; //歌曲拖拽方块
var songIndex = 0; //歌曲序号
var playBox = document.getElementsByClassName('play-btns')[0];
var playBtn = playBox.getElementsByTagName('li')[2]; //播放按钮
var volBar = document.getElementsByClassName('bar')[1]; //声音条
var volNow = document.getElementById('now'); //声音走过的红色进度
var volCube = volNow.getElementsByTagName('span')[0]; //声音拖拽方块
var songImgBox = document.getElementsByClassName('song-left-img')[0]; //播放时唱片转动
var songImg = songImgBox.getElementsByTagName('img')[0]; //歌曲图片

var time = document.getElementsByClassName('count-time')[1]; //总时间
var initTime = document.getElementsByClassName('count-time')[0]; //初始时间
var songMid = document.getElementsByClassName('song-mid')[0]; //歌词父容器
var obj;


function config() //构造函数       
{
    this.playMark = true;
    this.duration = audio.duration;
    this.vol = audio.volume;
    this.timer = null;
    this.rotateSum = 0;
}

obj = new config();
// 拖拽播放
audioCube.onmousedown = function(ev) {
    var ev = ev || window.event;
    var initX = ev.clientX - this.offsetLeft;
    document.onmousemove = function(ev) {
        var ev = ev || window.event;
        var x = ev.clientX - initX;
        if (x < 0) {
            x = 0;
        }
        if (x > audioBar.offsetWidth) {
            x = audioBar.offsetWidth;
        }
        playCtrl(x);
    }
    document.onmouseup = function() {
        document.onmousemove = null;
        audioCube.onmousemove = null;
    }
}

// 改变播放时间
function playCtrl(x) {
    var timego = x / audioBar.offsetWidth * audio.duration;
    audioCube.style.left = x + "px"; //改变拇指的位置
    audioNow.style.width = x + "px"; //以及改变红条已经播放的位置
    audio.currentTime = timego; //调节当前时间，为当前拖动的
    playedTime();
}

// 点击播放
audioBar.onclick = function(ev) {
    var ev = ev || window.event;
    var dis = ev.clientX - audioBar.offsetLeft;
    audioCube.style.left = dis + "px";
    playCtrl(dis);
}

// 拖拽声音条
volCube.onmousedown = function(ev) {
    var ev = ev || window.event;
    var initX = ev.clientX - volCube.offsetLeft;
    document.onmousemove = function(ev) {
        var ev = ev || window.event;
        var x = ev.clientX - initX;
        if (x < 0) { x = 0 }
        if (x > volBar.offsetWidth) { x = volBar.offsetWidth }
        var volresult = x / volBar.offsetWidth;
        volCube.style.left = x + "px";
        volNow.style.width = x + "px";
        audio.volume = volresult;
    }
    document.onmouseup = function() {
        document.onmousemove = null;
        volCube.onmousemove = null;
    }
}

// 播放按钮
playBtn.onclick = function() {
    //显示当前歌曲的时长
    playBtn.innerHTML = "&#xe628;"; //换暂停图标
    clearInterval(obj.timer); //记时开始
    if (obj.playMark) {
        audio.play();
        obj.timer = setInterval(function() {
            obj.rotateSum = obj.rotateSum + 1;
            songImgBox.style.transform = "rotate(" + obj.rotateSum + "deg)"; //整个CD  播放时旋转  
            if (audio.currentTime == audio.duration) {
                songIndex++;
                changeMusic();
            } //播放完了之后
        }, 30)
    } else {
        playBtn.innerHTML = "&#xe655;";
        audio.pause();
    }
    obj.playMark = !obj.playMark;
}

//改变音乐
function changeMusic() {
    clearInterval(obj.timer);
    audio.src = musics[songIndex].path;
    obj = new config();
    audioInit();
    playBtn.click();
    lyricsSolution(musics[songIndex]);
    commentUl.innerHTML = '';
    if (commentList[songIndex].length == 0) {
        emptyComment.style.display = 'block';
    } else {
        emptyComment.style.display = 'none';
        printComment(commentList[songIndex]);
    }

}

playBox.getElementsByTagName('li')[3].onclick = function() {
    songIndex++;
    if (songIndex >= musics.length) { songIndex = 0 }
    changeMusic(songIndex);
}

playBox.getElementsByTagName('li')[1].onclick = function() {
    songIndex--;
    if (songIndex < 0) { songIndex = musics.length - 1 }
    changeMusic(songIndex);
}


// 重置歌曲
function audioInit() {
    time.innerHTML = "00:00";
    musicName.innerHTML = musics[songIndex].name.split('.')[0];
    musicPageName.innerHTML = musics[songIndex].name.split('.')[0]
        //   time.innerHTML ;
    audio.volume = 0.5;
    volCube.style.left = audio.volume * volBar.offsetWidth + "px";
    volNow.style.width = audio.volume * volBar.offsetWidth + "px";
    audioCube.style.left = 0;
    audioNow.style.width = 0 + "px";
}

function changeTime(time) {
    var time = parseInt(time);
    var m = parseInt(time / 60);
    var s = parseInt(time % 60);
    m = zero(m);
    s = zero(s);

    function zero(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    }
    return m + ":" + s;
}

//绑定监听事件
audio.addEventListener("timeupdate", function() {
    playedTime();
});

//正在播放时
function playedTime() {
    if (changeTime(audio.duration).toString() == "NaN:NaN") return;
    time.innerHTML = changeTime(audio.duration);
    var n = audio.currentTime / audio.duration; //计算时间差
    audioCube.style.left = n * audioBar.offsetWidth + "px"; //调节音乐当前进度条
    audioNow.style.width = n * audioBar.offsetWidth + "px"; //调节当前红条进度
    initTime.innerHTML = changeTime(audio.currentTime); //给当前时间赋值
    var id_num = parseInt(audio.currentTime);
    var lyric_p = document.getElementsByTagName("p");
    for (var i = 0; i < lyric_p.length; i++) {
        lyric_p[i].index = i;
    }
    if (document.getElementById("lyric" + id_num)) {
        var obj = document.getElementById("lyric" + id_num);
        for (var i = 0; i < obj.index; i++) {
            lyric_p[i].className = "played";
        }
        for (var j = obj.index; j < lyric_p.length; j++) {
            lyric_p[j].className = "";
        }
        obj.className = "song-active";
        songMid.scrollTop = obj.offsetTop - songMid.offsetTop - songMid.offsetHeight / 2;
    }
}

// 歌词处理
function lyricsSolution(music) {
    var arr = music.lyrics.split('[');
    var html = "";
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("]");
        var text = (temp[1]);
        var time = temp[0].split(",");
        var temp2 = time[0].split(".");
        var ms = temp2[1]; //毫秒
        var temp3 = temp2[0].split(":");
        var s = temp3[1]; //秒
        var m = temp3[0]; //分
        var s_sum = parseInt(m * 60) + parseInt(s);
        if (text) {
            html += "<p id='lyric" + s_sum + "'>" + text + "</p>";
        }
    }
    songMid.innerHTML = html;
}

// 评论功能

var commentBtn = document.getElementsByClassName('write-comment')[0];

var commentBox = document.getElementsByClassName('comment-box')[0]; //评论区盒子
var sendCommentBtn = document.getElementsByClassName('comment-btn')[0];
var commentContent = document.getElementsByClassName('enter-comment')[0].getElementsByTagName('textarea')[0];
var cancelComment = document.getElementById('cancel-comment')
var commentArea = document.getElementsByClassName('comments')[0];
var emptyComment = document.getElementsByClassName('empty-comment')[0]; //评论为空
var commentUl = document.createElement('ul');
commentUl.className = 'new-comments';
commentArea.appendChild(commentUl);

// 弹出评论框
commentBtn.onclick = function() {
    if (userName.innerHTML == '未登录') {
        registerBox.style.display = 'block';
    } else {
        commentBox.style.display = 'block';
    }
}

var commentList = []; //储存评论
var newComment = {}; //新评论
// 发布评论
sendCommentBtn.onclick = function() {
    var content = commentContent.value;
    if (content != '') {
        newComment.name = userName.innerHTML;
        newComment.content = content;
        newComment.src = userImg.src;
        commentList[songIndex].push(newComment);
        localStorage.commentList = JSON.stringify(commentList);
        printComment(newComment);
        emptyComment.style.display = 'none';
        commentBox.style.display = 'none';
    } else {
        alert('评论内容不能为空');
    }
    commentContent.value = '';
}

//退出评论
cancelComment.onclick = function() {
    commentContent.value = '';
    commentBox.style.display = 'none';
}

var printComment = function(list) {
    if (list.length == undefined) {
        var newLi = document.createElement('li');
        newLi.className = 'flex';
        newLi.innerHTML = '<img src="imgs/monkey.jpg" alt=""><div class="personal-comment"><div class="flex"><span class="comment-name">123:</span><p class="comment-content">123</p></div><div class="comment-time"><span>3月2日<span><span>15:15</span></div></div><ul class="comment-btns flex"><li>&#xe608;</li> <li>&#xe670;</li><li>&#xe603;</li></ul>'
        newLi.getElementsByClassName('comment-content')[0].innerHTML = list.content;
        newLi.getElementsByClassName('comment-name')[0].innerHTML = list.name;
        newLi.getElementsByTagName('img')[0].src = list.src;
        commentUl.appendChild(newLi);
    } else {
        for (let i = 0; i < list.length; i++) {
            var newLi = document.createElement('li');
            newLi.className = 'flex';
            newLi.innerHTML = '<img src="imgs/monkey.jpg" alt=""><div class="personal-comment"><div class="flex"><span class="comment-name">123:</span><p class="comment-content">123</p></div><div class="comment-time"><span>3月2日<span><span>15:15</span></div></div><ul class="comment-btns flex"><li>&#xe608;</li> <li>&#xe670;</li><li>&#xe603;</li></ul>'
            newLi.getElementsByClassName('comment-content')[0].innerHTML = list[i].content;
            newLi.getElementsByClassName('comment-name')[0].innerHTML = list[i].name;
            var img = newLi.getElementsByTagName('img')[0];
            getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getUserPhoto?username=' + list[i].name).then(res => {
                if (res.message == '用户不存在') {
                    img.src = 'imgs/monkey.jpg';
                } else {
                    img.src = res.data;
                }
            })
            commentUl.appendChild(newLi);
        }
    }
}