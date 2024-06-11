---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JDBC Task

A JDBC task is a system task used to execute or store information in SQL databases.

## Definitions

```json
   {
     "name": "jdbc",
     "taskReferenceName": "jdbc_ref",
     "inputParameters": {
       "integrationName": "db-001",
       "statement": "SELECT * FROM tableName WHERE id=?",
       "parameters": [
         "${workflow.input.text}"
       ],
       "type": "SELECT"
     },
     "type": "JDBC",
     "cacheConfig": {
       "ttlInSecond": 3600,
       "key": "key"
     },
     "optional": false
   }
```

## Input Parameters

| Attribute | Description |
| ---------- | ----------- |
| integrationName | Choose the required database integration. You can only choose the integration to which you have access here.<br/><br/>**Note**: If you haven’t configured your database on your Orkes console, navigate to the **Integrations** tab and configure the integration under “**RDBMS > Relational Database**”.|
| type | Indicates the SQL statement type. It can take 2 values: SELECT or UPDATE.<br/><br/><ul><li>**SELECT** - Used to retrieve data from a database.</li><li>**UPDATE** - Used to modify existing data from the database.<ul><li>**Expected update count** - If you have chosen ‘UPDATE’ as the statement type, provide the number of rows to be updated in the database.</li></ul></li></ul>|
| statement | Provide the SQL statement to retrieve data from the SQL database. <br/><br/>Example: **SELECT * FROM tableName WHERE id=?**, a query used to retrieve data from a table in a database. Replace **tableName** with the actual table name. |
| parameters | Provide the query parameters to be bound by the SQL statement. It can be a string, number, boolean, or null. | 
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling, you can provide the following parameters:<ul><li>**ttlInSecond** - Provide the time to live in seconds. You can also pass [this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li><li>**key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul>|
| optional | Enabling this option renders the task optional. The workflow continues unaffected by the task's outcome, whether it fails or remains incomplete. | 

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **JDBC**.
2. Choose the integration name.
3. Choose the Statement Type.
4. Provide the SQL statement & Query parameters.


</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/jdbc-worker-task.png" alt="Adding HTTP Poll Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
   {
     "name": "jdbc",
     "taskReferenceName": "jdbc_ref",
     "inputParameters": {
       "integrationName": "db-001",
       "statement": "SELECT * FROM tableName WHERE id=?",
       "parameters": [
         "${workflow.input.text}"
       ],
       "type": "SELECT"
     },
     "type": "JDBC",
     "cacheConfig": {
       "ttlInSecond": 3600,
       "key": "key"
     },
     "optional": false
   }
```

</TabItem>
</Tabs>