/**
 * Serves as the model for NtfEvent data
 *
 * @class
 */
class NtfEvent {

  constructor(eventData) {
    /* eslint-disable */
    let fields = {
    /* eslint-enable */
      id: this.id,
      status: this.status,
      startDate: this.startDate,
      message: this.message
    } = eventData;
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
