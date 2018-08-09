dasmicrobot.com
================

[![Build Status](https://travis-ci.org/Dasmicrobot/dasmicrobot-www.svg?branch=master)](https://travis-ci.org/Dasmicrobot/dasmicrobot-www)

### Requirements

- Installed `node.js` with `npm`
- Installed `Grunt` (`npm install grunt-cli`)
- Installed dependencies `npm i`

### Usage

`npm start` - run the app in a local server
`npm build` - will build compile sources into `dist` directory, ready for deployment
`grunt deploy --bucket=myS3BucketName` - will push site to S3 bucket, provided that AWS key and secret env variables are correct

### Travis integration

Travis script runs build on every commit and when on `master` will push site to S3 bucket as well

