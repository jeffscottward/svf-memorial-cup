// APP MODULES
var secrets = require('../config/secrets');
var User = require('../models/User');

// NODE MODULES
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var _ = require('underscore');

// SOCIAL NODE MODULES
var Twit = require('twit');
var paypal = require('paypal-rest-sdk');
var twilio = require('twilio')(secrets.twilio.sid, secrets.twilio.token);

/**
 * GET /api
 * List of API examples.
 */

exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Browser'
  });
};

/**
 * GET /api/twitter
 * Twiter API example.
 */

exports.getTwitter = function(req, res, next) {
  var token = _.findWhere(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: secrets.twitter.consumerKey,
    consumer_secret: secrets.twitter.consumerSecret,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.get('search/tweets', { q: 'hackathon since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 50 }, function(err, reply) {
    if (err) return next(err);
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets: reply.statuses
    });
  });
};

/**
 * GET /api/paypal
 * PayPal SDK example.
 */

exports.getPayPal = function(req, res, next) {
  paypal.configure(secrets.paypal);

  var paymentDetails = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: secrets.paypal.returnUrl,
      cancel_url: secrets.paypal.cancelUrl
    },
    transactions: [
      {
        description: 'Node.js Boilerplate',
        amount: {
          currency: 'USD',
          total: '2.99'
        }
      }
    ]
  };

  paypal.payment.create(paymentDetails, function(err, payment) {
    if (err) return next(err);
    req.session.paymentId = payment.id;
    var links = payment.links;
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel === 'approval_url') {
        res.render('api/paypal', {
          approval_url: links[i].href
        });
      }
    }
  });
};

/**
 * GET /api/paypal/success
 * PayPal SDK example.
 */

exports.getPayPalSuccess = function(req, res, next) {
  var paymentId = req.session.paymentId;
  var paymentDetails = { 'payer_id': req.query.PayerID };
  paypal.payment.execute(paymentId, paymentDetails, function(err, payment) {
    if (err) {
      res.render('api/paypal', {
        result: true,
        success: false
      });
    } else {
      res.render('api/paypal', {
        result: true,
        success: true
      });
    }
  });
};

/**
 * GET /api/paypal/cancel
 * PayPal SDK example.
 */

exports.getPayPalCancel = function(req, res, next) {
  req.session.payment_id = null;
  res.render('api/paypal', {
    result: true,
    canceled: true
  });
};

/**
 * GET /api/twilio
 * Twilio API example.
 */

exports.getTwilio = function(req, res, next) {
  res.render('api/twilio', {
    title: 'Twilio API'
  });
};

/**
 * POST /api/twilio
 * Twilio API example.
 * @param telephone
 */

exports.postTwilio = function(req, res, next) {
  var message = {
    to: req.body.telephone,
    from: '+13472235148',
    body: 'Hello from the Hackathon Starter'
  };
  twilio.sendMessage(message, function(err, responseData) {
    if (err) return next(err.message);
    req.flash('success', { msg: 'Text sent to ' + responseData.to + '.'})
    res.redirect('/api/twilio');
  });
};
