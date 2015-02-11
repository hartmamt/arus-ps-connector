/**
 * These are the models that are used to serialize the data
 */
var { Profile, Picture } = require('./models/Models.js');

/**
 * Handles the formatting of remote request responses responses.
 *
 * @class
 */
class Serializer {

  /**
   * Serializes data into a `Profile` Object
   *
   * @method profile
   * @static
   * @param {Object} profileData - the data that needs to be serialized into a `Profile`
   * @return {Profile} - returns an instance of `Profile`
   */
  static profile(profileData) {
    let profile = {
      name: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].PER_NAMES[0].PER_NAME[0].NAME_DISPLAY[0],
      acadCareer: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].RESIDENCY_OFFICIALS[0].RESIDENCY_OFFICIAL[0].ACAD_CAREER[0]
    };

    return new Profile(profile);
  }

  /**
   * Serializes data into a `Picture` Object
   *
   * @method picture
   * @static
   * @param {Object} pictureData - the data that needs to be serialized into a `Picture`
   * @return {Picture} - returns an instance of `Picture`
   */
  static picture(pictureData) {
    let picture = {
      base64: pictureData.SCC_GETPHOTO_RESP.EMPLOYEE_PHOTO[0].Base64Data[0]
    };

    return new Picture(picture);
  }
}

module.exports = Serializer;
