---
title: "Stripe Operations Reference"
description: "Look up the input and output parameters for each operation available in the Stripe integration with Orkes Conductor."
canonical_route: "integrations/stripe-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Stripe Operations Reference

Orkes Conductor integrates with Stripe to let you manage balances, customers, coupons, payment intents, charges, refunds, payment methods, tokens, and meter events directly from your workflows. Once you configure the Stripe integration, you can use the following operations to create, retrieve, and update data in Stripe without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Stripe integration](/content/integrations/stripe).

## Get Balance

Retrieves the current balance for your Stripe account, including available and pending amounts across all currencies.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    Returns the balance object, including livemode status, available amount, and pending amount.


## List Customers

Retrieves a list of customers from your Stripe account.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of customers to return. Defaults to 10. | integer | Required. |
    | Email | The email address to filter customers by. | string | Optional. |

=== "Output Parameters"

    Returns a list of customer objects, including contact details, balance, currency, and account metadata, along with a `hasMore` flag indicating additional records.


## Create Customer

Creates a new customer record in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Email | The customer's email address. | string | Required. |
    | Name | The customer's full name. | string | Required. |
    | Phone Number | The customer's phone number. | string | Optional. |
    | Description | A description of the customer. | string | Optional. |

=== "Output Parameters"

    Returns the created customer object, including the customer ID, contact details, balance, currency, and account metadata.


## Get Customer

Retrieves the details of an existing Stripe customer.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx) to retrieve.<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the customer object, including contact details, balance, currency, and account metadata.


## Update Customer

Updates an existing customer record in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx) to update.<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Required. |
    | Email | The updated email address for the customer. | string | Optional. |
    | Name | The updated name for the customer. | string | Optional. |
    | Phone Number | The updated phone number for the customer. | string | Optional. |
    | Description | The updated description for the customer. | string | Optional. |

=== "Output Parameters"

    Returns the updated customer object, including contact details, balance, currency, and account metadata.


## Delete Customer

Deletes an existing customer record from Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx) to delete.<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the deleted customer object, including the customer ID and a `deleted` confirmation flag.


## Create Coupon

Creates a new coupon in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | ID | The arbitrary unique coupon ID or code (e.g., SUMMER2024). | string | Required. |
    | Percent Off | The percentage discount to apply, between 0 and 100. Required if **Amount Off** is not provided. | integer | Optional. |
    | Amount Off | The discount amount in cents. Required if **Percent Off** is not provided. | integer | Optional. |
    | Currency | The currency for the discount. Required if **Amount Off** is provided. | string | Optional. |
    | Duration | How long the coupon applies. Supported values: <ul><li>`forever`</li><li>`once`</li><li>`repeating`</li></ul> | string | Optional. |
    | Duration in Months | The number of months the coupon applies. Required if Duration is set to **repeating**. | string | Optional. |
    | Name | A display name for the coupon. | string | Optional. |

=== "Output Parameters"

    Returns the created coupon object, including the coupon ID, discount details, duration, redemption count, and validity status.


## List Coupons

Retrieves a list of coupons from your Stripe account.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of coupons to return. Defaults to 10. | integer | Required. |

=== "Output Parameters"

    Returns a list of coupon objects, including discount details, duration, redemption count, and validity status, along with a `hasMore` flag indicating additional records.


## Create Payment Intent

Creates a new payment intent in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Amount | The payment amount in cents (e.g., 1000 = $10.00). | integer | Required. |
    | Currency | The three-letter ISO currency code (e.g., usd, eur, gbp). | string | Required. |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx) to associate with payment.<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Optional. |
    | Description | A description of the payment. | string | Optional. |

=== "Output Parameters"

    Returns the created payment intent object, including the payment intent ID, amount, currency, status, client secret, and capture and confirmation methods.


## Get Payment Intent

Retrieves the details of an existing Stripe payment intent.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Payment Intent ID | The Stripe payment intent ID (e.g., pi_xxxxx) to retrieve.<br/><br/>To get the payment intent ID, go to the **Transactions** > **Payments** page in the Stripe dashboard. The ID appears in the **Description** column. Alternatively, use [Create Payment Intent](/content/integrations/stripe-operations#create-payment-intent) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the payment intent object, including the amount, currency, status, customer ID, client secret, and capture and confirmation methods.


## Cancel Payment Intent

Cancels an existing Stripe payment intent.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Payment Intent ID | The Stripe payment intent ID (e.g., pi_xxxxx) to cancel.<br/><br/>To get the payment intent ID, go to the **Transactions** > **Payments** page in the Stripe dashboard. The ID appears in the **Description** column. Alternatively, use [Create Payment Intent](/content/integrations/stripe-operations#create-payment-intent) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the cancelled payment intent object, including the amount, currency, status, customer ID, and cancellation timestamp.


## List Charges

Retrieves a list of charges from your Stripe account.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of charges to return. Defaults to 10. | integer | Required. |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx) to list charges for.<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Optional. |

=== "Output Parameters"

    Returns a list of charge objects, including charge ID, amount, currency, status, payment details, and receipt URL, along with a `hasMore flag` indicating additional records.


## Create Charge

Creates a new charge in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Amount | The charge amount in cents. | integer | Required. |
    | Currency | The three-letter ISO currency code (e.g., usd, eur, gbp). | string | Required. |
    | Source | The payment source. Accepts a one-time token (`tok_…`), a saved card (`card_…`), or a saved bank account (`ba_…`) attached to a customer.<ul><li>In test mode, use Stripe's built-in test tokens (e.g., `tok_visa`, `tok_mastercard`, `tok_chargeDeclined`). No frontend needed.</li><li>In production, pass the token (tok_...) generated by [Stripe.js](https://docs.stripe.com/js/tokens/create_token?type=cardElement) when a customer enters their card details on your frontend.</li><li>Saved card/bank (`card_…` /` ba_…`): Must be used together with the `Customer` parameter.</li></ul>At least one of the parameters (**Source** or **Customer**) is required. | string | Optional. |
    | Customer | The Stripe Customer ID (`cus_…`) to charge.<ul><li>Use alone if the customer has a default payment method saved in Stripe.</li><li>Required when Source is a saved card (`card_…`) or bank account (`ba_…`).</li><li>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response.</li></ul>At least one of the parameters (**Source** or **Customer**) is required. | string | Optional. |
    | Description | A description of the charge. | string | Optional. |

=== "Output Parameters"

    Returns the created charge object, including the charge ID, amount, currency, status, payment details, and receipt URL.


## Update Charge

Updates an existing charge in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Charge ID | The Stripe charge ID (e.g., ch_xxxxx) to update.<br/><br/>To get the charge ID, go to the Transactions > Payments page in the Stripe dashboard. The ID appears in the Description column. Alternatively, use [List Charges](/content/integrations/stripe-operations#list-charges) and copy the `id` from the response. | string | Required. |
    | Description | The updated description for the charge. | string | Optional. |

=== "Output Parameters"

    Returns the updated charge object, including the charge ID, amount, currency, status, payment details, and receipt URL.


## Get Charge

Retrieves the details of an existing Stripe charge.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Charge ID | The Stripe charge ID (e.g., ch_xxxxx) to retrieve.<br/><br/>To get the charge ID, go to the Transactions > Payments page in the Stripe dashboard. The ID appears in the Description column. Alternatively, use [List Charges](/content/integrations/stripe-operations#list-charges) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the charge object, including the amount, currency, status, payment details, and receipt URL.


## Create Refund

Creates a refund for an existing Stripe charge.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Charge ID | The Stripe charge ID (e.g., ch_xxxxx) to refund.<br/><br/>To get the charge ID, go to the Transactions > Payments page in the Stripe dashboard. The ID appears in the Description column. Alternatively, use [List Charges](/content/integrations/stripe-operations#list-charges) and copy the `id` from the response. | string | Required. |
    | Amount | The refund amount in cents. Defaults to the full charge amount. | integer | Optional. |
    | Reason | The reason for the refund. Supported values: <ul><li>`duplicate`</li><li>`fraudulent`</li><li>`requested_by_customer`</li></ul> | string | Optional. |

=== "Output Parameters"

    Returns the created refund object, including the refund ID, amount, currency, status, and associated charge ID.


## Get Refund

Retrieves the details of an existing Stripe refund.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Refund ID | The Stripe refund ID (e.g., re_xxxxx). To get this value, use [Create Refund](/content/integrations/stripe-operations#create-refund) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the refund object, including the amount, currency, status, reason, and associated charge ID.


## Attach Payment Method

Attaches a payment method to an existing Stripe customer.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Payment Method ID | The Stripe payment method ID (e.g., pm_xxxxx).<br/><br/>To get the payment method ID, go to the **Customers** page, and select the customer, in the Stripe dashboard. Scroll to the **Payment methods** section, and click on the payment method; the ID is listed in the ID field. | string | Required. |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx) to attach the payment method to.<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Required. |

=== "Output Parameters"

    Returns the payment method object, including the payment method ID, type, customer ID, and livemode status.


## Get Payment Method

Retrieves the details of an existing Stripe payment method.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Payment Method ID | The Stripe payment method ID (e.g., pm_xxxxx).<br/><br/>To get the payment method ID, go to the **Customers** page, and select the customer, in the Stripe dashboard. Scroll to the **Payment methods** section, and click on the payment method; the ID is listed in the ID field. | string | Required. |

=== "Output Parameters"

    Returns the payment method object, including the payment method ID, type, customer ID, and livemode status.


## Detach Payment Method

Detaches a payment method from a Stripe customer.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Payment Method ID | The Stripe payment method ID (e.g., pm_xxxxx).<br/><br/>To get the payment method ID, go to the **Customers** page, and select the customer, in the Stripe dashboard. Scroll to the **Payment methods** section, and click on the payment method; the ID is listed in the ID field. | string | Required. |

=== "Output Parameters"

    Returns the detached payment method object, including the payment method ID, type, and a null `customerId` confirming detachment.


## Create Meter Event

Creates a meter event to record usage in Stripe.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Event Name | The event name configured for your meter in Stripe.<br/><br/>To get the event name, go to **Billing** > **Usage-based** > **Meters**, in the Stripe dashboard. The event name is listed in the **Event name** column. | string | Required. |
    | Customer ID | The Stripe customer ID (e.g., cus_xxxxx).<br/><br/>To get the customer ID, go to the customer page in the Stripe dashboard. The ID appears after `/customers/` in the URL (e.g., `https://dashboard.stripe.com/acctxxxx/test/customers/cus_UfjdzVYlGjM4Rg)`. Or to get this value programmatically, use [List Customers](/content/integrations/stripe-operations#list-customers) and copy the `id` from the response. | string | Required. |
    | Identifier | A unique idempotency key for the event. Re-submitting the same identifier will not double-count usage. | string | Optional. |
    | Value | The usage value to record (e.g., 1, 10). Required for sum, max, or average meters. Defaults to 1 for count meters. | string | Optional. |
    | Timestamp | The Unix timestamp of the event. Defaults to the current time if not provided. | integer | Optional. |

=== "Output Parameters"

    Returns the created meter event object, including the event name, identifier, timestamp, and livemode status.
