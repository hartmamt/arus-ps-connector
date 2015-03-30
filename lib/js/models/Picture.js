"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Serves as the model for Picture data
 *
 * @class
 */

var Picture = (function () {

  /**
   * Picture constructor
   *
   * @param {Object} pictureData
   */

  function Picture(pictureData) {
    var _temp;

    _classCallCheck(this, Picture);

    /* eslint-disable */
    var fields = (_temp = pictureData, this.base64 = _temp.base64, _temp);
  }

  _createClass(Picture, null, {
    create: {
      value: function create(obj) {
        var picture = {
          base64: obj.sccGetphotoResp.employeePhoto.base64data
        };

        return new Picture(picture);
      }
    }
  });

  return Picture;
})();

module.exports = Picture;

/* eslint-enable */