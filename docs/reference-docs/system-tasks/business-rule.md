---
sidebar_position: 6
slug: "/reference-docs/system-tasks/business-rule"
description: "The Business Rule task is used to evaluate business rules defined in spreadsheets."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Business Rule

The Business Rule task allows the evaluation of business rules defined in spreadsheets. Supported formats include CSV, XLS, and XLSX. If a rule file lacks these extensions, it can also be processed if the `Content-Type` indicates a supported format.

The Business Rule task evaluates business rules using a specified rule file. The file can be stored locally on the web, AWS S3, Azure Blob, or elsewhere. The task supports different execution strategies, input columns, and output columns. The rules can be configured to apply various logical operations such as comparison, string, list, and date operations.


## Task parameters

Configure these parameters for the Business Rule task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParamemeter.**ruleFileLocation** | URL of the spreadsheet to be evaluated, in CSV, XLS, or XLSX format. The file can be stored on the web, AWS S3, Azure Blob, etc.<br/><br/>**Note:**A spreadsheet without an explicitly-defined .csv, .xls, or .xlsx extension can also be processed as long as its  the `Content-Type` indicates a supported format, such as a Google spreadsheet published to the web. | Required. | 
| inputParamemeter.**executionStrategy** | Strategy for rule execution. Supported types:<ul><li>**FIRE_FIRST**—Uses the first rule that matches to generate the output.</li><li>**FIRE_ALL**—Uses all matching rules to generate the output, with subsequent rules overwriting previous values.</li></ul> | Required. |
| inputParamemeter.**inputColumns** | The inputs to the rule file, which can be fixed or [passed as variables](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). Supports string, number, boolean, null, and object/array. | Required. | 
| inputParamemeter.**outputColumns** | List of columns that will be present in the task output. | Required. | 

### Execution Strategy

To understand the **executionStrategy** parameter, consider the following spreadsheet example:

| Name       | Price        |
|------------|--------------|
| Phone      | 10$          |
| Phone      | 11$          |

If the input name is "Phone":

- With `FIRE_FIRST`, the output price will be $10.
- With `FIRE_ALL`, the output price will be $11, as the second rule overwrites the first.

### Supported operators​

The Business Rule task supports the following operators:

* **Comparison operators**: <=, >=, =, <, >.
* **String operators**: Equals (=) and Not Equals (!=).
* **List Operators**: **inList** and **!=inList**.<br/> For example, **_productName inList({"phone","laptop"}_**) will match if _productName_ is phone or laptop.
* createList<br/>
For example, **createList({"A","B","C"})** will generate a list **{"A", "B", "C"}** in output.
* **Date comparison**: **yyyy-MM-dd**, **yyyy-MMM-dd** and **yyyy-MM-dd HH:mm:ss**.

## Task configuration

This is the task configuration for a Business Rule task.

```json
  {
    "name": "execute_rule",
    "taskReferenceName": "execute_rule_ref",
    "inputParameters": {
      "ruleFileLocation": "https://business-rules.s3.amazonaws.com/rules.xlsx",
      "executionStrategy": "FIRE_FIRST",
      "inputColumns": {
        "InputVariable1": "${workflow.input.InputVariable1}",
        "InputVariable2": "${workflow.input.InputVariable2}"
      },
      "outputColumns": [
        "OutputVariable1"
      ]
    },
    "type": "BUSINESS_RULE"
  }
```

## Task output

The Business rule task will return the following parameters.

| Parameter  | Description |
|------------|------------ |
| result | Contains the evaluated parameters based on the matching rule. The specific parameters inside the `result` object depend on the output columns specified in the task configuration.| 

## Adding a Business Rule task in UI

**To add a Business Rule task:**

1. In your workflow, select the (**+**) icon and add a **Business Rule** task.
2. Enter the URL of the file in **Rule file location**.
3. Select the **Execution strategy** for evaluating the file.
  - `FIRE_FIRST`—Uses the first rule that matches to generate the output.
  -  `FIRE_ALL`—Uses all matching rules to generate the output, with subsequent rules overwriting previous values.
4. Provide the **Input columns** and **Output columns**.

<center><p><img src="/content/img/ui-guide-business-rule-task.png" alt="Adding Business Rule" width="80%" height="auto"/></p></center>

## Examples

Here are some examples for using the Business Rule task.

<details><summary>Using Business Rule task in a workflow</summary>

 To illustrate the use of the Business Rule task in a workflow, consider the following rule file:

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
//workflow definition
   {
     "name": "TestRule",
     "tasks": [
       {
         "name": "rule",
         "taskReferenceName": "rule",
         "inputParameters": {
           "ruleFileLocation": "Product.xlsx",
           "executionStrategy": "FIRE_FIRST",
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

**Case 1**

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

To find the matching rule,

**Explanation:**

- **productType**: Matches "electronics", which corresponds to rules defined for electronics in the rule file (rows 1, 2, and 3).
- **productCategory**: Matches ``cellphone", narrowing down the applicable rules to those for electronics and cellphone (eliminating row 3).
- **purchaseDate**: Matches "<=2022-04-22" (April 22, 2022 is on or before April 22, 2022), applying to rules (matching rows 1 and 2).
- **itemCount**: Matches "8", which applies to rules requiring an itemCount of 8 (matching rows 1 and 2).
- **price**: Matches "!= 100" (5 is not equal to 100), specifically matching rules where the price is not equal to 100. Also matches “<100” where 5 is less than 100 (matching rows 1 and 2).

With the `FIRE_FIRST` execution strategy, the first rule that matches the input will be evaluated. Therefore, even though both the first and second rules match, the first rule is chosen for execution.

Consequently, the output generated is:

```json
    {
      "Discount" : "11%",
      "ShippingCharges" : "5$"
    }
```
**Case 2**

For a different case, if the workflow is triggered using the following input:

```json
 {
       "productType": "electronics",
       "productCategory": "laptop",
       "price": "10.0",
       "itemCount": "12",
       "purchaseDate": "2022-04-22"
   }
```

To find the matching rule,

**Explanation:**

- **productType**: Matches "electronics", which corresponds to rules defined for electronics in the rule file (rows 1, 2, and 3).
- **productCategory**: Matches "laptop", narrowing down the applicable rules to those for electronics and laptops (eliminating rows outside this category).
- **purchaseDate**: Matches "> 2022-mar-12" (The input purchase date April 22, 2022 is after March 12, 2022), applying to rules where the purchase date is after March 12, 2022.
- **price**: Matches "<10.2" (10.0 is less than 10.2).
- **itemCount**: Matches ">10" (12 is greater than 10).

Based on these conditions, the input meets the criteria defined by the third rule in the rule file (row 3). Therefore, the output generated is:

```json
    {
      "Discount" : "5%",
      "ShippingCharges" : "4$"
    }
```
**Case 3**

When using `FIRE_ALL` as the execution strategy, with the same input as **_Case 1_**:

 ```json
    {
        "productType": "electronics",
        "productCategory": "cellphone",
        "price": "5",
        "itemCount": "8",
        "purchaseDate": "2022-04-22"
    }
```
To find the matching rule,

**Explanation:**

- **productType**: Matches "electronics", which corresponds to rules defined for electronics in the rule file (rows 1, 2, and 3).
- **productCategory**: Matches ``cellphone", narrowing down the applicable rules to those for electronics and cellphone (eliminating row 3).
- **purchaseDate**: Matches "<=2022-04-22" (April 22, 2022 is on or before April 22, 2022), applying to rules where the purchase date is on or before April 22, 2022 (matching rows 1 and 2).
- **itemCount**: Matches "8", which applies to rules requiring an itemCount of 8 (matching rows 1 and 2).
- **price**: Matches "!= 100" (5 is not equal to 100), specifically matching rules where the price is not equal to 100. Also matches “<100” where 5 is less than 100 (matching rows 1 and 2).

With the `FIRE_ALL` execution strategy, all rules that match the input will be evaluated. In this case, both the first and second rules match the input criteria. However, according to the `FIRE_ALL` strategy, subsequent rules can overwrite the output values of previous rules if they also match the input.

Therefore, even though both the first and second rules match, the second rule is chosen for execution. 

Consequently, the output generated is:

```json
    {
      "Discount" : "13%",
      "ShippingCharges" : "5$"
    }
``` 
</details>