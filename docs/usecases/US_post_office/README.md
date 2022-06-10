# US Post Office Workflows

The US Post Office has a number of APIs to simplify shipping.

The workflows below further abstract the APIs - taking account of many important features. The USPS requests and responses are all XML, and these workflows manage the conversions so that the inputs and outputs are JSON.

1. [**check_address**](https://github.com/conductor-sdk/conductor-examples/blob/main/US_post_office/check_address.json).  The USPS can verify 160M addresses in the USA.  This workflow wither either respond with the USPS version of the address (often in all CAPS), or with an error that the address was not found.

Sample input:

 ```json
{
  "street": "100 Winchester Circle",
  "city": "Los Gatos",
  "state": "CA"
}
 ```


2. [**postage_rate**](https://github.com/conductor-sdk/conductor-examples/blob/main/US_post_office/postage_rate.json) given a toZip and fromZip, and some dimensions of the box (and the shipping type), this workflow will output the price for that shipping type.

sample input:
```json
{
  "service": "priority",
  "zipFrom": "04046",
  "zipTo": "98260",
  "pounds": 20,
  "ounces": 0,
  "container": "variable",
  "width": 12,
  "height": 12,
  "length": 12
}
```

Run this workflow multiple times inside a fork to obtain mailing rates for different services (e.g. compare ground vs. priority vs express by calling this workflow asynchronously 3 times).