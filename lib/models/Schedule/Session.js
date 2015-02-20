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

  get classNumber() {
    return this._classNumber;
  }

  set classNumber(classNumber) {
    temp = this._classNumber;
    this._classNumber = classNumber;

    return this._classNumber;
  }

  get classSection() {
    return this._classSection;
  }

  set classSection(classSection) {
    temp = this._classSection;
    this._classSection = classSection;

    return this._classSection;
  }

  get component() {
    return this._component;
  }

  set component(component) {
    temp = this._component;
    this._component = component;

    return this._component;
  }

  get daysTimes() {
    return this._daysTimes;
  }

  set daysTimes(daysTimes) {
    temp = this._daysTimes;
    this._daysTimes = daysTimes;

    return this._daysTimes;
  }

  get room() {
    return this._room;
  }

  set room(room) {
    temp = this._room;
    this._room = room;

    return this._room;
  }

  get instructor() {
    return this._instructor;
  }

  set instructor(instructor) {
    temp = this._instructor;
    this._instructor = instructor;

    return this._instructor;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
    temp = this._startDate;
    this._startDate = startDate;

    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  set endDate(endDate) {
    temp = this._endDate;
    this._endDate = endDate;

    return this._endDate;
  }
}

module.exports = Session;
