var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var phantomStream = require('phantom-render-stream')();
var Twitter = require('twitter');
var dateFormat = require('dateformat');
var streamToBuffer = require('stream-to-buffer');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = client.stream('statuses/filter', {track: process.env.TRACKING});
stream.on('data', function(event) {
  if (event.text.indexOf('RT ') !== 0) {
    processEvent(event.user.screen_name, event.id_str);
  }
});

function processEvent(user, statusId) {
  var stream = phantomStream('https://twitter.com/' + user + '/status/' + statusId);
  streamToBuffer(stream, function (err, buffer) {
    try {
      var params = {
          Bucket: process.env.BUCKET,
          Key: dateFormat(new Date(), 'yyyy/mm/dd/HH-MM-ss-') + statusId + '.png',
          Body: new Buffer(buffer, 'binary')
      };
      s3.upload(params, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Successfully uploaded https://twitter.com/' + user + '/status/' + statusId);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
}
