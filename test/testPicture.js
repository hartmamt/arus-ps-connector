import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../index.js';
import Picture from '../lib/models/Picture.js';

chai.should();
chai.use(chaiAsPromised);

describe('#getPicture', () => {
  let params = {
    url: config.get('getPictureUrl'),
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
          // console.log(res);
          resolve(res.text);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.not.become(undefined);
  });

  it.skip('should return an instance of Picture', () => {
    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getPicture(params)
        .then(res => {
          resolve(res instanceof Picture);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.become(true);
  });

  it.skip('should return an instance of the passed in model', () => {

    class PictureMock {
      constructor(fields) {
        /* eslint-disable */
        let picture = {
          desc: this.desc,
          base64: this.base64
        } = fields;
        /* eslint-enable */
      }
      static create(obj) {
        let picture = {
          desc: 'Mocked Picture',
          base64: obj.sccGetphotoResp.employeePhoto.base64data
        };

        return new PictureMock(picture);
      }
    }

    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getPicture(params, PictureMock)
        .then(res => {
          resolve(res instanceof PictureMock);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.become(true);
  });
});
