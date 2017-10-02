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
  }, function(error, response, body) {
    if (error) {
      logger.log('debug', '[MainController][sendPostRequest]: Error %j; Retrying', error);
      setTimeout(function () {
        return sendPostRequest(url, callback);
      }, sails.config.globals.retryTimeout);
    }
    if (!error && response.statusCode === 200) {
      return callback({
        statusCode: response.statusCode,
        body: body
      });
    }
    logger.log('debug', '[MainController][deckReset]: Deal Service failed with statusCode: %s & this body: %s; Retrying',
      response.statusCode, body);
    setTimeout(function () {
      return sendPostRequest(url, callback);
    }, sails.config.globals.retryTimeout);
  });
}

function sendGetRequest(url, callback) {
  logger.log('debug', '[MainController][sendPostRequest]: Hitting %s', url);
  request.post({
    url: url
  }, function(error, response, body) {
    if (error) {
      logger.log('debug', '[MainController][sendPostRequest]: Error %j; Retrying', error);
      setTimeout(function () {
        return sendPostRequest(url, callback);
      }, sails.config.globals.retryTimeout);
    }
    if (!error && response.statusCode === 200) {
      return callback({
        statusCode: response.statusCode,
        body: body
      });
    }
    logger.log('debug', '[MainController][deckReset]: Deal Service failed with statusCode: %s & this body: %s; Retrying',
      response.statusCode, body);
    setTimeout(function () {
      return sendPostRequest(url, callback);
    }, sails.config.globals.retryTimeout);
  });
}

const MainController = {
  deckReset: function(req, res){
    sendPostRequest(sails.config.globals.endpoints.deckReset, function(responseObj) {
      logger.log('debug', '[MainController][deckReset]: Success, TOKEN: %s', responseObj.body.toString());
      res.statusCode = responseObj.statusCode;
      return res.json({
        deckHash: responseObj.body.toString()
      });
    });
  },
  deckDeal: function(req, res){
    sendGetRequest(sails.config.globals.endpoints.deckDeal, function(responseObj) {
      logger.log('debug', '[MainController][deckDeal]: Success, TOKEN: %s', responseObj.body.toString());
      res.statusCode = responseObj.statusCode;
      return res.json({
        deckHash: responseObj.body.toString()
      });
    });
  }
};

module.exports = MainController;

