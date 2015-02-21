
/**
* Serves as the model to serialize data into a `ServiceIndicator` object.
*
* @class
*/
class ServiceIndicator {

  /**
  * The constructor for a `ServiceIndicator` object.
  *
  * @constructs ServiceIndicator
  * @params {Object} serviceIndicatorData - the data that generates the public fields of the ServiceIndicator instance.
  */
  constructor(serviceIndicatorData) {
    // Initializes public fields
    let fields = {
      emplid: this._emplid,
      dateTime: this._dateTime,
      activeDateTime: this._activeDateTime,
      institution: this._institution,
      institutionDesc: this._institutionDesc,
      serviceIndicatorCode: this._serviceIndicatorCode,
      serviceIndicatorCodeDesc: this._serviceIndicatorCodeDesc,
      serviceIndicatorReason: this._serviceIndicatorReason,
      serviceIndicatorActTerm: this._serviceIndicatorActTerm,
      serviceIndicatorActTermDesc: this._serviceIndicatorActTermDesc,
      departmentId: this._departmentId,
      departmentIdDesc: this._departmentIdDesc,
      amount: this._amount,
      currencyCode: this._currencyCode,
      currencyCodeDesc: this._currencyCodeDesc,
      serviceIndicatorReasonDesc: this._serviceIndicatorReasonDesc,
      positiveServiceIndicator: this._positiveServiceIndicator
    } = serviceIndicatorData;
  }

  get emplid() {
    return this._emplid;
  }

  set emplid(emplid) {
    let old = this._emplid
    this._emplid = emplid;

    return old;
  }

  get dateTime() {
    return this._dateTime;
  }

  set dateTime(dateTime) {
    let old = this._dateTime
    this._dateTime = dateTime;

    return old;
  }

  get activeDateTime() {
    return this._activeDateTime;
  }

  set activeDateTime(activeDateTime) {
    let old = this._activeDateTime
    this._activeDateTime = activeDateTime;

    return old;
  }

  get institution() {
    return this._institution;
  }

  set institution(institution) {
    let old = this._institution
    this._institution = institution;

    return old;
  }

  get serviceIndicatorCode() {
    return this._serviceIndicatorCode;
  }

  set serviceIndicatorCode(serviceIndicatorCode) {
    let old = this._serviceIndicatorCode
    this._serviceIndicatorCode = serviceIndicatorCode;

    return old;
  }

  get serviceIndicatorCodeDesc() {
    return this._serviceIndicatorCodeDesc;
  }

  set serviceIndicatorCodeDesc(serviceIndicatorCodeDesc) {
    let old = this._serviceIndicatorCodeDesc
    this._serviceIndicatorCodeDesc = serviceIndicatorCodeDesc;

    return old;
  }

  get serviceIndicatorReason() {
    return this._serviceIndicatorReason;
  }

  set serviceIndicatorReason(serviceIndicatorReason) {
    let old = this._serviceIndicatorReason
    this._serviceIndicatorReason = serviceIndicatorReason;

    return old;
  }

  get serviceIndicatorActTerm() {
    return this._serviceIndicatorActTerm;
  }

  set serviceIndicatorActTerm(serviceIndicatorActTerm) {
    let old = this._serviceIndicatorActTerm
    this._serviceIndicatorActTerm = serviceIndicatorActTerm;

    return old;
  }

  get serviceIndicatorActTermDesc() {
    return this._serviceIndicatorActTermDesc;
  }

  set serviceIndicatorActTermDesc(serviceIndicatorActTermDesc) {
    let old = this._serviceIndicatorActTermDesc
    this._serviceIndicatorActTermDesc = serviceIndicatorActTermDesc;

    return old;
  }

  get departmentId() {
    return this._departmentId;
  }

  set departmentId(departmentId) {
    let old = this._departmentId
    this._departmentId = departmentId;

    return old;
  }

  get departmentIdDesc() {
    return this._departmentIdDesc;
  }

  set departmentIdDesc(departmentIdDesc) {
    let old = this._departmentIdDesc
    this._departmentIdDesc = departmentIdDesc;

    return old;
  }

  get amount() {
    return this._amount;
  }

  set amount(amount) {
    let old = this._amount
    this._amount = amount;

    return old;
  }

  get currencyCode() {
    return this._currencyCode;
  }

  set currencyCode(currencyCode) {
    let old = this._currencyCode
    this._currencyCode = currencyCode;

    return old;
  }

  get currencyCodeDesc() {
    return this._currencyCodeDesc;
  }

  set currencyCodeDesc(currencyCodeDesc) {
    let old = this._currencyCodeDesc
    this._currencyCodeDesc = currencyCodeDesc;

    return old;
  }

  get dateTime() {
    return this._dateTime;
  }

  set serviceIndicatorReasonDesc(serviceIndicatorReasonDesc) {
    let old = this._serviceIndicatorReasonDesc
    this._serviceIndicatorReasonDesc = serviceIndicatorReasonDesc;

    return old;
  }

  get positiveServiceIndicator() {
    return this._positiveServiceIndicator;
  }

  set positiveServiceIndicator(positiveServiceIndicator) {
    let old = this._positiveServiceIndicator
    this._positiveServiceIndicator = positiveServiceIndicator;

    return old;
  }

}

module.exports = ServiceIndicator;
