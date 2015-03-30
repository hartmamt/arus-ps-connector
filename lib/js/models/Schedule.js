"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

    /* eslint-disable */
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

    /* eslint-disable */
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

    /* eslint-disable */
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

    /* eslint-disable */
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

module.exports = Schedule;

/* eslint-enable */

/* eslint-enable */

/* eslint-enable */

/* eslint-enable */