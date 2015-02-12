/**
 * Serves as the model for Picture data
 *
 * @class
 */
class Picture {

  /**
   * Picture constructor
   *
   * @param {Object} pictureData
   */
  constructor(pictureData) {
    let fields = {
      base64: this._base64
    } = pictureData;
  }

  get base64() {
    return this._base64;
  }

  set base64(base64) {
    let temp = this._base64
    this._base64 = base64;

    return temp;
  }
}

module.exports = Picture;
