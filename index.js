console.log("hello fxxking world!");
const YouTube = require("ytube-api");
const Twitter = require("twitter");
const Twitter_key = require("./twitter_key.json");

const client = new Twitter({
    consumer_key: Twitter_key.consumer_key,
    consumer_secret: Twitter_key.consumer_secret,
    access_token_key: Twitter_key.access_token_key,
    access_token_secret: Twitter_key.access_token_secret 
});

const update = (status, in_reply_to_status_id = null) =>
  client.post('statuses/update', {
    status,
    in_reply_to_status_id,
    username: '@2gyUDIVF2t9poyA',
  })

var tweet_make = (tweet1,tweet2)=>{
    update(tweet1)
            .then(tweet => {

                console.log("tweet #1 ==>",tweet);
                return update(tweet2,tweet.id_str);

            })
            .catch(error => console.log(`error ==>`, error));
}

var update_list = (callback)=>{

    var count = videoId_list.length;

    for(var i =0;i<count;i++){

        var tweet_1 = string_list.pop();

        var tweet_2 =  "https://youtu.be/"+videoId_list.pop()+"\n "+ tweet_1;

        setTimeout(() => {

            callback(tweet_1,tweet_2);

        }, 2000);
    }
    
}

const youtube = new YouTube();

youtube.setKey('AIzaSyD7IjZGXlxAZUZpmpw_Q-h1PpTCt5dd-Lc');

youtube.addParam('getPlayListsItemsById',"maxResults");

const channelIds = [
    "UCc1Y0QpNnydj6UdYagZ3m6w"
]

const playlistId = [
    "UUc1Y0QpNnydj6UdYagZ3m6w"
]

const pageToken = [
    'EAAaBlBUOkNESQ'
]

var videoId_list = new Array();
var string_list = new Array();
/*
youtube.setNextPageToken('EAEaBlBUOkNESQ');

youtube.getPlayListsItemsById(playlistId,1,(err,response) => {
    if(err) console.log(err);
    var data = response;
    var items = data['items'][0];
    console.log(items);
});
*/


var item_get = (count,token,callback)=>{

    if(token != null){
        youtube.setNextPageToken(token);
    }

    youtube.getPlayListsItemsById(playlistId,20,(err,response) => {
        if(err) console.log(err);
        var data = response;
        if(count == null){
            count = data['pageInfo']['totalResults'];
            console.log(count);
        }

        for(var i = 0;i<20&&i<count;i++){
            videoId_list.push(data['items'][i]['snippet']['resourceId']['videoId']);
            string_list.push(" #GZzcliptag \n"+data['items'][i]['snippet']['title']+'\n'+"강클립 영상 트윗.");
            console.log(data['items'][i]['snippet']['resourceId']['videoId']);
        }

        count=count-20;

        if(data['nextPageToken']!=null){
            var token = data['nextPageToken'];
            setTimeout(() => {
                item_get(count,token);
            }, 2000);
            
        }else{
            console.log('finished : ',videoId_list);
            console.log('finished : ',string_list);

            update_list(tweet_make);
            
        }

    });
}

item_get(null,null,update_list);

