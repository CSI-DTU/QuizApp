

function logged(user) {
    $.post('/new-user',user.providerData[0],function (data,status) {
        localStorage.setItem('user',JSON.stringify(User.providerData[0]));
        localStorage.setItem('state','true');
        window.location.href='/logged.html';
    });
}
$("#login").click(function () {
    var obj={};
    obj.user = $("#username").val()+'@quizapp.com';
    obj.password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(obj.user,obj.password).catch(function (error) {
        console.log(error.code);
        console.log(error.message);
    }).then(function (user) {
        console.log(user);
        logged(user);
    });
});

$("#register").click(function () {

    var obj={};
    obj.user = $("#username").val()+'@quizapp.com';
    console.log(obj.user);
    obj.password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(obj.user,obj.password).catch(function (error) {
        console.log(error.code);
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token);
        // The signed-in user info.
        var user = result.user;
        logged(user);

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

        logged(user);

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;

        logged(user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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