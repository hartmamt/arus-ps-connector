/**
 * Serves as the model for NtfEvent data
 *
 * @class
 */
class NtfEvent {

  constructor(fields) {
    let fields = {
      id: this._id,
      status: this._status,
      startDate: this._startDate,
      message: this._message
    } = fields;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    temp = this._id;
    this._id = id;

    return this._id;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    temp = this._status;
    this._status = status;

    return this._status;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
    temp = this._startDate;
    this._startDate = startDate;

    return this._startDate;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    temp = this._message;
    this._message = message;

    return this._message;
  }
}

module.exports = NtfEvent;
