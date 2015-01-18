var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    loaddir = require('loaddir');

    var app = express.createServer();

  allImages = []
  loaddir({
    path: __dirname + '/public/images',
    callback: function(){ 
		var relPath = this.relativePath
		if (this.relativePath) {
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
		allImages.push(imageObj);
	}
  })

// config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// REST api
app.get('/api', function (req, res) {
  res.send("api is running");
});

app.get('/api/images', function (req, res) {
  console.log("response: "+JSON.stringify(allImages));
  res.send(allImages);	
});

// Single picture
app.get('/api/images/:id', function (req, res) {
  return PictureModel.findById(req.params.id, function (err, picture) {
    if (!err) {
      return res.send(picture);
    } else {
      return console.log(err);
    }
  });
});

app.listen(4141);
