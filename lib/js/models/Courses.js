"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = _interopRequire(require("underscore"));

var Courses = (function () {
  function Courses(params) {
    var _this = this;

    _classCallCheck(this, Courses);

    Object.keys(params).map(function (key) {
      return _this[key] = params[key];
    });
  }

  _createClass(Courses, null, {
    create: {
      value: function create(obj) {
        var courses = [];

        if (_.isArray(obj.ssrGetCoursesResp.courseSearchResult.subjects.subject.courseSummaries)) {
          obj.ssrGetCoursesResp.courseSearchResult.subjects.subject.courseSummaries.map(function (course) {
            courses.push(new Course(course));
          });
        } else {
          courses.push(new Course(obj.ssrGetCoursesResp.courseSearchResult.subjects.subject.courseSummaries.courseSummary));
        }

        return new Courses(courses);
      }
    }
  });

  return Courses;
})();

var Course = function Course(params) {
  var _this = this;

  _classCallCheck(this, Course);

  Object.keys(params).map(function (key) {
    return _this[key] = params[key];
  });
};

module.exports = Courses;