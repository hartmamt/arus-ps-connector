"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var axios = _interopRequire(require("axios"));

var base64 = _interopRequire(require("base-64"));

/**
 * Provides methods to make REST calls. It currently uses the the superagent
 * request library but can be configured to use other libraries.
 *
 * @class
 */
/* eslint-disable */

var Request = (function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, null, {
    get: {
      /* eslint-enable */

      /**
       * Creates an http `GET` request.
       *
       * @method get
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @throws Throws an error if the endpoint url isn't passed in
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function get(params) {
        if (!params.url) {
          throw new Error("Endpoint url not defined");
        }

        if (params.auth) {
          var creds = "" + params.auth[0] + ":" + params.auth[1];
          var auth = "Basic " + base64.encode(creds);

          if (params.headers) {
            params.headers.authorization = auth;
          } else {
            params.headers = {
              authorization: auth
            };
          }
        }

        return axios.get(params.url, { headers: params.headers });
      }
    },
    post: {

      /**
       * Creates an http `POST` request.
       *
       * @method post
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @throws Throws an error if the endpoint url isn't passed in
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function post(params) {
        if (!params.url) {
          throw new Error("Endpoint url not defined");
        }

        if (params.auth) {
          var creds = "" + params.auth[0] + ":" + params.auth[1];
          var auth = "Basic " + base64.encode(creds);

          if (params.headers) {
            params.headers.authorization = auth;
          } else {
            params.headers = {
              authorization: auth
            };
          }
        }

        return axios.post(params.url, params.send, { headers: params.headers });
      }
    },
    update: {

      /**
       *
       * Creates an http `UPDATE` request. **Note:** Not implemented yet.
       *
       * @method update
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function update(params) {
        return new Promise(function (resolve, reject) {
          reject("method `update` not defined yet");
        });
      }
    },
    "delete": {

      /**
       * Creates an http `DELETE` request. **Note:** Not implemented yet.
       *
       * @method delete
       * @static
       * @params {Object} params - the parameters that are used to construct the remote request
       * @return {Promise} - returns a Promise of a remote request response
       */

      value: function _delete(params) {
        return new Promise(function (resolve, reject) {
          reject("method `delete` not defined yet");
        });
      }
    }
  });

  return Request;
})();

module.exports = Request;