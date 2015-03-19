import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../index.js';
import Profile from '../lib/models/Profile.js';

chai.should();
chai.use(chaiAsPromised);

describe('Remote Requests', () => {
  describe('#getProfile', () => {
    let params = {
      url: config.get('getProfileUrl'),
      auth: [config.get('username'), config.get('password')]
      // ,acceptType: 'application/xml'
    };

    it('should return ok', () => {
      return Request.get(params).should.be.fulfilled;
    });

    it('should return data', () => {
      let resp = new Promise((resolve, reject) => {
        Request.get(params)
          .then(res => {
            resolve(res.text);
          }).catch(err => {
            reject(err);
          });
      });

      return resp.should.not.become(undefined);
    });

    it('should return an instance of Profile', () => {
      let isProfile = new Promise((resolve, reject) => {
        ArusPSConnector.getProfile(params)
          .then((res) => {
            resolve(res instanceof Profile);
          }).catch((err) => {
            reject(err);
          });
      });

      return isProfile.should.become(true);
    });
  });
});
