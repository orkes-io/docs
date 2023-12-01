---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JDBC Task

A JDBC task is a system task used to execute or store information in MySQL. 

## Definitions

```json
{
"name": "jdbc_test",
"description": "Edit or extend this sample workflow. Set the workflow name to get started",
"version": 1,
"tasks": [
{
"name": "jdbc_task",
"taskReferenceName": "jdbc_task",
"inputParameters": {
"connectionId": "",
"statement": "",
"parameters": [],
"type": "SELECT"
},
"type": "JDBC",
}
]
}
```

## Input Parameters

| Attributes | Description |
| ---------- | ----------- |
| connectionId | Provide the connection ID to establish a connection with the SQL database. <br/><br/>For example: **postgres://postgres@localhost/testdb** |
| statement | Provide the SQL statement to retrieve data from the SQL database. <br/><br/>An example statement would be **`SELECT * FROM tableName WHERE id=?`**, a query used to retrieve data from a table in a database. Replace **tableName** with the table name from which you want to retrieve data. |
| type | Indicates the SQL statement type. It can take 2 values, SELECT or UPDATE.<br/><br/><ul><li>**SELECT** - Used to retrieve data from a database.</li><li>**UPDATE** - Used to modify existing data from the database.<ul><li>**expectedUpdateCount** - If you have chosen ‘UPDATE’ as the statement type, provide the number of rows you need to update in the database.</li></ul></li></ul>|
| parameters | Provide the query parameters to be bound with the SQL statement. It can be a string, number, boolean, or null. | 
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling you can provide the following parameters:<ul><li>**TTL (in seconds)** - Provide the time to live in seconds.You can also pass this parameter as variables.</li><li>**Cache Key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this parameter as variables.</li></ul>|

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `JDBC`.
2. Provide the Connection ID.
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
 <TabItem value="JSON" label="JSON Example">

```json
    {
"name": "jdbc_test",
"description": "Edit or extend this sample workflow. Set the workflow name to get started",
"version": 1,
"tasks": [
{
"name": "jdbc_task",
"taskReferenceName": "jdbc_task",
"inputParameters": {
"connectionId": "postgres://postgres@localhost/testdb",
"statement": "SELECT * FROM orkes",
"parameters": [],
"type": "SELECT"
},
"type": "JDBC",
}
]
}
```

</TabItem>
</Tabs>