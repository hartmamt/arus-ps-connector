import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../lib/index.js';
import NtfEvent from '../lib/models/NtfEvent.js';

chai.should();
chai.use(chaiAsPromised);

describe('#getNotificationEvents', () => {
  let params = {
    url: config.get('getNotificationEventsUrl'),
    auth: [config.get('username'), config.get('password')],
    send: `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>10000</NUM_PAST_DAYS><INCLUDE_EVENTS>Y</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`
  };

  it('should return ok', () => {
    return Request.post(params).should.be.fulfilled;
  });

  it('should return data', () => {
    let resp = new Promise((resolve, reject) => {
      Request.post(params)
        .then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.not.become(undefined);
  });

  it('should return an instance of NtfEvent', () => {
    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getNotificationEvents(params)
        .then(res => {
          resolve(res[0]);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.eventually.be.an.instanceof(NtfEvent);
  });

  it('should return an instance of passeed in model', () => {
    class EventMock {
      constructor(fields) {
        let event = {
          desc: this.desc
        } = fields;
      }
      static create(obj) {
        let event = {
          desc: 'Event Mock'
        };

        return new this(event);
      }
    }

    let resp = new Promise((resolve, reject) => {
      ArusPSConnector.getNotificationEvents(params, EventMock)
        .then(res => {
          resolve(res[0]);
        }).catch(err => {
          reject(err);
        });
    });

    return resp.should.eventually.be.an.instanceof(EventMock);
  });

  it.skip('should be change the read status', () => {

  });
});
