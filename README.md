dasmicrobot.com
================

[![Build Status](https://travis-ci.org/Dasmicrobot/dasmicrobot-www.svg?branch=master)](https://travis-ci.org/Dasmicrobot/dasmicrobot-www)

### Requirements

- Installed `node.js` with `npm`
- Installed `Grunt` for deployment (`npm install grunt-cli`)
- Installed dependencies `npm i`

### Usage

`npm start` - run the app in a local server
`npm run build` - will compile sources into `dist` directory, ready for deployment
`npm run preview` - will compile sources and serve them via local server for preview
`grunt deploy --bucket=myS3BucketName` - will push site to S3 bucket, provided that AWS key and secret env variables are correct

### Travis integration

Travis script runs build on every commit and when on `master` will push site to S3 bucket as well

