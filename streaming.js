var Twitter = require('twitter');

var screenshot = require('./lib/screenshot').capture;

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
  if (event.text.indexOf('RT ') !== 0) {
    screenshot(event.user.screen_name, event.id_str);
  }
});
