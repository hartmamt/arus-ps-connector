var superagent = require('superagent');
import req from 'request';
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
    return new Promise((resolve, reject) => {
      if (!params.url) {
        throw 'Error: Endpoint Url not available';
      }

      let request = superagent.get(params.url);
      if (params.auth) {
        request.auth(...params.auth);
      }
      if (params.acceptType) {
        request.accept(params.acceptType);
      }
      if (params.headers) {
        for (let header in params.headers) {
          request.set(header, params.headers[header]);
        }
      }
      request.end((err, res) => {
        if(res.ok) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  static getNoAgent(params) {
    return new Promise((resolve, reject) => {
      req({
        method: 'GET',
        url: params.url,
        auth: {
          user: params.auth[0],
          pass: params.auth[1]
        }
      }, (err, resp, text) => {
        if (err) {
          reject(err);
        }
        // console.log(text.substr(0, 100));

        resolve({'text': text, 'resp': resp});
      });
    });
  }

  static getAxios(params) {
    let creds = `${params.auth[0]}:${params.auth[1]}`;
    let auth = base64.encode(creds);

    return axios({
      method: 'get',
      url: params.url,
      headers: {
        authorization: `Basic ${auth}`
      }
    });
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
    return new Promise((resolve, reject) => {
      if (!params.url) {
        throw 'Error: Endpoint Url not available';
      }

      let request = superagent.post(params.url);
      if (params.auth) {
        request.auth(...params.auth);
      }
      if (params.acceptType) {
        request.accept(params.acceptType);
      }
      if (params.headers) {
        for (let header in params.headers) {
          request.set(header, params.headers[header]);
        }
      }
      if (params.send) {
        request.send(params.send);
      }
      request.end((err, res) => {
        if(res.ok) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
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
