'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _DetherInterface = require('dethercontract/contracts/DetherInterface.json');

var _DetherInterface2 = _interopRequireDefault(_DetherInterface);

var _DetherStorage = require('dethercontract/contracts/DetherStorage.json');

var _DetherStorage2 = _interopRequireDefault(_DetherStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Contracts = {
  /**
   * @ignore
   */
  getContract: function getContract(ContractJson, provider) {
    var chainId = null;
    if (provider.provider) {
      chainId = provider.provider.chainId;
    } else {
      chainId = provider.chainId;
    }
    if (!chainId) {
      throw new Error('No chain id found');
    }
    var network = ContractJson.networks[chainId];
    if (!network) {
      throw new Error('Contract not deployed on network ' + chainId);
    }
    var contractAddress = network.address;
    var contractABI = ContractJson.abi;

    return new _ethers2.default.Contract(contractAddress, contractABI, provider);
  },


  /**
   * @ignore
   */
  getDetherContract: function getDetherContract(provider) {
    return Contracts.getContract(_DetherInterface2.default, provider);
  },


  /**
   * @ignore
   */
  getDetherStorageContract: function getDetherStorageContract(provider) {
    return Contracts.getContract(_DetherStorage2.default, provider);
  },


  /**
   * Returns a custom signed contract
   * Allows to add value to a transaction
   *
   * @param {object}      opts
   * @param {object}      opts.wallet   Decrypted user wallet
   * @param {string}      opts.password password to decrypt wallet
   * @param {?BigNumber}  opts.value    Ether value to send while calling contract
   * @return {object}     Dether Contract
   * @private
   * @ignore
   */
  getCustomContract: function getCustomContract(opts) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var wallet, customProvider;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (opts.password) {
                _context.next = 2;
                break;
              }

              throw new TypeError('Need password to decrypt wallet');

            case 2:
              wallet = opts.wallet;
              customProvider = {
                getAddress: wallet.getAddress.bind(wallet),
                provider: wallet.provider,
                sendTransaction: function sendTransaction(transaction) {
                  if (opts.value) {
                    transaction.value = opts.value;
                  }
                  return wallet.sendTransaction(transaction);
                }
              };
              return _context.abrupt('return', Contracts.getDetherContract(customProvider));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

exports.default = Contracts;