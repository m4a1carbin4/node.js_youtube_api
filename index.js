console.log("hello fxxking world!");
const YouTube = require("ytube-api");
const Twitter = require("twitter");
const Twitter_key = require("./twitter_key.json");
const fs = require('fs');

const curr = new Date();
// 2. UTC 시간 계산
const utc = 
      curr.getTime() + 
      (curr.getTimezoneOffset() * 60 * 1000);
// 3. UTC to KST (UTC + 9시간)
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = 
      new Date(utc + (KR_TIME_DIFF));

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
    update(tweet1).then(tweet => {
            console.log("tweet succes");

            return update(tweet2,tweet.id_str);

    }).catch(error => console.log(`error ==>`, error));
}

var update_list = (callback)=>{

    var count = new_videoId_list.length;

    for(var i =0;i<count;i++){

        callback(new_string_list.pop() + 'v0.2',"https://youtu.be/"+new_videoId_list.pop()+"\n ");

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

var new_videoId_list = new Array();
var new_string_list = new Array();

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
            string_list.push(" #GZzcliptag \n강클립 영상! 제목 :"+data['items'][i]['snippet']['title']+'\n'+"강클립 영상 트윗.\n 작성시간 : "+kr_curr+"\n");
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

            const tweet_list_v = fs.readFileSync('video_id.json');

            tmp = JSON.parse(tweet_list_v);

            console.log(tmp);

            for(var i=0;i<videoId_list.length-tmp.length;i++){
                new_videoId_list.push(videoId_list[i]);
                new_string_list.push(string_list[i]);
            }

            console.log(new_videoId_list);

            fs.writeFileSync('video_id.json',JSON.stringify(videoId_list));


            update_list(tweet_make);
            
        }

    });
}

item_get(null,null,update_list);