
if(localStorage.getItem('time')==null)
    localStorage.setItem('time',(new Date()).getTime());

window.setInterval(function () {
    var prev_time = Number(localStorage.getItem('time'));
    var curr_time = Number((new Date()).getTime());
    if(curr_time-prev_time > 1800000){
        my_func();
    }
},10000);

function shuffleArray()
{
        if(localStorage.getItem('state')==null){
            alert("Not Authenticated");
            window.location.href = '/index.html';
        }

    var arr=[];
    var cnt=0;
    var score = 0;
    if(localStorage.getItem('arr')==null)
    {
        arr.length=20;
        var i;
        for( i=1;i<=20;i++)arr[i-1]=i-1;
        for ( i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        localStorage.setItem('arr',JSON.stringify(arr));
        localStorage.setItem('cnt',cnt);
        localStorage.setItem('score',score);
    }

    else
    {
        arr = JSON.parse(localStorage.getItem('arr'));
        cnt = Number(localStorage.getItem('cnt'));
        score = localStorage.getItem('score');
    }

    var Temp = JSON.parse(localStorage.getItem('questions'));
    $("#question").text(Temp[arr[cnt]].statement);
    $('#00').text(Temp[arr[cnt]].options[0]);
    $('#11').text(Temp[arr[cnt]].options[1]);
    $('#22').text(Temp[arr[cnt]].options[2]);
    $('#33').text(Temp[arr[cnt]].options[3]);
    $("#number").text('Question:'+Number(cnt+1));
    $("#score").text('Score: '+Number(score));
}

shuffleArray();
$("#submit").click(function () {
    var valRadio = ($(".rad:checked").attr('id'));
    console.log(valRadio);
    if(valRadio==undefined){
        alert('Please select an option');
    }
    else
    {
        valRadio = Number(valRadio);
        var Temp ;
        Temp  =  JSON.parse(localStorage.getItem('questions'));
        var cnt = Number(localStorage.getItem('cnt'));
        var arr;
        arr = JSON.parse(localStorage.getItem('arr'));
        var score = Number(localStorage.getItem('score'));
        if(valRadio==Number(Temp[arr[cnt]]["correct-answer"]))
        {
            score=score+Number(Temp[arr[cnt]].score);
            localStorage.setItem('score',score);
            alert("Correct Answer");
        }
        else
        {
            alert("Wrong Answer");
        }
        console.log('score '+score);
        $("#score").text('Score: '+Number(score));
        $("#next").css('visibility','visible');
        $("#submit").css('visibility','hidden');
        if(cnt==19)
        {
            alert("Quiz over");
            $("#next").css('visibility','hidden');
            my_func();
        }
    }


});


$("#next").click(function ()
{
    $("#next").css('visibility','hidden');
    $("#submit").css('visibility','visible');
    var Temp;
    Temp = JSON.parse(localStorage.getItem('questions'));
    var cnt = Number(localStorage.getItem('cnt'));
    cnt++;
    var arr;
    arr = JSON.parse(localStorage.getItem('arr'));
    $("#question").text(Temp[arr[cnt]].statement);
    $('#00').text(Temp[arr[cnt]].options[0]);
    $('#11').text(Temp[arr[cnt]].options[1]);
    $('#22').text(Temp[arr[cnt]].options[2]);
    $('#33').text(Temp[arr[cnt]].options[3]);
    localStorage.setItem('cnt',cnt);
    $("#number").text('Question :'+Number(cnt+1));
});

function my_func() {
    var time = Number((new Date()).getTime())-Number(localStorage.getItem('time'));
    var user = firebase.auth().currentUser;
    var score = localStorage.getItem('score');
    $.post('/update-score',{score:score,uid:user.providerData[0].uid,time:time},function (data,status) {
        $.post('/leaderboard',function (data,status) {
            window.location.href='leaderboard.html';
        });
    });
}