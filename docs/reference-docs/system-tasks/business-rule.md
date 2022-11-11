# Business Rule Task

```json
"type" : "BUSINESS_RULE"
```

## Introduction

Business rule task helps evaluate business rules compiled in spreadsheets. Conductor currently supports the following formats:
* CSV
* XLS
* XLSX

## Configurations

You can define the business rules in the workflow using the task type ```“BUSINESS_RULE”```.

A sample task definition for the business rule:

```json
{
"name": "execute_rule",
"taskReferenceName": "execute_rule",
"inputParameters": {
    "ruleFileLocation": "https://business-rules.s3.amazonaws.com/rules.xlsx",
    "executionStrategy": "FIRE_FIRST",
    "inputColumns": {
      "InputDate": "${workflow.input.inputDate}",
      "ProductType": "${workflow.input.productType}"
    },
    "outputColumns": [
      "Discount"
    ]
  },
"type": "BUSINESS_RULE"
}
```

## Input Parameters

| Attribute | Description |
| --------- | ----------- |
| ruleFileLocation | Specify the URL location of the rule file to be evaluated. The rule file can be available on the internet (Stored in AWS S3 or Azure Blob). <br/> Sample URL for each case; <ul><li>On the web:  ```https://example.com/rules.csv```</li><li>AWS S3 - ```https://business-rules.s3.amazonaws.com/rules.xlsx```</li><li>Azure blob - ```https://business-rules.blob.core.windows.net/rules/Date.xlsx```</li></ul> |
| executionStrategy | Specify the execution strategy to be followed. Currently, Conductor supports the following strategies: <br/><ul><li>**FIRE_FIRST** - The first rule which gets matched will be used to generate the output.</li><li>**FIRE_ALL** - All the rule that matches will be used to generate the output.</li></ul> |

To get an understanding of the execution Strategy, consider the below table: <br/>

| Name | Price |
| --------- | ----------- |
|   Phone   |   10$     |
|   Phone   |   11$     |

Let’s assume the input Name is Phone. If the executionStrategy is **FIRE_FIRST**, then the output price will be $10. On the other hand, if the executionStrategy is **FIRE_ALL**, then the output price will be $11, as the second rule will overwrite the value of the price.

| Attribute | Description |
| --------- | ----------- |
| inputColumns | Specifies the input to the rule file. It can be populated using previous task/workflow input/static input. | 
| outputColumns | Specifies the list of columns that will be present in the task output. The columns that are not present here are considered input columns whose values should be specified. | 

## Supported Operators

Business rule task supports the following operators:

1. Comparison operators for numeric value. ```<=,>=,=,<,>```.
2. String equals/not equals operator. ```productName != Phone```.
3. ```inList``` and ```!=inList``` operator. productName ```inList({"phone","laptop"})``` will match if productName is phone or laptop.
4. createList operator for output. ```createList({"A","B","C"})``` will generate list ```{"A", "B", "C"}``` in output.
5. Date comparison. Currently supported date formats are ```yyyy-MM-dd```, ```yyyy-MMM-dd``` and ```yyyy-MM-dd HH:mm:ss```.

## Configuring Worker

### AWS S3 

In order to pull the rules from AWS S3, the following properties need to be given.

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_SESSION_TOKEN 
* AWS_REGION

The bucket-name and file-name will be populated from the ruleFileLocation. 

### Azure Blob

In order to pull the rules from Azure Blob, the following properties need to be given.

* AZURE_STORAGE_ACCOUNT
* AZURE_STORAGE_ACCESS_KEY 

Container-name and file-name will be populated from the ruleFileLocation.

## Sample Workflow

Consider the below rule file for the input.

```

productType |   productCategory |   purchaseDate            |   itemCount   |   price   |   Discount    |   ShippingCharges
electronics |       cellphone   |   <=2022-04-22            |       8       |   != 100  |       11%     |       5$
electronics |      laptop       |   > 2022-mar-12           |       >4      |   <1000.2 |       5%      |       4$
beauty      |      powder       |   = 2022-01-01            |       >10     |   >=10.3  |       15%     |       2$
food        |      pizza        |   < 2022-03-22 12:20:22   |       15      |   >300    |       7%      |       10$

```
And following workflow definition.
```json
{
    "updateTime": 1646428577305,
    "name": "TestRule",
    "description": "Test Rule",
    "version": 1,
    "tasks": [
     {
      "name": "rule",
      "taskReferenceName": "rule",
      "inputParameters": {
      "ruleFileLocation": "Product.xlsx",
      "executionStrategy": "FIRE_FIRST",
      "ruleFileStorage" : "LOCAL",
      "ruleInput": {
        "productType": "${workflow.input.productType}",
        "productCategory": "${workflow.input.productCategory}",
        "price": "${workflow.input.price}",
        "itemCount": "${workflow.input.itemCount}",
        "itemCode": "${workflow.input.itemCode}"
      },
      "outputColumns": [
        "Discount",
        "ShippingCharges"
      ]
      },
      "type": "BUSINESS_RULE"
      }
    ],
    "inputParameters": [],
    "outputParameters": {
    },
    "schemaVersion": 2,
    "restartable": true,
    "workflowStatusListenerEnabled": false,
    "ownerEmail": "example@email.com",
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0,
    "variables": {},
    "inputTemplate": {}
  }
  ```
  If the workflow is triggered using input as: 
  ```json
  {
        "productType": "electronics",
        "productCategory": "cellphone",
        "price": "5",
        "itemCount": "8",
        "purchaseDate": "2022-04-22"
  }
  ```
  Then it will match the first row and generate output as: 
  ```json
  {
      "Discount" : "11%",
      "ShippingCharges" : "5$"
  }
  ```