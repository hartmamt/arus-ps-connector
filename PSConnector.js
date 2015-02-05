module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Request = __webpack_require__(1);
	var Serialize = __webpack_require__(2);
	var parseString = __webpack_require__(3).parseString;

	var RemoteRequests = {

	  /**
	   * An example remote request call.
	   *
	   * @method getProfile
	   * @static
	   * @return {Promise} - returns a Promise of a serialized remote request response
	   */
	  getProfile: function () {
	    /**
	     * Set up your remote request parameters here using global variables
	     */
	    var requestParams = {
	      url: ("https://cssandbox2.uc.edu/PSIGW/RESTListeningConnector/PC90SND2/SCC_GETCONST_R.v1/constituent/get?SCC_TEMP_ID=0&SCC_PROFILE_ID=&languageCd="),
	      auth: [("hornerjn"), ("Password1")],
	      acceptType: "application/xml"
	    };

	    return new Promise(function (resolve, reject) {
	      Request.get(requestParams).then(function (res) {
	        var jRes = undefined;
	        parseString(res.text, function (err, parsedRes) {
	          jRes = parsedRes;
	        });

	        // Serialize the http response to a profile
	        var profile = Serialize.profile(jRes);

	        resolve(profile);
	      })["catch"](function (err) {
	        reject(err);
	      });
	    });
	  }
	};

	module.exports = RemoteRequests;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var superagent = __webpack_require__(7);

	/**
	 * Provides methods to make REST calls. It currently uses the the superagent
	 * request library but can be configured to use other libraries.
	 *
	 * @class
	 */
	var Request = (function () {
	  function Request() {
	    _classCallCheck(this, Request);
	  }

	  _prototypeProperties(Request, {
	    get: {

	      /**
	       * Creates a `GET` request.
	       *
	       * @method get
	       * @static
	       * @params {Object} params - the http parameters that are used to construct the http request
	       * @return {Promise} - returns a Promise of an http response
	       */
	      value: function get(params) {
	        return new Promise(function (resolve, reject) {
	          var _superagent$get;
	          // TODO: apply parameters conditionally on existence
	          (_superagent$get = superagent.get(params.url)).auth.apply(_superagent$get, _toArray(params.auth)).accept(params.acceptType).end(function (err, res) {
	            if (res.ok) {
	              resolve(res);
	            } else {
	              reject(err);
	            }
	          });
	        });
	      },
	      writable: true,
	      configurable: true
	    },
	    post: {

	      /**
	       * Creates a `POST` request.
	       *
	       * @method post
	       * @static
	       * @params {Object} params - the http parameters that are used to construct the http request
	       * @return {Promise} - returns a Promise of an http response
	       */
	      value: function post(params) {
	        return new Promise(function (resolve, reject) {
	          var _superagent$post;
	          (_superagent$post = superagent.post(params.url)).auth.apply(_superagent$post, _toArray(params.auth)).send(params.payload).accept(params.acceptType).end(function (err, res) {
	            if (res.ok) {
	              resolve(res);
	            } else {
	              reject(err);
	            }
	          });
	        });
	      },
	      writable: true,
	      configurable: true
	    },
	    update: {

	      /**
	       *
	       * Creates a `UPDATE` request. **Note:** Not implemented yet.
	       *
	       * @method update
	       * @static
	       * @params {Object} params - the http parameters that are used to construct the http request
	       * @return {Promise} - returns a Promise of an http response
	       */
	      value: function update(params) {
	        return new Promise(function (resolve, reject) {
	          reject("method `update` not defined yet");
	        });
	      },
	      writable: true,
	      configurable: true
	    },
	    "delete": {

	      /**
	       * Creates a `DELETE` request. **Note:** Not implemented yet.
	       *
	       * @method delete
	       * @static
	       * @params {Object} params - the http parameters that are used to construct the http request
	       * @return {Promise} - returns a Promise of an http response
	       */
	      value: function _delete(params) {
	        return new Promise(function (resolve, reject) {
	          reject("method `delete` not defined yet");
	        });
	      },
	      writable: true,
	      configurable: true
	    }
	  });

	  return Request;
	})();

	module.exports = Request;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	/**
	 * These are the models that are used to serialize the data
	 */
	var Profile = __webpack_require__(4);

	/**
	 * Handles the formatting of remote request responses responses.
	 *
	 * @class
	 */
	var Serializer = (function () {
	  function Serializer() {
	    _classCallCheck(this, Serializer);
	  }

	  _prototypeProperties(Serializer, {
	    profile: {

	      /**
	       * Serializes data into a `Profile` Object
	       *
	       * @method profile
	       * @static
	       * @param {Object} response - the data that needs to be serialized into a `Profile`
	       * @return {Profile} - returns an instance of `Profile`
	       */
	      value: function profile(profileData) {
	        var profile = {
	          name: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].PER_NAMES[0].PER_NAME[0].NAME_DISPLAY[0],
	          acadCareer: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].RESIDENCY_OFFICIALS[0].RESIDENCY_OFFICIAL[0].ACAD_CAREER[0]
	        };

	        return new Profile(profile);
	      },
	      writable: true,
	      configurable: true
	    }
	  });

	  return Serializer;
	})();

	module.exports = Serializer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var bom, builder, events, isEmpty, processName, processors, sax,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  sax = __webpack_require__(10);

	  events = __webpack_require__(8);

	  builder = __webpack_require__(11);

	  bom = __webpack_require__(5);

	  processors = __webpack_require__(6);

	  isEmpty = function(thing) {
	    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
	  };

	  processName = function(processors, processedName) {
	    var process, _i, _len;
	    for (_i = 0, _len = processors.length; _i < _len; _i++) {
	      process = processors[_i];
	      processedName = process(processedName);
	    }
	    return processedName;
	  };

	  exports.processors = processors;

	  exports.defaults = {
	    "0.1": {
	      explicitCharkey: false,
	      trim: true,
	      normalize: true,
	      normalizeTags: false,
	      attrkey: "@",
	      charkey: "#",
	      explicitArray: false,
	      ignoreAttrs: false,
	      mergeAttrs: false,
	      explicitRoot: false,
	      validator: null,
	      xmlns: false,
	      explicitChildren: false,
	      childkey: '@@',
	      charsAsChildren: false,
	      async: false,
	      strict: true,
	      attrNameProcessors: null,
	      tagNameProcessors: null
	    },
	    "0.2": {
	      explicitCharkey: false,
	      trim: false,
	      normalize: false,
	      normalizeTags: false,
	      attrkey: "$",
	      charkey: "_",
	      explicitArray: true,
	      ignoreAttrs: false,
	      mergeAttrs: false,
	      explicitRoot: true,
	      validator: null,
	      xmlns: false,
	      explicitChildren: false,
	      childkey: '$$',
	      charsAsChildren: false,
	      async: false,
	      strict: true,
	      attrNameProcessors: null,
	      tagNameProcessors: null,
	      rootName: 'root',
	      xmldec: {
	        'version': '1.0',
	        'encoding': 'UTF-8',
	        'standalone': true
	      },
	      doctype: null,
	      renderOpts: {
	        'pretty': true,
	        'indent': '  ',
	        'newline': '\n'
	      },
	      headless: false
	    }
	  };

	  exports.ValidationError = (function(_super) {
	    __extends(ValidationError, _super);

	    function ValidationError(message) {
	      this.message = message;
	    }

	    return ValidationError;

	  })(Error);

	  exports.Builder = (function() {
	    function Builder(opts) {
	      var key, value, _ref;
	      this.options = {};
	      _ref = exports.defaults["0.2"];
	      for (key in _ref) {
	        if (!__hasProp.call(_ref, key)) continue;
	        value = _ref[key];
	        this.options[key] = value;
	      }
	      for (key in opts) {
	        if (!__hasProp.call(opts, key)) continue;
	        value = opts[key];
	        this.options[key] = value;
	      }
	    }

	    Builder.prototype.buildObject = function(rootObj) {
	      var attrkey, charkey, render, rootElement, rootName;
	      attrkey = this.options.attrkey;
	      charkey = this.options.charkey;
	      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === exports.defaults['0.2'].rootName)) {
	        rootName = Object.keys(rootObj)[0];
	        rootObj = rootObj[rootName];
	      } else {
	        rootName = this.options.rootName;
	      }
	      render = function(element, obj) {
	        var attr, child, entry, index, key, value, _ref, _ref1;
	        if (typeof obj !== 'object') {
	          element.txt(obj);
	        } else {
	          for (key in obj) {
	            if (!__hasProp.call(obj, key)) continue;
	            child = obj[key];
	            if (key === attrkey) {
	              if (typeof child === "object") {
	                for (attr in child) {
	                  value = child[attr];
	                  element = element.att(attr, value);
	                }
	              }
	            } else if (key === charkey) {
	              element = element.txt(child);
	            } else if (typeof child === 'object' && ((child != null ? child.constructor : void 0) != null) && ((child != null ? (_ref = child.constructor) != null ? _ref.name : void 0 : void 0) != null) && (child != null ? (_ref1 = child.constructor) != null ? _ref1.name : void 0 : void 0) === 'Array') {
	              for (index in child) {
	                if (!__hasProp.call(child, index)) continue;
	                entry = child[index];
	                if (typeof entry === 'string') {
	                  element = element.ele(key, entry).up();
	                } else {
	                  element = arguments.callee(element.ele(key), entry).up();
	                }
	              }
	            } else if (typeof child === "object") {
	              element = arguments.callee(element.ele(key), child).up();
	            } else {
	              element = element.ele(key, child.toString()).up();
	            }
	          }
	        }
	        return element;
	      };
	      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
	        headless: this.options.headless
	      });
	      return render(rootElement, rootObj).end(this.options.renderOpts);
	    };

	    return Builder;

	  })();

	  exports.Parser = (function(_super) {
	    __extends(Parser, _super);

	    function Parser(opts) {
	      this.parseString = __bind(this.parseString, this);
	      this.reset = __bind(this.reset, this);
	      this.assignOrPush = __bind(this.assignOrPush, this);
	      var key, value, _ref;
	      if (!(this instanceof exports.Parser)) {
	        return new exports.Parser(opts);
	      }
	      this.options = {};
	      _ref = exports.defaults["0.2"];
	      for (key in _ref) {
	        if (!__hasProp.call(_ref, key)) continue;
	        value = _ref[key];
	        this.options[key] = value;
	      }
	      for (key in opts) {
	        if (!__hasProp.call(opts, key)) continue;
	        value = opts[key];
	        this.options[key] = value;
	      }
	      if (this.options.xmlns) {
	        this.options.xmlnskey = this.options.attrkey + "ns";
	      }
	      if (this.options.normalizeTags) {
	        if (!this.options.tagNameProcessors) {
	          this.options.tagNameProcessors = [];
	        }
	        this.options.tagNameProcessors.unshift(processors.normalize);
	      }
	      this.reset();
	    }

	    Parser.prototype.assignOrPush = function(obj, key, newValue) {
	      if (!(key in obj)) {
	        if (!this.options.explicitArray) {
	          return obj[key] = newValue;
	        } else {
	          return obj[key] = [newValue];
	        }
	      } else {
	        if (!(obj[key] instanceof Array)) {
	          obj[key] = [obj[key]];
	        }
	        return obj[key].push(newValue);
	      }
	    };

	    Parser.prototype.reset = function() {
	      var attrkey, charkey, ontext, stack;
	      this.removeAllListeners();
	      this.saxParser = sax.parser(this.options.strict, {
	        trim: false,
	        normalize: false,
	        xmlns: this.options.xmlns
	      });
	      this.saxParser.errThrown = false;
	      this.saxParser.onerror = (function(_this) {
	        return function(error) {
	          _this.saxParser.resume();
	          if (!_this.saxParser.errThrown) {
	            _this.saxParser.errThrown = true;
	            return _this.emit("error", error);
	          }
	        };
	      })(this);
	      this.saxParser.ended = false;
	      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
	      this.resultObject = null;
	      stack = [];
	      attrkey = this.options.attrkey;
	      charkey = this.options.charkey;
	      this.saxParser.onopentag = (function(_this) {
	        return function(node) {
	          var key, newValue, obj, processedKey, _ref;
	          obj = {};
	          obj[charkey] = "";
	          if (!_this.options.ignoreAttrs) {
	            _ref = node.attributes;
	            for (key in _ref) {
	              if (!__hasProp.call(_ref, key)) continue;
	              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
	                obj[attrkey] = {};
	              }
	              newValue = node.attributes[key];
	              processedKey = _this.options.attrNameProcessors ? processName(_this.options.attrNameProcessors, key) : key;
	              if (_this.options.mergeAttrs) {
	                _this.assignOrPush(obj, processedKey, newValue);
	              } else {
	                obj[attrkey][processedKey] = newValue;
	              }
	            }
	          }
	          obj["#name"] = _this.options.tagNameProcessors ? processName(_this.options.tagNameProcessors, node.name) : node.name;
	          if (_this.options.xmlns) {
	            obj[_this.options.xmlnskey] = {
	              uri: node.uri,
	              local: node.local
	            };
	          }
	          return stack.push(obj);
	        };
	      })(this);
	      this.saxParser.onclosetag = (function(_this) {
	        return function() {
	          var cdata, emptyStr, err, node, nodeName, obj, old, s, xpath;
	          obj = stack.pop();
	          nodeName = obj["#name"];
	          delete obj["#name"];
	          cdata = obj.cdata;
	          delete obj.cdata;
	          s = stack[stack.length - 1];
	          if (obj[charkey].match(/^\s*$/) && !cdata) {
	            emptyStr = obj[charkey];
	            delete obj[charkey];
	          } else {
	            if (_this.options.trim) {
	              obj[charkey] = obj[charkey].trim();
	            }
	            if (_this.options.normalize) {
	              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
	            }
	            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
	              obj = obj[charkey];
	            }
	          }
	          if (isEmpty(obj)) {
	            obj = _this.options.emptyTag !== void 0 ? _this.options.emptyTag : emptyStr;
	          }
	          if (_this.options.validator != null) {
	            xpath = "/" + ((function() {
	              var _i, _len, _results;
	              _results = [];
	              for (_i = 0, _len = stack.length; _i < _len; _i++) {
	                node = stack[_i];
	                _results.push(node["#name"]);
	              }
	              return _results;
	            })()).concat(nodeName).join("/");
	            try {
	              obj = _this.options.validator(xpath, s && s[nodeName], obj);
	            } catch (_error) {
	              err = _error;
	              _this.emit("error", err);
	            }
	          }
	          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
	            node = {};
	            if (_this.options.attrkey in obj) {
	              node[_this.options.attrkey] = obj[_this.options.attrkey];
	              delete obj[_this.options.attrkey];
	            }
	            if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
	              node[_this.options.charkey] = obj[_this.options.charkey];
	              delete obj[_this.options.charkey];
	            }
	            if (Object.getOwnPropertyNames(obj).length > 0) {
	              node[_this.options.childkey] = obj;
	            }
	            obj = node;
	          }
	          if (stack.length > 0) {
	            return _this.assignOrPush(s, nodeName, obj);
	          } else {
	            if (_this.options.explicitRoot) {
	              old = obj;
	              obj = {};
	              obj[nodeName] = old;
	            }
	            _this.resultObject = obj;
	            _this.saxParser.ended = true;
	            return _this.emit("end", _this.resultObject);
	          }
	        };
	      })(this);
	      ontext = (function(_this) {
	        return function(text) {
	          var s;
	          s = stack[stack.length - 1];
	          if (s) {
	            s[charkey] += text;
	            return s;
	          }
	        };
	      })(this);
	      this.saxParser.ontext = ontext;
	      return this.saxParser.oncdata = (function(_this) {
	        return function(text) {
	          var s;
	          s = ontext(text);
	          if (s) {
	            return s.cdata = true;
	          }
	        };
	      })(this);
	    };

	    Parser.prototype.parseString = function(str, cb) {
	      var err;
	      if ((cb != null) && typeof cb === "function") {
	        this.on("end", function(result) {
	          this.reset();
	          if (this.options.async) {
	            return process.nextTick(function() {
	              return cb(null, result);
	            });
	          } else {
	            return cb(null, result);
	          }
	        });
	        this.on("error", function(err) {
	          this.reset();
	          if (this.options.async) {
	            return process.nextTick(function() {
	              return cb(err);
	            });
	          } else {
	            return cb(err);
	          }
	        });
	      }
	      if (str.toString().trim() === '') {
	        this.emit("end", null);
	        return true;
	      }
	      try {
	        return this.saxParser.write(bom.stripBOM(str.toString())).close();
	      } catch (_error) {
	        err = _error;
	        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
	          this.emit('error', err);
	          return this.saxParser.errThrown = true;
	        }
	      }
	    };

	    return Parser;

	  })(events.EventEmitter);

	  exports.parseString = function(str, a, b) {
	    var cb, options, parser;
	    if (b != null) {
	      if (typeof b === 'function') {
	        cb = b;
	      }
	      if (typeof a === 'object') {
	        options = a;
	      }
	    } else {
	      if (typeof a === 'function') {
	        cb = a;
	      }
	      options = {};
	    }
	    parser = new exports.Parser(options);
	    return parser.parseString(str, cb);
	  };

	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

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

	    // Initializes public fields
	    var fields = (_temp = profileData, this.name = _temp.name, this.acadCareer = _temp.acadCareer, _temp);
	  }

	  _prototypeProperties(Profile, null, {
	    name: {
	      get: function () {
	        return this.name;
	      },
	      configurable: true
	    }
	  });

	  return Profile;
	})();

	module.exports = Profile;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.1
	(function() {
	  var xml2js;

	  xml2js = __webpack_require__(3);

	  exports.stripBOM = function(str) {
	    if (str[0] === '\uFEFF') {
	      return str.substring(1);
	    } else {
	      return str;
	    }
	  };

	}).call(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.1
	(function() {
	  var prefixMatch;

	  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

	  exports.normalize = function(str) {
	    return str.toLowerCase();
	  };

	  exports.firstCharLowerCase = function(str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	  };

	  exports.stripPrefix = function(str) {
	    return str.replace(prefixMatch, '');
	  };

	}).call(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(13);
	var reduce = __webpack_require__(14);

	/**
	 * Root reference for iframes.
	 */

	var root = 'undefined' == typeof window
	  ? this
	  : window;

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	function getXHR() {
	  if (root.XMLHttpRequest
	    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	}

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	  return pairs.join('&');
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  this.text = this.req.method !='HEAD' 
	     ? this.xhr.responseText 
	     : null;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && str.length
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  var type = status / 100 | 0;

	  // status / class
	  this.status = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status || 1223 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self); 
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	    }

	    self.callback(err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"})
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  if (2 == fn.length) return fn(err, res);
	  if (err) return this.emit('error', err);
	  fn(res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
	  err.crossDomain = true;
	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	    if (0 == xhr.status) {
	      if (self.aborted) return self.timeoutError();
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  if (xhr.upload) {
	    xhr.upload.onprogress = function(e){
	      e.percent = e.loaded / e.total * 100;
	      self.emit('progress', e);
	    };
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var serialize = request.serialize[this.getHeader('Content-Type')];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);
	  xhr.send(data);
	  return this;
	};

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.del = function(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// wrapper for non-node envs
	;(function (sax) {

	sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
	sax.SAXParser = SAXParser
	sax.SAXStream = SAXStream
	sax.createStream = createStream

	// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
	// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
	// since that's the earliest that a buffer overrun could occur.  This way, checks are
	// as rare as required, but as often as necessary to ensure never crossing this bound.
	// Furthermore, buffers are only tested at most once per write(), so passing a very
	// large string into write() might have undesirable effects, but this is manageable by
	// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
	// edge case, result in creating at most one complete copy of the string passed in.
	// Set to Infinity to have unlimited buffers.
	sax.MAX_BUFFER_LENGTH = 64 * 1024

	var buffers = [
	  "comment", "sgmlDecl", "textNode", "tagName", "doctype",
	  "procInstName", "procInstBody", "entity", "attribName",
	  "attribValue", "cdata", "script"
	]

	sax.EVENTS = // for discoverability.
	  [ "text"
	  , "processinginstruction"
	  , "sgmldeclaration"
	  , "doctype"
	  , "comment"
	  , "attribute"
	  , "opentag"
	  , "closetag"
	  , "opencdata"
	  , "cdata"
	  , "closecdata"
	  , "error"
	  , "end"
	  , "ready"
	  , "script"
	  , "opennamespace"
	  , "closenamespace"
	  ]

	function SAXParser (strict, opt) {
	  if (!(this instanceof SAXParser)) return new SAXParser(strict, opt)

	  var parser = this
	  clearBuffers(parser)
	  parser.q = parser.c = ""
	  parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
	  parser.opt = opt || {}
	  parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
	  parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase"
	  parser.tags = []
	  parser.closed = parser.closedRoot = parser.sawRoot = false
	  parser.tag = parser.error = null
	  parser.strict = !!strict
	  parser.noscript = !!(strict || parser.opt.noscript)
	  parser.state = S.BEGIN
	  parser.ENTITIES = Object.create(sax.ENTITIES)
	  parser.attribList = []

	  // namespaces form a prototype chain.
	  // it always points at the current tag,
	  // which protos to its parent tag.
	  if (parser.opt.xmlns) parser.ns = Object.create(rootNS)

	  // mostly just for error reporting
	  parser.trackPosition = parser.opt.position !== false
	  if (parser.trackPosition) {
	    parser.position = parser.line = parser.column = 0
	  }
	  emit(parser, "onready")
	}

	if (!Object.create) Object.create = function (o) {
	  function f () { this.__proto__ = o }
	  f.prototype = o
	  return new f
	}

	if (!Object.getPrototypeOf) Object.getPrototypeOf = function (o) {
	  return o.__proto__
	}

	if (!Object.keys) Object.keys = function (o) {
	  var a = []
	  for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
	  return a
	}

	function checkBufferLength (parser) {
	  var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
	    , maxActual = 0
	  for (var i = 0, l = buffers.length; i < l; i ++) {
	    var len = parser[buffers[i]].length
	    if (len > maxAllowed) {
	      // Text/cdata nodes can get big, and since they're buffered,
	      // we can get here under normal conditions.
	      // Avoid issues by emitting the text node now,
	      // so at least it won't get any bigger.
	      switch (buffers[i]) {
	        case "textNode":
	          closeText(parser)
	        break

	        case "cdata":
	          emitNode(parser, "oncdata", parser.cdata)
	          parser.cdata = ""
	        break

	        case "script":
	          emitNode(parser, "onscript", parser.script)
	          parser.script = ""
	        break

	        default:
	          error(parser, "Max buffer length exceeded: "+buffers[i])
	      }
	    }
	    maxActual = Math.max(maxActual, len)
	  }
	  // schedule the next check for the earliest possible buffer overrun.
	  parser.bufferCheckPosition = (sax.MAX_BUFFER_LENGTH - maxActual)
	                             + parser.position
	}

	function clearBuffers (parser) {
	  for (var i = 0, l = buffers.length; i < l; i ++) {
	    parser[buffers[i]] = ""
	  }
	}

	function flushBuffers (parser) {
	  closeText(parser)
	  if (parser.cdata !== "") {
	    emitNode(parser, "oncdata", parser.cdata)
	    parser.cdata = ""
	  }
	  if (parser.script !== "") {
	    emitNode(parser, "onscript", parser.script)
	    parser.script = ""
	  }
	}

	SAXParser.prototype =
	  { end: function () { end(this) }
	  , write: write
	  , resume: function () { this.error = null; return this }
	  , close: function () { return this.write(null) }
	  , flush: function () { flushBuffers(this) }
	  }

	try {
	  var Stream = __webpack_require__(15).Stream
	} catch (ex) {
	  var Stream = function () {}
	}


	var streamWraps = sax.EVENTS.filter(function (ev) {
	  return ev !== "error" && ev !== "end"
	})

	function createStream (strict, opt) {
	  return new SAXStream(strict, opt)
	}

	function SAXStream (strict, opt) {
	  if (!(this instanceof SAXStream)) return new SAXStream(strict, opt)

	  Stream.apply(this)

	  this._parser = new SAXParser(strict, opt)
	  this.writable = true
	  this.readable = true


	  var me = this

	  this._parser.onend = function () {
	    me.emit("end")
	  }

	  this._parser.onerror = function (er) {
	    me.emit("error", er)

	    // if didn't throw, then means error was handled.
	    // go ahead and clear error, so we can write again.
	    me._parser.error = null
	  }

	  this._decoder = null;

	  streamWraps.forEach(function (ev) {
	    Object.defineProperty(me, "on" + ev, {
	      get: function () { return me._parser["on" + ev] },
	      set: function (h) {
	        if (!h) {
	          me.removeAllListeners(ev)
	          return me._parser["on"+ev] = h
	        }
	        me.on(ev, h)
	      },
	      enumerable: true,
	      configurable: false
	    })
	  })
	}

	SAXStream.prototype = Object.create(Stream.prototype,
	  { constructor: { value: SAXStream } })

	SAXStream.prototype.write = function (data) {
	  if (typeof Buffer === 'function' &&
	      typeof Buffer.isBuffer === 'function' &&
	      Buffer.isBuffer(data)) {
	    if (!this._decoder) {
	      var SD = __webpack_require__(16).StringDecoder
	      this._decoder = new SD('utf8')
	    }
	    data = this._decoder.write(data);
	  }

	  this._parser.write(data.toString())
	  this.emit("data", data)
	  return true
	}

	SAXStream.prototype.end = function (chunk) {
	  if (chunk && chunk.length) this.write(chunk)
	  this._parser.end()
	  return true
	}

	SAXStream.prototype.on = function (ev, handler) {
	  var me = this
	  if (!me._parser["on"+ev] && streamWraps.indexOf(ev) !== -1) {
	    me._parser["on"+ev] = function () {
	      var args = arguments.length === 1 ? [arguments[0]]
	               : Array.apply(null, arguments)
	      args.splice(0, 0, ev)
	      me.emit.apply(me, args)
	    }
	  }

	  return Stream.prototype.on.call(me, ev, handler)
	}



	// character classes and tokens
	var whitespace = "\r\n\t "
	  // this really needs to be replaced with character classes.
	  // XML allows all manner of ridiculous numbers and digits.
	  , number = "0124356789"
	  , letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	  // (Letter | "_" | ":")
	  , quote = "'\""
	  , entity = number+letter+"#"
	  , attribEnd = whitespace + ">"
	  , CDATA = "[CDATA["
	  , DOCTYPE = "DOCTYPE"
	  , XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"
	  , XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/"
	  , rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

	// turn all the string character sets into character class objects.
	whitespace = charClass(whitespace)
	number = charClass(number)
	letter = charClass(letter)

	// http://www.w3.org/TR/REC-xml/#NT-NameStartChar
	// This implementation works on strings, a single character at a time
	// as such, it cannot ever support astral-plane characters (10000-EFFFF)
	// without a significant breaking change to either this  parser, or the
	// JavaScript language.  Implementation of an emoji-capable xml parser
	// is left as an exercise for the reader.
	var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

	var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/

	quote = charClass(quote)
	entity = charClass(entity)
	attribEnd = charClass(attribEnd)

	function charClass (str) {
	  return str.split("").reduce(function (s, c) {
	    s[c] = true
	    return s
	  }, {})
	}

	function isRegExp (c) {
	  return Object.prototype.toString.call(c) === '[object RegExp]'
	}

	function is (charclass, c) {
	  return isRegExp(charclass) ? !!c.match(charclass) : charclass[c]
	}

	function not (charclass, c) {
	  return !is(charclass, c)
	}

	var S = 0
	sax.STATE =
	{ BEGIN                     : S++
	, TEXT                      : S++ // general stuff
	, TEXT_ENTITY               : S++ // &amp and such.
	, OPEN_WAKA                 : S++ // <
	, SGML_DECL                 : S++ // <!BLARG
	, SGML_DECL_QUOTED          : S++ // <!BLARG foo "bar
	, DOCTYPE                   : S++ // <!DOCTYPE
	, DOCTYPE_QUOTED            : S++ // <!DOCTYPE "//blah
	, DOCTYPE_DTD               : S++ // <!DOCTYPE "//blah" [ ...
	, DOCTYPE_DTD_QUOTED        : S++ // <!DOCTYPE "//blah" [ "foo
	, COMMENT_STARTING          : S++ // <!-
	, COMMENT                   : S++ // <!--
	, COMMENT_ENDING            : S++ // <!-- blah -
	, COMMENT_ENDED             : S++ // <!-- blah --
	, CDATA                     : S++ // <![CDATA[ something
	, CDATA_ENDING              : S++ // ]
	, CDATA_ENDING_2            : S++ // ]]
	, PROC_INST                 : S++ // <?hi
	, PROC_INST_BODY            : S++ // <?hi there
	, PROC_INST_ENDING          : S++ // <?hi "there" ?
	, OPEN_TAG                  : S++ // <strong
	, OPEN_TAG_SLASH            : S++ // <strong /
	, ATTRIB                    : S++ // <a
	, ATTRIB_NAME               : S++ // <a foo
	, ATTRIB_NAME_SAW_WHITE     : S++ // <a foo _
	, ATTRIB_VALUE              : S++ // <a foo=
	, ATTRIB_VALUE_QUOTED       : S++ // <a foo="bar
	, ATTRIB_VALUE_CLOSED       : S++ // <a foo="bar"
	, ATTRIB_VALUE_UNQUOTED     : S++ // <a foo=bar
	, ATTRIB_VALUE_ENTITY_Q     : S++ // <foo bar="&quot;"
	, ATTRIB_VALUE_ENTITY_U     : S++ // <foo bar=&quot;
	, CLOSE_TAG                 : S++ // </a
	, CLOSE_TAG_SAW_WHITE       : S++ // </a   >
	, SCRIPT                    : S++ // <script> ...
	, SCRIPT_ENDING             : S++ // <script> ... <
	}

	sax.ENTITIES =
	{ "amp" : "&"
	, "gt" : ">"
	, "lt" : "<"
	, "quot" : "\""
	, "apos" : "'"
	, "AElig" : 198
	, "Aacute" : 193
	, "Acirc" : 194
	, "Agrave" : 192
	, "Aring" : 197
	, "Atilde" : 195
	, "Auml" : 196
	, "Ccedil" : 199
	, "ETH" : 208
	, "Eacute" : 201
	, "Ecirc" : 202
	, "Egrave" : 200
	, "Euml" : 203
	, "Iacute" : 205
	, "Icirc" : 206
	, "Igrave" : 204
	, "Iuml" : 207
	, "Ntilde" : 209
	, "Oacute" : 211
	, "Ocirc" : 212
	, "Ograve" : 210
	, "Oslash" : 216
	, "Otilde" : 213
	, "Ouml" : 214
	, "THORN" : 222
	, "Uacute" : 218
	, "Ucirc" : 219
	, "Ugrave" : 217
	, "Uuml" : 220
	, "Yacute" : 221
	, "aacute" : 225
	, "acirc" : 226
	, "aelig" : 230
	, "agrave" : 224
	, "aring" : 229
	, "atilde" : 227
	, "auml" : 228
	, "ccedil" : 231
	, "eacute" : 233
	, "ecirc" : 234
	, "egrave" : 232
	, "eth" : 240
	, "euml" : 235
	, "iacute" : 237
	, "icirc" : 238
	, "igrave" : 236
	, "iuml" : 239
	, "ntilde" : 241
	, "oacute" : 243
	, "ocirc" : 244
	, "ograve" : 242
	, "oslash" : 248
	, "otilde" : 245
	, "ouml" : 246
	, "szlig" : 223
	, "thorn" : 254
	, "uacute" : 250
	, "ucirc" : 251
	, "ugrave" : 249
	, "uuml" : 252
	, "yacute" : 253
	, "yuml" : 255
	, "copy" : 169
	, "reg" : 174
	, "nbsp" : 160
	, "iexcl" : 161
	, "cent" : 162
	, "pound" : 163
	, "curren" : 164
	, "yen" : 165
	, "brvbar" : 166
	, "sect" : 167
	, "uml" : 168
	, "ordf" : 170
	, "laquo" : 171
	, "not" : 172
	, "shy" : 173
	, "macr" : 175
	, "deg" : 176
	, "plusmn" : 177
	, "sup1" : 185
	, "sup2" : 178
	, "sup3" : 179
	, "acute" : 180
	, "micro" : 181
	, "para" : 182
	, "middot" : 183
	, "cedil" : 184
	, "ordm" : 186
	, "raquo" : 187
	, "frac14" : 188
	, "frac12" : 189
	, "frac34" : 190
	, "iquest" : 191
	, "times" : 215
	, "divide" : 247
	, "OElig" : 338
	, "oelig" : 339
	, "Scaron" : 352
	, "scaron" : 353
	, "Yuml" : 376
	, "fnof" : 402
	, "circ" : 710
	, "tilde" : 732
	, "Alpha" : 913
	, "Beta" : 914
	, "Gamma" : 915
	, "Delta" : 916
	, "Epsilon" : 917
	, "Zeta" : 918
	, "Eta" : 919
	, "Theta" : 920
	, "Iota" : 921
	, "Kappa" : 922
	, "Lambda" : 923
	, "Mu" : 924
	, "Nu" : 925
	, "Xi" : 926
	, "Omicron" : 927
	, "Pi" : 928
	, "Rho" : 929
	, "Sigma" : 931
	, "Tau" : 932
	, "Upsilon" : 933
	, "Phi" : 934
	, "Chi" : 935
	, "Psi" : 936
	, "Omega" : 937
	, "alpha" : 945
	, "beta" : 946
	, "gamma" : 947
	, "delta" : 948
	, "epsilon" : 949
	, "zeta" : 950
	, "eta" : 951
	, "theta" : 952
	, "iota" : 953
	, "kappa" : 954
	, "lambda" : 955
	, "mu" : 956
	, "nu" : 957
	, "xi" : 958
	, "omicron" : 959
	, "pi" : 960
	, "rho" : 961
	, "sigmaf" : 962
	, "sigma" : 963
	, "tau" : 964
	, "upsilon" : 965
	, "phi" : 966
	, "chi" : 967
	, "psi" : 968
	, "omega" : 969
	, "thetasym" : 977
	, "upsih" : 978
	, "piv" : 982
	, "ensp" : 8194
	, "emsp" : 8195
	, "thinsp" : 8201
	, "zwnj" : 8204
	, "zwj" : 8205
	, "lrm" : 8206
	, "rlm" : 8207
	, "ndash" : 8211
	, "mdash" : 8212
	, "lsquo" : 8216
	, "rsquo" : 8217
	, "sbquo" : 8218
	, "ldquo" : 8220
	, "rdquo" : 8221
	, "bdquo" : 8222
	, "dagger" : 8224
	, "Dagger" : 8225
	, "bull" : 8226
	, "hellip" : 8230
	, "permil" : 8240
	, "prime" : 8242
	, "Prime" : 8243
	, "lsaquo" : 8249
	, "rsaquo" : 8250
	, "oline" : 8254
	, "frasl" : 8260
	, "euro" : 8364
	, "image" : 8465
	, "weierp" : 8472
	, "real" : 8476
	, "trade" : 8482
	, "alefsym" : 8501
	, "larr" : 8592
	, "uarr" : 8593
	, "rarr" : 8594
	, "darr" : 8595
	, "harr" : 8596
	, "crarr" : 8629
	, "lArr" : 8656
	, "uArr" : 8657
	, "rArr" : 8658
	, "dArr" : 8659
	, "hArr" : 8660
	, "forall" : 8704
	, "part" : 8706
	, "exist" : 8707
	, "empty" : 8709
	, "nabla" : 8711
	, "isin" : 8712
	, "notin" : 8713
	, "ni" : 8715
	, "prod" : 8719
	, "sum" : 8721
	, "minus" : 8722
	, "lowast" : 8727
	, "radic" : 8730
	, "prop" : 8733
	, "infin" : 8734
	, "ang" : 8736
	, "and" : 8743
	, "or" : 8744
	, "cap" : 8745
	, "cup" : 8746
	, "int" : 8747
	, "there4" : 8756
	, "sim" : 8764
	, "cong" : 8773
	, "asymp" : 8776
	, "ne" : 8800
	, "equiv" : 8801
	, "le" : 8804
	, "ge" : 8805
	, "sub" : 8834
	, "sup" : 8835
	, "nsub" : 8836
	, "sube" : 8838
	, "supe" : 8839
	, "oplus" : 8853
	, "otimes" : 8855
	, "perp" : 8869
	, "sdot" : 8901
	, "lceil" : 8968
	, "rceil" : 8969
	, "lfloor" : 8970
	, "rfloor" : 8971
	, "lang" : 9001
	, "rang" : 9002
	, "loz" : 9674
	, "spades" : 9824
	, "clubs" : 9827
	, "hearts" : 9829
	, "diams" : 9830
	}

	Object.keys(sax.ENTITIES).forEach(function (key) {
	    var e = sax.ENTITIES[key]
	    var s = typeof e === 'number' ? String.fromCharCode(e) : e
	    sax.ENTITIES[key] = s
	})

	for (var S in sax.STATE) sax.STATE[sax.STATE[S]] = S

	// shorthand
	S = sax.STATE

	function emit (parser, event, data) {
	  parser[event] && parser[event](data)
	}

	function emitNode (parser, nodeType, data) {
	  if (parser.textNode) closeText(parser)
	  emit(parser, nodeType, data)
	}

	function closeText (parser) {
	  parser.textNode = textopts(parser.opt, parser.textNode)
	  if (parser.textNode) emit(parser, "ontext", parser.textNode)
	  parser.textNode = ""
	}

	function textopts (opt, text) {
	  if (opt.trim) text = text.trim()
	  if (opt.normalize) text = text.replace(/\s+/g, " ")
	  return text
	}

	function error (parser, er) {
	  closeText(parser)
	  if (parser.trackPosition) {
	    er += "\nLine: "+parser.line+
	          "\nColumn: "+parser.column+
	          "\nChar: "+parser.c
	  }
	  er = new Error(er)
	  parser.error = er
	  emit(parser, "onerror", er)
	  return parser
	}

	function end (parser) {
	  if (!parser.closedRoot) strictFail(parser, "Unclosed root tag")
	  if ((parser.state !== S.BEGIN) && (parser.state !== S.TEXT)) error(parser, "Unexpected end")
	  closeText(parser)
	  parser.c = ""
	  parser.closed = true
	  emit(parser, "onend")
	  SAXParser.call(parser, parser.strict, parser.opt)
	  return parser
	}

	function strictFail (parser, message) {
	  if (typeof parser !== 'object' || !(parser instanceof SAXParser))
	    throw new Error('bad call to strictFail');
	  if (parser.strict) error(parser, message)
	}

	function newTag (parser) {
	  if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
	  var parent = parser.tags[parser.tags.length - 1] || parser
	    , tag = parser.tag = { name : parser.tagName, attributes : {} }

	  // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
	  if (parser.opt.xmlns) tag.ns = parent.ns
	  parser.attribList.length = 0
	}

	function qname (name, attribute) {
	  var i = name.indexOf(":")
	    , qualName = i < 0 ? [ "", name ] : name.split(":")
	    , prefix = qualName[0]
	    , local = qualName[1]

	  // <x "xmlns"="http://foo">
	  if (attribute && name === "xmlns") {
	    prefix = "xmlns"
	    local = ""
	  }

	  return { prefix: prefix, local: local }
	}

	function attrib (parser) {
	  if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]()

	  if (parser.attribList.indexOf(parser.attribName) !== -1 ||
	      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
	    return parser.attribName = parser.attribValue = ""
	  }

	  if (parser.opt.xmlns) {
	    var qn = qname(parser.attribName, true)
	      , prefix = qn.prefix
	      , local = qn.local

	    if (prefix === "xmlns") {
	      // namespace binding attribute; push the binding into scope
	      if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
	        strictFail( parser
	                  , "xml: prefix must be bound to " + XML_NAMESPACE + "\n"
	                  + "Actual: " + parser.attribValue )
	      } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
	        strictFail( parser
	                  , "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\n"
	                  + "Actual: " + parser.attribValue )
	      } else {
	        var tag = parser.tag
	          , parent = parser.tags[parser.tags.length - 1] || parser
	        if (tag.ns === parent.ns) {
	          tag.ns = Object.create(parent.ns)
	        }
	        tag.ns[local] = parser.attribValue
	      }
	    }

	    // defer onattribute events until all attributes have been seen
	    // so any new bindings can take effect; preserve attribute order
	    // so deferred events can be emitted in document order
	    parser.attribList.push([parser.attribName, parser.attribValue])
	  } else {
	    // in non-xmlns mode, we can emit the event right away
	    parser.tag.attributes[parser.attribName] = parser.attribValue
	    emitNode( parser
	            , "onattribute"
	            , { name: parser.attribName
	              , value: parser.attribValue } )
	  }

	  parser.attribName = parser.attribValue = ""
	}

	function openTag (parser, selfClosing) {
	  if (parser.opt.xmlns) {
	    // emit namespace binding events
	    var tag = parser.tag

	    // add namespace info to tag
	    var qn = qname(parser.tagName)
	    tag.prefix = qn.prefix
	    tag.local = qn.local
	    tag.uri = tag.ns[qn.prefix] || ""

	    if (tag.prefix && !tag.uri) {
	      strictFail(parser, "Unbound namespace prefix: "
	                       + JSON.stringify(parser.tagName))
	      tag.uri = qn.prefix
	    }

	    var parent = parser.tags[parser.tags.length - 1] || parser
	    if (tag.ns && parent.ns !== tag.ns) {
	      Object.keys(tag.ns).forEach(function (p) {
	        emitNode( parser
	                , "onopennamespace"
	                , { prefix: p , uri: tag.ns[p] } )
	      })
	    }

	    // handle deferred onattribute events
	    // Note: do not apply default ns to attributes:
	    //   http://www.w3.org/TR/REC-xml-names/#defaulting
	    for (var i = 0, l = parser.attribList.length; i < l; i ++) {
	      var nv = parser.attribList[i]
	      var name = nv[0]
	        , value = nv[1]
	        , qualName = qname(name, true)
	        , prefix = qualName.prefix
	        , local = qualName.local
	        , uri = prefix == "" ? "" : (tag.ns[prefix] || "")
	        , a = { name: name
	              , value: value
	              , prefix: prefix
	              , local: local
	              , uri: uri
	              }

	      // if there's any attributes with an undefined namespace,
	      // then fail on them now.
	      if (prefix && prefix != "xmlns" && !uri) {
	        strictFail(parser, "Unbound namespace prefix: "
	                         + JSON.stringify(prefix))
	        a.uri = prefix
	      }
	      parser.tag.attributes[name] = a
	      emitNode(parser, "onattribute", a)
	    }
	    parser.attribList.length = 0
	  }

	  parser.tag.isSelfClosing = !!selfClosing

	  // process the tag
	  parser.sawRoot = true
	  parser.tags.push(parser.tag)
	  emitNode(parser, "onopentag", parser.tag)
	  if (!selfClosing) {
	    // special case for <script> in non-strict mode.
	    if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
	      parser.state = S.SCRIPT
	    } else {
	      parser.state = S.TEXT
	    }
	    parser.tag = null
	    parser.tagName = ""
	  }
	  parser.attribName = parser.attribValue = ""
	  parser.attribList.length = 0
	}

	function closeTag (parser) {
	  if (!parser.tagName) {
	    strictFail(parser, "Weird empty close tag.")
	    parser.textNode += "</>"
	    parser.state = S.TEXT
	    return
	  }

	  if (parser.script) {
	    if (parser.tagName !== "script") {
	      parser.script += "</" + parser.tagName + ">"
	      parser.tagName = ""
	      parser.state = S.SCRIPT
	      return
	    }
	    emitNode(parser, "onscript", parser.script)
	    parser.script = ""
	  }

	  // first make sure that the closing tag actually exists.
	  // <a><b></c></b></a> will close everything, otherwise.
	  var t = parser.tags.length
	  var tagName = parser.tagName
	  if (!parser.strict) tagName = tagName[parser.looseCase]()
	  var closeTo = tagName
	  while (t --) {
	    var close = parser.tags[t]
	    if (close.name !== closeTo) {
	      // fail the first time in strict mode
	      strictFail(parser, "Unexpected close tag")
	    } else break
	  }

	  // didn't find it.  we already failed for strict, so just abort.
	  if (t < 0) {
	    strictFail(parser, "Unmatched closing tag: "+parser.tagName)
	    parser.textNode += "</" + parser.tagName + ">"
	    parser.state = S.TEXT
	    return
	  }
	  parser.tagName = tagName
	  var s = parser.tags.length
	  while (s --> t) {
	    var tag = parser.tag = parser.tags.pop()
	    parser.tagName = parser.tag.name
	    emitNode(parser, "onclosetag", parser.tagName)

	    var x = {}
	    for (var i in tag.ns) x[i] = tag.ns[i]

	    var parent = parser.tags[parser.tags.length - 1] || parser
	    if (parser.opt.xmlns && tag.ns !== parent.ns) {
	      // remove namespace bindings introduced by tag
	      Object.keys(tag.ns).forEach(function (p) {
	        var n = tag.ns[p]
	        emitNode(parser, "onclosenamespace", { prefix: p, uri: n })
	      })
	    }
	  }
	  if (t === 0) parser.closedRoot = true
	  parser.tagName = parser.attribValue = parser.attribName = ""
	  parser.attribList.length = 0
	  parser.state = S.TEXT
	}

	function parseEntity (parser) {
	  var entity = parser.entity
	    , entityLC = entity.toLowerCase()
	    , num
	    , numStr = ""
	  if (parser.ENTITIES[entity])
	    return parser.ENTITIES[entity]
	  if (parser.ENTITIES[entityLC])
	    return parser.ENTITIES[entityLC]
	  entity = entityLC
	  if (entity.charAt(0) === "#") {
	    if (entity.charAt(1) === "x") {
	      entity = entity.slice(2)
	      num = parseInt(entity, 16)
	      numStr = num.toString(16)
	    } else {
	      entity = entity.slice(1)
	      num = parseInt(entity, 10)
	      numStr = num.toString(10)
	    }
	  }
	  entity = entity.replace(/^0+/, "")
	  if (numStr.toLowerCase() !== entity) {
	    strictFail(parser, "Invalid character entity")
	    return "&"+parser.entity + ";"
	  }

	  return String.fromCodePoint(num)
	}

	function write (chunk) {
	  var parser = this
	  if (this.error) throw this.error
	  if (parser.closed) return error(parser,
	    "Cannot write after close. Assign an onready handler.")
	  if (chunk === null) return end(parser)
	  var i = 0, c = ""
	  while (parser.c = c = chunk.charAt(i++)) {
	    if (parser.trackPosition) {
	      parser.position ++
	      if (c === "\n") {
	        parser.line ++
	        parser.column = 0
	      } else parser.column ++
	    }
	    switch (parser.state) {

	      case S.BEGIN:
	        if (c === "<") {
	          parser.state = S.OPEN_WAKA
	          parser.startTagPosition = parser.position
	        } else if (not(whitespace,c)) {
	          // have to process this as a text node.
	          // weird, but happens.
	          strictFail(parser, "Non-whitespace before first tag.")
	          parser.textNode = c
	          parser.state = S.TEXT
	        }
	      continue

	      case S.TEXT:
	        if (parser.sawRoot && !parser.closedRoot) {
	          var starti = i-1
	          while (c && c!=="<" && c!=="&") {
	            c = chunk.charAt(i++)
	            if (c && parser.trackPosition) {
	              parser.position ++
	              if (c === "\n") {
	                parser.line ++
	                parser.column = 0
	              } else parser.column ++
	            }
	          }
	          parser.textNode += chunk.substring(starti, i-1)
	        }
	        if (c === "<") {
	          parser.state = S.OPEN_WAKA
	          parser.startTagPosition = parser.position
	        } else {
	          if (not(whitespace, c) && (!parser.sawRoot || parser.closedRoot))
	            strictFail(parser, "Text data outside of root node.")
	          if (c === "&") parser.state = S.TEXT_ENTITY
	          else parser.textNode += c
	        }
	      continue

	      case S.SCRIPT:
	        // only non-strict
	        if (c === "<") {
	          parser.state = S.SCRIPT_ENDING
	        } else parser.script += c
	      continue

	      case S.SCRIPT_ENDING:
	        if (c === "/") {
	          parser.state = S.CLOSE_TAG
	        } else {
	          parser.script += "<" + c
	          parser.state = S.SCRIPT
	        }
	      continue

	      case S.OPEN_WAKA:
	        // either a /, ?, !, or text is coming next.
	        if (c === "!") {
	          parser.state = S.SGML_DECL
	          parser.sgmlDecl = ""
	        } else if (is(whitespace, c)) {
	          // wait for it...
	        } else if (is(nameStart,c)) {
	          parser.state = S.OPEN_TAG
	          parser.tagName = c
	        } else if (c === "/") {
	          parser.state = S.CLOSE_TAG
	          parser.tagName = ""
	        } else if (c === "?") {
	          parser.state = S.PROC_INST
	          parser.procInstName = parser.procInstBody = ""
	        } else {
	          strictFail(parser, "Unencoded <")
	          // if there was some whitespace, then add that in.
	          if (parser.startTagPosition + 1 < parser.position) {
	            var pad = parser.position - parser.startTagPosition
	            c = new Array(pad).join(" ") + c
	          }
	          parser.textNode += "<" + c
	          parser.state = S.TEXT
	        }
	      continue

	      case S.SGML_DECL:
	        if ((parser.sgmlDecl+c).toUpperCase() === CDATA) {
	          emitNode(parser, "onopencdata")
	          parser.state = S.CDATA
	          parser.sgmlDecl = ""
	          parser.cdata = ""
	        } else if (parser.sgmlDecl+c === "--") {
	          parser.state = S.COMMENT
	          parser.comment = ""
	          parser.sgmlDecl = ""
	        } else if ((parser.sgmlDecl+c).toUpperCase() === DOCTYPE) {
	          parser.state = S.DOCTYPE
	          if (parser.doctype || parser.sawRoot) strictFail(parser,
	            "Inappropriately located doctype declaration")
	          parser.doctype = ""
	          parser.sgmlDecl = ""
	        } else if (c === ">") {
	          emitNode(parser, "onsgmldeclaration", parser.sgmlDecl)
	          parser.sgmlDecl = ""
	          parser.state = S.TEXT
	        } else if (is(quote, c)) {
	          parser.state = S.SGML_DECL_QUOTED
	          parser.sgmlDecl += c
	        } else parser.sgmlDecl += c
	      continue

	      case S.SGML_DECL_QUOTED:
	        if (c === parser.q) {
	          parser.state = S.SGML_DECL
	          parser.q = ""
	        }
	        parser.sgmlDecl += c
	      continue

	      case S.DOCTYPE:
	        if (c === ">") {
	          parser.state = S.TEXT
	          emitNode(parser, "ondoctype", parser.doctype)
	          parser.doctype = true // just remember that we saw it.
	        } else {
	          parser.doctype += c
	          if (c === "[") parser.state = S.DOCTYPE_DTD
	          else if (is(quote, c)) {
	            parser.state = S.DOCTYPE_QUOTED
	            parser.q = c
	          }
	        }
	      continue

	      case S.DOCTYPE_QUOTED:
	        parser.doctype += c
	        if (c === parser.q) {
	          parser.q = ""
	          parser.state = S.DOCTYPE
	        }
	      continue

	      case S.DOCTYPE_DTD:
	        parser.doctype += c
	        if (c === "]") parser.state = S.DOCTYPE
	        else if (is(quote,c)) {
	          parser.state = S.DOCTYPE_DTD_QUOTED
	          parser.q = c
	        }
	      continue

	      case S.DOCTYPE_DTD_QUOTED:
	        parser.doctype += c
	        if (c === parser.q) {
	          parser.state = S.DOCTYPE_DTD
	          parser.q = ""
	        }
	      continue

	      case S.COMMENT:
	        if (c === "-") parser.state = S.COMMENT_ENDING
	        else parser.comment += c
	      continue

	      case S.COMMENT_ENDING:
	        if (c === "-") {
	          parser.state = S.COMMENT_ENDED
	          parser.comment = textopts(parser.opt, parser.comment)
	          if (parser.comment) emitNode(parser, "oncomment", parser.comment)
	          parser.comment = ""
	        } else {
	          parser.comment += "-" + c
	          parser.state = S.COMMENT
	        }
	      continue

	      case S.COMMENT_ENDED:
	        if (c !== ">") {
	          strictFail(parser, "Malformed comment")
	          // allow <!-- blah -- bloo --> in non-strict mode,
	          // which is a comment of " blah -- bloo "
	          parser.comment += "--" + c
	          parser.state = S.COMMENT
	        } else parser.state = S.TEXT
	      continue

	      case S.CDATA:
	        if (c === "]") parser.state = S.CDATA_ENDING
	        else parser.cdata += c
	      continue

	      case S.CDATA_ENDING:
	        if (c === "]") parser.state = S.CDATA_ENDING_2
	        else {
	          parser.cdata += "]" + c
	          parser.state = S.CDATA
	        }
	      continue

	      case S.CDATA_ENDING_2:
	        if (c === ">") {
	          if (parser.cdata) emitNode(parser, "oncdata", parser.cdata)
	          emitNode(parser, "onclosecdata")
	          parser.cdata = ""
	          parser.state = S.TEXT
	        } else if (c === "]") {
	          parser.cdata += "]"
	        } else {
	          parser.cdata += "]]" + c
	          parser.state = S.CDATA
	        }
	      continue

	      case S.PROC_INST:
	        if (c === "?") parser.state = S.PROC_INST_ENDING
	        else if (is(whitespace, c)) parser.state = S.PROC_INST_BODY
	        else parser.procInstName += c
	      continue

	      case S.PROC_INST_BODY:
	        if (!parser.procInstBody && is(whitespace, c)) continue
	        else if (c === "?") parser.state = S.PROC_INST_ENDING
	        else parser.procInstBody += c
	      continue

	      case S.PROC_INST_ENDING:
	        if (c === ">") {
	          emitNode(parser, "onprocessinginstruction", {
	            name : parser.procInstName,
	            body : parser.procInstBody
	          })
	          parser.procInstName = parser.procInstBody = ""
	          parser.state = S.TEXT
	        } else {
	          parser.procInstBody += "?" + c
	          parser.state = S.PROC_INST_BODY
	        }
	      continue

	      case S.OPEN_TAG:
	        if (is(nameBody, c)) parser.tagName += c
	        else {
	          newTag(parser)
	          if (c === ">") openTag(parser)
	          else if (c === "/") parser.state = S.OPEN_TAG_SLASH
	          else {
	            if (not(whitespace, c)) strictFail(
	              parser, "Invalid character in tag name")
	            parser.state = S.ATTRIB
	          }
	        }
	      continue

	      case S.OPEN_TAG_SLASH:
	        if (c === ">") {
	          openTag(parser, true)
	          closeTag(parser)
	        } else {
	          strictFail(parser, "Forward-slash in opening tag not followed by >")
	          parser.state = S.ATTRIB
	        }
	      continue

	      case S.ATTRIB:
	        // haven't read the attribute name yet.
	        if (is(whitespace, c)) continue
	        else if (c === ">") openTag(parser)
	        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
	        else if (is(nameStart, c)) {
	          parser.attribName = c
	          parser.attribValue = ""
	          parser.state = S.ATTRIB_NAME
	        } else strictFail(parser, "Invalid attribute name")
	      continue

	      case S.ATTRIB_NAME:
	        if (c === "=") parser.state = S.ATTRIB_VALUE
	        else if (c === ">") {
	          strictFail(parser, "Attribute without value")
	          parser.attribValue = parser.attribName
	          attrib(parser)
	          openTag(parser)
	        }
	        else if (is(whitespace, c)) parser.state = S.ATTRIB_NAME_SAW_WHITE
	        else if (is(nameBody, c)) parser.attribName += c
	        else strictFail(parser, "Invalid attribute name")
	      continue

	      case S.ATTRIB_NAME_SAW_WHITE:
	        if (c === "=") parser.state = S.ATTRIB_VALUE
	        else if (is(whitespace, c)) continue
	        else {
	          strictFail(parser, "Attribute without value")
	          parser.tag.attributes[parser.attribName] = ""
	          parser.attribValue = ""
	          emitNode(parser, "onattribute",
	                   { name : parser.attribName, value : "" })
	          parser.attribName = ""
	          if (c === ">") openTag(parser)
	          else if (is(nameStart, c)) {
	            parser.attribName = c
	            parser.state = S.ATTRIB_NAME
	          } else {
	            strictFail(parser, "Invalid attribute name")
	            parser.state = S.ATTRIB
	          }
	        }
	      continue

	      case S.ATTRIB_VALUE:
	        if (is(whitespace, c)) continue
	        else if (is(quote, c)) {
	          parser.q = c
	          parser.state = S.ATTRIB_VALUE_QUOTED
	        } else {
	          strictFail(parser, "Unquoted attribute value")
	          parser.state = S.ATTRIB_VALUE_UNQUOTED
	          parser.attribValue = c
	        }
	      continue

	      case S.ATTRIB_VALUE_QUOTED:
	        if (c !== parser.q) {
	          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q
	          else parser.attribValue += c
	          continue
	        }
	        attrib(parser)
	        parser.q = ""
	        parser.state = S.ATTRIB_VALUE_CLOSED
	      continue

	      case S.ATTRIB_VALUE_CLOSED:
	        if (is(whitespace, c)) {
	          parser.state = S.ATTRIB
	        } else if (c === ">") openTag(parser)
	        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
	        else if (is(nameStart, c)) {
	          strictFail(parser, "No whitespace between attributes")
	          parser.attribName = c
	          parser.attribValue = ""
	          parser.state = S.ATTRIB_NAME
	        } else strictFail(parser, "Invalid attribute name")
	      continue

	      case S.ATTRIB_VALUE_UNQUOTED:
	        if (not(attribEnd,c)) {
	          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U
	          else parser.attribValue += c
	          continue
	        }
	        attrib(parser)
	        if (c === ">") openTag(parser)
	        else parser.state = S.ATTRIB
	      continue

	      case S.CLOSE_TAG:
	        if (!parser.tagName) {
	          if (is(whitespace, c)) continue
	          else if (not(nameStart, c)) {
	            if (parser.script) {
	              parser.script += "</" + c
	              parser.state = S.SCRIPT
	            } else {
	              strictFail(parser, "Invalid tagname in closing tag.")
	            }
	          } else parser.tagName = c
	        }
	        else if (c === ">") closeTag(parser)
	        else if (is(nameBody, c)) parser.tagName += c
	        else if (parser.script) {
	          parser.script += "</" + parser.tagName
	          parser.tagName = ""
	          parser.state = S.SCRIPT
	        } else {
	          if (not(whitespace, c)) strictFail(parser,
	            "Invalid tagname in closing tag")
	          parser.state = S.CLOSE_TAG_SAW_WHITE
	        }
	      continue

	      case S.CLOSE_TAG_SAW_WHITE:
	        if (is(whitespace, c)) continue
	        if (c === ">") closeTag(parser)
	        else strictFail(parser, "Invalid characters in closing tag")
	      continue

	      case S.TEXT_ENTITY:
	      case S.ATTRIB_VALUE_ENTITY_Q:
	      case S.ATTRIB_VALUE_ENTITY_U:
	        switch(parser.state) {
	          case S.TEXT_ENTITY:
	            var returnState = S.TEXT, buffer = "textNode"
	          break

	          case S.ATTRIB_VALUE_ENTITY_Q:
	            var returnState = S.ATTRIB_VALUE_QUOTED, buffer = "attribValue"
	          break

	          case S.ATTRIB_VALUE_ENTITY_U:
	            var returnState = S.ATTRIB_VALUE_UNQUOTED, buffer = "attribValue"
	          break
	        }
	        if (c === ";") {
	          parser[buffer] += parseEntity(parser)
	          parser.entity = ""
	          parser.state = returnState
	        }
	        else if (is(entity, c)) parser.entity += c
	        else {
	          strictFail(parser, "Invalid character entity")
	          parser[buffer] += "&" + parser.entity + c
	          parser.entity = ""
	          parser.state = returnState
	        }
	      continue

	      default:
	        throw new Error(parser, "Unknown state: " + parser.state)
	    }
	  } // while
	  // cdata blocks can get very big under normal conditions. emit and move on.
	  // if (parser.state === S.CDATA && parser.cdata) {
	  //   emitNode(parser, "oncdata", parser.cdata)
	  //   parser.cdata = ""
	  // }
	  if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser)
	  return parser
	}

	/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
	if (!String.fromCodePoint) {
	        (function() {
	                var stringFromCharCode = String.fromCharCode;
	                var floor = Math.floor;
	                var fromCodePoint = function() {
	                        var MAX_SIZE = 0x4000;
	                        var codeUnits = [];
	                        var highSurrogate;
	                        var lowSurrogate;
	                        var index = -1;
	                        var length = arguments.length;
	                        if (!length) {
	                                return '';
	                        }
	                        var result = '';
	                        while (++index < length) {
	                                var codePoint = Number(arguments[index]);
	                                if (
	                                        !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
	                                        codePoint < 0 || // not a valid Unicode code point
	                                        codePoint > 0x10FFFF || // not a valid Unicode code point
	                                        floor(codePoint) != codePoint // not an integer
	                                ) {
	                                        throw RangeError('Invalid code point: ' + codePoint);
	                                }
	                                if (codePoint <= 0xFFFF) { // BMP code point
	                                        codeUnits.push(codePoint);
	                                } else { // Astral code point; split in surrogate halves
	                                        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	                                        codePoint -= 0x10000;
	                                        highSurrogate = (codePoint >> 10) + 0xD800;
	                                        lowSurrogate = (codePoint % 0x400) + 0xDC00;
	                                        codeUnits.push(highSurrogate, lowSurrogate);
	                                }
	                                if (index + 1 == length || codeUnits.length > MAX_SIZE) {
	                                        result += stringFromCharCode.apply(null, codeUnits);
	                                        codeUnits.length = 0;
	                                }
	                        }
	                        return result;
	                };
	                if (Object.defineProperty) {
	                        Object.defineProperty(String, 'fromCodePoint', {
	                                'value': fromCodePoint,
	                                'configurable': true,
	                                'writable': true
	                        });
	                } else {
	                        String.fromCodePoint = fromCodePoint;
	                }
	        }());
	}

	})(false ? sax = {} : exports);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).Buffer))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLBuilder, assign;

	  assign = __webpack_require__(18);

	  XMLBuilder = __webpack_require__(12);

	  module.exports.create = function(name, xmldec, doctype, options) {
	    options = assign({}, xmldec, doctype, options);
	    return new XMLBuilder(name, options).root();
	  };

	}).call(this);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLBuilder, XMLDeclaration, XMLDocType, XMLElement, XMLStringifier;

	  XMLStringifier = __webpack_require__(19);

	  XMLDeclaration = __webpack_require__(20);

	  XMLDocType = __webpack_require__(21);

	  XMLElement = __webpack_require__(22);

	  module.exports = XMLBuilder = (function() {
	    function XMLBuilder(name, options) {
	      var root, temp;
	      if (name == null) {
	        throw new Error("Root element needs a name");
	      }
	      if (options == null) {
	        options = {};
	      }
	      this.options = options;
	      this.stringify = new XMLStringifier(options);
	      temp = new XMLElement(this, 'doc');
	      root = temp.element(name);
	      root.isRoot = true;
	      root.documentObject = this;
	      this.rootObject = root;
	      if (!options.headless) {
	        root.declaration(options);
	        if ((options.pubID != null) || (options.sysID != null)) {
	          root.doctype(options);
	        }
	      }
	    }

	    XMLBuilder.prototype.root = function() {
	      return this.rootObject;
	    };

	    XMLBuilder.prototype.end = function(options) {
	      return this.toString(options);
	    };

	    XMLBuilder.prototype.toString = function(options) {
	      var indent, newline, offset, pretty, r, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      r = '';
	      if (this.xmldec != null) {
	        r += this.xmldec.toString(options);
	      }
	      if (this.doctype != null) {
	        r += this.doctype.toString(options);
	      }
	      r += this.rootObject.toString(options);
	      if (pretty && r.slice(-newline.length) === newline) {
	        r = r.slice(0, -newline.length);
	      }
	      return r;
	    };

	    return XMLBuilder;

	  })();

	}).call(this);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(8).EventEmitter;
	var inherits = __webpack_require__(46);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(41);
	Stream.Writable = __webpack_require__(42);
	Stream.Duplex = __webpack_require__(43);
	Stream.Transform = __webpack_require__(44);
	Stream.PassThrough = __webpack_require__(45);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(17).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(47)
	var ieee754 = __webpack_require__(40)
	var isArray = __webpack_require__(39)

	exports.Buffer = Buffer
	exports.SlowBuffer = Buffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return 42 === arr.foo() && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding, noZero) {
	  if (!(this instanceof Buffer))
	    return new Buffer(subject, encoding, noZero)

	  var type = typeof subject

	  // Find the length
	  var length
	  if (type === 'number')
	    length = subject > 0 ? subject >>> 0 : 0
	  else if (type === 'string') {
	    if (encoding === 'base64')
	      subject = base64clean(subject)
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) { // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data))
	      subject = subject.data
	    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
	  } else
	    throw new TypeError('must start with number, buffer, array or string')

	  if (this.length > kMaxLength)
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	      'size: 0x' + kMaxLength.toString(16) + ' bytes')

	  var buf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    buf = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    buf = this
	    buf.length = length
	    buf._isBuffer = true
	  }

	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    buf._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++)
	        buf[i] = subject.readUInt8(i)
	    } else {
	      for (i = 0; i < length; i++)
	        buf[i] = ((subject[i] % 256) + 256) % 256
	    }
	  } else if (type === 'string') {
	    buf.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
	    for (i = 0; i < length; i++) {
	      buf[i] = 0
	    }
	  }

	  return buf
	}

	Buffer.isBuffer = function (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
	    throw new TypeError('Arguments must be Buffers')

	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }

	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	Buffer.byteLength = function (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function (encoding, start, end) {
	  var loweredCase = false

	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase)
	          throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function (b) {
	  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max)
	      str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b)
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var byte = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(byte)) throw new Error('Invalid hex string')
	    buf[offset + i] = byte
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
	  return charsWritten
	}

	Buffer.prototype.write = function (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }

	  offset = Number(offset) || 0
	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()

	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}

	Buffer.prototype.toJSON = function () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  return asciiSlice(buf, start, end)
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len;
	    if (start < 0)
	      start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0)
	      end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start)
	    end = start

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    return Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    var newBuf = new Buffer(sliceLen, undefined, true)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	    return newBuf
	  }
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0)
	    throw new RangeError('offset is not uint')
	  if (offset + ext > length)
	    throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	      ((this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      this[offset + 3])
	}

	Buffer.prototype.readInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80))
	    return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16) |
	      (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	      (this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}

	Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}

	Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function (target, target_start, start, end) {
	  var source = this

	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (!target_start) target_start = 0

	  // Copy 0 bytes; we're done
	  if (end === start) return
	  if (target.length === 0 || source.length === 0) return

	  // Fatal error conditions
	  if (end < start) throw new TypeError('sourceEnd < sourceStart')
	  if (target_start < 0 || target_start >= target.length)
	    throw new TypeError('targetStart out of bounds')
	  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
	  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length)
	    end = this.length
	  if (target.length - target_start < end - start)
	    end = target.length - target_start + start

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new TypeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    var b = str.charCodeAt(i)
	    if (b <= 0x7F) {
	      byteArray.push(b)
	    } else {
	      var start = i
	      if (b >= 0xD800 && b <= 0xDFFF) i++
	      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
	      for (var j = 0; j < h.length; j++) {
	        byteArray.push(parseInt(h[j], 16))
	      }
	    }
	  }
	  return byteArray
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(str)
	}

	function blitBuffer (src, dst, offset, length, unitSize) {
	  if (unitSize) length -= length % unitSize;
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length))
	      break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).Buffer))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssign = __webpack_require__(23),
	    createAssigner = __webpack_require__(24);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it is invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments;
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return typeof value == 'undefined' ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(baseAssign);

	module.exports = assign;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLStringifier,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	    __hasProp = {}.hasOwnProperty;

	  module.exports = XMLStringifier = (function() {
	    function XMLStringifier(options) {
	      this.assertLegalChar = __bind(this.assertLegalChar, this);
	      var key, value, _ref;
	      this.allowSurrogateChars = options != null ? options.allowSurrogateChars : void 0;
	      _ref = (options != null ? options.stringify : void 0) || {};
	      for (key in _ref) {
	        if (!__hasProp.call(_ref, key)) continue;
	        value = _ref[key];
	        this[key] = value;
	      }
	    }

	    XMLStringifier.prototype.eleName = function(val) {
	      val = '' + val || '';
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.eleText = function(val) {
	      val = '' + val || '';
	      return this.assertLegalChar(this.elEscape(val));
	    };

	    XMLStringifier.prototype.cdata = function(val) {
	      val = '' + val || '';
	      if (val.match(/]]>/)) {
	        throw new Error("Invalid CDATA text: " + val);
	      }
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.comment = function(val) {
	      val = '' + val || '';
	      if (val.match(/--/)) {
	        throw new Error("Comment text cannot contain double-hypen: " + val);
	      }
	      return this.assertLegalChar(val);
	    };

	    XMLStringifier.prototype.raw = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.attName = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.attValue = function(val) {
	      val = '' + val || '';
	      return this.attEscape(val);
	    };

	    XMLStringifier.prototype.insTarget = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.insValue = function(val) {
	      val = '' + val || '';
	      if (val.match(/\?>/)) {
	        throw new Error("Invalid processing instruction value: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlVersion = function(val) {
	      val = '' + val || '';
	      if (!val.match(/1\.[0-9]+/)) {
	        throw new Error("Invalid version number: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlEncoding = function(val) {
	      val = '' + val || '';
	      if (!val.match(/[A-Za-z](?:[A-Za-z0-9._-]|-)*/)) {
	        throw new Error("Invalid encoding: " + val);
	      }
	      return val;
	    };

	    XMLStringifier.prototype.xmlStandalone = function(val) {
	      if (val) {
	        return "yes";
	      } else {
	        return "no";
	      }
	    };

	    XMLStringifier.prototype.dtdPubID = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdSysID = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdElementValue = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdAttType = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdAttDefault = function(val) {
	      if (val != null) {
	        return '' + val || '';
	      } else {
	        return val;
	      }
	    };

	    XMLStringifier.prototype.dtdEntityValue = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.dtdNData = function(val) {
	      return '' + val || '';
	    };

	    XMLStringifier.prototype.convertAttKey = '@';

	    XMLStringifier.prototype.convertPIKey = '?';

	    XMLStringifier.prototype.convertTextKey = '#text';

	    XMLStringifier.prototype.convertCDataKey = '#cdata';

	    XMLStringifier.prototype.convertCommentKey = '#comment';

	    XMLStringifier.prototype.convertRawKey = '#raw';

	    XMLStringifier.prototype.convertListKey = '#list';

	    XMLStringifier.prototype.assertLegalChar = function(str) {
	      var chars, chr;
	      if (this.allowSurrogateChars) {
	        chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFE-\uFFFF]/;
	      } else {
	        chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/;
	      }
	      chr = str.match(chars);
	      if (chr) {
	        throw new Error("Invalid character (" + chr + ") in string: " + str + " at index " + chr.index);
	      }
	      return str;
	    };

	    XMLStringifier.prototype.elEscape = function(str) {
	      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
	    };

	    XMLStringifier.prototype.attEscape = function(str) {
	      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
	    };

	    return XMLStringifier;

	  })();

	}).call(this);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLDeclaration, XMLNode, create, isObject,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  create = __webpack_require__(25);

	  isObject = __webpack_require__(26);

	  XMLNode = __webpack_require__(34);

	  module.exports = XMLDeclaration = (function(_super) {
	    __extends(XMLDeclaration, _super);

	    function XMLDeclaration(parent, version, encoding, standalone) {
	      var _ref;
	      XMLDeclaration.__super__.constructor.call(this, parent);
	      if (isObject(version)) {
	        _ref = version, version = _ref.version, encoding = _ref.encoding, standalone = _ref.standalone;
	      }
	      if (!version) {
	        version = '1.0';
	      }
	      if (version != null) {
	        this.version = this.stringify.xmlVersion(version);
	      }
	      if (encoding != null) {
	        this.encoding = this.stringify.xmlEncoding(encoding);
	      }
	      if (standalone != null) {
	        this.standalone = this.stringify.xmlStandalone(standalone);
	      }
	    }

	    XMLDeclaration.prototype.clone = function() {
	      return create(XMLDeclaration.prototype, this);
	    };

	    XMLDeclaration.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<?xml';
	      if (this.version != null) {
	        r += ' version="' + this.version + '"';
	      }
	      if (this.encoding != null) {
	        r += ' encoding="' + this.encoding + '"';
	      }
	      if (this.standalone != null) {
	        r += ' standalone="' + this.standalone + '"';
	      }
	      r += '?>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLDeclaration;

	  })(XMLNode);

	}).call(this);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLProcessingInstruction, create, isObject;

	  create = __webpack_require__(25);

	  isObject = __webpack_require__(26);

	  XMLCData = __webpack_require__(27);

	  XMLComment = __webpack_require__(28);

	  XMLDTDAttList = __webpack_require__(29);

	  XMLDTDEntity = __webpack_require__(30);

	  XMLDTDElement = __webpack_require__(31);

	  XMLDTDNotation = __webpack_require__(32);

	  XMLProcessingInstruction = __webpack_require__(33);

	  module.exports = XMLDocType = (function() {
	    function XMLDocType(parent, pubID, sysID) {
	      var _ref, _ref1;
	      this.documentObject = parent;
	      this.stringify = this.documentObject.stringify;
	      this.children = [];
	      if (isObject(pubID)) {
	        _ref = pubID, pubID = _ref.pubID, sysID = _ref.sysID;
	      }
	      if (sysID == null) {
	        _ref1 = [pubID, sysID], sysID = _ref1[0], pubID = _ref1[1];
	      }
	      if (pubID != null) {
	        this.pubID = this.stringify.dtdPubID(pubID);
	      }
	      if (sysID != null) {
	        this.sysID = this.stringify.dtdSysID(sysID);
	      }
	    }

	    XMLDocType.prototype.clone = function() {
	      return create(XMLDocType.prototype, this);
	    };

	    XMLDocType.prototype.element = function(name, value) {
	      var child;
	      child = new XMLDTDElement(this, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      var child;
	      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.entity = function(name, value) {
	      var child;
	      child = new XMLDTDEntity(this, false, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.pEntity = function(name, value) {
	      var child;
	      child = new XMLDTDEntity(this, true, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.notation = function(name, value) {
	      var child;
	      child = new XMLDTDNotation(this, name, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.cdata = function(value) {
	      var child;
	      child = new XMLCData(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.comment = function(value) {
	      var child;
	      child = new XMLComment(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.instruction = function(target, value) {
	      var child;
	      child = new XMLProcessingInstruction(this, target, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLDocType.prototype.root = function() {
	      return this.documentObject.root();
	    };

	    XMLDocType.prototype.document = function() {
	      return this.documentObject;
	    };

	    XMLDocType.prototype.toString = function(options, level) {
	      var child, indent, newline, offset, pretty, r, space, _i, _len, _ref, _ref1, _ref2, _ref3;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<!DOCTYPE ' + this.root().name;
	      if (this.pubID && this.sysID) {
	        r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
	      } else if (this.sysID) {
	        r += ' SYSTEM "' + this.sysID + '"';
	      }
	      if (this.children.length > 0) {
	        r += ' [';
	        if (pretty) {
	          r += newline;
	        }
	        _ref3 = this.children;
	        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
	          child = _ref3[_i];
	          r += child.toString(options, level + 1);
	        }
	        r += ']';
	      }
	      r += '>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    XMLDocType.prototype.ele = function(name, value) {
	      return this.element(name, value);
	    };

	    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
	    };

	    XMLDocType.prototype.ent = function(name, value) {
	      return this.entity(name, value);
	    };

	    XMLDocType.prototype.pent = function(name, value) {
	      return this.pEntity(name, value);
	    };

	    XMLDocType.prototype.not = function(name, value) {
	      return this.notation(name, value);
	    };

	    XMLDocType.prototype.dat = function(value) {
	      return this.cdata(value);
	    };

	    XMLDocType.prototype.com = function(value) {
	      return this.comment(value);
	    };

	    XMLDocType.prototype.ins = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLDocType.prototype.up = function() {
	      return this.root();
	    };

	    XMLDocType.prototype.doc = function() {
	      return this.document();
	    };

	    return XMLDocType;

	  })();

	}).call(this);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLAttribute, XMLElement, XMLNode, XMLProcessingInstruction, create, every, isArray, isFunction, isObject,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  create = __webpack_require__(25);

	  isObject = __webpack_require__(26);

	  isArray = __webpack_require__(35);

	  isFunction = __webpack_require__(36);

	  every = __webpack_require__(37);

	  XMLNode = __webpack_require__(34);

	  XMLAttribute = __webpack_require__(38);

	  XMLProcessingInstruction = __webpack_require__(33);

	  module.exports = XMLElement = (function(_super) {
	    __extends(XMLElement, _super);

	    function XMLElement(parent, name, attributes) {
	      XMLElement.__super__.constructor.call(this, parent);
	      if (name == null) {
	        throw new Error("Missing element name");
	      }
	      this.name = this.stringify.eleName(name);
	      this.children = [];
	      this.instructions = [];
	      this.attributes = {};
	      if (attributes != null) {
	        this.attribute(attributes);
	      }
	    }

	    XMLElement.prototype.clone = function() {
	      var att, attName, clonedSelf, pi, _i, _len, _ref, _ref1;
	      clonedSelf = create(XMLElement.prototype, this);
	      clonedSelf.attributes = {};
	      _ref = this.attributes;
	      for (attName in _ref) {
	        if (!__hasProp.call(_ref, attName)) continue;
	        att = _ref[attName];
	        clonedSelf.attributes[attName] = att.clone();
	      }
	      clonedSelf.instructions = [];
	      _ref1 = this.instructions;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        pi = _ref1[_i];
	        clonedSelf.instructions.push(pi.clone());
	      }
	      clonedSelf.children = [];
	      this.children.forEach(function(child) {
	        var clonedChild;
	        clonedChild = child.clone();
	        clonedChild.parent = clonedSelf;
	        return clonedSelf.children.push(clonedChild);
	      });
	      return clonedSelf;
	    };

	    XMLElement.prototype.attribute = function(name, value) {
	      var attName, attValue;
	      if (name != null) {
	        name = name.valueOf();
	      }
	      if (isObject(name)) {
	        for (attName in name) {
	          if (!__hasProp.call(name, attName)) continue;
	          attValue = name[attName];
	          this.attribute(attName, attValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        if (!this.options.skipNullAttributes || (value != null)) {
	          this.attributes[name] = new XMLAttribute(this, name, value);
	        }
	      }
	      return this;
	    };

	    XMLElement.prototype.removeAttribute = function(name) {
	      var attName, _i, _len;
	      if (name == null) {
	        throw new Error("Missing attribute name");
	      }
	      name = name.valueOf();
	      if (isArray(name)) {
	        for (_i = 0, _len = name.length; _i < _len; _i++) {
	          attName = name[_i];
	          delete this.attributes[attName];
	        }
	      } else {
	        delete this.attributes[name];
	      }
	      return this;
	    };

	    XMLElement.prototype.instruction = function(target, value) {
	      var insTarget, insValue, instruction, _i, _len;
	      if (target != null) {
	        target = target.valueOf();
	      }
	      if (value != null) {
	        value = value.valueOf();
	      }
	      if (isArray(target)) {
	        for (_i = 0, _len = target.length; _i < _len; _i++) {
	          insTarget = target[_i];
	          this.instruction(insTarget);
	        }
	      } else if (isObject(target)) {
	        for (insTarget in target) {
	          if (!__hasProp.call(target, insTarget)) continue;
	          insValue = target[insTarget];
	          this.instruction(insTarget, insValue);
	        }
	      } else {
	        if (isFunction(value)) {
	          value = value.apply();
	        }
	        instruction = new XMLProcessingInstruction(this, target, value);
	        this.instructions.push(instruction);
	      }
	      return this;
	    };

	    XMLElement.prototype.toString = function(options, level) {
	      var att, child, indent, instruction, name, newline, offset, pretty, r, space, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      _ref3 = this.instructions;
	      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
	        instruction = _ref3[_i];
	        r += instruction.toString(options, level + 1);
	      }
	      if (pretty) {
	        r += space;
	      }
	      r += '<' + this.name;
	      _ref4 = this.attributes;
	      for (name in _ref4) {
	        if (!__hasProp.call(_ref4, name)) continue;
	        att = _ref4[name];
	        r += att.toString(options);
	      }
	      if (this.children.length === 0 || every(this.children, function(e) {
	        return e.value === '';
	      })) {
	        r += '/>';
	        if (pretty) {
	          r += newline;
	        }
	      } else if (pretty && this.children.length === 1 && (this.children[0].value != null)) {
	        r += '>';
	        r += this.children[0].value;
	        r += '</' + this.name + '>';
	        r += newline;
	      } else {
	        r += '>';
	        if (pretty) {
	          r += newline;
	        }
	        _ref5 = this.children;
	        for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
	          child = _ref5[_j];
	          r += child.toString(options, level + 1);
	        }
	        if (pretty) {
	          r += space;
	        }
	        r += '</' + this.name + '>';
	        if (pretty) {
	          r += newline;
	        }
	      }
	      return r;
	    };

	    XMLElement.prototype.att = function(name, value) {
	      return this.attribute(name, value);
	    };

	    XMLElement.prototype.ins = function(target, value) {
	      return this.instruction(target, value);
	    };

	    XMLElement.prototype.a = function(name, value) {
	      return this.attribute(name, value);
	    };

	    XMLElement.prototype.i = function(target, value) {
	      return this.instruction(target, value);
	    };

	    return XMLElement;

	  })(XMLNode);

	}).call(this);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(48),
	    keys = __webpack_require__(49);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize assigning values.
	 * @returns {Object} Returns the destination object.
	 */
	function baseAssign(object, source, customizer) {
	  var props = keys(source);
	  if (!customizer) {
	    return baseCopy(source, object, props);
	  }
	  var index = -1,
	      length = props.length

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? result !== value : value === value) ||
	        (typeof value == 'undefined' && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	module.exports = baseAssign;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(50),
	    isIterateeCall = __webpack_require__(51);

	/**
	 * Creates a function that assigns properties of source object(s) to a given
	 * destination object.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return function() {
	    var length = arguments.length,
	        object = arguments[0];

	    if (length < 2 || object == null) {
	      return object;
	    }
	    if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
	      length = 2;
	    }
	    // Juggle arguments.
	    if (length > 3 && typeof arguments[length - 2] == 'function') {
	      var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
	    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
	      customizer = arguments[--length];
	    }
	    var index = 0;
	    while (++index < length) {
	      var source = arguments[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  };
	}

	module.exports = createAssigner;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(48),
	    baseCreate = __webpack_require__(52),
	    isIterateeCall = __webpack_require__(51),
	    keys = __webpack_require__(49);

	/**
	 * Creates an object that inherits from the given `prototype` object. If a
	 * `properties` object is provided its own enumerable properties are assigned
	 * to the created object.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} prototype The object to inherit from.
	 * @param {Object} [properties] The properties to assign to the object.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * function Shape() {
	 *   this.x = 0;
	 *   this.y = 0;
	 * }
	 *
	 * function Circle() {
	 *   Shape.call(this);
	 * }
	 *
	 * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
	 *
	 * var circle = new Circle;
	 * circle instanceof Circle;
	 * // => true
	 *
	 * circle instanceof Shape;
	 * // => true
	 */
	function create(prototype, properties, guard) {
	  var result = baseCreate(prototype);
	  if (guard && isIterateeCall(prototype, properties, guard)) {
	    properties = null;
	  }
	  return properties ? baseCopy(properties, result, keys(properties)) : result;
	}

	module.exports = create;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is the language type of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || (value && type == 'object') || false;
	}

	module.exports = isObject;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLCData, XMLNode, create,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  create = __webpack_require__(25);

	  XMLNode = __webpack_require__(34);

	  module.exports = XMLCData = (function(_super) {
	    __extends(XMLCData, _super);

	    function XMLCData(parent, text) {
	      XMLCData.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing CDATA text");
	      }
	      this.text = this.stringify.cdata(text);
	    }

	    XMLCData.prototype.clone = function() {
	      return create(XMLCData.prototype, this);
	    };

	    XMLCData.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<![CDATA[' + this.text + ']]>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLCData;

	  })(XMLNode);

	}).call(this);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLComment, XMLNode, create,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  create = __webpack_require__(25);

	  XMLNode = __webpack_require__(34);

	  module.exports = XMLComment = (function(_super) {
	    __extends(XMLComment, _super);

	    function XMLComment(parent, text) {
	      XMLComment.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing comment text");
	      }
	      this.text = this.stringify.comment(text);
	    }

	    XMLComment.prototype.clone = function() {
	      return create(XMLComment.prototype, this);
	    };

	    XMLComment.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<!-- ' + this.text + ' -->';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLComment;

	  })(XMLNode);

	}).call(this);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLDTDAttList, create;

	  create = __webpack_require__(25);

	  module.exports = XMLDTDAttList = (function() {
	    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
	      this.stringify = parent.stringify;
	      if (elementName == null) {
	        throw new Error("Missing DTD element name");
	      }
	      if (attributeName == null) {
	        throw new Error("Missing DTD attribute name");
	      }
	      if (!attributeType) {
	        throw new Error("Missing DTD attribute type");
	      }
	      if (!defaultValueType) {
	        throw new Error("Missing DTD attribute default");
	      }
	      if (defaultValueType.indexOf('#') !== 0) {
	        defaultValueType = '#' + defaultValueType;
	      }
	      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
	        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
	      }
	      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
	        throw new Error("Default value only applies to #FIXED or #DEFAULT");
	      }
	      this.elementName = this.stringify.eleName(elementName);
	      this.attributeName = this.stringify.attName(attributeName);
	      this.attributeType = this.stringify.dtdAttType(attributeType);
	      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
	      this.defaultValueType = defaultValueType;
	    }

	    XMLDTDAttList.prototype.clone = function() {
	      return create(XMLDTDAttList.prototype, this);
	    };

	    XMLDTDAttList.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<!ATTLIST ' + this.elementName + ' ' + this.attributeName + ' ' + this.attributeType;
	      if (this.defaultValueType !== '#DEFAULT') {
	        r += ' ' + this.defaultValueType;
	      }
	      if (this.defaultValue) {
	        r += ' "' + this.defaultValue + '"';
	      }
	      r += '>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLDTDAttList;

	  })();

	}).call(this);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLDTDEntity, create, isObject;

	  create = __webpack_require__(25);

	  isObject = __webpack_require__(26);

	  module.exports = XMLDTDEntity = (function() {
	    function XMLDTDEntity(parent, pe, name, value) {
	      this.stringify = parent.stringify;
	      if (name == null) {
	        throw new Error("Missing entity name");
	      }
	      if (value == null) {
	        throw new Error("Missing entity value");
	      }
	      this.pe = !!pe;
	      this.name = this.stringify.eleName(name);
	      if (!isObject(value)) {
	        this.value = this.stringify.dtdEntityValue(value);
	      } else {
	        if (!value.pubID && !value.sysID) {
	          throw new Error("Public and/or system identifiers are required for an external entity");
	        }
	        if (value.pubID && !value.sysID) {
	          throw new Error("System identifier is required for a public external entity");
	        }
	        if (value.pubID != null) {
	          this.pubID = this.stringify.dtdPubID(value.pubID);
	        }
	        if (value.sysID != null) {
	          this.sysID = this.stringify.dtdSysID(value.sysID);
	        }
	        if (value.nData != null) {
	          this.nData = this.stringify.dtdNData(value.nData);
	        }
	        if (this.pe && this.nData) {
	          throw new Error("Notation declaration is not allowed in a parameter entity");
	        }
	      }
	    }

	    XMLDTDEntity.prototype.clone = function() {
	      return create(XMLDTDEntity.prototype, this);
	    };

	    XMLDTDEntity.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<!ENTITY';
	      if (this.pe) {
	        r += ' %';
	      }
	      r += ' ' + this.name;
	      if (this.value) {
	        r += ' "' + this.value + '"';
	      } else {
	        if (this.pubID && this.sysID) {
	          r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
	        } else if (this.sysID) {
	          r += ' SYSTEM "' + this.sysID + '"';
	        }
	        if (this.nData) {
	          r += ' NDATA ' + this.nData;
	        }
	      }
	      r += '>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLDTDEntity;

	  })();

	}).call(this);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLDTDElement, create, isArray;

	  create = __webpack_require__(25);

	  isArray = __webpack_require__(35);

	  module.exports = XMLDTDElement = (function() {
	    function XMLDTDElement(parent, name, value) {
	      this.stringify = parent.stringify;
	      if (name == null) {
	        throw new Error("Missing DTD element name");
	      }
	      if (!value) {
	        value = '(#PCDATA)';
	      }
	      if (isArray(value)) {
	        value = '(' + value.join(',') + ')';
	      }
	      this.name = this.stringify.eleName(name);
	      this.value = this.stringify.dtdElementValue(value);
	    }

	    XMLDTDElement.prototype.clone = function() {
	      return create(XMLDTDElement.prototype, this);
	    };

	    XMLDTDElement.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<!ELEMENT ' + this.name + ' ' + this.value + '>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLDTDElement;

	  })();

	}).call(this);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLDTDNotation, create;

	  create = __webpack_require__(25);

	  module.exports = XMLDTDNotation = (function() {
	    function XMLDTDNotation(parent, name, value) {
	      this.stringify = parent.stringify;
	      if (name == null) {
	        throw new Error("Missing notation name");
	      }
	      if (!value.pubID && !value.sysID) {
	        throw new Error("Public or system identifiers are required for an external entity");
	      }
	      this.name = this.stringify.eleName(name);
	      if (value.pubID != null) {
	        this.pubID = this.stringify.dtdPubID(value.pubID);
	      }
	      if (value.sysID != null) {
	        this.sysID = this.stringify.dtdSysID(value.sysID);
	      }
	    }

	    XMLDTDNotation.prototype.clone = function() {
	      return create(XMLDTDNotation.prototype, this);
	    };

	    XMLDTDNotation.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<!NOTATION ' + this.name;
	      if (this.pubID && this.sysID) {
	        r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
	      } else if (this.pubID) {
	        r += ' PUBLIC "' + this.pubID + '"';
	      } else if (this.sysID) {
	        r += ' SYSTEM "' + this.sysID + '"';
	      }
	      r += '>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLDTDNotation;

	  })();

	}).call(this);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLProcessingInstruction, create;

	  create = __webpack_require__(25);

	  module.exports = XMLProcessingInstruction = (function() {
	    function XMLProcessingInstruction(parent, target, value) {
	      this.stringify = parent.stringify;
	      if (target == null) {
	        throw new Error("Missing instruction target");
	      }
	      this.target = this.stringify.insTarget(target);
	      if (value) {
	        this.value = this.stringify.insValue(value);
	      }
	    }

	    XMLProcessingInstruction.prototype.clone = function() {
	      return create(XMLProcessingInstruction.prototype, this);
	    };

	    XMLProcessingInstruction.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += '<?';
	      r += this.target;
	      if (this.value) {
	        r += ' ' + this.value;
	      }
	      r += '?>';
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLProcessingInstruction;

	  })();

	}).call(this);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLRaw, XMLText, isArray, isEmpty, isFunction, isObject,
	    __hasProp = {}.hasOwnProperty;

	  isObject = __webpack_require__(26);

	  isArray = __webpack_require__(35);

	  isFunction = __webpack_require__(36);

	  isEmpty = __webpack_require__(53);

	  XMLElement = null;

	  XMLCData = null;

	  XMLComment = null;

	  XMLDeclaration = null;

	  XMLDocType = null;

	  XMLRaw = null;

	  XMLText = null;

	  module.exports = XMLNode = (function() {
	    function XMLNode(parent) {
	      this.parent = parent;
	      this.options = this.parent.options;
	      this.stringify = this.parent.stringify;
	      if (XMLElement === null) {
	        XMLElement = __webpack_require__(22);
	        XMLCData = __webpack_require__(27);
	        XMLComment = __webpack_require__(28);
	        XMLDeclaration = __webpack_require__(20);
	        XMLDocType = __webpack_require__(21);
	        XMLRaw = __webpack_require__(54);
	        XMLText = __webpack_require__(55);
	      }
	    }

	    XMLNode.prototype.clone = function() {
	      throw new Error("Cannot clone generic XMLNode");
	    };

	    XMLNode.prototype.element = function(name, attributes, text) {
	      var item, key, lastChild, val, _i, _len, _ref;
	      lastChild = null;
	      if (attributes == null) {
	        attributes = {};
	      }
	      attributes = attributes.valueOf();
	      if (!isObject(attributes)) {
	        _ref = [attributes, text], text = _ref[0], attributes = _ref[1];
	      }
	      if (name != null) {
	        name = name.valueOf();
	      }
	      if (isArray(name)) {
	        for (_i = 0, _len = name.length; _i < _len; _i++) {
	          item = name[_i];
	          lastChild = this.element(item);
	        }
	      } else if (isFunction(name)) {
	        lastChild = this.element(name.apply());
	      } else if (isObject(name)) {
	        for (key in name) {
	          if (!__hasProp.call(name, key)) continue;
	          val = name[key];
	          if (isFunction(val)) {
	            val = val.apply();
	          }
	          if ((isObject(val)) && (isEmpty(val))) {
	            val = null;
	          }
	          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
	            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
	          } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && key.indexOf(this.stringify.convertPIKey) === 0) {
	            lastChild = this.instruction(key.substr(this.stringify.convertPIKey.length), val);
	          } else if (isObject(val)) {
	            if (!this.options.ignoreDecorators && this.stringify.convertListKey && key.indexOf(this.stringify.convertListKey) === 0 && isArray(val)) {
	              lastChild = this.element(val);
	            } else {
	              lastChild = this.element(key);
	              lastChild.element(val);
	            }
	          } else {
	            lastChild = this.element(key, val);
	          }
	        }
	      } else {
	        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
	          lastChild = this.text(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
	          lastChild = this.cdata(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
	          lastChild = this.comment(text);
	        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
	          lastChild = this.raw(text);
	        } else {
	          lastChild = this.node(name, attributes, text);
	        }
	      }
	      if (lastChild == null) {
	        throw new Error("Could not create any elements with: " + name);
	      }
	      return lastChild;
	    };

	    XMLNode.prototype.insertBefore = function(name, attributes, text) {
	      var child, i, removed;
	      if (this.isRoot) {
	        throw new Error("Cannot insert elements at root level");
	      }
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i);
	      child = this.parent.element(name, attributes, text);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return child;
	    };

	    XMLNode.prototype.insertAfter = function(name, attributes, text) {
	      var child, i, removed;
	      if (this.isRoot) {
	        throw new Error("Cannot insert elements at root level");
	      }
	      i = this.parent.children.indexOf(this);
	      removed = this.parent.children.splice(i + 1);
	      child = this.parent.element(name, attributes, text);
	      Array.prototype.push.apply(this.parent.children, removed);
	      return child;
	    };

	    XMLNode.prototype.remove = function() {
	      var i, _ref;
	      if (this.isRoot) {
	        throw new Error("Cannot remove the root element");
	      }
	      i = this.parent.children.indexOf(this);
	      [].splice.apply(this.parent.children, [i, i - i + 1].concat(_ref = [])), _ref;
	      return this.parent;
	    };

	    XMLNode.prototype.node = function(name, attributes, text) {
	      var child, _ref;
	      if (name != null) {
	        name = name.valueOf();
	      }
	      if (attributes == null) {
	        attributes = {};
	      }
	      attributes = attributes.valueOf();
	      if (!isObject(attributes)) {
	        _ref = [attributes, text], text = _ref[0], attributes = _ref[1];
	      }
	      child = new XMLElement(this, name, attributes);
	      if (text != null) {
	        child.text(text);
	      }
	      this.children.push(child);
	      return child;
	    };

	    XMLNode.prototype.text = function(value) {
	      var child;
	      child = new XMLText(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.cdata = function(value) {
	      var child;
	      child = new XMLCData(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.comment = function(value) {
	      var child;
	      child = new XMLComment(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.raw = function(value) {
	      var child;
	      child = new XMLRaw(this, value);
	      this.children.push(child);
	      return this;
	    };

	    XMLNode.prototype.declaration = function(version, encoding, standalone) {
	      var doc, xmldec;
	      doc = this.document();
	      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
	      doc.xmldec = xmldec;
	      return doc.root();
	    };

	    XMLNode.prototype.doctype = function(pubID, sysID) {
	      var doc, doctype;
	      doc = this.document();
	      doctype = new XMLDocType(doc, pubID, sysID);
	      doc.doctype = doctype;
	      return doctype;
	    };

	    XMLNode.prototype.up = function() {
	      if (this.isRoot) {
	        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
	      }
	      return this.parent;
	    };

	    XMLNode.prototype.root = function() {
	      var child;
	      if (this.isRoot) {
	        return this;
	      }
	      child = this.parent;
	      while (!child.isRoot) {
	        child = child.parent;
	      }
	      return child;
	    };

	    XMLNode.prototype.document = function() {
	      return this.root().documentObject;
	    };

	    XMLNode.prototype.end = function(options) {
	      return this.document().toString(options);
	    };

	    XMLNode.prototype.prev = function() {
	      var i;
	      if (this.isRoot) {
	        throw new Error("Root node has no siblings");
	      }
	      i = this.parent.children.indexOf(this);
	      if (i < 1) {
	        throw new Error("Already at the first node");
	      }
	      return this.parent.children[i - 1];
	    };

	    XMLNode.prototype.next = function() {
	      var i;
	      if (this.isRoot) {
	        throw new Error("Root node has no siblings");
	      }
	      i = this.parent.children.indexOf(this);
	      if (i === -1 || i === this.parent.children.length - 1) {
	        throw new Error("Already at the last node");
	      }
	      return this.parent.children[i + 1];
	    };

	    XMLNode.prototype.importXMLBuilder = function(xmlbuilder) {
	      var clonedRoot;
	      clonedRoot = xmlbuilder.root().clone();
	      clonedRoot.parent = this;
	      clonedRoot.isRoot = false;
	      this.children.push(clonedRoot);
	      return this;
	    };

	    XMLNode.prototype.ele = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLNode.prototype.nod = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLNode.prototype.txt = function(value) {
	      return this.text(value);
	    };

	    XMLNode.prototype.dat = function(value) {
	      return this.cdata(value);
	    };

	    XMLNode.prototype.com = function(value) {
	      return this.comment(value);
	    };

	    XMLNode.prototype.doc = function() {
	      return this.document();
	    };

	    XMLNode.prototype.dec = function(version, encoding, standalone) {
	      return this.declaration(version, encoding, standalone);
	    };

	    XMLNode.prototype.dtd = function(pubID, sysID) {
	      return this.doctype(pubID, sysID);
	    };

	    XMLNode.prototype.e = function(name, attributes, text) {
	      return this.element(name, attributes, text);
	    };

	    XMLNode.prototype.n = function(name, attributes, text) {
	      return this.node(name, attributes, text);
	    };

	    XMLNode.prototype.t = function(value) {
	      return this.text(value);
	    };

	    XMLNode.prototype.d = function(value) {
	      return this.cdata(value);
	    };

	    XMLNode.prototype.c = function(value) {
	      return this.comment(value);
	    };

	    XMLNode.prototype.r = function(value) {
	      return this.raw(value);
	    };

	    XMLNode.prototype.u = function() {
	      return this.up();
	    };

	    return XMLNode;

	  })();

	}).call(this);


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(56),
	    isNative = __webpack_require__(57),
	    isObjectLike = __webpack_require__(58);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * (function() { return _.isArray(arguments); })();
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
	};

	module.exports = isArray;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isNative = __webpack_require__(57);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/** Native method references. */
	var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
	  return typeof value == 'function' || false;
	}
	// Fallback for environments that return incorrect `typeof` operator results.
	if (isFunction(/x/) || (Uint8Array && !isFunction(Uint8Array))) {
	  isFunction = function(value) {
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in older versions of Chrome and Safari which return 'function' for regexes
	    // and Safari 8 equivalents which return 'object' for typed array constructors.
	    return objToString.call(value) == funcTag;
	  };
	}

	module.exports = isFunction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(59),
	    baseCallback = __webpack_require__(60),
	    baseEvery = __webpack_require__(61),
	    isArray = __webpack_require__(35);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * The predicate is bound to `thisArg` and invoked with three arguments;
	 * (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created "_.property"
	 * style callback returns the property value of the given element.
	 *
	 * If an object is provided for `predicate` the created "_.matches" style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias all
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration. If a property name or object is provided it is used to
	 *  create a "_.property" or "_.matches" style callback respectively.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes']);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 }
	 * ];
	 *
	 * // using the "_.property" callback shorthand
	 * _.every(users, 'age');
	 * // => true
	 *
	 * // using the "_.matches" callback shorthand
	 * _.every(users, { 'age': 36 });
	 * // => false
	 */
	function every(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = every;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLAttribute, create;

	  create = __webpack_require__(25);

	  module.exports = XMLAttribute = (function() {
	    function XMLAttribute(parent, name, value) {
	      this.stringify = parent.stringify;
	      if (name == null) {
	        throw new Error("Missing attribute name of element " + parent.name);
	      }
	      if (value == null) {
	        throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
	      }
	      this.name = this.stringify.attName(name);
	      this.value = this.stringify.attValue(value);
	    }

	    XMLAttribute.prototype.clone = function() {
	      return create(XMLAttribute.prototype, this);
	    };

	    XMLAttribute.prototype.toString = function(options, level) {
	      return ' ' + this.name + '="' + this.value + '"';
	    };

	    return XMLAttribute;

	  })();

	}).call(this);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(62);
	exports.Stream = __webpack_require__(15);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(63);
	exports.Duplex = __webpack_require__(64);
	exports.Transform = __webpack_require__(65);
	exports.PassThrough = __webpack_require__(66);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(63)


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(64)


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65)


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(66)


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS)
				return 62 // '+'
			if (code === SLASH)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies the properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Array} props The property names to copy.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, object, props) {
	  if (!props) {
	    props = object;
	    object = {};
	  }
	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(56),
	    isNative = __webpack_require__(57),
	    isObject = __webpack_require__(26),
	    shimKeys = __webpack_require__(68);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  if (object) {
	    var Ctor = object.constructor,
	        length = object.length;
	  }
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	     (typeof object != 'function' && (length && isLength(length)))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(69);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (typeof thisArg == 'undefined') {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isIndex = __webpack_require__(70),
	    isLength = __webpack_require__(56),
	    isObject = __webpack_require__(26);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number') {
	    var length = object.length,
	        prereq = isLength(length) && isIndex(index, length);
	  } else {
	    prereq = type == 'string' && index in value;
	  }
	  return prereq && object[index] === value;
	}

	module.exports = isIterateeCall;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(26);

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function Object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      Object.prototype = prototype;
	      var result = new Object;
	      Object.prototype = null;
	    }
	    return result || global.Object();
	  };
	}());

	module.exports = baseCreate;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(71),
	    isArray = __webpack_require__(35),
	    isFunction = __webpack_require__(36),
	    isLength = __webpack_require__(56),
	    isObjectLike = __webpack_require__(58),
	    isString = __webpack_require__(72),
	    keys = __webpack_require__(49);

	/**
	 * Checks if a value is empty. A value is considered empty unless it is an
	 * `arguments` object, array, string, or jQuery-like collection with a length
	 * greater than `0` or an object with own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {Array|Object|string} value The value to inspect.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  var length = value.length;
	  if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
	      (isObjectLike(value) && isFunction(value.splice)))) {
	    return !length;
	  }
	  return !keys(value).length;
	}

	module.exports = isEmpty;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLNode, XMLRaw, create,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  create = __webpack_require__(25);

	  XMLNode = __webpack_require__(34);

	  module.exports = XMLRaw = (function(_super) {
	    __extends(XMLRaw, _super);

	    function XMLRaw(parent, text) {
	      XMLRaw.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing raw text");
	      }
	      this.value = this.stringify.raw(text);
	    }

	    XMLRaw.prototype.clone = function() {
	      return create(XMLRaw.prototype, this);
	    };

	    XMLRaw.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += this.value;
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLRaw;

	  })(XMLNode);

	}).call(this);


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.6.3
	(function() {
	  var XMLNode, XMLText, create,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	  create = __webpack_require__(25);

	  XMLNode = __webpack_require__(34);

	  module.exports = XMLText = (function(_super) {
	    __extends(XMLText, _super);

	    function XMLText(parent, text) {
	      this.parent = parent;
	      XMLText.__super__.constructor.call(this, parent);
	      if (text == null) {
	        throw new Error("Missing element text");
	      }
	      this.value = this.stringify.eleText(text);
	    }

	    XMLText.prototype.clone = function() {
	      return create(XMLText.prototype, this);
	    };

	    XMLText.prototype.toString = function(options, level) {
	      var indent, newline, offset, pretty, r, space, _ref, _ref1, _ref2;
	      pretty = (options != null ? options.pretty : void 0) || false;
	      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
	      offset = (_ref1 = options != null ? options.offset : void 0) != null ? _ref1 : 0;
	      newline = (_ref2 = options != null ? options.newline : void 0) != null ? _ref2 : '\n';
	      level || (level = 0);
	      space = new Array(level + offset + 1).join(indent);
	      r = '';
	      if (pretty) {
	        r += space;
	      }
	      r += this.value;
	      if (pretty) {
	        r += newline;
	      }
	      return r;
	    };

	    return XMLText;

	  })(XMLNode);

	}).call(this);


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Used as the maximum length of an array-like value.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	 * for more details.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var escapeRegExp = __webpack_require__(73),
	    isObjectLike = __webpack_require__(58);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reNative = RegExp('^' +
	  escapeRegExp(objToString)
	  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reNative.test(fnToString.call(value));
	  }
	  return (isObjectLike(value) && reHostCtor.test(value)) || false;
	}

	module.exports = isNative;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return (value && typeof value == 'object') || false;
	}

	module.exports = isObjectLike;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.every` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(74),
	    baseProperty = __webpack_require__(75),
	    bindCallback = __webpack_require__(50),
	    identity = __webpack_require__(69),
	    isBindable = __webpack_require__(76);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return (typeof thisArg != 'undefined' && isBindable(func))
	      ? bindCallback(func, thisArg, argCount)
	      : func;
	  }
	  if (func == null) {
	    return identity;
	  }
	  // Handle "_.property" and "_.matches" style callback shorthands.
	  return type == 'object'
	    ? baseMatches(func, !argCount)
	    : baseProperty(func + '');
	}

	module.exports = baseCallback;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(77);

	/**
	 * The base implementation of `_.every` without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}

	module.exports = baseEvery;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(78);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(17).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(8).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(15);

	/*<replacement>*/
	var util = __webpack_require__(82);
	util.inherits = __webpack_require__(81);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(67);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(64);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(16).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(64);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(16).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(17).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(82);
	util.inherits = __webpack_require__(81);
	/*</replacement>*/

	var Stream = __webpack_require__(15);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(64);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(64);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(82);
	util.inherits = __webpack_require__(81);
	/*</replacement>*/

	var Readable = __webpack_require__(62);
	var Writable = __webpack_require__(63);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(64);

	/*<replacement>*/
	var util = __webpack_require__(82);
	util.inherits = __webpack_require__(81);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(65);

	/*<replacement>*/
	var util = __webpack_require__(82);
	util.inherits = __webpack_require__(81);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(71),
	    isArray = __webpack_require__(35),
	    isIndex = __webpack_require__(70),
	    isLength = __webpack_require__(56),
	    keysIn = __webpack_require__(79),
	    support = __webpack_require__(80);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = length && isLength(length) &&
	    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Used as the maximum length of an array-like value.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	 * for more details.
	 */
	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = +value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(56),
	    isObjectLike = __webpack_require__(58);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * (function() { return _.isArguments(arguments); })();
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  var length = isObjectLike(value) ? value.length : undefined;
	  return (isLength(length) && objToString.call(value) == argsTag) || false;
	}

	module.exports = isArguments;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(58);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
	}

	module.exports = isString;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(83);

	/**
	 * Used to match `RegExp` special characters.
	 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	 * for more details.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);

	/**
	 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https://lodash\.com/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return (string && reHasRegExpChars.test(string))
	    ? string.replace(reRegExpChars, '\\$&')
	    : string;
	}

	module.exports = escapeRegExp;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(84),
	    baseIsMatch = __webpack_require__(85),
	    isStrictComparable = __webpack_require__(86),
	    keys = __webpack_require__(49);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.matches` which supports specifying whether
	 * `source` should be cloned.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @param {boolean} [isCloned] Specify cloning the source object.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source, isCloned) {
	  var props = keys(source),
	      length = props.length;

	  if (length == 1) {
	    var key = props[0],
	        value = source[key];

	    if (isStrictComparable(value)) {
	      return function(object) {
	        return object != null && value === object[key] && hasOwnProperty.call(object, key);
	      };
	    }
	  }
	  if (isCloned) {
	    source = baseClone(source, true);
	  }
	  var values = Array(length),
	      strictCompareFlags = Array(length);

	  while (length--) {
	    value = source[props[length]];
	    values[length] = value;
	    strictCompareFlags[length] = isStrictComparable(value);
	  }
	  return function(object) {
	    return baseIsMatch(object, props, values, strictCompareFlags);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.property` which does not coerce `key` to a string.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(87),
	    isNative = __webpack_require__(57),
	    support = __webpack_require__(80);

	/** Used to detect named functions. */
	var reFuncName = /^\s*function[ \n\r\t]+\w/;

	/** Used to detect functions containing a `this` reference. */
	var reThis = /\bthis\b/;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/**
	 * Checks if `func` is eligible for `this` binding.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
	 */
	function isBindable(func) {
	  var result = !(support.funcNames ? func.name : support.funcDecomp);

	  if (!result) {
	    var source = fnToString.call(func);
	    if (!support.funcNames) {
	      result = !reFuncName.test(source);
	    }
	    if (!result) {
	      // Check if `func` references the `this` keyword and store the result.
	      result = reThis.test(source) || isNative(func);
	      baseSetData(func, result);
	    }
	  }
	  return result;
	}

	module.exports = isBindable;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(88),
	    isLength = __webpack_require__(56),
	    toObject = __webpack_require__(89);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	function baseEach(collection, iteratee) {
	  var length = collection ? collection.length : 0;
	  if (!isLength(length)) {
	    return baseForOwn(collection, iteratee);
	  }
	  var index = -1,
	      iterable = toObject(collection);

	  while (++index < length) {
	    if (iteratee(iterable[index], index, iterable) === false) {
	      break;
	    }
	  }
	  return collection;
	}

	module.exports = baseEach;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(71),
	    isArray = __webpack_require__(35),
	    isIndex = __webpack_require__(70),
	    isLength = __webpack_require__(56),
	    isObject = __webpack_require__(26),
	    support = __webpack_require__(80);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype == object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isNative = __webpack_require__(57);

	/** Used to detect functions containing a `this` reference. */
	var reThis = /\bthis\b/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to detect DOM support. */
	var document = (document = global.window) && document.document;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * An object environment feature flags.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	(function(x) {

	  /**
	   * Detect if functions can be decompiled by `Function#toString`
	   * (all but Firefox OS certified apps, older Opera mobile browsers, and
	   * the PlayStation 3; forced `false` for Windows 8 apps).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

	  /**
	   * Detect if `Function#name` is supported (all but IE).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.funcNames = typeof Function.name == 'string';

	  /**
	   * Detect if the DOM is supported.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.dom = document.createDocumentFragment().nodeType === 11;
	  } catch(e) {
	    support.dom = false;
	  }

	  /**
	   * Detect if `arguments` object indexes are non-enumerable.
	   *
	   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	   * checks for indexes that exceed their function's formal parameters with
	   * associated values of `0`.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	  } catch(e) {
	    support.nonEnumArgs = true;
	  }
	}(0, 0));

	module.exports = support;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17).Buffer))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(90),
	    arrayEach = __webpack_require__(91),
	    baseCopy = __webpack_require__(48),
	    baseForOwn = __webpack_require__(88),
	    initCloneArray = __webpack_require__(92),
	    initCloneByTag = __webpack_require__(93),
	    initCloneObject = __webpack_require__(94),
	    isArray = __webpack_require__(35),
	    isObject = __webpack_require__(26),
	    keys = __webpack_require__(49);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[stringTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[mapTag] = cloneableTags[setTag] =
	cloneableTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (typeof result != 'undefined') {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;

	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseCopy(value, result, keys(value));
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(95);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Object} source The object to inspect.
	 * @param {Array} props The source property names to match.
	 * @param {Array} values The source values to match.
	 * @param {Array} strictCompareFlags Strict comparison flags for source values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
	  var length = props.length;
	  if (object == null) {
	    return !length;
	  }
	  var index = -1,
	      noCustomizer = !customizer;

	  while (++index < length) {
	    if ((noCustomizer && strictCompareFlags[index])
	          ? values[index] !== object[props[index]]
	          : !hasOwnProperty.call(object, props[index])
	        ) {
	      return false;
	    }
	  }
	  index = -1;
	  while (++index < length) {
	    var key = props[index];
	    if (noCustomizer && strictCompareFlags[index]) {
	      var result = hasOwnProperty.call(object, key);
	    } else {
	      var objValue = object[key],
	          srcValue = values[index];

	      result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (typeof result == 'undefined') {
	        result = baseIsEqual(srcValue, objValue, customizer, true);
	      }
	    }
	    if (!result) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
	}

	module.exports = isStrictComparable;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(69),
	    metaMap = __webpack_require__(96);

	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};

	module.exports = baseSetData;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(97),
	    keys = __webpack_require__(49);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26);

	/**
	 * Converts `value` to an object if it is not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(98);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}

	module.exports = initCloneByTag;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor;
	}

	module.exports = initCloneObject;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(99);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
	  // Exit early for identical values.
	  if (value === other) {
	    // Treat `+0` vs. `-0` as not equal.
	    return value !== 0 || (1 / value == 1 / other);
	  }
	  var valType = typeof value,
	      othType = typeof other;

	  // Exit early for unlike primitive values.
	  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
	      value == null || other == null) {
	    // Return `false` unless both values are `NaN`.
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isNative = __webpack_require__(57);

	/** Native method references. */
	var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;

	module.exports = metaMap;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(89);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iterator functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	function baseFor(object, iteratee, keysFunc) {
	  var index = -1,
	      iterable = toObject(object),
	      props = keysFunc(object),
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    if (iteratee(iterable[key], key, iterable) === false) {
	      break;
	    }
	  }
	  return object;
	}

	module.exports = baseFor;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var constant = __webpack_require__(100),
	    isNative = __webpack_require__(57);

	/** Native method references. */
	var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
	    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
	    floor = Math.floor,
	    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

	/** Used to clone array buffers. */
	var Float64Array = (function() {
	  // Safari 5 errors when using an array buffer to initialize a typed array
	  // where the array buffer's `byteLength` is not a multiple of the typed
	  // array's `BYTES_PER_ELEMENT`.
	  try {
	    var func = isNative(func = global.Float64Array) && func,
	        result = new func(new ArrayBuffer(10), 0, 1) && func;
	  } catch(e) {}
	  return result;
	}());

	/** Used as the size, in bytes, of each `Float64Array` element. */
	var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  return bufferSlice.call(buffer, 0);
	}
	if (!bufferSlice) {
	  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
	  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
	    var byteLength = buffer.byteLength,
	        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
	        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
	        result = new ArrayBuffer(byteLength);

	    if (floatLength) {
	      var view = new Float64Array(result, 0, floatLength);
	      view.set(new Float64Array(buffer, 0, floatLength));
	    }
	    if (byteLength != offset) {
	      view = new Uint8Array(result, offset);
	      view.set(new Uint8Array(buffer, offset));
	    }
	    return result;
	  };
	}

	module.exports = bufferClone;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(101),
	    equalByTag = __webpack_require__(102),
	    equalObjects = __webpack_require__(103),
	    isArray = __webpack_require__(35),
	    isTypedArray = __webpack_require__(104);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	  if (valWrapped || othWrapped) {
	    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length,
	      result = true;

	  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
	    return false;
	  }
	  // Deep compare the contents, ignoring non-numeric properties.
	  while (result && ++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    result = undefined;
	    if (customizer) {
	      result = isWhere
	        ? customizer(othValue, arrValue, index)
	        : customizer(arrValue, othValue, index);
	    }
	    if (typeof result == 'undefined') {
	      // Recursively compare arrays (susceptible to call stack limits).
	      if (isWhere) {
	        var othIndex = othLength;
	        while (othIndex--) {
	          othValue = other[othIndex];
	          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
	          if (result) {
	            break;
	          }
	        }
	      } else {
	        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
	      }
	    }
	  }
	  return !!result;
	}

	module.exports = equalArrays;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} value The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        // But, treat `-0` vs. `+0` as not equal.
	        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(49);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isWhere] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isWhere) {
	    return false;
	  }
	  var hasCtor,
	      index = -1;

	  while (++index < objLength) {
	    var key = objProps[index],
	        result = hasOwnProperty.call(other, key);

	    if (result) {
	      var objValue = object[key],
	          othValue = other[key];

	      result = undefined;
	      if (customizer) {
	        result = isWhere
	          ? customizer(othValue, objValue, key)
	          : customizer(objValue, othValue, key);
	      }
	      if (typeof result == 'undefined') {
	        // Recursively compare objects (susceptible to call stack limits).
	        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
	      }
	    }
	    if (!result) {
	      return false;
	    }
	    hasCtor || (hasCtor = key == 'constructor');
	  }
	  if (!hasCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(56),
	    isObjectLike = __webpack_require__(58);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the `toStringTag` of values.
	 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * for more details.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
	}

	module.exports = isTypedArray;


/***/ }
/******/ ])