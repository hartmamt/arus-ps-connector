/**
 * Serializes Notification data
 *
 * @class
 */
class Notification {

  constructor(notificationData) {
    let fields = {
      id: this.id,
      tag: this.tag,
      type: this.type,
      importance: this.importance,
      dateTime: this.dateTime,
      subject: this.subject,
      message: this.message
    } = notificationData;
  }

  static create(obj) {
    let notification = {
      id: obj.sccNtfreqId,
      tag: obj.sccNtfreqItmTag,
      type: obj.sccNtfreqType,
      importance: obj.sccNtfreqImptnce,
      dateTime: obj.sccRowAddDttm,
      subject: obj.sccNtfreqSubject,
      message: obj.sccNtfreqMsgtext
    };

    return new Notification(notification);
  }
}

module.exports = Notification;
