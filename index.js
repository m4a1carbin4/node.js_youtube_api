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

const update = (status, media_ids,in_reply_to_status_id = null) =>
  client.post('statuses/update', {
    status,
    media_ids,
    in_reply_to_status_id,
    username: '@2gyUDIVF2t9poyA',
  })

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
/*
youtube.setNextPageToken('EAEaBlBUOkNESQ');

youtube.getPlayListsItemsById(playlistId,50,(err,response) => {
    if(err) console.log(err);
    var data = response;
    var items = data['items'][0];
    console.log(items['snippet']['resourceId']['videoId']);
    console.log(data);
});
*/



var item_get = (count,token)=>{

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
        }

    });
}

item_get(null,null);