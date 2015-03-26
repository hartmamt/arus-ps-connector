import axios from 'axios';
import base64 from 'base-64';

/**
 * Provides methods to make REST calls. It currently uses the the superagent
 * request library but can be configured to use other libraries.
 *
 * @class
 */
/* eslint-disable */
class Request {
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
  static get(params) {
    if (!params.url) {
      throw new Error('Endpoint url not defined');
    }

    if (params.auth) {
      let creds = `${params.auth[0]}:${params.auth[1]}`;
      let auth = `Basic ${base64.encode(creds)}`;

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

  /**
   * Creates an http `POST` request.
   *
   * @method post
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @throws Throws an error if the endpoint url isn't passed in
   * @return {Promise} - returns a Promise of a remote request response
   */
  static post(params) {
    if (!params.url) {
      throw new Error('Endpoint url not defined');
    }

    if (params.auth) {
      let creds = `${params.auth[0]}:${params.auth[1]}`;
      let auth = `Basic ${base64.encode(creds)}`;

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

  /**
   *
   * Creates an http `UPDATE` request. **Note:** Not implemented yet.
   *
   * @method update
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @return {Promise} - returns a Promise of a remote request response
   */
  static update(params) {
    return new Promise((resolve, reject) => {
      reject('method `update` not defined yet');
    });
  }

  /**
   * Creates an http `DELETE` request. **Note:** Not implemented yet.
   *
   * @method delete
   * @static
   * @params {Object} params - the parameters that are used to construct the remote request
   * @return {Promise} - returns a Promise of a remote request response
   */
  static delete(params) {
    return new Promise((resolve, reject) => {
      reject('method `delete` not defined yet');
    });
  }
}

module.exports = Request;
