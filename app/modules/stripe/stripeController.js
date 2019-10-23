const StripeModel = require('./stripeModel');
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.accountAuth = function (req, res){
    // create card token 
    // create acc 
    // verify acc 
    //add paypent card to acc 
    let acc = 'acct_1FWgzWJiDjSKwqNC';

    stripe.accounts.update(
      acc,
      
        {tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: request.connection.remoteAddress 
        }}
      
    )

// stripe.accounts.update(
//   acc,
  // {business_type: "individual"},
  //{
    // individual: {
    // first_name : 'testName',
    //  last_name : 'testLast',
    //   dob: {
    //     day: '21',
    //      month: '03',
    //     year: '1997'
    //   },
      // address: {
      //   line1: 'Föhrenweg',
      //   city: 'Giswil',
      //   postal_code: '6074',
      // },
    //   email: 'tesr@email.com',
    //  phone: '+41754111234'
    //},
//     tos_acceptance: {
//             date: Math.floor(Date.now() / 1000),
//             ip: request.connection.remoteAddress 
//           },

//         },
//   function(err, account) {
//     console.log(err);
//     console.log(account);
//   }
// );
    
    // let card; 
    // stripe.tokens.create({
    //     card: {
    //       number: '4242424242424242',
    //       exp_month: 12,
    //       exp_year: 2020,
    //       cvc: '123'
    //     }
    //   })
    //   .then((result)=>{
    //     card = result.id;
    //     console.log(card)
    //       stripe.accounts.create({
    //         type: 'custom',
    //         country: 'CH',
    //         email: 'fullyTest@example.com',
    //             requested_capabilities: ['card_payments', 'transfers'],
    //             tos_acceptance: {
    //               date: Math.floor(Date.now() / 1000),
    //               ip: request.connection.remoteAddress // Assumes you're not using a proxy
    //             }
         
    //       },(err,result)=>{
    //         console.log(err)
    //         console.log(result)})
    //      })   
    //   .catch(err=>{
    //     console.log(err)
    //   })
      

}

const createStripeAcc = function () {

};
const createCard = function () {

};
const verifyAcc = function () {

};


/* 
Business type
Bank account or debit card
Date of birth
Legal name
Terms of service acceptance

 requested_capabilities: ['card_payments', 'transfers']

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


stripe.accounts.createExternalAccount(
  'acct_1FGgPFIvRm4SRAz9',
  {
    external_account: 'tok_mastercard_debit',
  },
  function(err, card) {
    // asynchronously called
  }
);

stripe.accounts.retrieveExternalAccount(
  'acct_1FGgPFIvRm4SRAz9',
  'card_1FWUutIvRm4SRAz9yLCXISG6',
  function(err, card) {
    // asynchronously called
  }
)



 let card; 
    stripe.tokens.create({
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2020,
          cvc: '123'
        }
      })
      .then((result)=>{
        card = result.id;
        console.log(card)
          stripe.accounts.create({
            type: 'custom',
            country: 'CH',
            email: 'testAcc@example.com',
            business_type: 'individual',
                // requested_capabilities: ['card_payments', 'transfers'],
                // tos_acceptance: {
                //   date: Math.floor(Date.now() / 1000),
                //   ip: request.connection.remoteAddress // Assumes you're not using a proxy
                // }
         
          }),(err,result)=>{
            console.log(err)
            console.log(result)}
         })   
      .then((data)=>{
        console.log(data)
      })
      .catch(err=>{
        console.log(err)
      })
      

}
individual: {
first_name : 'testName',
 last_name : 'testLast',
  dob: {
    day: '21',
     month: '03',
    year: '1997'
  },
  address: 'srt.Mailon 32',
  email: 'tesr@email.com',
 phone: '3806895043748'
},
*/