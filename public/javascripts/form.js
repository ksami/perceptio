$(function() {

  // read data from input file
  function extractXandY (line) {
    var line = line.replace(/[^0-9]/g, " ");
    var lineSplits = line.split(" ");
    var datas = [];
    for(var index=0; index < lineSplits.length; index++) {
      if(lineSplits[index].length != 0) {
        datas.push(parseInt(lineSplits[index]));
      }
    }

    return datas;
  }

  function makeNodeObject (datas) {
    return {
      x: datas[0],
      y: datas[1]
    };
  }

  function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
    var nodes = [];

    if (f) {
      var r = new FileReader();
      r.onload = function(e) {
        var contents = e.target.result;
        var lines = contents.split('\n');
        for(var index in lines){
          var datas = extractXandY(lines[index]);
          var node = makeNodeObject(datas);
          nodes.push(node);
        }

        var chart = {
          nodes: nodes,
          color: "#0000ff"
        }

        drawGraph(1000, 500, chart, "#container");

      }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }

  // draw graph

  function drawGraph(width, height, chart, container) {
    var margin = {top: 20, right: 20, bottom: 20, left: 50};

    var lines = chart.nodes;

    // draw axis
    var xRange = d3.scale.linear()
      .range([margin.left, width - margin.right])
      .domain([
        d3.min(lines, function(d) {
          return d.x;
        }),
        d3.max(lines, function(d) {
          return d.x;
        })
      ]);
    var yRange = d3.scale.linear()
      .range([height - margin.top, margin.bottom])
      .domain([
        d3.min(lines, function(d) {
          return d.y;
        }),
        d3.max(lines, function(d) {
          return d.y;
        })
      ]);

    var xAxis = d3.svg.axis().scale(xRange).tickSize(5)
        .tickSubdivide(true);
    var yAxis = d3.svg.axis().scale(yRange).tickSize(5)
        .orient('left')
        .tickSubdivide(true);

    var svg = d3.select(container)
              .append("svg")
              .attr("width", width)
              .attr("height", height);

    svg.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .call(xAxis);

    svg.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(yAxis);

    var lineFunc = d3.svg.line()
      .x(function(d) {
        return xRange(d.x);
      })
      .y(function(d) {
        return yRange(d.y);
      })
      .interpolate('basis');

    svg.append("svg:path")
        .attr('d', lineFunc(lines))
        .attr('stroke', chart.color)
        .attr('stroke-width', 2)
        .attr('fill', 'none');
  }

  document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

});