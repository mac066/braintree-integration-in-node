var express = require('express');
var router = express.Router();
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "vrfxc4t9ds682yq8",
  publicKey: "wpb8ghzgnxg3mmpj",
  privateKey: "b64f4bc6610e2bfe9cd086ce8ddcdccb"
});

/* GET users listing. */
// 5555555555554444 2/20
router.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    console.log(err,response)
    res.send(response.clientToken);
  });
});
router.post("/checkout", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  console.log(nonce)
  // Use payment method nonce here

  
  gateway.transaction.sale({
  amount: '10.00',
  paymentMethodNonce: nonce,
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
if(result.success){
res.set('Content-Type', 'text/html');
res.send(new Buffer('<p>Success</p>'));
  // res.send("<html>success</html>")
}
    // console.log(err,result)
});
});
module.exports = router;
