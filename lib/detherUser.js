'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _eth = require('./utils/eth');

var _validation = require('./utils/validation');

var _contracts = require('./utils/contracts');

var _contracts2 = _interopRequireDefault(_contracts);

var _formatters = require('./utils/formatters');

var _formatters2 = _interopRequireDefault(_formatters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DetherUser = function () {
  /**
   * Creates an instance of DetherUser.
   *
   * You may not instanciate from here, prefer from DetherJS.getUser method
   *
   * @param {object} opts
   * @param {DetherJS} opts.dether dether instance
   * @param {string} opts.encryptedWallet user wallet
   */
  function DetherUser(opts) {
    _classCallCheck(this, DetherUser);

    if (!opts.dether || !opts.encryptedWallet) {
      throw new Error('Need dether instance and wallet');
    }
    /** @ignore */
    this.dether = opts.dether;
    /** @ignore */
    this.encryptedWallet = opts.encryptedWallet;
    var parsedWallet = JSON.parse(opts.encryptedWallet);
    this.address = (0, _eth.add0x)(parsedWallet.address);
  }

  /**
   * Returns decrypted wallet
   *
   * @param {string} password             user password
   * @return {Wallet}     User wallet
   * @private
   * @ignore
   */


  _createClass(DetherUser, [{
    key: '_getWallet',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
        var wallet;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (password) {
                  _context.next = 2;
                  break;
                }

                throw new TypeError('Need password to decrypt wallet');

              case 2:
                _context.next = 4;
                return _ethers2.default.Wallet.fromEncryptedWallet(this.encryptedWallet, password);

              case 4:
                wallet = _context.sent;

                wallet.provider = this.dether.provider;
                return _context.abrupt('return', wallet);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _getWallet(_x) {
        return _ref.apply(this, arguments);
      }

      return _getWallet;
    }()

    /**
     * Get user ethereum address
     * @return {Promise<string>} user ethereum address
     */

  }, {
    key: 'getAddress',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this.address);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAddress() {
        return _ref2.apply(this, arguments);
      }

      return getAddress;
    }()

    /**
     * Get user teller info
     * @return {Promise<object>}
     */

  }, {
    key: 'getInfo',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.dether.getTeller(this.address));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getInfo() {
        return _ref3.apply(this, arguments);
      }

      return getInfo;
    }()

    /**
     * Get user balance in escrow
     * @return {Promise<string>}
     */

  }, {
    key: 'getBalance',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', this.dether.getTellerBalance(this.address));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getBalance() {
        return _ref4.apply(this, arguments);
      }

      return getBalance;
    }()

    // gas used = 223319
    // gas price average (mainnet) = 25000000000 wei
    // 250000 * 25000000000 = 0.006250000000000000 ETH
    // need 0.006250000000000000 ETH to process this function
    /**
     * Register a sell point
     * @param {object} sellPoint
     * @param {number} sellPoint.lat        latitude min -90 max +90
     * @param {number} sellPoint.lng        longitude min -180 max +180
     * @param {number} sellPoint.zone       geographic zone
     * @param {number} sellPoint.rates      Margin (0-100)
     * @param {number} sellPoint.avatar     avatar id (1-9)
     * @param {number} sellPoint.currency   currency id (0-4)
     * @param {number} sellPoint.amount     Ether amount to put on escrow
     * @param {string} sellPoint.telegram   Telegram address
     * @param {string} sellPoint.username   username
     * @param {string} password             user password
     * @return {Promise<object>} Transaction
     */

  }, {
    key: 'addSellPoint',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(sellPoint, password) {
        var secu, secuPass, tsxAmount, formattedSellPoint, wallet, customContract, transaction, minedTsx;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                secu = (0, _validation.validateSellPoint)(sellPoint);

                if (!secu.error) {
                  _context5.next = 3;
                  break;
                }

                throw new TypeError(secu.msg);

              case 3:
                secuPass = (0, _validation.validatePassword)(password);

                if (!secuPass.error) {
                  _context5.next = 6;
                  break;
                }

                throw new TypeError(secuPass.msg);

              case 6:
                tsxAmount = _ethers2.default.utils.parseEther(sellPoint.amount.toString());
                formattedSellPoint = _formatters2.default.sellPointToContract(sellPoint);
                _context5.next = 10;
                return this._getWallet(password);

              case 10:
                wallet = _context5.sent;
                _context5.prev = 11;
                _context5.next = 14;
                return _contracts2.default.getCustomContract({
                  wallet: wallet,
                  value: tsxAmount,
                  password: password
                });

              case 14:
                customContract = _context5.sent;
                _context5.next = 17;
                return customContract.registerPoint(formattedSellPoint.lat, formattedSellPoint.lng, formattedSellPoint.zone, formattedSellPoint.rates, formattedSellPoint.avatar, formattedSellPoint.currency, formattedSellPoint.telegram, formattedSellPoint.username);

              case 17:
                transaction = _context5.sent;
                _context5.next = 20;
                return this.dether.provider.waitForTransaction(transaction.hash);

              case 20:
                minedTsx = _context5.sent;
                return _context5.abrupt('return', minedTsx);

              case 24:
                _context5.prev = 24;
                _context5.t0 = _context5['catch'](11);
                throw new TypeError(_context5.t0);

              case 27:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[11, 24]]);
      }));

      function addSellPoint(_x2, _x3) {
        return _ref5.apply(this, arguments);
      }

      return addSellPoint;
    }()

    // gas used = 95481
    // gas price average (mainnet) = 25000000000 wei
    // 115000 * 25000000000 = 0.002875000000000000 ETH
    // need 0.006250000000000000 ETH to process this function
    /**
     * Send eth from escrow
     * @param  {object}  opts
     * @param  {string}  opts.receiver Receiver ethereum address
     * @param  {number}  opts.amount   Amount to send
     * @param  {string}  password      Wallet password
     * @return {Promise<object>} Transaction
     */

  }, {
    key: 'sendToBuyer',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(opts, password) {
        var secu, secuPass, amount, receiver, wallet, customContract, transaction, minedTsx;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                secu = (0, _validation.validateSendCoin)(opts);

                if (!secu.error) {
                  _context6.next = 3;
                  break;
                }

                throw new TypeError(secu.msg);

              case 3:
                secuPass = (0, _validation.validatePassword)(password);

                if (!secuPass.error) {
                  _context6.next = 6;
                  break;
                }

                throw new TypeError(secuPass.msg);

              case 6:
                amount = opts.amount, receiver = opts.receiver;
                _context6.next = 9;
                return this._getWallet(password);

              case 9:
                wallet = _context6.sent;
                _context6.next = 12;
                return _contracts2.default.getCustomContract({
                  wallet: wallet,
                  password: password
                });

              case 12:
                customContract = _context6.sent;
                _context6.next = 15;
                return customContract.sendCoin((0, _eth.add0x)(receiver), _ethers2.default.utils.parseEther(amount.toString()));

              case 15:
                transaction = _context6.sent;
                _context6.next = 18;
                return this.dether.provider.waitForTransaction(transaction.hash);

              case 18:
                minedTsx = _context6.sent;
                return _context6.abrupt('return', minedTsx);

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function sendToBuyer(_x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return sendToBuyer;
    }()

    // gas used = 26497
    // gas price average (mainnet) = 25000000000 wei
    // 50000 * 25000000000 = 0.001250000000000000 ETH
    // need 0.001250000000000000 ETH to process this function
    /**
     * Delete sell point, this function withdraw automatically balance escrow to owner
     * @param  {string} password  Wallet password
     * @return {Promise<object>}  Transaction
     */

  }, {
    key: 'deleteSellPoint',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(password) {
        var secuPass, wallet, customContract, transaction, minedTsx;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                secuPass = (0, _validation.validatePassword)(password);

                if (!secuPass.error) {
                  _context7.next = 3;
                  break;
                }

                throw new TypeError(secuPass.msg);

              case 3:
                _context7.next = 5;
                return this._getWallet(password);

              case 5:
                wallet = _context7.sent;
                _context7.next = 8;
                return _contracts2.default.getCustomContract({
                  wallet: wallet,
                  password: password
                });

              case 8:
                customContract = _context7.sent;
                _context7.next = 11;
                return customContract.withdrawAll();

              case 11:
                transaction = _context7.sent;
                _context7.next = 14;
                return this.dether.provider.waitForTransaction(transaction.hash);

              case 14:
                minedTsx = _context7.sent;
                return _context7.abrupt('return', minedTsx);

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteSellPoint(_x6) {
        return _ref7.apply(this, arguments);
      }

      return deleteSellPoint;
    }()
  }]);

  return DetherUser;
}();

exports.default = DetherUser;