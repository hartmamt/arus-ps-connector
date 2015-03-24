import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/Request.js';
import ArusPSConnector from '../lib/index.js';
import NtfEvent from '../lib/models/NtfEvent.js';

chai.should();
chai.use(chaiAsPromised);

describe('Events', () => {
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
  });

  describe('#changeReadStatus', () => {

    let getParams = {
      url: config.get('getNotificationEventsUrl'),
      auth: [config.get('username'), config.get('password')],
      send: `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>10000</NUM_PAST_DAYS><INCLUDE_EVENTS>Y</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`
    };

    let changeParams;

    let id;
    let oldStatus;
    let newStatus;

    let resp;

    before((done) => {
      ArusPSConnector.getNotificationEvents(getParams)
        .then(res => {
          id = res[0].id;
          oldStatus = res[0].status;

          newStatus = oldStatus === 'U' ? 'R' : 'U';
          changeParams = {
            url: config.get('markAsReadUrl'),
            auth: [config.get('username'), config.get('password')],
            send: `<SCC_NTF_UPDATE_EVENTS_REQ><NUM_PAST_DAYS>7</NUM_PAST_DAYS><EVENTS><SCC_NTF_EVENT>	<SCC_NTFEVT_REQ_ID>${id}</SCC_NTFEVT_REQ_ID><SCC_NTFEVT_STATUS>${newStatus}</SCC_NTFEVT_STATUS></SCC_NTF_EVENT></EVENTS></SCC_NTF_UPDATE_EVENTS_REQ>`
          };

          resp = new Promise((resolve) => {
            ArusPSConnector.changeReadStatus(changeParams)
              .then(res2 => {
                resolve(res2);
                done();
              }).catch(done);
          });
        }).catch(done);
    });

    it('should return ok', () => {
      return resp.should.be.fulfilled;
    });

    it('should have changed the read status', () => {
      let changedStatus = new Promise((resolve, reject) => {
        ArusPSConnector.getNotificationEvents(getParams)
          .then(res => {
            for (let i = 0; i < res.length; ++i) {
              if (res[i].id === id) {
                resolve(res[i].status);
                break;
              }
            }
          }).catch(reject);
      });

      return changedStatus.should.become(newStatus);
    });

    after((done) => {
      changeParams = {
        url: config.get('markAsReadUrl'),
        auth: [config.get('username'), config.get('password')],
        send: `<SCC_NTF_UPDATE_EVENTS_REQ><NUM_PAST_DAYS>7</NUM_PAST_DAYS><EVENTS><SCC_NTF_EVENT>	<SCC_NTFEVT_REQ_ID>${id}</SCC_NTFEVT_REQ_ID><SCC_NTFEVT_STATUS>${oldStatus}</SCC_NTFEVT_STATUS></SCC_NTF_EVENT></EVENTS></SCC_NTF_UPDATE_EVENTS_REQ>`
      };

      ArusPSConnector.changeReadStatus(changeParams)
        .then(() => {
          done();
        }).catch(done);
    });
  });
});
