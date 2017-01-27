
function logged(user) {
    $.post('/new-user',user.providerData[0],function (data,status) {
        localStorage.setItem('user',JSON.stringify(User.providerData[0]));
        localStorage.setItem('state','true');
        console.log(user.providerData[0]);
        window.location.href='/logged.html';
    });
}
$("#login").click(function () {
    var obj={};
    obj.user = $("#username").val();
    obj.password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(obj.user,obj.password).then(function (user) {
        logged(user);
    }).catch(function (error) {
       alert(error.message);
    });
});

$("#register").click(function () {

    var obj={};
    obj.user = $("#username").val();
    obj.password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(obj.user,obj.password).catch(function (error) {
        alert(error.message);
        window.location.href= '';
    }).then(function (user) {
        logged(user);
    });
});


$("#google").click(function () {
    if(state)
    {
        alert("Already Logged in");
        return;
    }
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        logged(user);

    }).catch(function(error) {
        alert(error.message);
    });
});




$("#github").click(function () {
    if(state)
    {
        alert("Already Logged in");
        return;
    }
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        logged(user);

    }).catch(function(error) {
        alert(error.message);
    });
});



$("#twitter").click(function () {

    if(state)
    {
        alert("Already Logged in");
        return;
    }
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        logged(user);
    }).catch(function(error) {
        alert(error.message);
    });
});

$(function () {
    firebase.auth().signOut().then(function() {
       localStorage.clear();
    }, function(error) {
        console.log(error.code);
        console.log(error.message);
    });
});