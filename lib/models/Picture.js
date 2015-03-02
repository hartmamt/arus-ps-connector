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
      base64: this.base64
    } = pictureData;
  }

  static create(obj) {
    let picture = {
      base64: obj.sccGetphotoResp.employeePhoto.base64data
    };

    return new Picture(picture);
  }

}

module.exports = Picture;
