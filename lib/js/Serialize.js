"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("underscore"));

var serialize = function serialize(obj) {
  var keys = _.keys(obj);
  keys = _.reject(keys, function (key) {
    return key === "$";
  });

  return serializeKeys(keys, obj);
};

var serializeKeys = function serializeKeys(keys, obj) {
  var res = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var fieldName = toCamelCase(key);
    var value = obj[key];

    if (_.isArray(value) && value.length === 1) {
      value = value[0];
    }
    if (typeof value === "object") {
      // If value is indexed like an array
      if (value[0]) {
        var values = [];
        for (var _i = 0; value[_i] !== undefined; _i++) {
          values.push(serialize(value[_i]));
        }

        value = values;
      } else {
        value = serialize(value);
      }
    }

    res[fieldName] = value;
  }

  return res;
};

var toCamelCase = function toCamelCase(str) {
  var words = str.toLowerCase().split("_");
  var camelCase = "";

  for (var i = 0; i < words.length; i++) {
    if (i > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    camelCase += words[i];
  }

  return camelCase;
};

module.exports = serialize;