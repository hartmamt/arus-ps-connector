/**
 * Serves as the model for NtfEvent data
 *
 * @class
 */
class NtfEvent {

  constructor(fields) {
    let fields = {
      id: this.id,
      status: this.status,
      startDate: this.startDate,
      message: this.message
    } = fields;
  }

  static create(obj) {
    let ntfEvent = {
      id: obj.sccNtfevtReqId,
      status: obj.sccNtfevtStatus,
      startDate: obj.sccNtfevtStartdt,
      message: obj.sccNtfevtMessage
    };

    return new NtfEvent(ntfEvent);
  }
}

module.exports = NtfEvent;
