import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import superagent from 'superagent';
import request from '../lib/Request.js';

chai.should();
chai.use(chaiAsPromised);

describe.only('Superagent', () => {
  describe('GET', () => {
    let params = {
      url: config.get('getProfileUrl'),
      auth: [config.get('username'), config.get('password')]
    };

    it('status should be ok [1]', () => {
      let resp = new Promise((resolve, reject) => {
        let req = superagent
          .get(params.url)
          .auth(...params.auth)
          .end((err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          });
      });

      return resp.should.be.fulfilled;
    });

    it('status should be ok [2]', () => {
      return request.get(params)
        .should.be.fulfilled;
    });

    it('status should be ok [3]', () => {
      return request.getNoAgent(params)
        .should.be.fulfilled;
    });

    it('status should be ok [4]', () => {
      return request.getAxios(params)
        .should.be.fulfilled;
    });

    it('should return data [1]', () => {
      let resp = new Promise((resolve, reject) => {
        let req = superagent
          .get(params.url)
          .auth(...params.auth)
          .end((err, res) => {
            if (err) {
              reject(err);
            }
            // console.log('[1]', res.text);
            resolve(res.text);
          });
      });

      return resp.should.not.become(undefined);
    });

    it('should return data [2]', () => {
      let resp = new Promise((resolve, reject) => {
        let req = request.get(params)
          .then(res => {
            // console.log('[2]', res.text);
            resolve(res.text);
          }).catch(err => {
            reject(err);
          });
      });

      return resp.should.not.become(undefined);
    });

    it('should return data [3]', () => {
      let resp = new Promise((resolve, reject) => {
        let req = request.getNoAgent(params)
          .then(res => {
            // console.log('[3]', res.text);
            resolve(res.text);
          }).catch(err => {
            console.log(err);
            reject(err);
          });
      });

      return resp.should.not.become(undefined);
    });

    it('should return data [4]', () => {
      let resp = new Promise((resolve, reject) => {
        request.getAxios(params)
          .then(res => {
            resolve(res.data);
          }).catch(err => {
            reject(err);
          });
      });

      return resp.should.not.become(undefined);
    });
  });
});




/* eslint-disable */
it.skip('request should return ok', () => {
  // let req = request.get(config.get('getProfileUrl'))
  //   .auth(config.get('username'), config.get('password'));

  let resp = new Promise((resolve, reject) => {
    // req.on('response', (error, response, body) => {
    //   console.log('error:\t', error);
    //   console.log('response:\t', response);
    //   console.log('body:\t', body);
    //   resolve(response);
    // });

    request({
      url: config.get('getProfileUrl'),
      auth: {
        user: config.get('username'),
        pass: config.get('password')
      }
    }, (error, response, body) => {
      // console.log('error:\t', error);
      // console.log('response:\t', response);
      // console.log('body:\t', body);

      resolve([error, response, body]);
    });
  });
  // console.log(req);

  return resp.should.be.fulfilled;
});
