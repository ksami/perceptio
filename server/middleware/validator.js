var lodash = require('lodash');

module.exports = {
  /**
   * Check if color matches hex format
   * @param  {String}  color graph model
   * @return {String}  color color of graph line
   */
  checkColor: function(color){
	var colorDictionary = {
		'red': '#f44336',
		'purple': '#9c27b0', 	
		'blue': '#2196f3',
		'green': '#4caf50',
		'orange': '#ff9800',
		'brown': '#795548',
		'black': '#000000',
		'pink': '#e91e63',
		'yellow': '#ffeb3b', 
		'teal': '#009688'
	};

  	var hexColor = /^#[0-9A-F]{6}$/i.test(color)
  	
  	if (hexColor === false){
  		var match = false;
  		var formatColor = color.toLowerCase();
  		for (var sample in colorDictionary) {
  			if (sample === formatColor) {
  				match = true;
  			}
  		}
  		if (match){
  			return colorDictionary[color];
  		}
  		return 'invalid';
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
  		//check for color ,if no exist, default String
	  	arg[i].color = checkColor(arg[i].color);
	  	if (arg[i].color === 'invalid'){
	  		return {result: false, error: 'err invalid line color'};
	  	}
	  	//check if x is number
	  	if (!lodash.isNumber(arg[i].nodes[0].x)) {
	  		return {result: false, error: 'err x NaN'};
	  	}
	  	//check if y is number
	  	if (!lodash.isNumber(arg[i].nodes[0].y)) {
	  		return {result: false, error: 'err y NaN'};
	  	}
	  	//check if color is already being used  ## not working as intended
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
  		//check for color ,if no exist, default String
	  	arg[i].color = checkColor(arg[i].color);
	  	if (arg[i].color === 'invalid'){
	  		return {result: false, error: 'err invalid line color'};
	  	}
	  	//check if time is string
	  	if (!lodash.isString(arg[i].nodes[0].time)) {
	  		return {result: false, error: 'err not string'};
	  	}
	  	//check if value is number
	  	if (!lodash.isNumber(arg[i].nodes[0].value)) {
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
  /**
   * Check if fulfill model for realtimegraph
   * @param  {Object}  arg realtimegraph model
   * @return {Object}  result
   * @return {Boolean} result.result true if is a realtime graph
   * @return {String} result.error error message
   */
   isRealTimeGraph: function(arg){
   	console.log(arg);
 	//check for color ,if no exist, default String
	arg.color = this.checkColor(arg.color);
	if (arg.color === 'invalid'){
		return {result: false, error: 'err invalid line color'};
	}
	//check if duration is number
	if (isNaN(arg.duration)) {
		return {result: false, error: 'err value NaN'};
	}
   	 return {result: true, error: null};
   }

};