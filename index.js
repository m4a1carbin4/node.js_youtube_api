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

/*youtube.addParam('playlistId',"UUCc1Y0QpNnydj6UdYagZ3m6w");*/

const channelIds = [
    "UCc1Y0QpNnydj6UdYagZ3m6w"
]

const playlistId = [
    "UUc1Y0QpNnydj6UdYagZ3m6w"
]

youtube.getPlayListsItemsById(playlistId,(err,response) => {
    if(err) console.log(err);
    var data = response;
    var items = data['items'][0];
    console.log(items['snippet']['resourceId']['videoId']);
});

