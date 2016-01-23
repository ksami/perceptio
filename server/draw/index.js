var jsdom = require('jsdom'),
    path = require('path'),
    fs = require('pn/fs'),
    child_process = require('child_process'),
    phantomjs = require('phantomjs'),
    htmlStub = '<html><body><div id="dataviz"></div></body></html>';

var _PREFIX = 'data:image/png;base64,';

var lineGraph = require('./lineGraph');

var types = {
  lineGraph
};


/**
 * Draws svg and returns png
 * @param  {String} type type of model
 * @return {Buffer|undefined}      Base64 encoded buffer or undefined if failed
 */
module.exports = function(type, params, cb){
  // pass the html stub to jsDom
  jsdom.env({
    features: {QuerySelector: true},
    html: htmlStub,
    done: function(errors, window) {
      // process the html document, like if we were at client side
      // code to generate the dataviz and process the resulting html file to be added here
      var container = window.document.querySelector('#dataviz');


      var width = params.size.width,
          height = params.size.height,
          lines = params.lines;

      //draw using d3
      types[type](width, height, lines, container);


      // save result in an html file
      var svgsrc = container.innerHTML;


      // console.log(svgsrc);


      var binPath = phantomjs.path;

      var childArgs = [
        path.join(__dirname, 'phantomjs-script.js'),
        width,
        height,
        svgsrc
      ];
      // console.log(binPath);
      // console.log(childArgs);
       
      child_process.execFile(binPath, childArgs, function(err, stdout, stderr) {
        // handle results
        if(err) console.log(err);

        var results = stdout.toString();

        if(results.startsWith(_PREFIX)){
          var png = new Buffer(results.substring(_PREFIX.length), 'base64');
          console.log('phantom done');
          cb(png);
        }
        else{
          cb(undefined);
        }

        // //   fs.writeFile('d3.png', png)
        // //   .then(()=>console.log('d3.png written, open file to check results'));
        // // }
      });


      // fs.writeFile('index.svg', svgsrc, function(err) {
      //   if(err) {
      //     console.log('error saving document', err);
      //   } else {
      //     console.log('The file was saved, open index.html to see the result');          
      //   }
      // });

    }
  });
}