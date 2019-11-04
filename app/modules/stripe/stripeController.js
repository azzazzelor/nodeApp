const StripeModel = require('./stripeModel');
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.createAcc = function (req, res) {
   const {
     email,
     phone, 
     zipCode, 
     city,   
     address, 
     dobYear, 
     dobMonth, 
     dobDay, 
     last_name,
     first_name  
    } = req.body;

    if(!email) {
      return res.status(422).send({ error: 'Please enter email.' });
    }
    if(!phone) {
      return res.status(422).send({ error: 'Please enter phone.' });
    }
    if(!zipCode) {
      return res.status(422).send({ error: 'Please enter zipCode.' });
    }
    if(!address) {
      return res.status(422).send({ error: 'Please enter address.' });
    }
    if(!city) {
      return res.status(422).send({ error: 'Please enter city.' });
    }
    if(!dobYear) {
      return res.status(422).send({ error: 'Please enter birth year.' });
    }
    if(!dobMonth) {
      return res.status(422).send({ error: 'Please enter  birth month.' });
    }
    if(!dobDay) {
      return res.status(422).send({ error: 'Please enter birth day.' });
    }
    if(!first_name) {
      return res.status(422).send({ error: 'Please enter first name.' });
    }
    if(!last_name) {
      return res.status(422).send({ error: 'Please enter last name.' });
    }
    let newNumber = "+" + phone;
    let new_email = email.toLowerCase();
    stripe.accounts.create({
      type: 'custom',
      country: 'CH',
      email: new_email,
      business_type: 'individual',
      individual: {
        first_name : first_name,
         last_name : last_name,
          dob: {
            day: dobDay ,
             month: dobMonth,
            year:  dobYear
          },
          address: {
            line1: address,
            city: city,
            postal_code: zipCode,
          },
          email: new_email,
         phone: newNumber
        }, 
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: req.ip
        },
          }).then(data=>{
              let { id } = data;
              let newStripeModel = new StripeModel({
                Email: new_email,
                stripeAccKey: id,
                first_name: first_name,
                last_name: last_name
              });
              newStripeModel.save((err,result)=>{
                if(err){
                  console.log(err)
                  res.send(err)
                }else{
                  res.send({error: 0})
                } 
              })
          }).catch(err=>{
            res.send({
              error: 1,
              errorName: 'StripeError',
              errorMessage : err.raw.message
            })
          })
}
exports.addCard = function (req, res) {
  const {
         email,
         number,
         exp_month,
         exp_year, 
         cvc  
        } = req.body;

        if(!email) {
          return res.status(422).send({ error: 'Please enter email.' });
        }
        if(!number) {
          return res.status(422).send({ error: 'Please enter card number.' });
        }
        if(!exp_month) {
          return res.status(422).send({ error: 'Please enter exp_month.' });
        }
        if(!exp_year) {
          return res.status(422).send({ error: 'Please enter exp_year.' });
        }
        if(!cvc) {
          return res.status(422).send({ error: 'Please enter cvc.' });
        }
        let new_exp_month = +exp_month;
        let new_exp_year = +exp_year;
        let last3 = '';
        let cardId = '';
        let cardBrand = '';

        stripe.tokens.create({
          card: {
            number: number,
            exp_month: new_exp_month,
            exp_year: new_exp_year,
            cvc: cvc,
            currency: 'chf'
          }
        })
        .then((card=>{
          let {id} = card;
          let {brand, last4} = card.card;
          last3 = last4.slice(1)
          cardId = id;
          cardBrand = brand;
          
          return StripeModel
          .findOne({Email:email})
          .select('stripeAccKey -_id')
          .then(data=>{
            return data.stripeAccKey
          })
        }))
        .then(acc=>{
          // console.log(typeof cardId, typeof acc)
          stripe.accounts.createExternalAccount(
            acc,
            {
              external_account: 'tok_mastercard_debit_transferSuccess'
            }
          ).then((res)=>{
            StripeModel.updateOne({Email: email},{brand: cardBrand, last_three: last3, exp_month: exp_month, exp_year: exp_year },(err)=>{if(err){res.send('error:1')}});
          })   
        })
        .then(result=>{
          res.send({error: 0})
        })
        .catch(err=>{
          res.send({
            error: 1,
            errorName: 'StripeError',
            errorMessage : err.raw.message
          })
        })
}

exports.transaction = function (req, res) {
    let {senderEmail, recipientEmail, emount} = req.body;
    let acc1 = 'acct_1FX57XBz3zbIMGXl';
    let acc2 = 'acct_1FWgzWJiDjSKwqNC';
    
    stripe.charges.create({
      amount: 1500,
      currency: "chf",
      source: acc1,
      receipt_email: senderEmail,
    }).then(result=>{
      if(paid){
        stripe.payouts.create({
          amount: 1000,
          currency: 'chf',
        }, {
          stripe_account: acc2,
        }).then(function(payout) {
          console.log(payout)
        });
      }
    }).catch(err=>{
      console.log(err)
    })
    
}

exports.get_card_info = function (req, res) {
  let {email} = req.body;
  StripeModel
  .find({Email:email})
  .select('brand last_three first_name last_name exp_month exp_year -_id')
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send('error: 1')
  })
}


/* 
 // create card token 
    // create acc 
    // verify acc 
    //add paypent card to acc 
    let acc1 = 'acct_1FX57XBz3zbIMGXl';
    let acc2 = 'acct_1FWgzWJiDjSKwqNC';
   
    stripe.transfers.create({
      amount: 1,
      currency: "chf",
      destination: acc1,
    }).then(result=>{
        console.log(result)
      }).catch(err=>{
        console.log(err)
      })
  //  let r = Math.random().toString(36).substring(7);

 
    // stripe.charges.create({
    //   amount: 10000,
    //   currency: "chf",
    //   source: acc,
    //   transfer_group: r,
    // }).then(result=>{
    //       console.log(result)
    //     }).catch(err=>{
    //       console.log(err)
    //     })
    
    // // Create a Transfer to the connected account (later):
    // stripe.transfers.create({
    //   amount: 7000,
    //   currency: "chf",
    //   destination: acc,
    //   transfer_group: r,
    // }).then(result=>{
    //       console.log(result)
    //     }).catch(err=>{
    //       console.log(err)
    //     })
    // stripe.charges.create({
    //   amount: 1000,
    //   currency: "chf",
    //   source: acc1,
    //   transfer_data: {
    //     destination: acc2,
    //   },
    // }).then(result=>{
    //         console.log(result)
    //       }).catch(err=>{
    //         console.log(err)
    //       })
     
 // stripe.charges.create({
    //   amount: 1500,
    //   currency: "chf",
    //   source: acc
    // }).then(result=>{
    //   console.log(result)
    // }).catch(err=>{
    //   console.log(err)
    // })
    // stripe.payouts.create({
    //   amount: 1000,
    //   currency: 'chf',
    // }, {
    //   stripe_account: acc1,
    // }).then(function(payout) {
      
    // });
    // stripe.charges.create({
    //   amount: 1000,
    //   currency: "chf",
    //   source: acc1,
    //   application_fee_amount: 123,
    //   transfer_data: {
    //     destination: acc2,
    //   },
    // }).then(function(charge) {
    //   console.log(charge)
    // }).catch(err=>{
    //   console.log(err)})
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
      .then((
      

}

*/