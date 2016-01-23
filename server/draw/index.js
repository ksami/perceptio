var jsdom = require('jsdom'),
    path = require('path'),
    fs = require('pn/fs'),
    child_process = require('pn/child_process'),
    phantomjs = require('phantomjs'),
    htmlStub = '<html><body><div id="dataviz"></div></body></html>';

var _PREFIX = "data:image/png;base64,";

var lineGraph = require('./lineGraph');

// pass the html stub to jsDom
jsdom.env({
  features: {QuerySelector: true},
  html: htmlStub,
  done: function(errors, window) {
    // process the html document, like if we were at client side
    // code to generate the dataviz and process the resulting html file to be added here
    var container = window.document.querySelector('#dataviz');


    var width = 200,
        height = 200;

    //draw using d3
    lineGraph(width, height, container);


    // save result in an html file
    var svgsrc = container.innerHTML;


    console.log(svgsrc);


    var binPath = phantomjs.path;

    var childArgs = [
      path.join(__dirname, 'phantomjs-script.js'),
      width,
      height,
      svgsrc
    ];
     
    child_process.execFile(binPath, childArgs, function(err, stdout, stderr) {
      // handle results 
      console.log('phantom done');

      // var results = stdout.toString();
      // if(results.startsWith(_PREFIX)){
      //   var png = new Buffer(results.substring(_PREFIX.length), 'base64');

      //   fs.writeFile('d3.png', png)
      //   .then(()=>console.log('d3.png written, open file to check results'));
      // }
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