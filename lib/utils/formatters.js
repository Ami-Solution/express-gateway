'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

var _appConstants = require('../constants/appConstants');

var _eth = require('./eth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO test ++++

/**
 * @ignore
 */
function tellerPosFromContract(rawTellerPos) {
  var tellerPos = {};
  try {
    // TODO more resilient
    // raw : 1234567 -> 1.234567
    tellerPos.lat = rawTellerPos[0] / Math.pow(10, _appConstants.COORD_PRECISION);
    tellerPos.lng = rawTellerPos[1] / Math.pow(10, _appConstants.COORD_PRECISION);
    tellerPos.zoneId = Number(rawTellerPos[2]);

    tellerPos.escrowBalance = Number(_ethers2.default.utils.formatEther(rawTellerPos[3]));
  } catch (e) {
    console.error(e);
    throw new TypeError('Invalid teller position: ' + e.message);
  }
  return tellerPos;
}

/**
 * @ignore
 */
function tellerProfileFromContract(rawTellerProfile) {
  var tellerProfile = {};

  // TODO more resilient
  try {
    tellerProfile.rates = rawTellerProfile.rates / 100;
    tellerProfile.volumeTrade = Number(_ethers2.default.utils.formatEther(rawTellerProfile.volumeTrade));
    tellerProfile.nbTrade = rawTellerProfile.nbTrade.toNumber();
    tellerProfile.name = (0, _eth.toUtf8)(rawTellerProfile.name);
    tellerProfile.currencyId = rawTellerProfile.currency;
    tellerProfile.avatarId = rawTellerProfile.avatar;
    tellerProfile.messengerAddr = (0, _eth.toUtf8)(rawTellerProfile.telAddr);
  } catch (e) {
    console.error(e);
    throw new TypeError('Invalid teller profile: ' + e.message);
  }
  return tellerProfile;
}

/**
 * @ignore
 */
function sellPointToContract(rawSellPoint) {
  var sellPoint = {};

  try {
    // 1.234567 -> 1234567
    sellPoint.lat = Math.floor(rawSellPoint.lat.toFixed(_appConstants.COORD_PRECISION + 1) * Math.pow(10, _appConstants.COORD_PRECISION));
    sellPoint.lng = Math.floor(rawSellPoint.lng.toFixed(_appConstants.COORD_PRECISION + 1) * Math.pow(10, _appConstants.COORD_PRECISION));
    sellPoint.zone = rawSellPoint.zone;
    sellPoint.rates = Math.floor(rawSellPoint.rates * 100);
    sellPoint.avatar = rawSellPoint.avatar;
    sellPoint.currency = rawSellPoint.currency;
    sellPoint.telegram = _ethers2.default.utils.toUtf8Bytes(rawSellPoint.telegram);
    sellPoint.username = _ethers2.default.utils.toUtf8Bytes(rawSellPoint.username);
  } catch (e) {
    console.error(e);
    throw new TypeError('Invalid teller profile: ' + e.message);
  }
  return sellPoint;
}

exports.default = {
  tellerPosFromContract: tellerPosFromContract,
  tellerProfileFromContract: tellerProfileFromContract,
  sellPointToContract: sellPointToContract
};