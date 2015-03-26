import { parseString } from 'xml2js';
import Request from './Request.js';
import Serializer from './Serializer.js';

let ArusPSConnector = {

  /**
   * Retrieves Profile information.
   *
   * @method getProfile
   * @static
   * @params {Object} requestParams - an object containing the fields needed to
   * build your remote request
   * @example
   * {
   *   url: 'someUrl',
   *   auth: ['username', 'password'],
   *   acceptType: 'application/json',
   *   send: dataToSend,
   *   headers: objectContainingHeaders
   * }
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  getProfile(requestParams, model) {

    return new Promise((resolve, reject) => {
      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Expected ${model} to be a function`));
      }

      Request.get(requestParams)
        .then(res => {

          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          // Serialize the http response to a profile
          let profile = Serializer.profile(jRes, model);

          resolve(profile);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves a Profile Picture
   *
   * @method getPicture
   * @static
   * @params {Object} requestParams - an object containing the fields needed to
   * build the remote request
   * @example
   * {
   *   url: 'someUrl',
   *   auth: ['username', 'password'],
   *   acceptType: 'application/json',
   *   send: dataToSend,
   *   headers: objectContainingHeaders
   * }
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  getPicture(requestParams, model) {

    return new Promise((resolve, reject) => {
      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Expected ${model} to be a function`));
      }

      Request.get(requestParams)
        .then(res => {

          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          let picture = Serializer.picture(jRes, model);

          resolve(picture);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves Schedule info
   *
   * @method getSchedule
   * @static
   * @params {Object} requestParams - an object containing the fields needed to build the remote
   * request
   * @params {Num} payloadMode - specifies the format the payload will come back in; must be 1, 2,
   * or 3 and defaults to 1
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  getSchedule(requestParams, model, payloadMode = 1, acadCareer = 'UGRD') {

    return new Promise((resolve, reject) => {

      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Expected ${model} to be a function`));
      } else if (typeof payloadMode !== 'number') {
        reject(new TypeError(`Expected ${payloadMode} to be a number`));
      }

      if (!requestParams.send) {
        if (typeof acadCareer !== 'string') {
          reject(new TypeError(`Expected ${acadCareer} to be a string`));
        }

        requestParams.send = `<SSR_GET_ENROLLMENT_REQ><SCC_ENTITY_INST_ID></SCC_ENTITY_INST_ID><EMPLID></EMPLID><ACAD_CAREER>${acadCareer}</ACAD_CAREER><INSTITUTION>UCINN</INSTITUTION><STRM></STRM><SSR_ENRL_GET_MODE>${payloadMode}</SSR_ENRL_GET_MODE></SSR_GET_ENROLLMENT_REQ>`;
      }

      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          let schedule = Serializer.schedule(jRes, payloadMode, model);

          resolve(schedule);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves Subjects
   *
   * @method getSubjects
   * @static
   */
  getSubjects(requestParams, model) {

    return new Promise((resolve, reject) => {

      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Expected ${model} to be a function`));
      }

      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          let subjects = Serializer.subjects(jRes, model);

          resolve(subjects);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves Notification info
   *
   * @method getNotifications
   * @static
   * @params {Object} requestParams - an object containing the fields needed to build the remote
   * request
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  getNotifications(requestParams, model) {

    return new Promise((resolve, reject) => {

      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Expected ${model} to be a function`));
      }

      if (!requestParams.send) {
        requestParams.send = `<SCC_GET_NOTIF_REQ><EMPLID></EMPLID></SCC_GET_NOTIF_REQ>`;
      }

      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          let notifications = Serializer.notifications(jRes, model);

          resolve(notifications);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Retrieves Notification Event info
   *
   * @method getNotificationEvents
   * @static
   * @params {Object} requestData - an object containing the fields needed to create the remote
   * request
   * @return {Promise} - returns a Promise of the serialized remote request response
   */
  getNotificationEvents(requestParams, model, numDaysPast = 10000, includeEvents = 'Y') {

    return new Promise((resolve, reject) => {

      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Expected ${model} to be a function`));
      }

      if (!requestParams.send) {
        if (typeof numDaysPast !== 'number') {
          reject(new TypeError(`Expected ${numDaysPast} to be a number`));
        } else if (typeof includeEvents !== 'string') {
          reject(new TypeError(`Expected ${includeEvents} to be a string`));
        }

        requestParams.send = `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>${numDaysPast}</NUM_PAST_DAYS><INCLUDE_EVENTS>${includeEvents}</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`;
      }

      Request.post(requestParams)
        .then(res => {
          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          let events = Serializer.events(jRes, model);

          resolve(events);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Marks a notification as read
   *
   * @method changeReadStatus
   * @static
   * @params {Object} requestParams - an object containing the fields needed to create the remote
   * request
   */
  changeReadStatus(requestParams, id, status, numDaysPast = 7) {

    return new Promise((resolve, reject) => {

      if (typeof requestParams !== 'object') {
        reject(new TypeError(`Expected ${requestParams} to be an object`));
      }

      if (!requestParams.send) {
        if (typeof id !== 'number') {
          reject(new TypeError(`Expected ${id} to be an number`));
        } else if (typeof status !== 'string') {
          reject(new TypeError(`Expected ${status} to be an string`));
        } else if (typeof numDaysPast !== 'number') {
          reject(new TypeError(`Expected ${numDaysPast} to be an number`));
        }

        requestParams.send = `<SCC_NTF_UPDATE_EVENTS_REQ><NUM_PAST_DAYS>${numDaysPast}</NUM_PAST_DAYS><EVENTS><SCC_NTF_EVENT><SCC_NTFEVT_REQ_ID>${id}</SCC_NTFEVT_REQ_ID><SCC_NTFEVT_STATUS>${status}</SCC_NTFEVT_STATUS></SCC_NTF_EVENT></EVENTS></SCC_NTF_UPDATE_EVENTS_REQ>`;
      }
      Request.post(requestParams)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }
};

module.exports = ArusPSConnector;
