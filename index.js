
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');
var parseString = require('xml2js').parseString;

var RemoteRequests = {

  /**
   * An example remote request call.
   *
   * @method getProfile
   * @static
   * @return {Promise} - returns a Promise of a serialized remote request response
   */
  'getProfile': function() {
    /**
     * Set up your remote request parameters here using global variables
     */
    let requestParams = {
      url: __PROFILE_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      acceptType: 'application/xml'
    };

    return new Promise((resolve, reject) => {
      Request.get(requestParams)
        .then(res => {
          
          let jRes;
          parseString(res.text, (err, parsedRes) => {
            jRes = parsedRes;
          });

          // Serialize the http response to a profile
          let profile = Serialize.profile(jRes);

          resolve(profile);
        }).catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = RemoteRequests;
