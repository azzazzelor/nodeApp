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

/* 
individual.first_name	
individual.last_name	
individual.dob.day	
individual.dob.month	
individual.dob.year	
individual.address	
individual.email	
individual.phone
business_type=individual	external_account
business_profile.mcc	5817
business_profile[url] 
If the user doesn't have a URL, you can alternately provide a business_profile[product_description].	
tos_acceptance.date	
tos_acceptance.ip
CHF (756).
// Create a Charge:
stripe.charges.create({
  amount: 10000,
  currency: "usd",
  source: "tok_visa",
  transfer_group: "{ORDER10}",
}).then(function(charge) {
  // asynchronously called
});

// Create a Transfer to the connected account (later):
stripe.transfers.create({
  amount: 7000,
  currency: "usd",
  destination: "{{CONNECTED_STRIPE_ACCOUNT_ID}}",
  transfer_group: "{ORDER10}",
}).then(function(transfer) {
  // asynchronously called
});

// Create a second Transfer to another connected account (later):
stripe.transfers.create({
  amount: 2000,
  currency: "usd",
  destination: "{OTHER_CONNECTED_STRIPE_ACCOUNT_ID}",
  transfer_group: "{ORDER10}",
}).then(function(second_transfer) {
  // asynchronously called
});

///////
stripe.charges.create({
  amount: 1000,
  currency: "usd",
  source: "tok_visa",
  application_fee_amount: 123,
  transfer_data: {
    destination: "{{CONNECTED_STRIPE_ACCOUNT_ID}}",
  },
}).then(function(charge) {
  // asynchronously called
});



*/