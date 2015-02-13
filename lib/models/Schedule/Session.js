/**
 * Serves as a model for Session data
 *
 * @class
 */
class Session {

  constructor(sessionData) {
    let fields = {
      classNumber: this._classNumber,
      classSection: this._classSection,
      component: this._component,
      daysTimes: this._daysTimes,
      room: this._room,
      instructor: this._instructor,
      startDate: this._startDate,
      endDate: this._endDate
    } = sessionData;
  }
}

module.exports = Session;
