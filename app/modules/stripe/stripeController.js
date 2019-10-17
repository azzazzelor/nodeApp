const StripeModel = require('./stripeModel');
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.accountAuth = function (req, res){
    // create card token 
    // create acc 
    // verify acc 
    //add paypent card to acc 
    let card; 
    stripe.tokens.create({
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2020,
          cvc: '123'
        }
      }).then((err,result)=>{
          if(err){
              console.log(err)
          }else{
              card = result.id
              console.log(card)
          }
      }).then(()=>{
        stripe.accounts.create({
            type: 'custom',
            country: 'CH',
            email: 'bob@example.com',
            
          }, function(err, account) {
                if(err){console.log(err)}else{console.log(account)}
          });
      })

}

