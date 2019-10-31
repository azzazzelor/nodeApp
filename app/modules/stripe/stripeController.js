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

    stripe.accounts.create({
      type: 'custom',
      country: 'CH',
      email: email,
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
          email: email,
         phone: newNumber
        }, 
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: req.ip
        },
          }).then(data=>{
              let { id } = data;
              let newStripeModel = new StripeModel({
                Email: email,
                stripeAccKey: id
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
          console.log(brand, id, last4)
          // return StripeModel.find({email:email})
          
          // console.log(id)
          // stripe.accounts.createExternalAccount(
          //   acc,
          //   {
          //     external_account: 'tok_mastercard_debit_transferSuccess'
          //   }
          // );
          
        }))
        .catch(err=>{
          console.log(err)
        })
}


const createCard = function (acc, req, res) {

  stripe.tokens.create({
    card: {
      number: '4000000000004210',
      exp_month: 12,
      exp_year: 2020,
      cvc: '123',
      currency: 'chf'
    }
  })
  .then((card=>{
    console.log(card)
    // console.log(id)
    stripe.accounts.createExternalAccount(
      acc,
      {
        external_account: 'tok_mastercard_debit_transferSuccess'
      }
    );
    
  }))
  .then(result=>{
    console.log(result)
  })
  .catch(err=>{
    console.log(err)
  })
};
const verifyAcc = function (acc, req, res) {
stripe.accounts.update(
  acc,
  {
    individual: {
    first_name : 'testName',
     last_name : 'testLast',
      dob: {
        day: '21',
         month: '03',
        year: '1997'
      },
      address: {
        line1: 'Föhrenweg',
        city: 'Giswil',
        postal_code: '6074',
      },
      email: 'tesr@email.com',
     phone: '+41754111234'
    },
    tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip: req.ip
          },

        },
  function(err, account) {
    console.log(err);
    console.log(account);
  }
);
};


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