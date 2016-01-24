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

  function readSingleFile(file, width, height, color) {
    //Retrieve the first (and only!) File from the FileList object
    var nodes = [];

    if (file) {
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
          color: color
        }

        drawGraph(width, height, chart, "#graph-container");

      }
      r.readAsText(file);
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


  // form
  $('#submit-btn').click(function() {
    var $scope = angular.element(document.getElementById('form')).scope();

    if($scope.isStatic()) {
      $('#graph-modal').modal();
    } else {

      var data = {
        url: $scope.url,
        duration: 10000,
        width: $scope.width,
        height: $scope.height,
        color: $scope.color
      };

      $.post({
        url: "/api/realtime",
        data: data,
        success: function(result) {
          if(result != null) {
            data = result.data;
            if(data != null) {
              location.href = "/api/realtime/" + data;
            }
          }
        }
      });


    }

  });

  // modal
  $('#graph-modal').on("shown.bs.modal", function() {
    var $scope = angular.element(document.getElementById('form')).scope();
    var file = $scope.file;
    var width = $scope.width;
    var height = $scope.height;
    var color = $scope.color;

    readSingleFile(file, width, height, color);
  });

  $('#graph-modal').on("hidden.bs.modal", function() {
    var graphContainer = $(this).find("#graph-container");
    graphContainer.empty();
  });

  $('#export-button').click(function() {
    var svg = $('#graph-container svg')[0];
    saveSvgAsPng(svg, "diagram.png");
  })


});