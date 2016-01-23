lodash = require('lodash');

module.exports = {
  /**
   * Check if fulfill model for linegraph
   * @param  {Object}  arg linegraph model
   * @return {Object}  result
   * @return {Boolean} result.result true if is a line graph
   * @return {String} result.error error message
   */
  isLineGraph: function(arg){
  	
  	
  	for (var i=0;i<arg.length;i++) {
  		//check for color ,if no exist, dafault String
	  	var isColor  = /^#[0-9A-F]{6}$/i.test(arg[i].color);

	  	if (isColor === false) {
	  		arg[i].color = '000000';
	  	}
	  	//check if nodes is array of nodes of 2 elements??

	  	//check if x is number
	  	if (!_.isNumber(arg[i].nodes[0].x)) {
	  		return {result: false, error: 'err x'};
	  	}
	  	//check if y is number
	  	if (!_.isNumber(arg[i].nodes[0].y)) {
	  		return {result: false, error: 'err y'};
	  	}

  	}
  	return {result: true, error: null};

  }

};