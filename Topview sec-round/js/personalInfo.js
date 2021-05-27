if (window.localStorage.userArr) { //判断是否存在
    var userArray = JSON.parse(window.localStorage.userArr);
} else {
    userArray = []; //创建一个新数组
}
var isLogin = false;
var signOut = document.getElementById('sign-out');
var loginBox = document.getElementsByClassName('login-box')[0];
var registerBox = document.getElementsByClassName('register-box')[0];
var questions = document.getElementsByClassName('question');
var out = registerBox.getElementsByTagName('span')[0];
var loginBtn = document.getElementsByClassName('sign-in-btn')[0];
var registerBtn = document.getElementsByClassName('new-enter-btn')[0];

var personalInfoBox = document.getElementsByClassName('personal-info')[0];
// 弹出登录界面
loginBox.onclick = function() {
        if (isLogin) {
            if (personalInfoBox.style.display == 'none') {
                personalInfoBox.style.display = 'block';
            } else {
                personalInfoBox.style.display = 'none';
            }
        } else {

            registerBox.style.display = 'block';
        }
    }
    // 退出按钮
out.onclick = function() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    username.value = '';
    password.value = '';
    questions[0].style.display = 'block';
    questions[1].style.display = 'none';
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'none';
    registerMove.style.left = '50%';
    registerMove.style.top = '50%';
    registerBox.style.display = 'none';
}

// 注册界面
var registerQuestion = document.getElementsByClassName('question-btn')[0];
registerQuestion.onclick = function() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    username.value = '';
    password.value = '';
    questions[0].style.display = 'none';
    questions[1].style.display = 'block';
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'block';
}

// 登录界面
var loginQuestion = document.getElementsByClassName('question-btn')[1];
loginQuestion.onclick = function() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    username.value = '';
    password.value = '';
    questions[0].style.display = 'block';
    questions[1].style.display = 'none';
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'none';
}

var userImg = document.getElementsByClassName('personal-img')[0].getElementsByTagName('img')[0];
var userName = document.getElementById('name');
var hideBox = document.getElementById('hide');
//登录
loginBtn.onclick = function() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var isHad = false; //定义一个开关变量
    var index = 0; //定义一个下标确定用户
    //遍历数组进行匹配
    for (var i = 0; i < userArray.length; i++) {
        if (username.value == userArray[i].username) { //有这个账号
            isHad = true;
            index = i;
        }
    }
    if (isHad) { //如果存在
        if (password.value == userArray[index].password) {
            alert("登录成功");
            localStorage.isEnter = true;
            isLogin = true;
            registerBox.style.display = 'none';
            hideBox.style.display = 'none';
            userName.innerHTML = userArray[index].username;
            myLikes = userArray[index].myLikes;
            likeList = userArray[index].likeList;
            localStorage.userIndex = index;
            printMyList();
            getSongs(1);
            getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getUserPhoto?username=' + username.value).then(res => {
                if (res.message == '用户不存在') {
                    userImg.src = 'imgs/monkey.jpg';
                } else {
                    userImg.src = res.data;
                }
            })
        } else {
            alert("密码错误");
        }
    } else { //账号不存在或输入错误
        alert('账号不存在或输入错误');
    }
    userName.value = ''
    password.value = '';
}

//注册
registerBtn.onclick = function() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    //遍历数组进行匹配
    for (var i = 0; i < userArray.length; i++) {
        //判断是否有相同账号
        if (username.value == userArray[i].username) {
            alert("该账号已存在");
            return;
        }
    }
    //创建对象
    var obj = { username: username.value, password: password.value, myLikes: [], likeList: [] }
    userArray.push(obj);
    window.localStorage.userArr = JSON.stringify(userArray);
    alert("用户创建成功");
    password.value = '';
    registerBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    questions[0].style.display = 'block';
    questions[1].style.display = 'none';
}

// 登出
signOut.onclick = function() {
    isLogin = false;
    localStorage.isEnter = false;
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    username.value = '';
    password.value = '';
    hideBox.style.display = 'block';
    userName.innerHTML = '未登录';
    personalInfoBox.style.display = 'none';
    functionPage.style.display = '';
    myLikesPage.style.display = 'none';
    userImg.src = 'imgs/monkey.jpg';
    getSongs(1);
    addUl.innerHTML = '<li id="my-like-musics"><span>&#xe607;</span>我喜欢的音乐</li>'
    myLikesMusic = document.getElementById('my-like-musics');
    getMyLikes();
}

// 记住登录
if (localStorage.isEnter == 'true') {
    isLogin = true;
    userName.innerHTML = userArray[localStorage.userIndex].username;
    myLikes = userArray[localStorage.userIndex].myLikes;
    likeList = userArray[localStorage.userIndex].likeList;
    printMyList();
    getSongs(1);
    getRequest('https://recruit-exam.topviewclub.cn/api/recruit/getUserPhoto?username=' + userArray[localStorage.userIndex].username).then(res => {
        if (res.message == '用户不存在') {
            userImg.src = 'imgs/monkey.jpg';
        } else {
            userImg.src = res.data;
        }
    })
    hideBox.style.display = 'none';
}