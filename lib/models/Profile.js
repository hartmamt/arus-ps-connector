
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
      name: this._name,
      acadCareer: this._acadCareer
    } = profileData;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    let old = this._name
    this._name = name;

    return old;
  }

  get acadCareer() {
    return this._acadCareer;
  }

  set acadCareer(acadCareer) {
    let old = this._acadCareer
    this._acadCareer = acadCareer;

    return old;
  }

}

module.exports = Profile;
