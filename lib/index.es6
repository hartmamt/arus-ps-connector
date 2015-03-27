import { parseString } from 'xml2js';
import { getCached, setCached } from './cache.js';

import config from '../config.js';
import Request from './Request.js';
import Serializer from './Serializer.js';


// TODO: update jsdoc
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
  getProfile(requestParams, model, useCache = true) {

    let cachedProfile = getCached('profile');

    if (typeof useCache !== 'boolean') {
      return Promise.reject(new TypeError(`Type of useCache is ${typeof useCache}. Expected a booloean\n\tuseCache = ${useCache}`));
    } else if (cachedProfile && useCache) {
      return Promise.resolve(cachedProfile);
    }

    let defaults;
    try {
      defaults = {
        url: __PROFILE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get('getProfileUrl'),
        auth: [config.get('username'), config.get('password')],
        headers: undefined
      };
    }

    let params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(key => params[key] = requestParams[key] || defaults[key]);
    }

    if (typeof params !== 'object') {
      return Promise.reject(new TypeError(`Type of params is ${typeof params}. Expected an object\n\tparams = ${params}`));
    } else if (model !== undefined && typeof model !== 'function') {
      return Promise.reject(new TypeError(`Type of model is ${typeof model}. Expected a function\n\tmodel = ${model}`));
    }

    return new Promise((resolve, reject) => {
      Request.get(params)
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
  getPicture(requestParams, model, useCache = true) {

    let cachedPicture = getCached('picture');

    if (typeof useCache !== 'boolean') {
      return Promise.reject(new TypeError(`Type of useCache is ${typeof useCache}. Expected a boolean\n\tuseCache = ${useCache}`));
    } else if (useCache && cachedPicture) {
      return Promise.resolve(cachedPicture);
    }

    let defaults;
    try {
      defaults = {
        url: __PICTURE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get('getPictureUrl'),
        auth: [config.get('username'), config.get('password')],
        headers: undefined
      };
    }

    let params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(key => params[key] = requestParams[key] || defaults[key]);
    }

    if (typeof params !== 'object') {
      return Promise.reject(new TypeError(`Type of params is ${typeof params}. Expected an object\n\tparams = ${params}`));
    } else if (model !== undefined && typeof model !== 'function') {
      return Promise.reject(new TypeError(`Type of model is ${typeof model}. Expected a function\n\tmodel = ${model}`));
    }

    return new Promise((resolve, reject) => {
      Request.get(params)
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
   * @params {Num} ssrEnrlGetMode - specifies the format the data will come back in; must be 1, 2,
   * or 3 and defaults to 1
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  getSchedule(requestParams, model, ssrEnrlGetMode = 1, acadCareer = 'UGRD') {

    let defaults;
    try {
      defaults = {
        url: __SCHEDULE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get('getScheduleUrl'),
        auth: [config.get('username'), config.get('password')],
        send: undefined,
        headers: undefined
      };
    }

    let params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(key => params[key] = requestParams[key] || defaults[key]);
    }

    if (params.send) {
      // Making sure that ssrEnrlGetMode is the same as the one that was sent in the request
      let modeRe = /<SSR_ENRL_GET_MODE>([1-3])<\/SSR_ENRL_GET_MODE>/;
      /* eslint-disable */
      ssrEnrlGetMode = modeRe.exec(params.send)[1];
      /* eslint-enable */
    } else {
      params.send = `<SSR_GET_ENROLLMENT_REQ><SCC_ENTITY_INST_ID></SCC_ENTITY_INST_ID><EMPLID></EMPLID><ACAD_CAREER>${acadCareer}</ACAD_CAREER><INSTITUTION>UCINN</INSTITUTION><STRM></STRM><SSR_ENRL_GET_MODE>${ssrEnrlGetMode}</SSR_ENRL_GET_MODE></SSR_GET_ENROLLMENT_REQ>`;
    }

    if (typeof params !== 'object') {
      return Promise.reject(new TypeError(`Type of params is ${typeof params}. Expected an object\n\tparams = ${params}`));
    } else if (model !== undefined && typeof model !== 'function') {
      return Promise.reject(new TypeError(`Type of model is ${typeof model}. Expected a function\n\tmodel = ${model}`));
    } else if (typeof ssrEnrlGetMode !== 'string') {
      return Promise.reject(new TypeError(`Type of ssrEnrlGetMode is ${typeof ssrEnrlGetMode}. Expected a string\n\tssrEnrlGetMode = ${ssrEnrlGetMode}`));
    } else if (typeof acadCareer !== 'string') {
      return Promise.reject(new TypeError(`Type of acadCareer is ${typeof acadCareer}. Expected a string\n\tacadCareer = ${acadCareer}`));
    }

    return new Promise((resolve, reject) => {
      Request.post(params)
        .then(res => {

          let jRes;
          parseString(res.data, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              reject(err);
            }
          });

          let schedule = Serializer.schedule(jRes, ssrEnrlGetMode, model);

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
        reject(new TypeError(`Type of requestParams is ${typeof requestParams}. Expected an object\n\trequestParams = ${requestParams}`));
      } else if (model !== undefined && typeof model !== 'function') {
        reject(new TypeError(`Type of model is ${typeof model}. Expected a function\n\tmodel = ${model}`));
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

    let defaults;
    try {
      defaults = {
        url: __NOTIFICATIONS_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get('getNotificationsUrl'),
        auth: [config.get('username'), config.get('password')],
        send: undefined,
        headers: undefined
      };
    }

    let params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(key => params[key] = requestParams[key] || defaults[key]);
    }

    if (!params.send) {
      params.send = `<SCC_GET_NOTIF_REQ><EMPLID></EMPLID></SCC_GET_NOTIF_REQ>`;
    }

    if (typeof params !== 'object') {
      return Promise.reject(new TypeError(`Type of params is ${typeof params}. Expected an object\n\tparams = ${params}`));
    } else if (model !== undefined && typeof model !== 'function') {
      return Promise.reject(new TypeError(`Type of model is ${typeof model}. Expected a function\n\tmodel = ${model}`));
    }

    return new Promise((resolve, reject) => {
      Request.post(params)
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

    let defaults;
    try {
      defaults = {
        url: __EVENTS_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get('getNotificationEventsUrl'),
        auth: [config.get('username'), config.get('password')],
        send: undefined,
        headers: undefined
      };
    }

    let params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(key => params[key] = requestParams[key] || defaults[key]);
    }

    if (!params.send) {
      if (typeof numDaysPast !== 'number') {
        return Promise.reject(new TypeError(`Type of numDaysPast is ${typeof numDaysPast}. Expected a number\n\tnumDaysPast = ${numDaysPast}`));
      } else if (typeof includeEvents !== 'string') {
        return Promise.reject(new TypeError(`Type of includeEvents is ${typeof includeEvents}. Expected a string\n\tincludeEvents = ${includeEvents}`));
      }

      params.send = `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>${numDaysPast}</NUM_PAST_DAYS><INCLUDE_EVENTS>${includeEvents}</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`;
    }

    if (typeof params !== 'object') {
      return Promise.reject(new TypeError(`Type of params is ${typeof params}. Expected an object\n\tparams = ${params}`));
    } else if (model !== undefined && typeof model !== 'function') {
      return Promise.reject(new TypeError(`Type of model is ${typeof model}. Expected a function\n\tmodel = ${model}`));
    }

    return new Promise((resolve, reject) => {
      Request.post(params)
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

    let defaults;
    try {
      defaults = {
        url: __MARK_AS_READ_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get('markAsReadUrl'),
        auth: [config.get('username'), config.get('password')],
        send: undefined,
        headers: undefined
      };
    }

    let params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(key => params[key] = requestParams[key] || defaults[key]);
    }

    if (!params.send) {
      if (typeof id !== 'number') {
        return Promise.reject(new TypeError(`Type of id is ${typeof id}. Expected an number\n\tid = ${id}`));
      } else if (typeof status !== 'string') {
        return Promise.reject(new TypeError(`Type of status is ${typeof status}. Expected an string\n\tstatus = ${status}`));
      } else if (typeof numDaysPast !== 'number') {
        return Promise.reject(new TypeError(`Type of numDaysPast is ${typeof numDaysPast}. Expected an number\n\tnumDaysPast = ${numDaysPast}`));
      }

      params.send = `<SCC_NTF_UPDATE_EVENTS_REQ><NUM_PAST_DAYS>${numDaysPast}</NUM_PAST_DAYS><EVENTS><SCC_NTF_EVENT><SCC_NTFEVT_REQ_ID>${id}</SCC_NTFEVT_REQ_ID><SCC_NTFEVT_STATUS>${status}</SCC_NTFEVT_STATUS></SCC_NTF_EVENT></EVENTS></SCC_NTF_UPDATE_EVENTS_REQ>`;
    }

    if (typeof params !== 'object') {
      return Promise.reject(new TypeError(`Type of params is ${typeof params}. Expected an object\n\tparams = ${params}`));
    }

    return new Promise((resolve, reject) => {
      Request.post(params)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }
};

module.exports = ArusPSConnector;
