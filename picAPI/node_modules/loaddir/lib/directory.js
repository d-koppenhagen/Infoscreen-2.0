var
  when         = require('when'),
  fs           = require('final-fs'),
  _            = require('underscore'),
  parseOptions  = require('./parse_options'),
  pathjs       = require('path'),
  join         = require('path').join,
  debugBase    = require('debug'),
  debug        = debugBase('loaddir:directory'),
  Directory
  ;

Directory = function(options) {
  var self = this;

  this.options = options;
  this.children = [];

  debug('Directory'.yellow, 'constructor'.blue, self.path);
    
  // fixes issues where big files trigger watch before they're done writing
  self._watchHandler = _.debounce( _.bind(self._watchHandler, self), 500);

  options.watchedPaths  = options.watchedPaths  || [];
  options.watchers      = options.watchers      || [];

  parseOptions.call(this);

  // One time use
  _.each(['top', 'white_list'], function(key) {
    self[key] = options[key]
    delete options[key]
  });

  // First run through we don't add directories since top is not relative to anything
  this.relativePath = this.relativePath == null ?
    '' : join(this.relativePath, this.baseName);

  when().then(function(){
    if (self.destination)
      return ensureDirectory(self.destination);
  });

  return this;

};

Directory.prototype.load = function() {
  var
    self = this,
    opts = self.options;

  if (!this.path)
    console.log('loaddir: undefined path'.red, this);
  debug('Directory'.yellow, '.load'.blue, this.path.green)

  return fs.readdir(self.path)
  .then(function(results) {
    if (self.watch == true || (self.watch !== false && self.watch !== 'files'))
      self._watch();
    return when.map(results, _.bind(self.iterate, self));
  })
  .otherwise(function(er) {
    debug('Directory'.yellow, 'not found'.red, self.path, er, er.stack);

    if (this.watcher) {
      if (_.contains(self.watchers, self.watcher))
        self.watchers.splice(_.indexOf(self.watchers, self.watcher), 1)

      self.watcher.close();
    }

    if (self.asObject)
      delete opts.parent.output[self.baseName];
    else
      delete opts.output[self.path];

  });

};

// Processes contents of directory
Directory.prototype.iterate = function(fileName){

  var self = this;
  debug('Directory'.yellow, 'iterate'.blue, fileName.green);

  // Child options
  var
    Class,
    path, baseName, options;

  path      = join(this.path, fileName);
  baseName  = pathjs.basename(fileName, pathjs.extname(fileName));

  if ( self.exclude(baseName, path) ) return;

  //if (self.options.existingManifest)
    //console.log(!!self.options.existingManifest[path], path);

  var black_list = self.buildBlackList(fileName),
  options = _.extend( _.clone(self.options), {
    path: path,
    fileName: fileName,
    parent: self,
    black_list: black_list,
    destination: self.destination,
    relativePath: self.relativePath,
    baseName: baseName,
    existingManifest: self.options.existingManifest && self.options.existingManifest[path],
  });

  File = require('./file');

  return fs.lstat( path )
  .then(function(stats) {

    if (stats.isDirectory()) {
      if (self.asObject)
        // nested objects reflect directory structure  {topPath: {subPath: {file1: ...}}}
        self.output[baseName] = options.output = {};
      else
        // all output goes into one object w/ paths { 'topPath/subPath/file1': ...}
        options.output = self.output;

      Class = Directory;
    } else {
      Class = require('./file');
    };

    var child = new Class(options);
    child.stats = stats;

    self.children.push(child);

    return child.load();
  });

};

Directory.prototype.buildBlackList = function(fileName) {

  var self = this;
  var output = [];

  _.each(self.black_list, function(path) {
    if (!path) return
    var parts = path.split(pathjs.sep)
    if (parts[0] == fileName && parts.slice(1).length) {
      output.push(parts.slice(1).join(pathjs.sep));
    }
  });

  return output
  
};

// Determines which children to not include
Directory.prototype.exclude = function(fileName, path) {

  var self = this;

  // exists -- not true first load
  //  on watch condition, if it isn't present, it means its new, otherwise its an 
  //  existing dir already being watched
  return (!self.asObject && self.output[path]) || (self.asObject && self.output[fileName]) ||

  // white / black list violation
  (self.white_list && !_.include(self.white_list, fileName)) ||
  (_.any(self.black_list, function(bl, key) {
    // finding an exact match for a black_list item means it's done for
    if (bl == fileName) {
      delete self.black_list[key]
      return true;
    } else
      return bl == '*';
  }) ) ||

  // tmp / git files
  (fileName.charAt(0) == '.');

};

Directory.prototype._watch = function(){

  var self = this;
  if (self.watcher || _.include(self.watchedPaths, self.path))
    return 

  debug('Directory'.yellow, 'start_watching'.blue, self.path.green)

  self.watchedPaths.push(self.path);
  self.watcher = fs.watch(self.path, _.bind(self._watchHandler, self))

};

Directory.prototype._watchHandler = function(){

  debugBase('loaddir:watch')('Directory'.yellow, '_watchHandler'.blue, this.options.path.green);

  if (this.watchHandler)
    this.watchHandler();
  else
    this.load();

};

Directory.prototype.buildManifest = function(manifest){

  var self = this;
  // Only created for top
  var manifest = manifest || {};

  _.each(self.children, function(child) {

    manifest[child.path] = (function(){
      if (child instanceof Directory)
        return {
          isDir: true,
          children: child.buildManifest(),
        }
      else

        return {
          isFile: true,
          mtime: child.stats.mtime,
          fileData: child.fileData,
          fileContents: child.fileContents,
        };
    })();
  });

  return manifest;
};

function ensureDirectory(path) {

  return fs.exists(path).then(function(exists) {
    if (!exists) return fs.mkdir(path);
  });
};

module.exports = Directory;
