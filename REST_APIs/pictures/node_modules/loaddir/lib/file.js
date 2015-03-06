var
  when         = require('when'),
  fs           = require('final-fs'),
  parseOptions = require('./parse_options'),
  pathjs       = require('path'),
  _            = require('underscore'),
  join         = require('path').join,
  debugBase    = require('debug'),
  debug        = debugBase('loaddir:file'),
  File
  ;

File = function(options) {

  var
    self = this;
  self.options = options;

  parseOptions.call(self);

  debug('File'.magenta, 'constructor'.blue, self.path.green);

  self._ext = pathjs.extname(self.path).toLowerCase()

  // large files take time to be written to disk, this prevents reading too early
  self._watchHandler = _.debounce( _.bind(self._watchHandler, self), 500);

  options.toFilename = options.toFilename || toFilename;

  if (_.include(IMAGE_FORMATS, self._ext))
    self.binary = 'binary';

  return self;

};

File.prototype.load = function() {

  var self = this;

  debug('File'.magenta, 'load'.blue, this.path.green); 

  return when().then(function(){

    // Require File
    if (self.require) {
      self.fileContents = require(self.path);

    // Load from disk
    } else {
      return self.read().then(function(){
        // Process the fileData string

        if (self.precompiled) {
          delete self.precompiled;
          if (self.options.forceCompile !== true) return; // can override to compile anyway
          //still saves a read from disk
        }
        return when().then(function(){
          if (self.compile) {
            return self.compile(self.fileData)
          }
        }).otherwise(function(er){
          console.log('Error compiling', self.path.blue, er, er.stack);
          throw new Error(er);
        });
      })
      .then(function(){
        return when().then(function(){
          if (self.callback)
            return self.callback(self);
        }).otherwise(function(er){
          console.log('Error calling back', self.path.blue, er, er.stack);
          throw new Error(er);
        });

      });
    }
  })
  .then(function(){

    if (self.destination) {
      write_path = self.toFilename(
        join(self.destination, self.baseName),
        self.extension || self._ext
      );
      fs.writeFile(write_path, self.fileContents, self.binary);
    };

    // We wrap our fileContents with the filename for consistency
    self.key = self.key || join( self.asObject ? '' : self.relativePath, self.baseName );
    self.output[self.key] = self.fileContents;
    if (self.watch == true || (self.watch !== false && self.loaddir.watch !== false))
      self._watch()

  }).otherwise(function(er) {
    // Allow delete to short circuit writing to self.output without throwing error
    debug('Error loading file -- stack'.red, self.path.blue, er, er.stack);
    delete self.output[self.key];
  });

};

File.prototype._watch = function() {

  var self = this;
  if (_.include(self.watchedPaths, self.path)) return;

  debug('File'.magenta, 'start_watching'.blue, self.path.green);

  self.watchedPaths.push(self.path);

  if (self.fastWatch) {
    self.fileWatcher = fs.watch(self.path, self._watchHandler);
    self.watchers.push(self.fileWatcher);
  } else {
    fs.watchFile(self.path, self._watchHandler);
  };

};

File.prototype.read = function() {

  var self = this;

  debug('File'.magenta, 'read'.blue, self.path.magenta, 'Path Only: ' + self.pathsOnly);

  if (self.pathsOnly) {

    self.fileContents = self.path;
    return when(self.fileContents = self.path);

  } else if (
      self.existingManifest &&
      self.stats.mtime.getTime() == new Date(self.existingManifest.mtime).getTime()
  ) {
    self.fileData = self.existingManifest.fileData;
    self.fileContents = self.existingManifest.fileContents;
    delete self.existingManifest;
    self.precompiled = true;
    return when();
  } else
    return self.readFile();
};

File.prototype.readFile = function(){
  var self = this;

  return fs.readFile(self.path, self.binary)
  .then(function(fileContents) {
    // fileContents gets compiled, converted, required, etc
    // so we keep the original fileData
    self.fileData = self.fileContents = fileContents.toString();
  })
  .otherwise(function(er) {

    debug('Error reading file'.red, er, er.stack)

    if (_.contains(self.watchedPaths, self.path))
      self.watchedPaths.splice(_.indexOf(self.watchedPaths, self.path), 1);

    delete self.output[self.key];

    if (self.fast_watch) {
      if (_.contains(self.watchers, self.fileWatcher))
        self.watchers.splice(_.indexOf(self.watchers, self.fileWatcher), 1);
      self.fileWatcher && self.fileWatcher.close();
    } else
      fs.unwatchFile(self.path);

    if (self.onRemove) self.onRemove(self);

    throw er;
  });

};

File.prototype._watchHandler = function() {

  var self = this;
  debugBase('loaddir:watch')('File'.magenta, 'watchHandler'.blue, this.path.green);

  if (self.watchHandler)
    self.watchHandler();
  else
    self.load();

}

var IMAGE_FORMATS = [
  '.png',
  '.gif',
  '.jpg',
  '.jpeg',
];

// Default is just combine the same baseName and extension
var toFilename = function(baseName, ext) {
  return baseName + ext;
};

module.exports = File;
