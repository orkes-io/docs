---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JDBC Task

The JDBC task is used to execute or store information in SQL databases. It allows workflows to interact with SQL databases, enabling data retrieval and updates based on specified SQL queries.

A JDBC task evaluates SQL statements and parameters and can execute different SQL operations, such as SELECT or UPDATE. Based on the defined SQL statements and parameters, the appropriate database operations are carried out. 


## Task parameters

Configure these parameters for the JDBC task.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| inputParamters. **integrationName** | Select the required database integration which you have access to. If your database isn't configured on your Orkes console, go to the **Integrations** tab and configure it under **[RDBMS > Relational Database](https://orkes.io/content/integrations/rdbms/relational-database)**. | Required. |
| inputParamters. **type** | Select the SQL statement type. Supported values:<ul><li>**SELECT**—Used to retrieve data from a database.</li><li>**UPDATE / DELETE**—Used to modify or delete existing data from the database.</li></ul>| Required. |
| inputParameters. **expectedUpdateCount** | The number of rows to be updated/deleted from the database.	| Required if the statement type is chosen as ‘UPDATE/DELETE’. | Required. |
| inputParameters. **statement** | The SQL statement to retrieve data from the SQL database. | Required. |
| inputParameters. **parameters** | The query parameters to be bound by the SQL statement. It can be a string, number, boolean, or null. | Required. |

## Task configuration

This is the task configuration for a JDBC task.

```json
   {
     "name": "jdbc",
     "taskReferenceName": "jdbc_ref",
     "inputParameters": {
       "integrationName": "db-name",
       "statement": "SELECT * FROM tableName WHERE id=?",
       "parameters": [
         "${workflow.input.text}"
       ],
       "type": "SELECT"
     }
   }
```

## Task output

The JDBC task will return the following parameters.

| Parameter | Description | 
| --------- | ----------- | 
| result | An array of data queried from the database. | 

## Adding a JDBC task in UI

**To add a JDBC task:**

1. In your workflow, select the (**+**) icon and add a **JDBC** task.
2. In **Integration name**, select the integration to be used.
3. Choose the **Statement type** as SELECT or UPDATE/DELETE.
4. Enter the **Expected update count** if the statement type is UPDATE/DELETE.
5. Enter the **Statement** to be queried and the **Query parameters**.

<center><p><img src="/content/img/jdbc-worker-task.png " alt="Adding JDBC task" width="80%" height="auto"/></p></center>


## Examples
Here are some examples for using the JDBC task.

<details><summary>Retrieving data</summary>

In this example, the JDBC task is used to retrieve customer data from a database called myApp. The Select SQL statement type is used, along with the statement “SELECT * FROM customers”.

``` json
{
  "name": "jdbc",
  "taskReferenceName": "jdbc_ref",
  "inputParameters": {
    "integrationName": "myApp",
    "statement": "SELECT * FROM customers",
    "parameters": [],
    "type": "SELECT"
  },
  "type": "JDBC"
}
```

Upon completion, the JDBC task will return the customer data in the `result` array.

``` json
{
  "result": [
    {
      "name": "c4ca4238a0",
      "id": 1,
      "value": 0.8000853
    },
    {
      "name": "c81e728d9d",
      "id": 2,
      "value": 0.5992253
    },
    {
      "name": "eccbc87e4b",
      "id": 3,
      "value": 0.50512415
    },
    {
      "name": "a87ff679a2",
      "id": 4,
      "value": 0.3834899
    },
    {
      "name": "e4da3b7fbb",
      "id": 5,
      "value": 0.38542742
    },
    {
      "name": "1679091c5a",
      "id": 6,
      "value": 0.63664705
    },
    {
      "name": "8f14e45fce",
      "id": 7,
      "value": 0.6443781
    },
    {
      "name": "c9f0f895fb",
      "id": 8,
      "value": 0.81284344
    },
    {
      "name": "45c48cce2e",
      "id": 9,
      "value": 0.31227082
    },
    {
      "name": "d3d9446802",
      "id": 10,
      "value": 0.6765504
    }
  ]
}
```
</details>