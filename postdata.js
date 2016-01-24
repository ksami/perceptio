var superagent = require('superagent');

var post = function(url, data){
  return new Promise((resolve, reject)=>{
    superagent
    .post(url)
    .type('json')
    .send(data)
    .end((err, res)=>{
      err ? reject(err) : resolve(res);
    });
  });
};

var data = function(){
  var val = Math.random() * 100;
  return {
    output: val
  };
};

setInterval(function(){
  post('https://dweet.io:443/dweet/for/c6h12o6c6h12o6', data())
  .then(res=>{
    console.log(res.body);
  });
}, 10000);