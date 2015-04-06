"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var parseString = require("xml2js").parseString;

var _cacheJs = require("./cache.js");

var getCached = _cacheJs.getCached;
var setCached = _cacheJs.setCached;

var config = _interopRequire(require("../../config.js"));

var Request = _interopRequire(require("./Request.js"));

var Serializer = _interopRequire(require("./Serializer.js"));

// TODO: update jsdoc
var ArusPSConnector = {

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
  getProfile: function getProfile(requestParams, model) {
    var useCache = arguments[2] === undefined ? true : arguments[2];

    var cachedProfile = getCached("profile");

    if (typeof useCache !== "boolean") {
      return Promise.reject(new TypeError("Type of useCache is " + typeof useCache + ". Expected a booloean\n\tuseCache = " + useCache));
    } else if (cachedProfile && useCache) {
      return Promise.resolve(cachedProfile);
    }

    var defaults = undefined;
    try {
      defaults = {
        url: __PROFILE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getProfileUrl"),
        auth: [config.get("username"), config.get("password")],
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (typeof params !== "object") {
      return Promise.reject(new TypeError("Type of params is " + typeof params + ". Expected an object\n\tparams = " + params));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    }

    return new Promise(function (resolve, reject) {
      Request.get(params).then(function (res) {

        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        // Serialize the http response to a profile
        var profile = Serializer.profile(jRes, model);

        resolve(profile);
      })["catch"](function (err) {
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
  getPicture: function getPicture(requestParams, model) {
    var useCache = arguments[2] === undefined ? true : arguments[2];

    var cachedPicture = getCached("picture");

    if (typeof useCache !== "boolean") {
      return Promise.reject(new TypeError("Type of useCache is " + typeof useCache + ". Expected a boolean\n\tuseCache = " + useCache));
    } else if (useCache && cachedPicture) {
      return Promise.resolve(cachedPicture);
    }

    var defaults = undefined;
    try {
      defaults = {
        url: __PICTURE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getPictureUrl"),
        auth: [config.get("username"), config.get("password")],
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (typeof params !== "object") {
      return Promise.reject(new TypeError("Type of params is " + typeof params + ". Expected an object\n\tparams = " + params));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    }

    return new Promise(function (resolve, reject) {
      Request.get(params).then(function (res) {

        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        var picture = Serializer.picture(jRes, model);

        resolve(picture);
      })["catch"](function (err) {
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
  getSchedule: function getSchedule(requestParams, model) {
    var ssrEnrlGetMode = arguments[2] === undefined ? 1 : arguments[2];
    var acadCareer = arguments[3] === undefined ? "UGRD" : arguments[3];

    var defaults = undefined;
    try {
      defaults = {
        url: __SCHEDULE_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getScheduleUrl"),
        auth: [config.get("username"), config.get("password")],
        send: undefined,
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (params.send) {
      // Making sure that ssrEnrlGetMode is the same as the one that was sent in the request
      var modeRe = /<SSR_ENRL_GET_MODE>([1-3])<\/SSR_ENRL_GET_MODE>/;
      /* eslint-disable */
      ssrEnrlGetMode = modeRe.exec(params.send)[1];
      /* eslint-enable */
    } else {
      params.send = "<SSR_GET_ENROLLMENT_REQ><SCC_ENTITY_INST_ID></SCC_ENTITY_INST_ID><EMPLID></EMPLID><ACAD_CAREER>" + acadCareer + "</ACAD_CAREER><INSTITUTION>UCINN</INSTITUTION><STRM></STRM><SSR_ENRL_GET_MODE>" + ssrEnrlGetMode + "</SSR_ENRL_GET_MODE></SSR_GET_ENROLLMENT_REQ>";
    }

    if (typeof params !== "object") {
      return Promise.reject(new TypeError("Type of params is " + typeof params + ". Expected an object\n\tparams = " + params));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    } else if (typeof ssrEnrlGetMode !== "string") {
      return Promise.reject(new TypeError("Type of ssrEnrlGetMode is " + typeof ssrEnrlGetMode + ". Expected a string\n\tssrEnrlGetMode = " + ssrEnrlGetMode));
    } else if (typeof acadCareer !== "string") {
      return Promise.reject(new TypeError("Type of acadCareer is " + typeof acadCareer + ". Expected a string\n\tacadCareer = " + acadCareer));
    }

    return new Promise(function (resolve, reject) {
      Request.post(params).then(function (res) {

        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        var schedule = Serializer.schedule(jRes, ssrEnrlGetMode, model);

        resolve(schedule);
      })["catch"](function (err) {
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
  getSubjects: function getSubjects(requestParams, model) {
    var useCache = arguments[2] === undefined ? true : arguments[2];
    var institution = arguments[3] === undefined ? "UCINN" : arguments[3];
    var subject = arguments[4] === undefined ? "" : arguments[4];

    var cachedPicture = getCached("subjects", institution);

    if (typeof useCache !== "boolean") {
      return Promise.reject(new TypeError("Type of useCache is " + typeof useCache + ". Expected a boolean\n\tuseCache = " + useCache));
    } else if (useCache && cachedPicture) {
      return Promise.resolve(cachedPicture);
    }

    if (typeof requestParams !== "object") {
      return Promise.reject(new TypeError("Type of requestParams is " + typeof requestParams + ". Expected an object\n\trequestParams = " + requestParams));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    }

    var defaults = undefined;
    try {
      defaults = {
        url: __SUBJECTS_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getSubjectsUrl"),
        auth: [config.get("username"), config.get("password")],
        send: undefined,
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (!params.send) {
      params.send = "<SSR_GET_COURSES_REQ><COURSE_SEARCH_REQUEST><INSTITUTION>" + institution + "</INSTITUTION><SUBJECT>" + subject + "</SUBJECT><SSR_CRS_SRCH_MODE>H</SSR_CRS_SRCH_MODE></COURSE_SEARCH_REQUEST></SSR_GET_COURSES_REQ>";
    }

    return new Promise(function (resolve, reject) {
      Request.post(requestParams).then(function (res) {

        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        var subjects = Serializer.subjects(jRes, model);

        resolve(subjects);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },

  getCourses: function getCourses(requestParams, model, subject) {
    var useCache = arguments[3] === undefined ? true : arguments[3];
    var institution = arguments[4] === undefined ? "UCINN" : arguments[4];

    if (typeof subject !== "string") {
      return Promise.reject(new TypeError("Type of subject is " + typeof subject + ". Expected a string\n\tsubject = " + subject));
    }

    var cachedPicture = getCached(["courses", institution, subject]);

    if (typeof useCache !== "boolean") {
      return Promise.reject(new TypeError("Type of useCache is " + typeof useCache + ". Expected a boolean\n\tuseCache = " + useCache));
    } else if (useCache && cachedPicture) {
      return Promise.resolve(cachedPicture);
    }

    if (typeof requestParams !== "object") {
      return Promise.reject(new TypeError("Type of requestParams is " + typeof requestParams + ". Expected an object\n\trequestParams = " + requestParams));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    }

    var defaults = undefined;
    try {
      defaults = {
        url: __COURSES_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getCoursesUrl"),
        auth: [config.get("username"), config.get("password")],
        send: undefined,
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (!params.send) {
      params.send = "<SSR_GET_COURSES_REQ><COURSE_SEARCH_REQUEST><INSTITUTION>" + institution + "</INSTITUTION><SUBJECT>" + subject + "</SUBJECT><SSR_CRS_SRCH_MODE>D</SSR_CRS_SRCH_MODE></COURSE_SEARCH_REQUEST></SSR_GET_COURSES_REQ>";
    }

    return new Promise(function (resolve, reject) {
      Request.post(params).then(function (res) {

        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        var courses = Serializer.courses(jRes, model);

        resolve(courses);
      })["catch"](reject);
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
  getNotifications: function getNotifications(requestParams, model) {

    var defaults = undefined;
    try {
      defaults = {
        url: __NOTIFICATIONS_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getNotificationsUrl"),
        auth: [config.get("username"), config.get("password")],
        send: undefined,
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (!params.send) {
      params.send = "<SCC_GET_NOTIF_REQ><EMPLID></EMPLID></SCC_GET_NOTIF_REQ>";
    }

    if (typeof params !== "object") {
      return Promise.reject(new TypeError("Type of params is " + typeof params + ". Expected an object\n\tparams = " + params));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    }

    return new Promise(function (resolve, reject) {
      Request.post(params).then(function (res) {

        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        var notifications = Serializer.notifications(jRes, model);

        resolve(notifications);
      })["catch"](function (err) {
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
  getNotificationEvents: function getNotificationEvents(requestParams, model) {
    var numDaysPast = arguments[2] === undefined ? 10000 : arguments[2];
    var includeEvents = arguments[3] === undefined ? "Y" : arguments[3];

    var defaults = undefined;
    try {
      defaults = {
        url: __EVENTS_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("getNotificationEventsUrl"),
        auth: [config.get("username"), config.get("password")],
        send: undefined,
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (!params.send) {
      if (typeof numDaysPast !== "number") {
        return Promise.reject(new TypeError("Type of numDaysPast is " + typeof numDaysPast + ". Expected a number\n\tnumDaysPast = " + numDaysPast));
      } else if (typeof includeEvents !== "string") {
        return Promise.reject(new TypeError("Type of includeEvents is " + typeof includeEvents + ". Expected a string\n\tincludeEvents = " + includeEvents));
      }

      params.send = "<SCC_NTF_GET_EVENTS_REQ_R><NUM_PAST_DAYS>" + numDaysPast + "</NUM_PAST_DAYS><INCLUDE_EVENTS>" + includeEvents + "</INCLUDE_EVENTS></SCC_NTF_GET_EVENTS_REQ_R>";
    }

    if (typeof params !== "object") {
      return Promise.reject(new TypeError("Type of params is " + typeof params + ". Expected an object\n\tparams = " + params));
    } else if (model !== undefined && typeof model !== "function") {
      return Promise.reject(new TypeError("Type of model is " + typeof model + ". Expected a function\n\tmodel = " + model));
    }

    return new Promise(function (resolve, reject) {
      Request.post(params).then(function (res) {
        var jRes = undefined;
        parseString(res.data, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            reject(err);
          }
        });

        var events = Serializer.events(jRes, model);

        resolve(events);
      })["catch"](function (err) {
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
  changeReadStatus: function changeReadStatus(requestParams, id, status) {
    var numDaysPast = arguments[3] === undefined ? 7 : arguments[3];

    var defaults = undefined;
    try {
      defaults = {
        url: __MARK_AS_READ_URL__,
        auth: [__USERNAME__, __PASSWORD__],
        send: undefined,
        headers: undefined
      };
    } catch (err) {
      defaults = {
        url: config.get("markAsReadUrl"),
        auth: [config.get("username"), config.get("password")],
        send: undefined,
        headers: undefined
      };
    }

    var params = defaults;
    if (requestParams) {
      Object.keys(defaults).map(function (key) {
        return params[key] = requestParams[key] || defaults[key];
      });
    }

    if (!params.send) {
      if (typeof id !== "number") {
        return Promise.reject(new TypeError("Type of id is " + typeof id + ". Expected an number\n\tid = " + id));
      } else if (typeof status !== "string") {
        return Promise.reject(new TypeError("Type of status is " + typeof status + ". Expected an string\n\tstatus = " + status));
      } else if (typeof numDaysPast !== "number") {
        return Promise.reject(new TypeError("Type of numDaysPast is " + typeof numDaysPast + ". Expected an number\n\tnumDaysPast = " + numDaysPast));
      }

      params.send = "<SCC_NTF_UPDATE_EVENTS_REQ><NUM_PAST_DAYS>" + numDaysPast + "</NUM_PAST_DAYS><EVENTS><SCC_NTF_EVENT><SCC_NTFEVT_REQ_ID>" + id + "</SCC_NTFEVT_REQ_ID><SCC_NTFEVT_STATUS>" + status + "</SCC_NTFEVT_STATUS></SCC_NTF_EVENT></EVENTS></SCC_NTF_UPDATE_EVENTS_REQ>";
    }

    if (typeof params !== "object") {
      return Promise.reject(new TypeError("Type of params is " + typeof params + ". Expected an object\n\tparams = " + params));
    }

    return new Promise(function (resolve, reject) {
      Request.post(params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};

module.exports = ArusPSConnector;