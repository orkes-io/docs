
# API Processing Workflows - Example

The US Post Office has several APIs to simplify shipping. Let's look at how you can use Conductor to abstract the APIs - taking into account many important features. The USPS requests and responses are all XML, and these workflows manage the conversions so that the inputs and outputs are JSON.

## Workflow to Check Address - [check_address](https://github.com/conductor-sdk/conductor-examples/blob/main/US_post_office/check_address.json)

The USPS can verify 160M addresses in the USA.  This workflow either responds with the USPS version of the address (often in all CAPS), or with an error that the address was not found.


| [See it in Orkes Developer Edition](https://developers.orkes.cloud/workflowDef/check_address/1) |
|---------------------------------------------------------------------------------| 

:::note
This workflow requires a USPS username to be run.  Change the name of the workflow - to save it in your Playground, and add your USPS Username in the Set_USPS_Name task. The [API access is free](https://www.usps.com/business/web-tools-apis/).
:::

<p align="center"><img src="/content/img/check-address.jpg" alt="Document Approval Workflow" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Sample input:

 ```json
{
  "street": "100 Winchester Circle",
  "city": "Los Gatos",
  "state": "CA"
}
 ```

## Workflow to Check Postage Rates - [**postage_rate**](https://github.com/conductor-sdk/conductor-examples/blob/main/US_post_office/postage_rate.json)

Given a `toZip` and `fromZip`, and some dimensions of the box (and the shipping type), this workflow will output the price for that shipping type.

| [See it in Orkes Developer Edition](https://developers.orkes.cloud/workflowDef/postage_rate/1) |
|--------------------------------------------------------------------------------| 

:::note
This workflow requires a USPS username to be run.  Change the name of the workflow - to save it in your Playground, and add your USPS Username in the Set_USPS_Name task. The [API access is free](https://www.usps.com/business/web-tools-apis/).
:::

<p align="center"><img src="/content/img/postage-rate.jpg" alt="Document Approval Workflow" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Sample input:
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

Run this workflow multiple times inside a fork to obtain mailing rates for different services (E.g., compare ground vs. priority vs. express by calling this workflow asynchronously 3 times).