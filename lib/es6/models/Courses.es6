import _ from 'underscore';

class Courses {

  constructor(params) {
    Object.keys(params).map(key => this[key] = params[key]);
  }

  static create(obj) {
    let courses = [];

    if (_.isArray(obj.ssrGetCoursesResp.courseSearchResult.subjects.subject.courseSummaries)) {
      obj.ssrGetCoursesResp.courseSearchResult.subjects.subject.courseSummaries.map(course => {
        courses.push(new Course(course));
      });
    } else {
      courses.push(new Course(obj.ssrGetCoursesResp.courseSearchResult.subjects.subject.courseSummaries.courseSummary));
    }

    return new Courses(courses);
  }
}

class Course {
  constructor(params) {
    Object.keys(params).map(key => this[key] = params[key]);
  }
}

module.exports = Courses;
