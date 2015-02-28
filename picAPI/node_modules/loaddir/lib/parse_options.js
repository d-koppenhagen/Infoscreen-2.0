var
  loaddir      = require('../'),
  _ = require('underscore');

// context: Directory or File
module.exports = function(){
  var self = this;
  var options = this.options;

  options.debug = options.debug == null ?
      loaddir.debug
    : options.debug;

  _.each([
    'asObject',
    'baseName',
    'black_list',

    // TODO: instead of callback and onRemove, use .on('compile', ...), .on('file', ...) and .on('remove', ...)
    'callback',
    'onRemove',
    'compile',

    'debug',
    'destination',
    'existingManifest',
    'extension',
    'fastWatch',
    'fileName',
    'output',
    'path',
    'pathsOnly',
    'recursive',
    'relativePath',
    'require',
    'toFilename',
    'watch',
    'watchHandler',
    'watchedPaths',
    'watchers',
  ], function(opt) {
    self[opt] = options[opt];
  })

  if (self.watch == null)
    self.watch = self.loaddir.watch;

};
