# Business Rule Task

This task help to evaluate business rules that are compiled in a spreadsheet.
Currently, csv, xls and xlsx file format are supported.


## Sample task definition

```
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

* ```ruleFileLocation``` is the url location for the rule file. The file can be available on the internet (for example, stored in AWS S3 or Azure Blob) or locally in Conductor server.
    * On the web:  ```https://example.com/rules.csv```
    * Sample AWS S3 file location can be ```https://business-rules.s3.amazonaws.com/rules.xlsx``` 
    * Sample Azure blob file location can be ```https://business-rules.blob.core.windows.net/rules/Date.xlsx``` 
    * If the file is stored in conductor server then url should be like ```file://opt/rules/Date.xlsx```

* ```executionStrategy``` is the execution strategy needs to be followed. Currently FIRE_ALL and FIRE_FIRST are supported.
  * FIRE_FIRST means the first rule which gets fired will be used to generate output. <br/>
  * FIRE_ALL means all the rules that get fired will be used to generate the output.<br/>


To understand the executionStrategy consider a table like below.<br/>
```
|   Name    |   Price   |
|   Phone   |   10$     |
|   Phone   |   11$     |
```
Lets assume the input Name is ```Phone``` <br/>
If we use FIRE_FIRST executionStrategy then output  Price will be 10$.<br/>
If we use FIRE_ALL executionStrategy then output Price will be 11$, as the second rule will overwrite the value of Price.<br/><br/>

* ```inputColumns``` is the input to the rule file. The input can be populated using some previous task or workflow input or static input.
 
* ```outputColumns``` is the list of columns that will be present in the task output. The columns which are not present in the outputColumns is considered to be the input columns and for all of such columns input values has to be provided.

### Operator support.
Below operators are supported.
1. Comparison operators for numeric value. ```<=,>=,=,<,>```
2. String equals/not equals operator. ```productName != Phone```
3. ```inList``` and ```!=inList``` operator. productName ```inList({"phone","laptop"})``` will match if productName is phone or laptop
4. createList operator for output. ```createList({"A","B","C"})``` will generate list ```{"A", "B", "C"}``` in output
5. Date comparison. Currently date formats yyyy-MM-dd, yyyy-MMM-dd and yyyy-MM-dd HH:mm:ss are supported.

## Configuring worker

### AWS S3 
Following properties needs to be given in order to pull the rule files from AWS S3.<br/>
```AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN and AWS_REGION```<br/>
The bucket-name and file-name will be populated from the ruleFileLocation. <br/>

### Azure Blob
Following properties needs to be given in order to pull the rule files from Azure Blob<br/>
```AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY ```<br/>
Container-name and file-name will be populated from the ruleFileLocation.

### Examples
Consider below rule file for the input.
```

productType |   productCategory |   purchaseDate            |   itemCount   |   price   |   Discount    |   ShippingCharges
electronics |       cellphone   |   <=2022-04-22            |       8       |   != 100  |       11%     |       5$
electronics |      laptop       |   > 2022-mar-12           |       >4      |   <1000.2 |       5%      |       4$
beauty      |      powder       |   = 2022-01-01            |       >10     |   >=10.3  |       15%     |       2$
food        |      pizza        |   < 2022-03-22 12:20:22   |       15      |   >300    |       7%      |       10$

```
and following workflow definition.
```
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
  if workflow is triggered using input as 
  ```
  {
        "productType": "electronics",
        "productCategory": "cellphone",
        "price": "5",
        "itemCount": "8",
        "purchaseDate": "2022-04-22"
  }
  ```
  then it will match the first row and geenrate output as
  ```
  {
      "Discount" : "11%",
      "ShippingCharges" : "5$"
  }
  ```

  ### Changing the rule file in Production
  Currently conductor server cache the rule file to expedite the rule processing. The period for the cache is defined by the parameter
  ```conductor.workers.business-rule.ttl-in-min```. It defaults to to 60 minutes currently. In case it is required to change the rule file in production
  and Conductor needs to pick the new file immediately then create a new rule file and change it and update the workflow definition accordingly. 
  This forces the Conductor cache to consume the new file immediately. 

