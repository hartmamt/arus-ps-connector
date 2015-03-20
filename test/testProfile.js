import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../lib/index.js';
import Profile from '../lib/models/Profile.js';

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
    return ArusPSConnector.getProfile(params)
      .should.eventually.be.an.instanceof(Profile);
  });

  it('should return an instance of the passed in model', () => {

    class ProfileMock {
      constructor(fields) {
        /* eslint-disable */
        let profile = {
          name: this.name
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

    return ArusPSConnector.getProfile(params, ProfileMock)
      .should.eventually.be.an.instanceof(ProfileMock);
  });
});
