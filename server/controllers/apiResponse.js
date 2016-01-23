var apiResponse = function(data, errorMessage){
  if(typeof errorMessage === 'undefined'){
    return {
      error: {status: false, message: ''},
      data: data
    };
  }
  else{
    return {
      error: {status: true, message: errorMessage},
      data: null
    };
  }
};

module.exports = apiResponse;