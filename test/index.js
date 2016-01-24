var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var chaiSubset = require('chai-subset')
var assert = chai.assert;
chai.use(chaiAsPromised);
chai.use(chaiSubset);
chai.config.includeStack = true;

var superagent = require('superagent');
var fs = require('fs');



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
        .get('http://localhost:8080'+url)
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
        .post('http://localhost:8080'+url)
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
        .put('http://localhost:8080'+url)
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
        .del('http://localhost:8080'+url)
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
      return get('/api/test').then(res=>{
        assert.equal(res.body.text, 'GET /api/test successful');
      });
    });
    it('POST should successfully return message', ()=>{
      var data = {msg: 'hello world!'};
      return post('/api/test', data).then(res=>{
        assert.equal(res.body.text, 'POST /api/test successful');
        assert.deepEqual(res.body.data, data);
      });
    });
    it('PUT should successfully return message', ()=>{
      var data = {msg: 'hello world!'};
      return put('/api/test/1', data).then(res=>{
        assert.equal(res.body.text, 'PUT /api/test/1 successful');
        assert.deepEqual(res.body.data, data);
      });
    });
    it('DELETE should successfully return message', ()=>{
      return del('/api/test/1').then(res=>{
        assert.equal(res.body.text, 'DELETE /api/test/1 successful');
      });
    });
  });


  describe('/api/realtime', ()=>{
    it('POST should give id', ()=>{
      var data = {
        url: 'https://dweet.io:443/get/latest/dweet/for/c6h12o6c6h12o6',
        duration: 1000,
        size: {width: 500, height: 200},
        color: 'asdsada'
      };
      return post('/api/realtime', data).then(res=>{
        console.log(res.body.data);
        assert.isString(res.body.data);
      });
    });
  });



  //////////
  // Form //
  //////////
  // describe('/form', ()=>{
  //   it('POST should return req.body', ()=>{
  //     var line1 = {
  //       nodes: [
  //         {x: 20, y: 20},
  //         {x: 30, y: 30},
  //         {x: 40, y: 40}
  //         // {x: 100, y: 60}
  //       ],
  //       color: 'ff0000'
  //     };
  //     var line2 = {
  //       nodes: [
  //         {x: 20, y: 40},
  //         {x: 30, y: 30},
  //         {x: 40, y: 20}
  //       ],
  //       color: '0000ff'
  //     };
  //     var data = {
  //       size: {width: 200, height: 200},
  //       lines: [line1, line2]
  //     };
  //     return post('/form', data).then(res=>{
  //       assert.isDefined(res.body);
  //       assert.isUndefined(fs.writeFileSync('out.png', res.body, 'base64'));
  //       // assert.containSubset(res.body.data, data);
  //     });
  //   });
  // });

  //////////
  // Form2 //
  //////////
  // describe('/form2', ()=>{
  //   it('POST should return req.body', ()=>{
  //     var line1 = {
  //       nodes: [
  //         {time: '2016-01-23T00:00:00.000Z', value: 20},
  //         {time: '2016-01-23T00:00:10.000Z', value: 30},
  //         {time: '2016-01-23T00:00:20.000Z', value: 40}
  //       ],
  //       color: 'ff0000'
  //     };
  //     var line2 = {
  //       nodes: [
  //         {time: '2016-01-23T00:00:00.000Z', value: 10},
  //         {time: '2016-01-23T00:00:10.000Z', value: 30},
  //         {time: '2016-01-23T00:00:20.000Z', value: 20}
  //       ],
  //       color: '00ff00'
  //     };
  //     var data = {
  //       size: {width: 200, height: 200},
  //       lines: [line1, line2]
  //     };
  //     return post('/form2', data).then(res=>{
  //       assert.containSubset(res.body.data, data);

  //     });
  //   });
  // });

});