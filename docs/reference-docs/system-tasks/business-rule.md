---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rules Engine Execution

The Business Rule task allows the evaluation of business rules defined in spreadsheets. Supported formats include CSV, XLS, and XLSX.

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

| Attribute | Description |
| --------- | ----------- |
| ruleFileLocation | URL of the rule file to be evaluated. For example, files can be stored on the web, AWS S3, Azure Blob, etc.<br/>Example:<ul><li>On the web - https://example.com/rules.csv.</li><li>AWS S3 - https://business-rules.s3.amazonaws.com/rules.xlsx.</li><li>Azure blob - https://business-rules.blob.core.windows.net/rules/Date.xlsx.</li></ul> |
| executionStrategy | Strategy for rule execution. Supported options are:<ul><li>**FIRE_FIRST** - Uses the first rule that matches to generate the output.</li><li>**FIRE_ALL** - Uses all matching rules to generate the output, with subsequent rules overwriting previous values.</li></ul> | 
| inputColumns | Specifies the inputs to the rule file. Values can be derived from previous task/workflow input or static input. |
| outputColumns | List of columns that will be present in the task output. Columns not listed here are considered input columns whose values must be specified. |
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling, you can provide the following parameters:<ul><li>**ttlInSecond** - Provide the time to live in seconds. You can also pass this [parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li><li>**key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this [parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul> |
| optional | Enabling this option renders the task optional. The workflow continues unaffected by the task's outcome, whether it fails or remains incomplete. | 

#### Execution Strategy

To get an understanding of the **executionStrategy** (referred to as **_Method_** in UI), consider the below table:

| Name       | Price        |
|------------|--------------|
| Phone      | 10$          |
| Phone      | 11$          |

Let’s assume the input name is Phone. If the executionStrategy is **FIRE_FIRST**, then the output price will be $10. On the other hand, if the executionStrategy is **FIRE_ALL**, then the output price will be $11, as the second rule will overwrite the value of the price.

### Supported Operators

Business rule task supports the following operators:

1. **Comparison Operators**: <=, >=, =, <, >.
2. **String Operators**: Equals (=) and Not Equals (!=).
3. **List Operators**: **inList** and **!=inList**. For example, **_productName inList({"phone","laptop"}_**) will match if _productName_ is phone or laptop.
4. **Operator**: createList. For example, **createList({"A","B","C"})** will generate list **{"A", "B", "C"}** in output.
5. **Date Comparison**: Supported formats are **yyyy-MM-dd**, **yyyy-MMM-dd** and **yyyy-MM-dd HH:mm:ss**.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Business Rule`.
2. Configure the task with an input file and parameters.


</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-business-rule-task.png" alt="Adding Business Rule" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

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

Consider the following rule file:

```

productType |   productCategory |   purchaseDate            |   itemCount   |   price   |   Discount    |   ShippingCharges
electronics |       cellphone   |   <=2022-04-22            |       8       |   != 100  |       11%     |       5$
electronics |       cellphone   |   <=2022-04-22            |       8       |   < 100   |       13%     |       15$
electronics |      laptop       |   > 2022-mar-12           |       >10     |   <10.2   |       5%      |       4$
beauty      |      powder       |   = 2022-01-01            |       >15     |   >=10.3  |       15%     |       2$
food        |      pizza        |   < 2022-03-22 12:20:22   |       25      |   >300    |       7%      |       10$

```

The workflow definition is as follows:

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

If the workflow is triggered using the following input:

```json

    {
        "productType": "electronics",
        "productCategory": "cellphone",
        "price": "5",
        "itemCount": "8",
        "purchaseDate": "2022-04-22"
    }

```

It will match the first row and generate output as:

```json

    {
      "Discount" : "11%",
      "ShippingCharges" : "5$"
    }

```
Let’s see another case where the same workflow is triggered using the following input:

```json

    {
        "productType": "electronics",
        "productCategory": "laptop",
        "price": "10.0",
        "itemCount": "12",
        "purchaseDate": "2022-04-22"
    }

```

In order to compare double values, we should put the suffix .0. If it is not there, then it will match the third row and generate output as:

```json
    {
      "Discount" : "5%",
      "ShippingCharges" : "4$"
    }
```
When we use FIRE_ALL as executionStrategy, with the workflow input as:

 ```json
    {
        "productType": "electronics",
        "productCategory": "cellphone",
        "price": "5",
        "itemCount": "8",
        "purchaseDate": "2022-04-22"
    }
```
It matches the second row since it also matches the criteria and generates output as: 

```json
    {
      "Discount" : "13%",
      "ShippingCharges" : "5$"
    }
``` 
</details>