var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    loaddir = require('loaddir')
    cors = require('cors')
    bodyParser = require('body-parser');

var app = express();
var port = 40000;
var checkTime = 30*60000; //30 min timer
var apikey = "c5b43dc8057549128a825eb2faee5a9e";
var allImages = [];
// config

  app.use(cors());
  app.use(bodyParser.json());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "images")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// read directory
loadImages();

// REST api
app.get('/api', function (req, res) {
  res.send("api is running!");
});

app.get('/api/images', function (req, res) {
  if (req.query.apikey==apikey){
	loadImages();
	console.log("key correct! key: ",req.query.apikey);
        console.log("new Request received! Response: "+JSON.stringify(allImages));
	res.json(allImages);
  } 
  else { 
	return res.send(403);
	console.log("wrong key! your key was: ",req.query.apikey);
  }
  allImages = [];
});

app.listen(port);
console.log("app is listen on Port "+port);






function loadImages () { //timer to check the folder every xxx seconds
  //allImages = [];
  loaddir({
    path: __dirname + '/images',
    callback: function(){
                var relPath = this.relativePath
                if (!(relPath == "cache")){
                        if (relPath) {
                                var relPath  = relPath+"/";
                        }
                        var imageObj = {
                                "title":this.baseName,
                                "description":"",
                                "image":[
                                        {
                                        "kind":"picture",
                                        "url": relPath + this.fileName
                                        }
                                ]
                        }
                }
                allImages.push(imageObj);
        }
  });
  console.log("scanning folders...", JSON.stringify(allImages) );
}
