
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');
var parseString = require('xml2js').parseString;

/**
 * Define all the different REST Calls this Connector knows how to make and Serialize
 */
var RESTCalls = {
  'getProfile': function() {
    /**
     * Set up your http request parameters here using global variables
     */
    let httpParams = {
      url: __PROFILE_URL__,
      auth: [__USERNAME__, __PASSWORD__],
      acceptType: 'application/xml'
    };

    return new Promise((resolve, reject) => {
      Request.get(httpParams)
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

module.exports = RESTCalls;
