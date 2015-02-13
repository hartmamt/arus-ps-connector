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
}

module.exports = Term;
