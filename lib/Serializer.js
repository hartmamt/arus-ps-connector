/**
 * These are the models that are used to serialize the data
 */
var Profile = require('./models/Profile.js');

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
   * @param {Object} response - the data that needs to be serialized into a `Profile`
   * @return {Profile} - returns an instance of `Profile`
   */
  static profile(profileData) {
    let profile = {
      name: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].PER_NAMES[0].PER_NAME[0].NAME_DISPLAY[0],
      acadCareer: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].RESIDENCY_OFFICIALS[0].RESIDENCY_OFFICIAL[0].ACAD_CAREER[0]
    };

    return new Profile(profile);
  }

}

module.exports = Serializer;
