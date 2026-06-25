const { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options } = require('transbank-sdk');

const integrationConfig = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
);

module.exports = integrationConfig;
