'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _eth = require('./utils/eth');

var _detherUser = require('./detherUser');

var _detherUser2 = _interopRequireDefault(_detherUser);

var _contracts = require('./utils/contracts');

var _contracts2 = _interopRequireDefault(_contracts);

var _providers = require('./utils/providers');

var _providers2 = _interopRequireDefault(_providers);

var _formatters = require('./utils/formatters');

var _formatters2 = _interopRequireDefault(_formatters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DetherJS = function () {
  /**
   * Creates an instance of DetherUser
   * You may not instanciate from here, prefer from DetherJS.getUser method
   *
   * @param {object}    providerData
   * @param {String}    providerData.network      Name of network ('homestead',
   *                                              'ropsten', 'rinkeby', 'kovan')
   * @param {?String}   providerData.rpcURL       JSON RPC provider URL
   * @param {?String}   providerData.infuraKey    INFURA API Key
   * @param {?String}   providerData.etherscanKey Etherscan API Key
   */
  function DetherJS(providerData) {
    _classCallCheck(this, DetherJS);

    /** @ignore */
    this.provider = _providers2.default.getProvider(providerData);
    /** @ignore */
    this.contractInstance = _contracts2.default.getDetherContract(this.provider);
    /** @ignore */
    this.storageInstance = _contracts2.default.getDetherStorageContract(this.provider);

    if (!this.contractInstance || !this.storageInstance) throw new Error('Unable to load contracts');
  }

  /**
   * Get instance of DetherUser linked to this Dether instance
   * @param  {object}  encryptedWallet Encrypted user wallet
   * @return {Object} DetherUser
   */


  _createClass(DetherJS, [{
    key: 'getUser',
    value: function getUser(encryptedWallet) {
      return new _detherUser2.default({
        encryptedWallet: encryptedWallet,
        dether: this
      });
    }

    /**
     * get teller by address
     * @param  {string}  address ethereum address
     * @return {Promise<Object>} teller
     */

  }, {
    key: 'getTeller',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
        var _ref2, _ref3, rawTellerPos, rawTellerProfile;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all([this.contractInstance.getTellerPos(address), this.contractInstance.getTellerProfile(address)]);

              case 2:
                _ref2 = _context.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                rawTellerPos = _ref3[0];
                rawTellerProfile = _ref3[1];

                if (!(_ethers2.default.utils.formatEther(rawTellerPos[3]) === '0.0')) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', null);

              case 8:
                return _context.abrupt('return', Object.assign({}, _formatters2.default.tellerPosFromContract(rawTellerPos), _formatters2.default.tellerProfileFromContract(rawTellerProfile), {
                  id: address,
                  ethAddress: address
                }));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTeller(_x) {
        return _ref.apply(this, arguments);
      }

      return getTeller;
    }()

    /**
     * @ignore
     * Filter null and removes tellers with same address
     * @param {Array} list tellers
     * @return {Array} filtered tellers
     */

  }, {
    key: 'getAllTellers',


    /**
     * Get All tellers on the map
     * @param  {array}   addr ethereum addresses
     * @return {Promise<Array>} array of tellers
     */
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(addrs) {
        var result, tellerAddrList, tellers;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(addrs && !Array.isArray(addrs))) {
                  _context2.next = 2;
                  break;
                }

                throw new TypeError('Need array of addresses as parameter');

              case 2:
                if (!addrs) {
                  _context2.next = 6;
                  break;
                }

                _context2.t0 = [addrs];
                _context2.next = 9;
                break;

              case 6:
                _context2.next = 8;
                return this.storageInstance.getAllTellers();

              case 8:
                _context2.t0 = _context2.sent;

              case 9:
                result = _context2.t0;

                if (!(!result || !result.length || !Array.isArray(result[0]))) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', []);

              case 12:
                tellerAddrList = result[0];
                _context2.next = 15;
                return Promise.all(tellerAddrList.map(this.getTeller.bind(this)));

              case 15:
                tellers = _context2.sent;
                return _context2.abrupt('return', DetherJS._filterTellerList(tellers));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAllTellers(_x2) {
        return _ref4.apply(this, arguments);
      }

      return getAllTellers;
    }()

    /**
     * Get All tellers per zone
     * @param  {Integer}  zone
     * @param  {array}    zone ethereum addresses
     * @return {Promise<Array>} array of tellers in zone
     */

  }, {
    key: 'getTellersInZone',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(zone) {
        var _this = this;

        var zones, result, tellers;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!Number.isInteger(zone) && !Array.isArray(zone))) {
                  _context4.next = 2;
                  break;
                }

                throw new TypeError('Invalid zone');

              case 2:
                zones = !Array.isArray(zone) ? [zone] : zone;
                result = [];
                _context4.next = 6;
                return Promise.all(zones.map(function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
                    var tellersInZone;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this.storageInstance.getZone(data);

                          case 2:
                            tellersInZone = _context3.sent;

                            result.push.apply(result, _toConsumableArray(tellersInZone[0]));

                          case 4:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this);
                  }));

                  return function (_x4) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 6:
                if (!(!result || !result.length)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', []);

              case 8:
                _context4.next = 10;
                return Promise.all(result.map(this.getTeller.bind(this)));

              case 10:
                tellers = _context4.sent;
                return _context4.abrupt('return', DetherJS._filterTellerList(tellers).filter(function (t) {
                  return zones.indexOf(t.zoneId) >= 0;
                }));

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getTellersInZone(_x3) {
        return _ref5.apply(this, arguments);
      }

      return getTellersInZone;
    }()

    /**
     * Get teller balance in escrow
     * @param  {string} address  Teller ethereum address
     * @return {Promise<Number>} Escrow balance of teller at address
     */

  }, {
    key: 'getTellerBalance',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(address) {
        var fullAddress, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if ((0, _eth.isAddr)(address)) {
                  _context5.next = 2;
                  break;
                }

                throw new TypeError('Invalid ETH address');

              case 2:
                fullAddress = (0, _eth.add0x)(address);
                _context5.next = 5;
                return this.contractInstance.getTellerBalances(fullAddress);

              case 5:
                result = _context5.sent;
                return _context5.abrupt('return', Number(_ethers2.default.utils.formatEther(result[0])));

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getTellerBalance(_x5) {
        return _ref7.apply(this, arguments);
      }

      return getTellerBalance;
    }()
  }], [{
    key: '_filterTellerList',
    value: function _filterTellerList(list) {
      return list.filter(function (teller) {
        return !!teller;
      }).reduce(function (acc, teller) {
        return !acc.some(function (t) {
          return t.ethAddress === teller.ethAddress;
        }) ? [].concat(_toConsumableArray(acc), [teller]) : acc;
      }, []);
    }
  }]);

  return DetherJS;
}();

DetherJS.Ethers = _ethers2.default;

exports.default = DetherJS;