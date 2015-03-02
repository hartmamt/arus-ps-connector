
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
    // Initializes public fields
    let fields = {
      nameDisplay: this.name,
      acadCareer: this.acadCareer
    } = profileData;
  }

  static create(json) {
    let profile = {
      nameDisplay: json.sccGetconstResp.constituent.perNames.perName[0].nameDisplay,
      acadCareer: json.sccGetconstResp.constituent.residencyOfficials.residencyOfficial.acadCareer
    };

    return new Profile(profile);
  }

}

module.exports = Profile;
