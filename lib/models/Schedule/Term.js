/**
 * Serves as model for Term data
 *
 * @class
 */
class Term {
  
  constructor(termData) {
    let fields = {
      acadCareerDesc: this._acadCareerDesc,
      curGpa: this._curGpa,
      cumGpa: this._cumGpa,
      termName: this._termName,
      institution: this._institution,
      termBeginDate: this._termBeginDate,
      termEndDate: this._termEndDate,
      courses: this._courses
    } = termData;
  }

  get acadCareerDesc() {
  	return this._acadCareerDesc;
  }

  set acadCareerDesc(acadCareerDesc) {
  	temp = this._acadCareerDesc;
  	this._acadCareerDesc = acadCareerDesc;

  	return this._acadCareerDesc;
  }

  get curGpa() {
  	return this._curGpa;
  }

  set curGpa(curGpa) {
  	temp = this._curGpa;
  	this._curGpa = curGpa;

  	return this._curGpa;
  }

  get cumGpa() {
  	return this._cumGpa;
  }

  set cumGpa(cumGpa) {
  	temp = this._cumGpa;
  	this._cumGpa = cumGpa;

  	return this._cumGpa;
  }

  get termName() {
  	return this._termName;
  }

  set termName(termName) {
  	temp = this._termName;
  	this._termName = termName;

  	return this._termName;
  }

  get institution() {
  	return this._institution;
  }

  set institution(institution) {
  	temp = this._institution;
  	this._institution = institution;

  	return this._institution;
  }

  get termBeginDate() {
  	return this._termBeginDate;
  }

  set termBeginDate(termBeginDate) {
  	temp = this._termBeginDate;
  	this._termBeginDate = termBeginDate;

  	return this._termBeginDate;
  }

  get termEndDate() {
  	return this._termEndDate;
  }

  set termEndDate(termEndDate) {
  	temp = this._termEndDate;
  	this._termEndDate = termEndDate;

  	return this._termEndDate;
  }

  get courses() {
  	return this._courses;
  }

  set courses(courses) {
  	temp = this._courses;
  	this._courses = courses;

  	return this._courses;
  }

}

module.exports = Term;
