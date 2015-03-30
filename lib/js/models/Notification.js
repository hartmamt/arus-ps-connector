"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Serializes Notification data
 *
 * @class
 */

var Notification = (function () {
  function Notification(notificationData) {
    var _temp;

    _classCallCheck(this, Notification);

    /* eslint-disable */
    var fields = (_temp = notificationData, this.id = _temp.id, this.tag = _temp.tag, this.type = _temp.type, this.importance = _temp.importance, this.dateTime = _temp.dateTime, this.subject = _temp.subject, this.message = _temp.message, _temp);
  }

  _createClass(Notification, null, {
    create: {
      value: function create(obj) {
        var notification = {
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
  });

  return Notification;
})();

module.exports = Notification;

/* eslint-enable */