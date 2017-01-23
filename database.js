const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const assert = require('assert');
const url = "mongodb://quizappp:quizappp@ds117859.mlab.com:17859/quizappp";
function new_user(obj,callback)
{
    mongoClient.connect(url, function (err, db)
    {
        assert.equal(err,null);
        var handler = db.collection('user-details');
        handler.find({'uid':obj.uid}).toArray(function (err,result) {
            assert.equal(err,null);
            if(result.length)
            {
                db.close();
                callback(0);
            }
            else
            {
                handler.insertOne(
                    {
                        'uid':obj.uid,
                        'displayname':obj.displayName,
                        'email' : obj.email,
                        'photo-url':obj.photoURL,
                        'score':null,
                        'time':null
                    },function (err,result) {
                        assert.equal(err,null);
                        db.close();
                        callback(1);
                    }
                );
            }
        });
    });
}

    function add_questions(callback) {
    mongoClient.connect(url,function (err,db) {
        assert.equal(err,null);
        var handler = db.collection('questions');
        for(var i=0;i<20;i++){
            handler.insertOne({
                'statement':'Lorem ipsum dolor sit amet consectetur adipiscing elit.' +
                'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem ' +
                'aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae' +
                ' vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, ' +
                'aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro ',
                'score':10,
                'correct-answer':1,
                'options':['option1','option2','option3','option4']
            });
        }
        db.close();
        callback();
    });
}

function get_questions(callback)
{
    mongoClient.connect(url,function (err,db) {
        var handler = db.collection('questions');
        handler.find({}).toArray(function (error,result) {
            callback(result);
        });
    });
}

function update_score(obj,callback) {
    mongoClient.connect(url,function (err,db) {
        var handler = db.collection('user-details');
        handler.updateOne({'uid':obj.uid},{$set:{'score':obj.score}});
        handler.updateOne({'uid':obj.uid},{$set:{'time':obj.time}});
        db.close();
        callback();
    })
}


function leaderboard(callback) {

    mongoClient.connect(url,function (err,db) {
        var handler = db.collection('user-details');
        handler.find({}).toArray(function (err,result) {
            result.sort(function (a,b) {
                if(Number(a.score) < Number(b.score))return 1;
                if(Number(a.score) == Number(b.score)){
                    if(Number(a.time) < Number(b.time))return -1;
                    else return 1;
                }
                return -1;
            });
            db.close();
            console.log(result);
            callback(result);
        })
    })
}

module.exports = {
    new_user : new_user,
    add_questions:add_questions,
    get_questions:get_questions,
    update_score:update_score,
    leaderboard:leaderboard
};
