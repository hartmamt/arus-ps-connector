import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from '../config.js';

import Request from '../lib/js/Request.js';
import ArusPSConnector from '../lib/js/index.js';
import Notification from '../lib/js/models/Notification.js';

chai.should();
chai.use(chaiAsPromised);

describe('Notifications', () => {
  describe('#getNotification', () => {
    let params = {
      url: config.get('getNotificationsUrl'),
      auth: [config.get('username'), config.get('password')],
      send: `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>10000</NUM_PAST_DAYS><INCLUDE_EVENTS>Y</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`,
      acceptType: 'application/xml'
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

    it('should return an instance of Notification', () => {
      let resp = new Promise((resolve, reject) => {
        ArusPSConnector.getNotifications(params)
          .then(res => {
            resolve(res[0]);
          }).catch(err => {
            reject(err);
          });
      });

      return resp.should.eventually.be.an.instanceof(Notification);
    });

    it('should return an instance of passed in model', () => {
      class NotificationMock {
        constructor(fields) {
          let notification = {
            desc: this.desc
          } = fields;
        }
        static create(obj) {
          let notification = {
            desc: 'Notification Mock'
          };

          return new this(notification);
        }
      }

      let resp = new Promise((resolve, reject) => {
        ArusPSConnector.getNotifications(params, NotificationMock)
          .then(res => {
            resolve(res[0]);
          }).catch(err => {
            reject(err);
          });
      });

      return resp.should.eventually.be.an.instanceof(NotificationMock);
    });

    it('should be rejected with a TypeError', () => {
      return ArusPSConnector.getNotifications(params, {})
        .should.be.rejectedWith(TypeError);
    });
  });
});
