
/**
 * Serves as the model to serialize data into a `Profile` object.
 *
 * @class
 */
class Profile {

  /**
   * The constructor for a `Profile` object.
   *
   * @constructs Profile
   * @params {Object} profileData - the data that generates the public fields of the Profile instance.
   */
  constructor(profileData) {
    /* eslint-disable */
    let fields = {
    /* eslint-enable */
      name: this.name,
      acadCareer: this.acadCareer
    } = profileData;
  }

  static create(obj) {
    let profile = {
      name: obj.sccGetconstResp.constituent.perNames.perName[0].nameDisplay,
      acadCareer: obj.sccGetconstResp.constituent.residencyOfficials.residencyOfficial.acadCareer
    };

    return new Profile(profile);
  }

}
