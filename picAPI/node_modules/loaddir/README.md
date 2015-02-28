loaddir.js
==========

Asset watching, handling, and compiling for node.js

To install run `npm install loaddir`

Some examples
=============

```javascript
// load server side templates into object for use: template.index()
loaddir = require('loaddir');
jade = require('jade');

loaddir({

  // defaults
  //
  // watch: true
  // compile / callback will be called again when file changes
  
  // instead of { 'full/path/to' : 'fileContents' }
  // returns recursive objects { full : { path : { to : 'fileContents' } } }
  asObject: true,
  
  path: __dirname + '/templates',
  
  // compile runs before callback
  compile: function(fileContents){
  
    // this == loaddir file instance
    
    // this.fileContents == fileContents
   
    // the return becomes the new fileContents
    return jade.compile(fileContents);
  },
  callback: function(thisContext){
   
    // thisContext == this == loaddir file instance
    
    // compile and callback are similar with different args
    return this.fileContents.replace(/__hostname/g, 'http://google.com');
  },

}).then(function(templates) {

  // templates == { account: {index: ..., change_password: ...}, index: ... }
});

```

`callback` will be ran each time the file changes, keeping the returned `templates` object updated.


PATCH NOTES
===========

`1.0.0`
Added promises, and async handling


`0.2.12`
Everything got changed to be class based -- use `expose_hooks: true` to get instances of the classes rather than just the outputted results

`0.0.21`
fixed an issue where deleted files were throwing an error to what was watching them
`0.0.20`
removed in issue where files were being watched multiple times if a directory had new files being created or destroyed in it(even swp files were breaking it)

## License

(The MIT License)

Copyright (c) 2014 Dan Schumann

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
