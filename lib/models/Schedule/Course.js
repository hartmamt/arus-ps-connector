/**
 * Serves as a model for Course data
 *
 * @class
 */
class Course {

  constructor(courseData) {
    let fields = {
      desc: this._desc,
      status: this._status,
      units: this._units,
      gradeDesc: this._gradeDesc,
      grade: this._grade,
      course: this._course,
      sessions: this._sessions
    } = courseData;
  }
}

module.exports = Course;
