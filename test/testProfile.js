import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../index.js';
import Profile from '../lib/models/Profile.js';

import request from 'request';

chai.should();
chai.use(chaiAsPromised);


describe('#getProfile', () => {
  let params = {
    url: config.get('getProfileUrl'),
    auth: [config.get('username'), config.get('password')],
    acceptType: 'application/xml'
  };

  it('should return ok', () => {
    return Request.get(params).should.be.fulfilled;
  });

  it('should return data', () => {
    let resp = new Promise((resolve, reject) => {
      Request.get(params)
        .then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.not.become(undefined);
  });

  it('should return an instance of Profile', () => {
    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getProfile(params)
        .then((res) => {
          resolve(res instanceof Profile);
        }).catch((err) => {
          reject(err);
        });
    });

    return resp.should.become(true);
  });

  it('should return an instance of the passed in model', () => {

    class ProfileMock {
      constructor(fields) {
        /* eslint-disable */
        let profile = {

        } = fields;
        /* eslint-enable */
      }

      static create(obj) {
        let profile = {
          name: obj.sccGetconstResp.constituent.perNames.perName[0].nameDisplay
        };

        return new ProfileMock(profile);
      }
    }

    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getProfile(params, ProfileMock)
        .then(res => {
          resolve(res instanceof ProfileMock);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.become(true);
  });
});
