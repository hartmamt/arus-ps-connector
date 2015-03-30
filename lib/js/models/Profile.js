"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Serves as the model to serialize data into a `Profile` object.
 *
 * @class
 */

var Profile = (function () {

  /**
   * The constructor for a `Profile` object.
   *
   * @constructs Profile
   * @params {Object} profileData - the data that generates the public fields of the Profile instance.
   */

  function Profile(profileData) {
    var _temp;

    _classCallCheck(this, Profile);

    /* eslint-disable */
    var fields = (_temp = profileData, this.name = _temp.name, this.acadCareer = _temp.acadCareer, _temp);
  }

  _createClass(Profile, null, {
    create: {
      value: function create(obj) {
        var profile = {
          name: obj.sccGetconstResp.constituent.perNames.perName[0].nameDisplay,
          acadCareer: obj.sccGetconstResp.constituent.residencyOfficials.residencyOfficial.acadCareer
        };

        return new Profile(profile);
      }
    }
  });

  return Profile;
})();

module.exports = Profile;

/* eslint-enable */