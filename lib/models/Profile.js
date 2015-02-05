
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
      name: this.name,
      acadCareer: this.acadCareer
    } = profileData;
  }

  get name() {
    return this.name;
  }

  set name(name) {
    let old = this.name
    this.name = name;

    return old;
  }

  get acadCareer() {
    return this.acadCareer;
  }

  set acadCareer(acadCareer) {
    let old = this.acadCareer
    this.acadCareer = acadCareer;

    return old;
  }
  
}

module.exports = Profile;
