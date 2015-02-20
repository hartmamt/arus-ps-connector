/**
 * Serializes Notification data
 *
 * @class
 */
class Notification {

  constructor(notificationData) {
    let fields = {
      id: this._id,
      tag: this._tag,
      type: this._type,
      importance: this._importance,
      dateTime: this._dateTime,
      subject: this._subject,
      message: this._message
    } = notificationData;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    temp = this._id;
    this._id = id;

    return this._id;
  }

  get tag() {
    return this._tag;
  }

  set tag(tag) {
    temp = this._tag;
    this._tag = tag;

    return this._tag;
  }

  get type() {
    return this._type;
  }

  set type(type) {
    temp = this._type;
    this._type = type;

    return this._type;
  }

  get importance() {
    return this._importance;
  }

  set importance(importance) {
    temp = this._importance;
    this._importance = importance;

    return this._importance;
  }

  get dateTime() {
    return this._dateTime;
  }

  set dateTime(dateTime) {
    temp = this._dateTime;
    this._dateTime = dateTime;

    return this._dateTime;
  }

  get subject() {
    return this._subject;
  }

  set subject(subject) {
    temp = this._subject;
    this._subject = subject;

    return this._subject;
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

module.exports = Notification;
