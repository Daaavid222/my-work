// 封装ajax
function getRequest(Url) {   
    let p = new Promise((resolve, reject) => {      
        let xhr = new XMLHttpRequest();      
        xhr.open('GET', Url, true);      
        xhr.onreadystatechange = function() {         
            if (this.readyState === 4) {            
                if (this.status === 200) {    
                    var response = this.responseText           
                    resolve(JSON.parse(response), this);            
                } else {                  
                    reject("Request Fail");     
                }                  
            }      
        }      
        xhr.send();   
    });   
    return p;
}

function postRequest(Posturl, data) {   
    let p = new Promise((resolve, reject) => {      
        let xhr = new XMLHttpRequest();      
        xhr.open("POST", Posturl, true);      
        xhr.onreadystatechange = function() {         
            if (this.readyState === 4) {            
                if (this.ststus = 200) {      
                    var response = this.responseText;         
                    resolve(JSON.parse(response));            
                } else {               
                    reject("Request Fail");            
                }         
            }   
        }      
        xhr.send(JSON.stringify(data));   
    });   
    return p;
}
// 获取瀑布流图片
var imgs = [];
getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getWaterFallList').then(res => {
    imgs = res.data;
}).then(() => {
    waterFall();
    changeStyle(total);
})

// 轮播图图片
var img;
getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getBannerList').then(res => {
        img = res.data;
    }).then(() => {
        var len = img.length;
        var lis = [];
        var sliderImgs = [];
        var sliderCircles = [];
        var circles = document.createElement('div');
        circles.className = 'circles';
        var sliderUl = document.createElement('ul');
        for (let i = 0; i < len; i++) {
            lis[i] = document.createElement('li');
            sliderCircles[i] = document.createElement('div');
            sliderCircles[i].className = 'circle';
            sliderImgs[i] = document.createElement('img');
            sliderImgs[i].src = img[i];
            circles.appendChild(sliderCircles[i]);
            lis[i].appendChild(sliderImgs[i]);
            sliderUl.appendChild(lis[i]);

        }
        sliderCircles[0].className = 'circle active';
        lis[0].className = 'now';
        lis[1].className = 'after';
        lis[len - 1].className = 'before';
        document.getElementsByClassName('slider')[0].appendChild(circles);
        document.getElementsByClassName('imgs')[0].appendChild(sliderUl);
    })
    .then(() => {
        sliderFunction();
    })


// 轮播图实现
var sliderFunction = function() {
    var imgs = document.querySelectorAll('.imgs ul li')
    var circle = document.getElementsByClassName('circle');

    function clearIndex() {
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].className = '';
        }
    }

    function nextpic() {
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].className == 'after') {
                clearIndex();
                if ((i + 1) % imgs.length == 0) {
                    imgs[0].className = 'after';
                } else {
                    imgs[i + 1].className = 'after';
                }
                imgs[i].className = 'now';
                if (i - 1 < 0) {
                    imgs[imgs.length - 1].className = 'before';
                } else {
                    imgs[i - 1].className = 'before';
                }
                break;
            }
        }
    }

    function prepic() {
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].className == 'before') {
                clearIndex();
                if (i - 1 < 0) {
                    imgs[imgs.length - 1].className = 'before';
                } else {
                    imgs[i - 1].className = 'before';
                }
                imgs[i].className = 'now';
                if ((i + 1) % imgs.length == 0) {
                    imgs[0].className = 'after';
                } else {
                    imgs[i + 1].className = 'after';
                }
                break;
            }
        }
    }

    function nextcircle() {
        for (var i = 0; i < circle.length; i++) {
            if (circle[i].className.indexOf('active') != -1) {
                circle[i].className = 'circle';
                if (i + 1 > circle.length) {
                    circle[0].className = 'circle active';
                } else {
                    circle[(i + 1) % circle.length].className = ' circle active';
                }
                break;
            }
        }
    }

    function precircle() {
        for (var i = 0; i < circle.length; i++) {
            if (circle[i].className.indexOf('active') != -1) {
                circle[i].className = 'circle';
                if (i - 1 < 0) {
                    circle[circle.length - 1].className = 'active circle';
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

    document.querySelector('.imgs ul').addEventListener('click', function(e) {
        if (e.target.parentNode.className == 'before') {
            prev();
        } else if (e.target.parentNode.className == 'after') {
            next();
        }
    }, false)

    document.getElementsByClassName('circles')[0].addEventListener('mouseover', function(e) {
            if (e.target.className == 'circle' || e.target.className == 'active circle') {
                clearInterval(timer);
                let circles = this.querySelectorAll('.circle'),
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
}

// 导航栏切换到最新音乐
var functionNav = document.getElementsByClassName('function-nav')[0].getElementsByTagName('li');

var functionRecommend = document.getElementsByClassName('function-recommend')[0];
var musicSend = document.getElementsByClassName('function-music-send')[0];
var clearFunNav = function() {
    for (let i = 0; i < functionNav.length; i++) {
        functionNav[i].className = '';
    }
}

for (let i = 0; i < functionNav.length; i++) {
    functionNav[i].onclick = function() {
        clearFunNav();
        functionNav[i].className = 'function-nav-active';
    }
}

functionNav[0].onclick = function() {
    clearFunNav();
    functionNav[0].className = 'function-nav-active';
    functionRecommend.style.display = 'block';
    musicSend.style.display = 'none';
}
functionNav[5].onclick = function() {
    isLikePage = false;
    clearFunNav();
    functionNav[5].className = 'function-nav-active';
    functionRecommend.style.display = 'none';
    musicSend.style.display = 'block';
    getSongs(1);
}

// 获取音乐
var musics = [];

getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getMusicList').then(res => {
    musics = res.data;
}).then(() => {
    audioInit();
    lyricsSolution(musics[0]);
    time.innerHTML = changeTime(audio.duration);
    audio.src = musics[0].path;

}).then(() => {
    printMusicList();
    if (localStorage.commentList == undefined) {
        for (let i = 0; i < musics.length; i++) {
            commentList.push([]);
        }
    } else {
        commentList = JSON.parse(localStorage.commentList);
    }
    if (commentList[0].length == 0) {
        emptyComment.style.display = 'block';
    } else {
        emptyComment.style.display = 'none';
        printComment(commentList[0]);
    }
})


var musicInfoBox = document.getElementsByClassName('about-music')[0];
var musicName = musicInfoBox.getElementsByTagName('h3')[0];
var musicPageName = document.getElementsByClassName('song-name')[0];
var musicImgBox = document.getElementsByClassName('info-box')[0];
var smallBtn = document.getElementsByClassName('small')[0]; //点击返回
var backBtn = document.getElementsByClassName('playing-back')[0]; //点击返回
var logoBox = document.getElementsByClassName('logo-box')[0]; //logo盒子
var header = document.getElementsByClassName('top')[0];
var personalPage = document.getElementsByClassName('personal-page')[0];
var playPage = document.getElementsByClassName('play-page')[0];


musicImgBox.onclick = function() {
    musicInfoBox.style.transform = 'translateY(3.5rem)';
    loginBox.style.display = 'none';
    logoBox.style.display = 'none';
    backBtn.style.display = 'block';
    personalPage.style.display = 'none';
    playPage.style.display = 'block';
    if (skinStore == 'skin-red') {
        header.className = 'top playing-bgc';
    } else {
        header.className = 'top ' + skinStore;
    }
}

smallBtn.onclick = function() {
    musicInfoBox.style.transform = 'translateY(-2.5rem)';
    loginBox.style.display = '';
    logoBox.style.display = '';
    backBtn.style.display = 'none';
    personalPage.style.display = '';
    playPage.style.display = 'none';
    header.className = 'top ' + skinStore;
}


backBtn.onclick = function() {
    musicInfoBox.style.transform = 'translateY(-2.5rem)';
    loginBox.style.display = '';
    logoBox.style.display = '';
    backBtn.style.display = 'none';
    personalPage.style.display = '';
    playPage.style.display = 'none';
    header.className = 'top ' + skinStore;

}

var skinStore = 'skin-red';
var findMusic = document.getElementsByClassName('about-me')[0].getElementsByTagName('li')[0]; //发现音乐
var myLikesMusic = document.getElementsByClassName('about-me')[2].getElementsByTagName('li')[0]; //我喜欢的音乐
var myLikesPage = document.getElementsByClassName('music-page')[0]; //喜欢的音乐页面
var functionPage = document.getElementsByClassName('function-page')[0];
var addPage = document.getElementById('add-musiclist');
var addUl = document.getElementById('add');
var creatBox = document.getElementsByClassName('creat-box')[0];
var creatBtn = document.getElementsByClassName('creat-btn')[0];
var cancelCreat = document.getElementsByClassName('cancel-creat')[0];
// 储存歌单名
var likeList = [];
//增加歌单
addPage.onclick = function() {
    creatBox.style.display = 'block';
}
creatBtn.onclick = function() {
    var content = document.getElementById('creat-content');
    if (content.value == '') {
        alert('名字不能为空')
    } else {
        likeList.push(content.value);
        for (let i = 0; i < userArray.length; i++) {
            if (userName.innerText == userArray[i].username) { //有这个账号
                index = i;
                userArray[i].likeList = likeList;
                break;
            }
        }
        window.localStorage.userArr = JSON.stringify(userArray); //更新本地储存
        var newLi = document.createElement('li');
        newLi.innerHTML = '<span>&#xe600;</span>' + likeList[likeList.length - 1];
        addUl.appendChild(newLi);
        newLi.onclick = function() {
            isLikePage = false;
            likeMusicsUser.innerText = userName.innerText;
            listTitle.innerHTML = '<span>歌单</span>' + likeList[likeList.length - 1];
            functionPage.style.display = 'none';
            myLikesPage.style.display = 'block';
            getMyLikeList();
        }
    }
    content.value = '';
    creatBox.style.display = 'none';
}

cancelCreat.onclick = function() {
    creatBox.style.display = 'none';
}

//切换页面
findMusic.onclick = function() {
    functionPage.style.display = '';
    myLikesPage.style.display = 'none';
}

var listTitle = document.getElementById('listTitle');
// 我喜欢的音乐
getMyLikes();

function getMyLikes() {
    myLikesMusic.onclick = function() {
        if (userName.innerText != '未登录') {
            likeMusicsUser.innerText = userName.innerText;
            listTitle.innerHTML = '<span>歌单</span>我喜欢的音乐'
            functionPage.style.display = 'none';
            myLikesPage.style.display = 'block';
            isLikePage = true;
            getMyLikeList();
        } else {
            registerBox.style.display = '';
        }
    }
}

var likeMusics = document.getElementsByClassName('my-music')[0];
var likesUl = document.createElement('ul');
likeMusics.appendChild(likesUl);
var emptyBox = document.getElementById('empty-box');
var likeMusicsUser = document.getElementById('userSet');


var getMyLikeList = function() {
    likesUl.innerHTML = '';
    if (isLikePage == true) {
        for (let i = 0; i < userArray.length; i++) {
            if (userName.innerText == userArray[i].username) { //有这个账号
                index = i;
                var myLikeSong = userArray[i].myLikes;
                break;
            }
        }
        if (myLikeSong.length != 0) {
            emptyBox.style.display = 'none';
            printSongs(myLikeSong);
        } else {
            emptyBox.style.display = 'block';
        }
    } else {
        emptyBox.style.display = 'block';
    }
}

//播放列表
var musicPlayList = document.getElementById('music-list');
var playListBox = document.getElementsByClassName('geted')[0];
var playListContent = document.createElement('div');
playListContent.className = 'music-list-content';


var printMusicList = function() {
    for (let i = 0; i < musics.length; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = 'geted-musics musics';
        newDiv.innerHTML = musics[i].name;
        playListContent.appendChild(newDiv);
        newDiv.onclick = function() {
            songIndex = i;
            changeMusic(musics[i]);
        }
    }
    playListBox.appendChild(playListContent);
}
musicPlayList.onclick = function() {
        if (playListBox.style.display == 'none') {
            playListBox.style.display = 'block';
        } else {
            playListBox.style.display = 'none';
        }
    }
    // 我创建的歌单
var printMyList = function() {
    for (let i = 0; i < likeList.length; i++) {
        var newLi = document.createElement('li');
        newLi.innerHTML = '<span>&#xe600;</span>' + likeList[i];
        newLi.className = 'navs';
        addUl.appendChild(newLi);
        newLi.onclick = function() {
            isLikePage = false;
            likeMusicsUser.innerText = userName.innerText;
            listTitle.innerHTML = '<span>歌单</span>' + likeList[i];
            functionPage.style.display = 'none';
            myLikesPage.style.display = 'block';
            getMyLikeList();
        }
    }
}

// 模糊搜索
var searchBtn = document.getElementById('searchMusic');
var searchList = [];

searchBtn.oninput = function() {
    if (searchBtn.value == '') {
        likesUl.innerHTML = '';
        printSongs(myLikes);
    } else {
        likesUl.innerHTML = '';
        searchFunction(searchBtn.value);
        printSongs(searchList);
    }
}


var searchFunction = function(search) {
    // 实现模糊查询
    if (search) {
        let str = ['', ...search, ''].join('.*');
        let reg = new RegExp(str, 'i');
        searchList = myLikes.filter(a => reg.test(a.name) || reg.test(a.singer) || reg.test(a.album));
    }
}

// 换头像

var addFile = document.getElementsByClassName('addfile')[0];
// var formData = new FormData();

function upload() {
    var file = addFile.files[0];
    const formData = new FormData()
    formData.append('photo', file)
    formData.append('username', userName.innerHTML)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://recruit-exam.topviewclub.cn/api/recruit/uploadPhoto')
    xhr.send(formData);
    xhr.onload = () => {
        userImg.src = JSON.parse(xhr.responseText).data;
    }
}
addFile.onchange = function() {
    upload();
}

// 换肤

var skinChangeBtn = document.getElementsByClassName('skin-change')[0];
var skinChangeBox = document.getElementById('change-skin');
var styles = skinChangeBox.getElementsByTagName('li');

skinChangeBtn.onclick = function() {

    if (skinChangeBox.style.display == 'none') {
        skinChangeBox.style.display = 'block';
    } else {
        skinChangeBox.style.display = 'none'
    }

}
var checkbtns = document.getElementsByClassName('checked');
var mid = document.getElementsByClassName('middle')[0];
var btm = document.getElementsByClassName('music-play')[0];
var body = document.getElementsByTagName('body')[0];

var changeBgc = function() {
    var lis = document.getElementsByClassName('bgc');
    for (let i = 0; i < lis.length; i++) {
        if (skinStore == 'skin-top-black') {
            lis[i].className = 'flex bgc black';
        } else {
            lis[i].className = 'flex bgc musics';
        }
    }
}
styles[0].onclick = function() {
    header.className = 'top skin-top-black';
    mid.className = 'middle w skin-mid-black';
    btm.className = 'music-play skin-btm-black';
    body.className = 'skin-black-font';
    checkbtns[0].style.display = 'block';
    checkbtns[1].style.display = 'none';
    skinStore = 'skin-top-black';
    changeBgc();
    var navs = document.getElementsByClassName('navs');
    for (let i = 0; i < navs.length; i++) {
        navs[i].className = 'navs black-nav';
    }
}

styles[1].onclick = function() {
    header.className = 'top skin-red';
    mid.className = 'middle w skin-mid-red';
    btm.className = 'music-play';
    body.className = 'skin-red-font';
    checkbtns[0].style.display = 'none';
    checkbtns[1].style.display = 'block';
    skinStore = 'skin-red';
    changeBgc();
    var navs = document.getElementsByClassName('navs');
    for (let i = 0; i < navs.length; i++) {
        navs[i].className = 'navs';
    }
}