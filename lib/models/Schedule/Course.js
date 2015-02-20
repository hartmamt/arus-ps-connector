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

  get desc() {
  	return this._desc;
  }

  set desc(desc) {
  	temp = this._desc;
  	this._desc = desc;

  	return this._desc;
  }

  get status() {
  	return this._status;
  }

  set status(status) {
  	temp = this._status;
  	this._status = status;

  	return this._status;
  }

  get units() {
  	return this._units;
  }

  set units(units) {
  	temp = this._units;
  	this._units = units;

  	return this._units;
  }

  get gradeDesc() {
  	return this._gradeDesc;
  }

  set gradeDesc(gradeDesc) {
  	temp = this._gradeDesc;
  	this._gradeDesc = gradeDesc;

  	return this._gradeDesc;
  }

  get grade() {
  	return this._grade;
  }

  set grade(grade) {
  	temp = this._grade;
  	this._grade = grade;

  	return this._grade;
  }

  get course() {
  	return this._course;
  }

  set course(course) {
  	temp = this._course;
  	this._course = course;

  	return this._course;
  }

  get sessions() {
  	return this._sessions;
  }

  set sessions(sessions) {
  	temp = this._sessions;
  	this._sessions = sessions;

  	return this._sessions;
  }

}

module.exports = Course;
