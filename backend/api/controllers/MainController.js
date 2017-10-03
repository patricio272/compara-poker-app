/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const request = require('request');
const logger = require('../services/logger-conf');

function sendPostRequest(url, callback) {
  logger.log('debug', '[MainController][sendPostRequest]: Hitting %s', url);
  request.post({
    url: url
  }, (error, response, body) => {
    if (error) {
      logger.log('debug', '[MainController][sendPostRequest]: Error %j; Retrying', error);
      setTimeout(() => {
        return sendPostRequest(url, callback);
      }, sails.config.globals.retryTimeout);
    }
    if (!error && response.statusCode === 200) {
      return callback({
        statusCode: response.statusCode,
        body: body
      });
    }
    logger.log('debug', '[MainController][deckReset]: Dealer Service failed with statusCode: %s & this body: %s; Retrying',
      response.statusCode, body);
    setTimeout(() => {
      return sendPostRequest(url, callback);
    }, sails.config.globals.retryTimeout);
  });
}

function sendGetRequest(url, callback) {
  logger.log('debug', '[MainController][sendGetRequest]: Hitting %s', url);
  request.get({
    url: url
  }, (error, response, body) => {
    if (error) {
      logger.log('debug', '[MainController][sendGetRequest]: Error %j; Retrying', error);
      setTimeout(() => {
        return sendGetRequest(url, callback);
      }, sails.config.globals.retryTimeout);
    }
    if (!error) {
      if (response.statusCode === 200 || response.statusCode === 404 || response.statusCode === 405) {
        return callback({
          statusCode: response.statusCode,
          body: body
        });
      } else {
        logger.log('debug', '[MainController][deckDeal]: Dealer Service failed with statusCode: %s & this' +
          ' body: %s; Retrying', response.statusCode, body);
        setTimeout(() => {
          return sendGetRequest(url, callback);
        }, sails.config.globals.retryTimeout);
      }
    }
  });
}

const MainController = {
  deckReset: function(req, res){
    sendPostRequest(sails.config.globals.endpoints.deckReset, (responseObj) => {
      logger.log('debug', '[MainController][deckReset]: Success, TOKEN: %s', responseObj.body.toString());
      res.statusCode = responseObj.statusCode;
      return res.json({
        deckHash: responseObj.body.toString()
      });
    });
  },
  deckDeal: function(req, res){
    const token = req.params.deckHash;
    sendGetRequest(sails.config.globals.endpoints.deckDeal.replace('{TOKEN}', token)
      .replace('{AMOUNT}', sails.config.globals.dealAmountOfCards), (responseObj) => {
      logger.log('debug', '[MainController][deckDeal]: Success, Cards: %s', responseObj.body.toString());
      res.statusCode = responseObj.statusCode;
      return res.json({
        deckHash: responseObj.body.toString()
      });
    });
  }
};

module.exports = MainController;

