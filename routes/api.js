const express = require('express');
const { WebpayPlus, Options, Environment, IntegrationApiKeys, IntegrationCommerceCodes } = require('transbank-sdk');
const logger = require('../config/logger');
var router = express.Router();

const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

router.post('/webpayplus/create', async (req, res) => {
  const { amount, sessionId, buyOrder, returnUrl } = req.body;
  logger.info('creating webpay transaction', { buyOrder, sessionId, amount, returnUrl });

  try {
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    const { token, url } = response;
    logger.info('webpay transaction created', { buyOrder, token });
    res.redirect(302, `${url}?token_ws=${token}`);
  } catch (error) {
    logger.error('webpay create failed', { buyOrder, error: error.message });
    res.status(500).json({ error: error.message });
  }
});

router.post('/webpayplus/commit', async (req, res) => {
  const token = req.body.token_ws || req.query.token_ws;
  logger.info('committing webpay transaction', { token });

  try {
    const response = await tx.commit(token);
    const { vci, amount, status, buy_order, session_id, card_detail, transaction_date, authorization_code, payment_type_code, response_code } = response;

    if (response_code === 0) {
      logger.info('webpay transaction committed', { buy_order, authorization_code, amount });
      res.json({ status, authorization_code, amount, buy_order, payment_type_code });
    } else {
      logger.warn('webpay transaction rejected', { buy_order, response_code });
      res.status(400).json({ status, response_code, buy_order });
    }
  } catch (error) {
    logger.error('webpay commit failed', { token, error: error.message });
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;