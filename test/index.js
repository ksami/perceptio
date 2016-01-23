var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;
chai.use(chaiAsPromised);
chai.config.includeStack = true;

var superagent = require('superagent');



describe('API', ()=>{


  var get, post, put, del;

  before(()=>{
    /**
     * Wraps HTTP GET call in a Promise
     * @param  {string} url URL to GET from api root eg. /institutions
     * @return {Promise} Promise resolving to the response object
     */
    get = function(url){
      return new Promise((resolve, reject)=>{
        superagent
        .get('http://localhost:8080/api'+url)
        .accept('json')
        .end((err, res)=>{
          err ? reject(err) : resolve(res);
        });
      });
    };

    /**
     * Wraps HTTP POST call in a Promise
     * @param  {string} url URL to POST from api root eg. /institutions
     * @param {Object} data Data to POST
     * @return {Promise} Promise resolving to the response object
     */
    post = function(url, data){
      return new Promise((resolve, reject)=>{
        superagent
        .post('http://localhost:8080/api'+url)
        .type('json')
        .send(data)
        .end((err, res)=>{
          err ? reject(err) : resolve(res);
        });
      });
    };

    put = function(url, data){
      return new Promise((resolve, reject)=>{
        superagent
        .put('http://localhost:8080/api'+url)
        .type('json')
        .send(data)
        .end((err, res)=>{
          err ? reject(err) : resolve(res);
        });
      });
    };

    del = function(url){
      return new Promise((resolve, reject)=>{
        superagent
        .del('http://localhost:8080/api'+url)
        .end((err, res)=>{
          err ? reject(err) : resolve(res);
        });
      });
    };

  });

  //////////
  // Test //
  //////////
  describe('/api/test', ()=>{
    it('GET should successfully return message', ()=>{
      return get('/test').then(res=>{
        assert.equal(res.body.text, 'GET /api/test successful');
      });
    });
    it('POST should successfully return message', ()=>{
      var data = {msg: 'hello world!'};
      return post('/test', data).then(res=>{
        assert.equal(res.body.text, 'POST /api/test successful');
        assert.deepEqual(res.body.data, data);
      });
    });
    it('PUT should successfully return message', ()=>{
      var data = {msg: 'hello world!'};
      return put('/test/1', data).then(res=>{
        assert.equal(res.body.text, 'PUT /api/test/1 successful');
        assert.deepEqual(res.body.data, data);
      });
    });
    it('DELETE should successfully return message', ()=>{
      return del('/test/1').then(res=>{
        assert.equal(res.body.text, 'DELETE /api/test/1 successful');
      });
    });
  });


});