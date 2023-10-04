---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rules Engine Execution

Business rule task helps evaluate business rules compiled in spreadsheets. Conductor currently supports the following formats:
* CSV
* XLS
* XLSX

## Definitions

 ```json

    {
      "name": "execute_rule",
      "taskReferenceName": "execute_rule_ref",
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

### Input Parameters

| Attribute         | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ruleFileLocation  | Specify the URL location of the rule file to be evaluated. The rule file can be available on the internet (Stored in AWS S3 or Azure Blob). <br/> Sample URL for each case; <ul><li>On the web:  ```https://example.com/rules.csv```</li><li>AWS S3 - ```https://business-rules.s3.amazonaws.com/rules.xlsx```</li><li>Azure blob - ```https://business-rules.blob.core.windows.net/rules/Date.xlsx```</li></ul> |
| executionStrategy | Specify the execution strategy to be followed. Currently, Conductor supports the following strategies: <br/><ul><li>**FIRE_FIRST** - The first rule which gets matched will be used to generate the output.</li><li>**FIRE_ALL** - All the rule that matches will be used to generate the output.</li></ul>                                                                                                      |
| inputColumns      | Specifies the input to the rule file. It can be populated using previous task/workflow input/static input.                                                                                                                                                                                                                                                                                                       | 
| outputColumns     | Specifies the list of columns that will be present in the task output. The columns that are not present here are considered input columns whose values should be specified.                                                                                                                                                                                                                                      | 

#### Execution Strategy
To get an understanding of the **execution Strategy**, consider the below table: 

| Name       | Price        |
|------------|--------------|
| Phone      | 10$          |
| Phone      | 11$          |

Let’s assume the input Name is Phone. If the executionStrategy is **FIRE_FIRST**, then the output price will be $10. On the other hand, if the executionStrategy is **FIRE_ALL**, then the output price will be $11, as the second rule will overwrite the value of the price.

### Supported Operators

Business rule task supports the following operators:

1. Comparison operators for numeric value. **<=,>=,=,<,>**.
2. String equals/not equals operator. **productName != Phone**.
3. **inList** and **!=inList** operator. productName **inList({"phone","laptop"})** will match if productName is phone or laptop.
4. createList operator for output. **createList({"A","B","C"})** will generate list **{"A", "B", "C"}** in output.
5. Date comparison. Currently supported date formats are **yyyy-MM-dd**, **yyyy-MMM-dd** and **yyyy-MM-dd HH:mm:ss**.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Business Rule`.
2. Configure the task with rules input file.
3. Input and output columns.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-business-rule-task.png" alt="Adding Business Rule" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json

    {
      "name": "execute_rule",
      "taskReferenceName": "execute_rule_ref",
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

</TabItem>
</Tabs>


<details><summary>Sample Workflow</summary>

Consider the below rule file for the input.

```

productType |   productCategory |   purchaseDate            |   itemCount   |   price   |   Discount    |   ShippingCharges
electronics |       cellphone   |   <=2022-04-22            |       8       |   != 100  |       11%     |       5$
electronics |       cellphone   |   <=2022-04-22            |       8       |   < 100   |       13%     |       15$
electronics |      laptop       |   > 2022-mar-12           |       >10     |   <10.2   |       5%      |       4$
beauty      |      powder       |   = 2022-01-01            |       >15     |   >=10.3  |       15%     |       2$
food        |      pizza        |   < 2022-03-22 12:20:22   |       25      |   >300    |       7%      |       10$

```

And following workflow definition.

```json

    {
      "name": "TestRule",
      "tasks": [
        {
          "name": "rule",
          "taskReferenceName": "rule",
          "inputParameters": {
            "ruleFileLocation": "Product.xlsx",
            "executionStrategy": "FIRE_FIRST",
            "ruleFileStorage": "LOCAL",
            "inputColumns": {
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
      ]
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
**Another Case**

 If the workflow is triggered using input as: 

```json

    {
        "productType": "electronics",
        "productCategory": "laptop",
        "price": "10.0",
        "itemCount": "12",
        "purchaseDate": "2022-04-22"
    }

```

In order to compare double values, we should put the suffix **.0**. If it is not there, then it will match the third row and generate output as: 

```json
    {
      "Discount" : "5%",
      "ShippingCharges" : "4$"
    }
```
 When we use **FIRE_ALL** as **executionStrategy**, with the workflow input as:
 ```json
    {
        "productType": "electronics",
        "productCategory": "cellphone",
        "price": "5",
        "itemCount": "8",
        "purchaseDate": "2022-04-22"
    }
```
Then it will match the second row since it also matches the criteria and generates output as: 
```json
    {
      "Discount" : "13%",
      "ShippingCharges" : "5$"
    }
``` 
</details>