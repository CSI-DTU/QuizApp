
var state;
var config = {
    apiKey: "AIzaSyA_utt2AAUGQY9g_ioHSEfN-dyw1WJwSVY",
    authDomain: "new-tester-project.firebaseapp.com",
    databaseURL: "https://new-tester-project.firebaseio.com",
    storageBucket: "new-tester-project.appspot.com",
    messagingSenderId: "309787562634"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    if(user)
    {
        state=true;
        console.log("signed in");
    }
    else
    {
        state=false;
        console.log("signed out");
    }
});
