var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
    sharesNumber: Number,
    amount: String,
    commerceCode:String,
    buyOrder: String,
    authorizationCode: String,
    paymentTypeCode: String,
    responseCode: Number
});

module.exports = mongoose.model('Payments', PaymentSchema);
