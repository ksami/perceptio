var d3 = require('d3');
var LineSegment = function(x1,y1,x2,y2){
  return {
    start: {x: x1, y: y1},
    end: {x: x2, y: y2}
  };
};


module.exports = function(width, height, charts, container){
  var lines = [];

  for(var i=0; i<charts.length; i++){
    var line = [];
    var points = charts[i].nodes;
    for(var j=0; j<points.length-1; j++){
      line.push(new LineSegment(points[j].x, points[j].y, points[j+1].x, points[j+1].y));
    }
    lines.push({line, color: '#'+charts[i].color});
  }

  // var lines = [
  //   {start: circles[0], end: circles[1]},
  //   {start: circles[1], end: circles[2]},
  //   {start: circles[2], end: circles[0]}
  // ];

  var chart = d3.select(container)                 // select div with id chart, jQuery-like
                .append("svg")                     // append an svg element to selection
                .attr("width", width)              // with attribute width of width
                .attr("height", height);           // with attribute height of height

  // chart.selectAll(".node")                         // select all divs with class node
  //       .data(circles)                             // bind circles as data source
  //       .enter()                                   // for every selection (ie. div with class node) not found, do the following
  //       .append("svg:circle")                      // append svg:circle element
  //       .attr("cx", function(d) { return d.x; })   // for each element in data source as bound just now, ie. for circle in circles, set svg:circle's cx attribute to circle.x
  //       .attr("cy", function(d) { return d.y; })   // and cy to circle.y
  //       .attr("r", "10px")                         // and r to 10px
  //       .attr("fill", "black");                    // and fill to black

  lines.forEach(function(line){
    chart.selectAll(".line")
          .data(line.line)
          .enter()
          .append("svg:line")
          .attr("x1", function(d) { return d.start.x; })
          .attr("y1", function(d) { return d.start.y; })
          .attr("x2", function(d) { return d.end.x; })
          .attr("y2", function(d) { return d.end.y; })
          .style("stroke", line.color)
          .style("stroke-width", "2px");
  });
};