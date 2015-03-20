import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../index.js';
import Schedule from '../lib/models/Schedule.js';

chai.should();
chai.use(chaiAsPromised);

describe('#getSchedule', () => {
  let createParams = (mode) => {
    return {
      url: config.get('getScheduleUrl'),
      auth: [config.get('username'), config.get('password')],
      send: `<SSR_GET_ENROLLMENT_REQ><SCC_ENTITY_INST_ID></SCC_ENTITY_INST_ID><EMPLID></EMPLID><ACAD_CAREER>UGRD</ACAD_CAREER><INSTITUTION>UCINN</INSTITUTION><STRM></STRM><SSR_ENRL_GET_MODE>${mode}</SSR_ENRL_GET_MODE></SSR_GET_ENROLLMENT_REQ>`,
      acceptType: 'application/xml'
    };
  };

  let params;
  let data;

  before(() => {
    params = createParams(1);
    // console.log(params);
  });

  it('should return ok', () => {
    return Request.post(params).should.be.fulfilled;
  });

  it('should return data', () => {
    let resp = new Promise((resolve, reject) => {
      Request.post(params)
        .then(res => {
          data = res;
          resolve(res.text);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.not.become(undefined);
  });

  it.skip('should return instance of Schedule', () => {
    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getSchedule(params)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.eventually.be.an.instanceof(Schedule);
  });

  it.skip('should return the same as previous test', () => {
    return ArusPSConnector.getSchedule(params)
      .should.eventually.be.an.instanceof(Schedule);
  });

  it.skip('should return an instance of passed in model', () => {

    class ScheduleMock {
      contructor(fields) {
        /* eslint-disable */
        let schedule = {
          desc: this.desc,
          terms: this.terms
        } = fields;
        /* eslint-enable */
      }

      static create(obj) {
        let schedule = {
          desc: 'Mocked Schedule',
          terms: ['mockTerm1', 'mockTerm2']
        };

        return new ScheduleMock(schedule);
      }
    }

    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getSchedule(params, ScheduleMock)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.eventually.be.an.instanceof(ScheduleMock);
  });

  after(() => {
    console.log(data);
  });
});
