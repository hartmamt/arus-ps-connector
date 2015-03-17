"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var superagent = require("superagent");

/**
 * Provides methods to make REST calls. It currently uses the the superagent
 * request library but can be configured to use other libraries.
 *
 * @class
 */

var Request = (function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, null, {
    get: {

      /**
       * Creates an http `GET` request.
       *
       * @method get
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @throws Throws an error if the endpoint url isn't passed in
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function get(params) {
        return new Promise(function (resolve, reject) {
          if (!params.url) {
            throw "Error: Endpoint Url not available";
          }

          var request = superagent.get(params.url);
          if (params.auth) {
            request.auth.apply(request, _toConsumableArray(params.auth));
          }
          if (params.acceptType) {
            request.accept(params.acceptType);
          }
          if (params.headers) {
            for (var header in params.headers) {
              request.set(header, params.headers[header]);
            }
          }
          request.end(function (err, res) {
            if (res.ok) {
              resolve(res);
            } else {
              reject(err);
            }
          });
        });
      }
    },
    post: {

      /**
       * Creates an http `POST` request.
       *
       * @method post
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @throws Throws an error if the endpoint url isn't passed in
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function post(params) {
        return new Promise(function (resolve, reject) {
          if (!params.url) {
            throw "Error: Endpoint Url not available";
          }

          var request = superagent.post(params.url);
          if (params.auth) {
            request.auth.apply(request, _toConsumableArray(params.auth));
          }
          if (params.acceptType) {
            request.accept(params.acceptType);
          }
          if (params.headers) {
            for (var header in params.headers) {
              request.set(header, params.headers[header]);
            }
          }
          if (params.send) {
            request.send(params.send);
          }
          request.end(function (err, res) {
            if (res.ok) {
              resolve(res);
            } else {
              reject(err);
            }
          });
        });
      }
    },
    update: {

      /**
       *
       * Creates an http `UPDATE` request. **Note:** Not implemented yet.
       *
       * @method update
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function update(params) {
        return new Promise(function (resolve, reject) {
          reject("method `update` not defined yet");
        });
      }
    },
    "delete": {

      /**
       * Creates an http `DELETE` request. **Note:** Not implemented yet.
       *
       * @method delete
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function _delete(params) {
        return new Promise(function (resolve, reject) {
          reject("method `delete` not defined yet");
        });
      }
    }
  });

  return Request;
})();

var _ = require("underscore");

var serialize = function serialize(obj) {
  var keys = _.keys(obj);
  keys = _.reject(keys, function (key) {
    return key === "$";
  });

  return serializeKeys(keys, obj);
};

var serializeKeys = function serializeKeys(keys, obj) {
  var res = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var fieldName = toCamelCase(key);
    var value = obj[key];

    if (_.isArray(value) && value.length === 1) {
      value = value[0];
    }
    if (typeof value === "object") {
      if (value[0]) {
        var values = [];
        for (var _i = 0; value[_i] !== undefined; _i++) {
          values.push(serialize(value[_i]));
        }

        value = values;
      } else {
        value = serialize(value);
      }
    }

    res[fieldName] = value;
  }

  return res;
};

var toCamelCase = function toCamelCase(str) {
  var words = str.toLowerCase().split("_");
  var camelCase = "";

  for (var i = 0; i < words.length; i++) {
    if (i > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    camelCase += words[i];
  }

  return camelCase;
};

var _ = require("underscore");

/**
 * Handles the formatting of remote request responses responses.
 *
 * @class
 */

var Serializer = (function () {
  function Serializer() {
    _classCallCheck(this, Serializer);
  }

  _createClass(Serializer, null, {
    profile: {

      /**
       * Serializes data into a `Profile` object
       *
       * @method profile
       * @static
       * @param {object} profileData - the data that needs to be serialized into a `Profile`
       * @param {function} model - a function that handles the mapping of the serialized data. It must
       * have a `create` method. Defaults to `Profile`
       * @return {model} - returns an instance of `model`
       */

      value: function profile(profileData) {
        var model = arguments[1] === undefined ? Profile : arguments[1];

        return model.create(serialize(profileData));
      }
    },
    picture: {

      /**
       * Serializes data into a `Picture` object
       *
       * @method picture
       * @static
       * @param {object} pictureData - the data that needs to be serialized into a `Picture`
       * @param {function} model - a function that handles the mapping of the serialized data. It must
       * have a `create` method. Defaults to `Picture`
       * @return {model} - returns an instance of `model`
       */

      value: function picture(pictureData) {
        var model = arguments[1] === undefined ? Picture : arguments[1];

        return model.create(serialize(pictureData));
      }
    },
    schedule: {

      /**
       * Serializes data into a `Schedule` object
       *
       * @method schedule
       * @static
       * @param {object} scheduleData - the data that needs to be serialized into a `Schedule`
       * @param {Num} payloadMode - specifies the format the payload will come back in; must be 1, 2,
       * or 3 and defaults to 1
       * @param {function} model - a function that handles the mapping of the serialized data. It must
       * have a `create` method. Defaults to `Schedule`
       * @return {model} - returns an instance of `model`
       */

      value: function schedule(scheduleData, payloadMode) {
        var model = arguments[2] === undefined ? Schedule : arguments[2];

        return model.create(serialize(scheduleData), payloadMode);
      }
    },
    notifications: {

      /**
       * Serializes data into a `Notification` object
       *
       * @method notifications
       * @static
       * @param {object} notificationData
       * @param {function} model - a function that handles the mapping of the serialized data. It must
       * have a `create` method. Defaults to `Notification`
       * @return {Array<model>} - returns an Array of `model` objects
       */

      value: function notifications(notificationsData) {
        var model = arguments[1] === undefined ? Notification : arguments[1];

        var notifications = [];

        notifications = _.map(notificationsData.SCC_GET_NOTIF_RESP.NTK_ITEM, function (notification) {
          return model.create(serialize(notification));
        });

        return notifications;
      }
    },
    events: {

      /**
       * Serializes data into an `Event` object
       *
       * @param {object} eventsData
       * @param {function} model - a function that handles the mapping of the serialized data. It must
       * have a `create` method. Defaults to `NtfEvent`
       * @return {Array<model>} - returns an Array of `model` objects
       */

      value: function events(eventsData) {
        var model = arguments[1] === undefined ? NtfEvent : arguments[1];

        var events = [];

        events = _.map(eventsData.SCC_NTF_GET_EVENTS_RESP.SCC_NTF_EVENT, function (evt) {
          return model.create(serialize(evt));
        });

        return events;
      }
    }
  });

  return Serializer;
})();

var parseString = require("xml2js").parseString;

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
  getProfile: function getProfile(requestParams, model) {

    return new Promise(function (resolve, reject) {
      Request.get(requestParams).then(function (res) {

        var jRes = undefined;
        parseString(res.text, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            throw err;
          }
        });

        var profile = serialize.profile(jRes, model);

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

    return new Promise(function (resolve, reject) {
      Request.get(requestParams).then(function (res) {

        var jRes = undefined;
        parseString(res.text, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            throw err;
          }
        });

        var picture = serialize.picture(jRes, model);

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
   * @params {Num} payloadMode - specifies the format the payload will come back in; must be 1, 2,
   * or 3 and defaults to 1
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  getSchedule: function getSchedule(requestParams, _x, model) {
    var payloadMode = arguments[1] === undefined ? 1 : arguments[1];

    return new Promise(function (resolve, reject) {
      Request.post(requestParams).then(function (res) {

        var jRes = undefined;
        parseString(res.text, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            throw err;
          }
        });

        var schedule = serialize.schedule(jRes, payloadMode, model);

        resolve(schedule);
      })["catch"](function (err) {
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
  getNotifications: function getNotifications(requestParams, model) {

    return new Promise(function (resolve, reject) {
      Request.post(requestParams).then(function (res) {

        var jRes = undefined;
        parseString(res.text, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            throw err;
          }
        });

        var notifications = serialize.notifications(jRes, model);

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

    return new Promise(function (resolve, reject) {
      Request.post(requestParams).then(function (res) {
        var jRes = undefined;
        parseString(res.text, function (err, parsedRes) {
          if (!err) {
            jRes = parsedRes;
          } else {
            throw err;
          }
        });

        var events = serialize.events(jRes, model);

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
  changeReadStatus: function changeReadStatus(requestParams) {

    return new Promise(function (resolve, reject) {
      Request.post(requestParams).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};

/**
 * Serializes Notification data
 *
 * @class
 */

var Notification = (function () {
  function Notification(notificationData) {
    var _temp;

    _classCallCheck(this, Notification);

    var fields = (_temp = notificationData, this.id = _temp.id, this.tag = _temp.tag, this.type = _temp.type, this.importance = _temp.importance, this.dateTime = _temp.dateTime, this.subject = _temp.subject, this.message = _temp.message, _temp);
  }

  _createClass(Notification, null, {
    create: {
      value: function create(obj) {
        var notification = {
          id: obj.sccNtfreqId,
          tag: obj.sccNtfreqItmTag,
          type: obj.sccNtfreqType,
          importance: obj.sccNtfreqImptnce,
          dateTime: obj.sccRowAddDttm,
          subject: obj.sccNtfreqSubject,
          message: obj.sccNtfreqMsgtext
        };

        return new Notification(notification);
      }
    }
  });

  return Notification;
})();

/**
 * Serves as the model for NtfEvent data
 *
 * @class
 */

var NtfEvent = (function () {
  function NtfEvent(eventData) {
    var _temp;

    _classCallCheck(this, NtfEvent);

    var fields = (_temp = eventData, this.id = _temp.id, this.status = _temp.status, this.startDate = _temp.startDate, this.message = _temp.message, _temp);
  }

  _createClass(NtfEvent, null, {
    create: {
      value: function create(obj) {
        var ntfEvent = {
          id: obj.sccNtfevtReqId,
          status: obj.sccNtfevtStatus,
          startDate: obj.sccNtfevtStartdt,
          message: obj.sccNtfevtMessage
        };

        return new NtfEvent(ntfEvent);
      }
    }
  });

  return NtfEvent;
})();

/**
 * Serves as the model for Picture data
 *
 * @class
 */

var Picture = (function () {

  /**
   * Picture constructor
   *
   * @param {Object} pictureData
   */

  function Picture(pictureData) {
    var _temp;

    _classCallCheck(this, Picture);

    var fields = (_temp = pictureData, this.base64 = _temp.base64, _temp);
  }

  _createClass(Picture, null, {
    create: {
      value: function create(obj) {
        var picture = {
          base64: obj.sccGetphotoResp.employeePhoto.base64data
        };

        return new Picture(picture);
      }
    }
  });

  return Picture;
})();

/**
 * Serves as the model to serialize data into a `Profile` object.
 *
 * @class
 */

var Profile = (function () {

  /**
   * The constructor for a `Profile` object.
   *
   * @constructs Profile
   * @params {Object} profileData - the data that generates the public fields of the Profile instance.
   */

  function Profile(profileData) {
    var _temp;

    _classCallCheck(this, Profile);

    var fields = (_temp = profileData, this.name = _temp.name, this.acadCareer = _temp.acadCareer, _temp);
  }

  _createClass(Profile, null, {
    create: {
      value: function create(obj) {
        var profile = {
          name: obj.sccGetconstResp.constituent.perNames.perName[0].nameDisplay,
          acadCareer: obj.sccGetconstResp.constituent.residencyOfficials.residencyOfficial.acadCareer
        };

        return new Profile(profile);
      }
    }
  });

  return Profile;
})();

var _ = require("underscore");
var moment = require("moment");

/**
 * Serves as the model for Schedule data
 *
 * @class
 */

var Schedule = (function () {
  function Schedule(scheduleData) {
    var _temp;

    _classCallCheck(this, Schedule);

    var fields = (_temp = scheduleData, this.terms = _temp.terms, _temp);
  }

  _createClass(Schedule, null, {
    create: {
      value: function create(obj, mode) {
        var terms = _.map(obj.ssrGetEnrollmentResp.ssrEnrlStudylist.ssrEnrlTerms.ssrEnrlTerm, function (term) {
          return Term.create(term, mode);
        });

        var schedule = {
          terms: terms
        };

        return new Schedule(schedule);
      }
    }
  });

  return Schedule;
})();

var Term = (function () {
  function Term(termData) {
    var _temp;

    _classCallCheck(this, Term);

    var fields = (_temp = termData, this.acadCareerDesc = _temp.acadCareerDesc, this.curGpa = _temp.curGpa, this.cumGpa = _temp.cumGpa, this.termName = _temp.termName, this.institution = _temp.institution, this.termBeginDate = _temp.termBeginDate, this.termEndDate = _temp.termEndDate, this.courses = _temp.courses, _temp);
  }

  _createClass(Term, null, {
    create: {
      value: function create(obj, mode) {
        var term = {
          acadCareerDesc: obj.acadCareerLovdescr,
          curGpa: obj.curGpa,
          cumGpa: obj.cumGpa,
          termName: obj.strmLovdescr,
          institution: obj.institutionLovdescr,
          termBeginDate: obj.termBeginDt,
          termEndDate: obj.termEndDt
        };

        if (mode !== 3 && obj.enrollmentDetails.enrollmentDetail) {
          var courses = [];

          if (_.isArray(obj.enrollmentDetails.enrollmentDetail)) {
            courses = obj.enrollmentDetails.enrollmentDetail.map(function (course) {
              return Course.create(course, mode);
            });
          } else {
            courses.push(Course.create(obj.enrollmentDetails.enrollmentDetail, mode));
          }

          term = _.extend(term, {
            courses: courses
          });
        }

        return new Term(term);
      }
    }
  });

  return Term;
})();

var Course = (function () {
  function Course(courseData) {
    var _temp;

    _classCallCheck(this, Course);

    var fields = (_temp = courseData, this.desc = _temp.desc, this.status = _temp.status, this.units = _temp.units, this.gradeDesc = _temp.gradeDesc, this.grade = _temp.grade, this.course = _temp.course, this.sessions = _temp.sessions, _temp);
  }

  _createClass(Course, null, {
    create: {
      value: function create(obj, mode) {
        var course = {
          desc: obj.courseTitleLong,
          status: obj.enrollStatusDescr,
          units: obj.untTaken,
          gradeDesc: obj.gradeBasisDescrformal,
          grade: obj.crseGradeOff,
          course: "" + obj.subject + " " + obj.catalogNbr
        };

        if (mode === 1) {
          var sessions = [];

          if (_.isArray(obj.enrlClassSections.enrlClassSection)) {
            sessions = obj.enrlClassSections.enrlClassSection.map(function (session) {
              return Session.create(session, mode);
            });
          } else {
            sessions.push(Session.create(obj.enrlClassSections.enrlClassSection, mode));
          }

          course = _.extend(course, {
            sessions: sessions
          });
        } else if (mode === 2) {
          var sessions = Session.create(obj, mode);

          course = _.extend(course, {
            sessions: sessions
          });
        }

        return new Course(course);
      }
    }
  });

  return Course;
})();

var Session = (function () {
  function Session(sessionData) {
    var _temp;

    _classCallCheck(this, Session);

    var fields = (_temp = sessionData, this.classNumber = _temp.classNumber, this.classSection = _temp.classSection, this.component = _temp.component, this.daysTimes = _temp.daysTimes, this.room = _temp.room, this.instructor = _temp.instructor, this.startDate = _temp.startDate, this.endDate = _temp.endDate, _temp);
  }

  _createClass(Session, null, {
    create: {
      value: function create(obj, mode) {
        var session = undefined;

        if (mode === 1) {
          var meeting = obj.classMeetingPatterns.classMeetingPattern;

          session = {
            classNumber: obj.classNbr,
            classSection: obj.classSection,
            component: obj.ssrComponentLovdescr,
            daysTimes: this.formatDaysTimes(meeting),
            room: meeting.ssrMtgLocLong,
            instructor: meeting.ssrInstrLong,
            startDate: moment(obj.startDt, "YYYY-MM-DD").format("MM/DD/YYYY"),
            endDate: moment(obj.endDt, "YYYY-MM-DD").format("MM/DD/YYYY")
          };
        } else if (mode === 2) {
          session = {
            classNumber: obj.classNbr,
            instructor: obj.ssrInstrLong
          };
        }

        return new Session(session);
      }
    },
    formatDaysTimes: {
      value: function formatDaysTimes(obj) {
        var days = "";

        if (obj.mon === "Y") {
          days += "M";
        }
        if (obj.tues === "Y") {
          days += "T";
        }
        if (obj.wed === "Y") {
          days += "W";
        }
        if (obj.thurs === "Y") {
          days += "R";
        }
        if (obj.fri === "Y") {
          days += "F";
        }
        if (obj.sat === "Y") {
          days += "S";
        }
        if (obj.sun === "Y") {
          days += "U";
        }
        if (days === "") {
          days = "Invalid Day";
        }

        var start = moment(obj.meetingTimeStart, "hh:mm:ss.SSS").isValid() ? moment(obj.meetingTimeStart, "hh:mm:ss.SSS").format("hh:mma") : "Invalid Time";
        var end = moment(obj.meetingTimeEnd, "hh:mm:ss.SSS").isValid() ? moment(obj.meetingtimeEnd, "hh:mm:ss.SSS").format("hh:mma") : "Invalid Time";

        return "" + days + ": " + start + " - " + end;
      }
    }
  });

  return Session;
})();