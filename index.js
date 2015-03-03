
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');
var parseString = require('xml2js').parseString;

var RemoteRequests = {

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
  'getProfile': function(requestParams, model) {

    return new Promise((resolve, reject) => {
      Request.get(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              throw err;
            }
          });

          // Serialize the http response to a profile
          let profile = Serialize.profile(jRes, model);

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
  'getPicture': function(requestParams, model) {

    return new Promise((resolve, reject) => {
      Request.get(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              throw err;
            }
          });

          let picture = Serialize.picture(jRes, model);

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
  'getSchedule': function(requestParams, payloadMode = 1, model) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              throw err;
            }
          });

          let schedule = Serialize.schedule(jRes, payloadMode, model);
          
          resolve(schedule);
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
  'getNotifications': function(requestParams, model) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {

          let jRes;
          parseString(res.text, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              throw err;
            }
          });

          let notifications = Serialize.notifications(jRes, model);

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
  'getNotificationEvents': function(requestParams, model) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {
          let jRes;
          parseString(res.text, (err, parsedRes) => {
            if (!err) {
              jRes = parsedRes;
            } else {
              throw err;
            }
          });

          let events = Serialize.events(jRes, model);

          resolve(events);
        }).catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Marks a notification as read
   *
   * @method markAsRead
   * @static
   * @params {Object} requestParams - an object containing the fields needed to create the remote
   * request
   */
  'markAsRead': function(requestParams) {

    return new Promise((resolve, reject) => {
      Request.post(requestParams)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    });
  }
};

/* eslint-disable */
// RemoteRequests.getProfile({
//         url: __PROFILE_URL__,
//         auth: [__USERNAME__, __PASSWORD__],
//         acceptType: "application/xml"
//       });
// RemoteRequests.getPicture({
//         url: __PICTURE_URL__,
//         auth: [__USERNAME__, __PASSWORD__],
//         acceptType: 'application/xml'
//       });
RemoteRequests.getSchedule({
      url: __SCHEDULE_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      send: '<SSR_GET_ENROLLMENT_REQ><EMPLID></EMPLID><ACAD_CAREER></ACAD_CAREER><INSTITUTION>UCINN</INSTITUTION><STRM></STRM><SSR_ENRL_GET_MODE>1</SSR_ENRL_GET_MODE></SSR_GET_ENROLLMENT_REQ>',
      acceptType: 'application/xml'
    });
// RemoteRequests.getNotifications({
//       url: __NOTIFICATIONS_URL__,
//       auth: [__USERNAME__, __PASSWORD__],
//       send: '<SCC_GET_NOTIF_REQ><EMPLID></EMPLID></SCC_GET_NOTIF_REQ>',
//       acceptType: 'application/xml'
//     });
// RemoteRequests.getNotificationEvents({
//       url: __EVENTS_URL__,
//       auth: [__USERNAME__, __PASSWORD__],
//       send: `<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>10000</NUM_PAST_DAYS><INCLUDE_EVENTS>Y</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>`,
//       acceptType: 'application/xml'
//     });
/* eslint-enable */

module.exports = RemoteRequests;
