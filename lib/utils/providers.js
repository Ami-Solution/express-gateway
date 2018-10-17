'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieve ethereum provider
 * Only network is needed
 *
 * @param {object}  opts
 * @param {String}  opts.network       Name of network ('homestead', 'ropsten', 'rinkeby', 'kovan')
 * @param {?String} opts.rpcURL       JSON RPC provider URL
 * @param {?String} opts.infuraKey    INFURA API Key
 * @param {?String} opts.etherscanKey Etherscan API Key
 * @return {Provider}
 * @ignore
 */
function getProvider(opts) {
  if (!opts.network) throw new TypeError('Unable to get provider, need network');
  var providers = [];

  if (opts.rpcURL) {
    providers.push(new _ethers2.default.providers.JsonRpcProvider(opts.rpcURL, opts.network));
  }
  if (opts.etherscanKey) {
    providers.push(new _ethers2.default.providers.EtherscanProvider(opts.network, opts.etherscanKey));
  }
  // if (opts.infuraKey) {
  //   providers.push(new Ethers.providers.InfuraProvider(opts.network, opts.infuraKey));
  // }

  providers.push(_ethers2.default.providers.getDefaultProvider(opts.network));
  return new _ethers2.default.providers.FallbackProvider(providers);
}

exports.default = {
  getProvider: getProvider
};