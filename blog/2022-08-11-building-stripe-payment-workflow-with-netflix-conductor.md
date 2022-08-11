---
slug: build-stripe-payment-workflows-with-conductor
title: Build a Stripe Payment Workflow with Netflix Conductor
authors: AyodeleAransiola 
tags: [Netflix Conductor, orchestration, stripe, payments, usecase, 2022]
image: https://orkes.io/content/img/Top-Secret.jpeg
---


# Build a Stripe Payment Workflow with Netflix Conductor

Nowadays, setting up an online business is relatively easy. With the variety of platforms and tools available, almost anyone can establish a storefront, keep track of orders, and collect payments.

However, this has not always been the case. Stripe entered the market back in 2010, when opening an online business was far more challenging; figuring out how to make legacy payment processors operate with a brand-new form of commerce was beyond many merchants. Stripe was one of the first ISOs to create a platform tailored to e-commerce and mobile app payments, introducing a technologically advanced strategy that made registering for and using the service simpler, quicker, and more transparent.

Stripe is a payment gateway that helps merchants process payments (online and offline). You can use Stripe with [Netflix Conductor](https://orkes.io/what-is-conductor/) to set up a payment flow for your company's financial operations. The tasks you create on the Conductor will be completed independently, including collecting user data, charging their cards, and disbursing money as needed, so you won't have to worry about the entire payment process.

This article first expands on what Stripe is and why you might need it and then explains how you can use tasks in Netflix Conductor to build a Stripe payment workflow.

<!-- truncate -->

## Why Do You Need Stripe?

When clients pay with cash or a check for goods or services, the money can be deposited into the business's bank account. But if customers want to use a credit card, you'll need a payment processor. You, as a business owner, can accept and process credit and debit card payments from clients using Stripe.

![A diagram of how the Stripe payment processing works](https://i.imgur.com/ColY5rH.jpg)

In addition to receiving payments online and in person, Stripe also offers a wide range of supplementary services, such as the following:

- Automated billing allows you to set up recurring charges for your customers.
- You can issue an invoice to your customer that they can also use to directly submit payment.
- You can perform sales tax collection, which helps you easily collect and calculate tax payable by your customers on each transaction.

### Stripe Payment Use Cases

The Stripe payment gateway can be used by both small–medium and large businesses for processing payments for online and offline transactions. The following are just a few examples of use cases:

1.  E-commerce payment integration: Stripe gives you all the resources you need to accept payments from clients all over the world online.
2. Mobile application online payment: Stripe has provided a software development kit for mobile developers to use in collecting payment through mobile apps seamlessly.
3. In-person payments: You may create your own in-person checkout using Stripe Terminal to accept payments in the real world. With adaptable development tools, pre-approved card readers, and cloud-based hardware management, Stripe Terminal was created with platforms and contemporary shops in mind and enables the integration of online and offline channels.

Stripe provides a global payment system that can accept over 135 different currencies. It is a speedy and practical alternative for many starting businesses. Additionally, you can use Netflix Conductor to create, manage, and execute a complex payment application while you focus on the business logic.

## Building a Stripe Payment Workflow Using Conductor

The following sections explain how to create a payment workflow on Conductor. To get started, you need to have a Stripe account, which you can set up [here](https://dashboard.stripe.com/register).

You can run Conductor in the Orkes [Playground](https://play.orkes.io/). In this article, tasks were created on the Orkes Playground, so you need to create an account using your Google account or an email address, after which you will be redirected to the Playground.

### Payment Workflow

Payment workflows are basically a set of processes by which payments are reviewed and approved before the payment is processed against them. Businesses can use Netflix Conductor to create and perform payment-automation processes.

To carry out any workflow in Conductor, you need to define the task that the workflow will perform. It contains all the necessary information, the name of the task, its description, the input and expected output, timing, etc. To do that, click **Define Task** on the Playground or click [here](https://play.orkes.io/workflowDef).

Next, you define the workflow, including all the activities that will be carried out.

For this tutorial, our payment workflow consists of the following tasks:

- Tokenization of credit/debit cards
- Catching and releasing a payment when confirmation is needed from merchant
- Failed transactions and refunds


### Tokenization of Credit/Debit Cards

Tokenization is the method Stripe uses to securely collect sensitive information from clients, such as card details, bank account details, or personal details. When you perform tokenization, a token is generated for performing future transactions. The token is used rather than requiring your users to fill their payment information again.

When a user saves his card, an identifier is assigned to it, which is called "token ID". In this task, you will input a user card and a token ID will be generated afterwards.

If the API call is successful, the response looks like this:

```json
{
  "id": "tok_1xxxxxxr",
  "object": "token",
  "card": {
    "id": "card_1LO2vLAOWogJd4PAwf6xyIE3",
    "object": "card",
    "address_city": null,
    "address_country": null,
    "address_line1": null,
    "address_line1_check": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null,
    "address_zip_check": null,
    "brand": "Visa",
    "country": "US",
    "cvc_check": "pass",
    "dynamic_last4": null,
    "exp_month": 8,
    "exp_year": 2023,
    "fingerprint": "PEmZS5vpgcgBbUdA",
    "funding": "credit",
    "last4": "4242",
    "metadata": {},
    "name": null,
    "tokenization_method": null
  },
  "client_ip": null,
  "created": 1658423551,
  "livemode": false,
  "type": "card",
  "used": false
}
```
Otherwise, this call raises [an error](https://stripe.com/docs/api/tokens/create_card#errors).

The token contains all the card details necessary to perform a charge transaction. Therefore, whenever you are trying to charge the card user again, you only call for the token id `"id": "tok_1LO2vxxxxx"`.

You can use the following code to create a task and workflow on the conductor to return a token for future charges:

```json
"inputParameters": { 
"http_request": {  
"uri": "https://api.stripe.com/v1/tokens",  
"method": "POST",  
"connectionTimeOut": 3000,  
"readTimeOut": 3000,  
"contentType": "application/x-www-form-urlencoded",  
"body": "card[number]=${workflow.input.card}&card[exp_month]=${workflow.input.month}&card[exp_year]=${workflow.input.year}&card[cvc]=${workflow.input.cvc}",  
"headers": {  
"Authorization": "Basic ${workflow.input.token}"  
}  
}
```

The body contains the card details while the header contains an authorization key (your *secret key*) from Stripe, which you can convert to *Base64* and input as a token.

When initiating an API call to the Stripe payment gateway, you need an authorization key, which gives you access to perform any operation you want on the gateway.

To get your secret key on Stripe, log in and navigate to the [developer](https://dashboard.stripe.com/test/apikeys) dashboard, click **API keys**, and your keys will be displayed. Copy your secret key, and convert it to Base64 using this [link](https://www.base64encode.org/).

Therefore, to run the task above, you need the following input:

- Token (the one converted to Base64)
- Card number
- Card expiration month
- Card expiration year
- Card CVV

![Image of the required input for tokenization](https://i.imgur.com/CBzHfFZ.png)

To run the workflow on the Playground, click on **Run Workflow**. In the workflow name, put "card_token_task". Fill in the input information and click **Run Workflow**.
If the input details are correct, it will run successfully; otherwise, an error will be displayed describing why it failed.

The following links are for the necessary definitions on the Orkes Playground:

- Link to the [task definition](https://play.orkes.io/taskDef/card_token_task)
- Link to the [workflow definition](https://play.orkes.io/workflowDef/card_token_task/1)

![Image of the card tokenization workflow diagram](https://i.imgur.com/GoZuUYZ.png)

### Catch and Release Payment When Confirmation Is Needed from Merchant

Stripe supports two-step card payments, so you can first authorize a charge, then wait to settle (capture) it later.

When a charge is authorized, the card issuer guarantees the funds and the amount held on the customer's card for up to seven days. If the charge isn't captured within this time, the authorization is canceled and funds released.

For instance, if your Uber trip is assumed to cost $20, the card issuer guarantees that amount on the user's card and charges it; when the trip completes, if it cost $20, you will then charge the cost, but if it is less than $20, you remove the cost and *release/refund* the amount left over back to the customer's account/card.

When you perform a charge, it returns a `charge_ID`, which you can use to confirm the payment at the end of the transaction.

The *catch task* requires the following input keys: `amount`,`currency`,`description`,`source`,`capture`, and `token` to return a `charge_id` as an output key.

The *release task* takes the *output key* of the *catch task* `charge_id` to perform a **release/charge** function and confirm the payment.

*Note*: Your token is the Base64 version of your secret key converted in the first task.

Therefore, to run the task, you need the following input:

- Token (the one converted to Base64)
- Amount
- Currency
- Description
- Source
- Capture

![Image of the required input for catch and release](https://i.imgur.com/Y388vav.png)

To run the workflow on the Playground, click on **Run Workflow**. In the workflow name, put "create_capture_payment". Fill in the input information and click **Run Workflow**. If the input details are correct, it will run successfully; otherwise, an error will be displayed describing why it failed.

Below are the links to the definitions on the Orkes Playground:

- Link to the [task definition](https://play.orkes.io/taskDef/create_capture_payment)
- Link to the [workflow definition](https://play.orkes.io/workflowDef/create_capture_payment/2)

![Image of the catch and release workflow](https://i.imgur.com/CmGwmb2.png)

### Failed Transactions and Refunds

Businesses can refund charges made to a user's card or account if the transaction fails, either in whole or in part. Refunds use the business's available Stripe balance—this doesn't include any pending balance. Refunds can be issued using the [API](https://stripe.com/docs/api) or the [Dashboard](https://dashboard.stripe.com/test/dashboard) and are processed immediately. Once issued, refunds can't be canceled.

You need to copy the identifier of the charge to be refunded. It is always denoted with "ch_xxxxxx", which can be found in the **Event** section of a payment page.

To perform this task, you only need to pass in two input keys, which are `token` and the `charge_id`.

*Note*: Your token is the Base64 version of your secret key converted in the first task.

Therefore, to run the task, you need the following input:

- Token (the one converted to Base64)
- Charge ID

![Image of the required input for failed transactions and refunds](https://i.imgur.com/WK7lgtm.png)

To run the workflow on the playground, click on **Run Workflow**. In the workflow name, put "refund_payment". Fill in the input information and click **Run Workflow**. If the input details are correct, it will run successfully; otherwise, an error will be displayed describing why it failed.

Below are the links to the definitions on the Orkes Playground:

- Link to the [task definition](https://play.orkes.io/taskDef/refund_payment)
- Link to the [workflow definition](https://play.orkes.io/workflowDef/refund_payment/1)

![Image of the refund workflow](https://i.imgur.com/eFcYTdq.png)

## Conclusion

This article introduced you to the Stripe payment gateway and how you can use it to handle payments on your business platform. 

You learned how to use payment workflows with Conductor and the [Orkes](https://orkes.io/) Playground to tokenize user cards when they are saved, catch and release payment when an order needs confirmation from the merchant, and issue refunds.

