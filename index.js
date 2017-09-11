// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_sd8cxbxb:labrv73rq2tbbfeicm201d1pfi@ds111754.mlab.com:11754/heroku_sd8cxbxbhttp://kaman-os-2.herokuapp.com/parse',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || '1vbNptEzFhOptvNm0cs0Gud8kVCFMg4LjyczEcXhaaaaaa',
  masterKey: process.env.MASTER_KEY || 'z7JGPZXO9QgB3OLvE4zHBX7Dz6JtGCSHupM7oFL7', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://kaman-os-2.herokuapp.com/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  push: {
        ios: {
            pfx: '/app/devpush.p12', // the path and filename to the .p12 file you exported earlier. 
            passphrase: 'Smart_2010',
            topic: 'com.riadco.kaman', // The bundle identifier associated with your app
            production: false // Specifies which environment to connect to: Production (if true) or Sandbox
        },
        {
            pfx: '/app/ProdCertificates.p12', // the path and filename to the .p12 file you exported earlier. 
            topic: 'com.riadco.kaman', // The bundle identifier associated with your app
            production: true // Specifies which environment to connect to: Production (if true) or Sandbox
        }
    }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
