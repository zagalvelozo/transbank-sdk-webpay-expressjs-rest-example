var express = require('express');
var Transbank = require('transbank-sdk');
const configuration = require('../config/Webpay'); //Only for production
var router = express.Router();


router.post('/webpayplus/create', function (req, res) {
  const transaction = new Transbank.Webpay(
    Transbank.Configuration.forTestingWebpayPlusNormal()
  ).getNormalTransaction();
  const amount = req.query.amount;
  const sessionId = req.query.sessionId
  const buyOrder = req.query.buyOrder;
  const returnUrl = req.query.returnUrl;
  const finalURL = req.query.finalURL || req.query.returnUrl;
  transaction.initTransaction(amount, buyOrder, sessionId, returnUrl, finalURL)
    .then((response) => {
      const token = response.token;
      const url =  response.url;
      res.redirect(302, `${url}?token_ws=${token}`);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post('/webpayplus/returnUrl', function (req, res) {
  const transaction = new Transbank.Webpay(
    Transbank.Configuration.forTestingWebpayPlusNormal()
  ).getNormalTransaction();
  const token = req.body.token_ws;
  transaction.getTransactionResult(token)
    .then((response) => {
      const output = response.detailOutput[0];
      if (output.responseCode === 0) {
        res.json(output); //accepted
      } else {
        res.json(output); //rejected
      }
    })
    .catch((error) => {
      res.json(error)
    });
});

router.post('/webpayplus/returnUrl', function (req, res) {
  const transaction = new Transbank.Webpay(
    Transbank.Configuration.forTestingWebpayPlusNormal()
  ).getNormalTransaction();
  const token = req.body.token_ws;
  transaction.getTransactionResult(token)
    .then((response) => {
      const output = response.detailOutput[0];
      if (output.responseCode === 0) {
        res.json(output); //accepted
      } else {
        res.json(output); //rejected
      }
    })
    .catch((error) => {
      res.json(error)
    });
});


module.exports = router;