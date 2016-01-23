var d3 = require('d3'),
    jsdom = require('jsdom'),
    path = require('path'),
    fs = require('pn/fs'),
    child_process = require('pn/child_process'),
    phantomjs = require('phantomjs'),
    htmlStub = '<html><body><div id="dataviz"></div></body></html>';

var _PREFIX = "data:image/png;base64,";

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
    
    var circles = [
      {x: 30, y: 110},
      {x: 50, y: 80},
      {x: 90, y: 120}
    ];

    var lines = [
      {start: circles[0], end: circles[1]},
      {start: circles[1], end: circles[2]},
      {start: circles[2], end: circles[0]}
    ];

    var chart = d3.select(container)                 // select div with id chart, jQuery-like
                  .append("svg")                     // append an svg element to selection
                  .attr("width", width)              // with attribute width of width
                  .attr("height", height);           // with attribute height of height

    chart.selectAll(".node")                         // select all divs with class node
          .data(circles)                             // bind circles as data source
          .enter()                                   // for every selection (ie. div with class node) not found, do the following
          .append("svg:circle")                      // append svg:circle element
          .attr("cx", function(d) { return d.x; })   // for each element in data source as bound just now, ie. for circle in circles, set svg:circle's cx attribute to circle.x
          .attr("cy", function(d) { return d.y; })   // and cy to circle.y
          .attr("r", "10px")                         // and r to 10px
          .attr("fill", "black");                    // and fill to black

    chart.selectAll(".line")
          .data(lines)
          .enter()
          .append("svg:line")
          .attr("x1", function(d) { return d.start.x; })
          .attr("y1", function(d) { return d.start.y; })
          .attr("x2", function(d) { return d.end.x; })
          .attr("y2", function(d) { return d.end.y; })
          .style("stroke", "#ff0000")
          .style("stroke-width", "2px");

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