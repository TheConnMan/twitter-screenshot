# Twitter Screenshot
Screenshots of Tweets as soon as they happen.

## Usage
Run with `docker run -d theconnman/twitter-screenshot:latest` with the following environment variables set using the `-e` flag.

## Setup
Create a Twitter application (here)[https://apps.twitter.com/app/new] and generate an Access Token on the **Keys and Access Tokens** tab. Use those for the corresponding environment variables below.

### Environment Variables
- **TRACKING** (default: javascript) - Tracking terms to save (can be comma delimited for multiple terms)
- **BUCKET** - S3 bucket to upload screenshots to
- **AWS_ACCESS_KEY_ID** - AWS access key
- **AWS_SECRET_ACCESS_KEY** - AWS secret key
- **TWITTER_CONSUMER_KEY** - Twitter Consumer Key
- **TWITTER_CONSUMER_SECRET** - Twitter Consumer Secret
- **TWITTER_ACCESS_TOKEN_KEY** - Twitter Access Key
- **TWITTER_ACCESS_TOKEN_SECRET** - Twitter Consumer Secret
