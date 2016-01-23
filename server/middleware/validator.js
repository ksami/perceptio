lodash = require('lodash');

module.exports = {
  /**
   * Check if color matches hex format
   * @param  {Object}  color graph model
   * @return {String}  color color of graph line
   */
  checkColor: function(color){
  	var result = /^#[0-9A-F]{6}$/i.test(color)
  	if (result === false){
  		return '000000';
  	}
  	else {
  		return color;
  	}
  },
  /**
   * Check if fulfill model for linegraph
   * @param  {Object}  arg linegraph model
   * @return {Object}  result
   * @return {Boolean} result.result true if is a line graph
   * @return {String} result.error error message
   */
  isLineGraph: function(arg){
  	
  	var colorList = [];
  	for (var i=0;i<arg.length;i++) {
  		//check for color ,if no exist, dafault String
	  	arg[i].color = checkColor(arg[i].color);
	  	//check if x is number
	  	if (!_.isNumber(arg[i].nodes[0].x)) {
	  		return {result: false, error: 'err x NaN'};
	  	}
	  	//check if y is number
	  	if (!_.isNumber(arg[i].nodes[0].y)) {
	  		return {result: false, error: 'err y NaN'};
	  	}
	  	//check if color is already being used
	  	if (colorList(colorList.indexOf(arg[i].color) != -1)){
	  		return {result: false, error: 'err color being reused'};
	  	}
	  	else {
	  		colorList.push(arg[i].color);
	  	}	
	  	
  	}
  	return {result: true, error: null};

  },

  /**
   * Check if fulfill model for timegraph
   * @param  {Object}  arg timegraph model
   * @return {Object}  result
   * @return {Boolean} result.result true if is a time graph
   * @return {String} result.error error message
   */
   isTimeGraph: function(arg){
  	
  	var colorList = [];
  	for (var i=0;i<arg.length;i++) {
  		//check for color ,if no exist, dafault String
	  	arg[i].color = checkColor(arg[i].color);
	  	//check if time is string
	  	if (!_.isString(arg[i].nodes[0].time)) {
	  		return {result: false, error: 'err not string'};
	  	}
	  	//check if y is number
	  	if (!_.isNumber(arg[i].nodes[0].value)) {
	  		return {result: false, error: 'err value NaN'};
	  	}
	  	//check if color is already being used
	  	if (colorList.indexOf(arg[i].color) != -1){
	  		return {result: false, error: 'err color being reused'};
	  	}
	  	else {
	  		colorList.push(arg[i].color);
	  	}	
  	}
  	return {result: true, error: null};

  },
};