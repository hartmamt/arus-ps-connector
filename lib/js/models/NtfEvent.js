"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Serves as the model for NtfEvent data
 *
 * @class
 */

var NtfEvent = (function () {
  function NtfEvent(eventData) {
    var _temp;

    _classCallCheck(this, NtfEvent);

    /* eslint-disable */
    var fields = (_temp = eventData, this.id = _temp.id, this.status = _temp.status, this.startDate = _temp.startDate, this.message = _temp.message, _temp);
  }

  _createClass(NtfEvent, null, {
    create: {
      value: function create(obj) {
        var ntfEvent = {
          id: obj.sccNtfevtReqId,
          status: obj.sccNtfevtStatus,
          startDate: obj.sccNtfevtStartdt,
          message: obj.sccNtfevtMessage
        };

        return new NtfEvent(ntfEvent);
      }
    }
  });

  return NtfEvent;
})();

module.exports = NtfEvent;

/* eslint-enable */