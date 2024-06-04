---
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transformation using JQ

The JSON_JQ_TRANSFORM task is a System task that allows the processing of JSON data that is supplied to the task by using the popular JQ processing tool’s query expression language.

## Definitions

```json
{
  "name": "jq_example_task",
  "taskReferenceName": "my_jq_example_task_ref",
  "type": "JSON_JQ_TRANSFORM",
  "inputParameters": {
    "key1": {
      "value1": [
        "a",
        "b"
      ]
    },
    "key2": {
      "value2": [
        "c",
        "d"
      ]
    },
    "queryExpression": "{ key3: (.key1.value1 + .key2.value2) }"
  }
}
```

### Input Parameters

| Attribute                           | Description                                                                                                                                                                                                                                                                   |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| inputParameters                     | The input parameters that will be supplied to this task. The parameters will be a JSON object of at least 2 attributes, one of which will be called **queryExpression**. The others are user-named attributes. These attributes will be accessible by the JQ query processor. |
| inputParameters/user-defined-key(s) | User-defined key(s) along with values.                                                                                                                                                                                                                                        |
| inputParameters/queryExpression     | A JQ query expression.                                                                                                                                                                                                                                                        |

### Output Parameters
| Attribute  | Description                                                                  |
|------------|------------------------------------------------------------------------------|
| result     | The first results returned by the JQ expression.                             |
| resultList | A List of results returned by the JQ expression.                             |
| error      | An optional error message indicating that the JQ query failed to process.    |

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `JSON JQ TRANSFORM`.
2. Configure the JQ script and the input.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-jq-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
    {
      "name": "json_transform_task_iw67r_ref",
      "taskReferenceName": "json_transform_task_iw67r_ref",
      "type": "JSON_JQ_TRANSFORM",
      "inputParameters": {
        "persons": [
          {
            "name": "some",
            "last": "name",
            "email": "mail@mail.com",
            "id": 1
          },
          {
            "name": "some2",
            "last": "name2",
            "email": "mail2@mail.com",
            "id": 2
          }
        ],
        "queryExpression": ".persons | map({user:{email,id}})"
      }
    }
```

</TabItem>
</Tabs>


<details><summary>Sample Workflow</summary>
<p>

```json
    {
      "name": "jq_example_task",
      "taskReferenceName": "my_jq_example_task_ref",
      "type": "JSON_JQ_TRANSFORM",
      "inputParameters": {
        "key1": {
          "value1": [
            "a",
            "b"
          ]
        },
        "key2": {
          "value2": [
            "c",
            "d"
          ]
        },
        "queryExpression": "{ key3: (.key1.value1 + .key2.value2) }"
      }
    }
```

The inputParameters attribute is expected to have a value object with the following:

1. A list of key-value pair objects denoted key1/value1, key2/value2 in the example. Note the key1/value1 are arbitrary names used in this example.
2. A key with the name **queryExpression**, whose value is a JQ expression. The expression will operate on the value of the **inputParameters attribute**. In this example, the **inputParameters** have two inner objects named by attributes **key1** and **key2**, each of which has an object that is named **value1** and **value2**. They have an associated array of strings as values, **"a"**, **"b"** and **"c"**, **"d"**. The expression **key3: (.key1.value1 + .key2.value2)** concatenates the 2 string arrays into a single array against an attribute named **key3**.

The execution of this example task above will provide the following output. The **resultList** attribute stores the full list of the **queryExpression** result. The **result** attribute stores the first element of the resultList. An optional **error** attribute along with a string message will be returned if there is an error processing the query expression.

```json
    {
      "result": {
        "key3": [
          "a",
          "b",
          "c",
          "d"
        ]
      },
      "resultList": [
        {
          "key3": [
            "a",
            "b",
            "c",
            "d"
          ]
        }
      ]
    }
```
</p>
</details>

<details><summary>Cleaning up a JSON response</summary>
<p>
An HTTP Task makes an API call to GitHub to request a list of "stargazers" (users who have starred a repository). The API response (for just one user) looks like this:

The snippet of **${hundred_stargazers_ref.output}**

```json
    [
      {
        "starred_at": "2016-12-14T19:55:46Z",
        "user": {
          "login": "lzehrung",
          "id": 924226,
          "node_id": "MDQ6VXNlcjkyNDIyNg==",
          "avatar_url": "https://avatars.githubusercontent.com/u/924226?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/lzehrung",
          "html_url": "https://github.com/lzehrung",
          "followers_url": "https://api.github.com/users/lzehrung/followers",
          "following_url": "https://api.github.com/users/lzehrung/following{/other_user}",
          "gists_url": "https://api.github.com/users/lzehrung/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/lzehrung/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/lzehrung/subscriptions",
          "organizations_url": "https://api.github.com/users/lzehrung/orgs",
          "repos_url": "https://api.github.com/users/lzehrung/repos",
          "events_url": "https://api.github.com/users/lzehrung/events{/privacy}",
          "received_events_url": "https://api.github.com/users/lzehrung/received_events",
          "type": "User",
          "site_admin": false
        }
      }
    ]
```
We only need the **starred_at** and **login** parameters for users who starred the repository after a given date (provided as an input to the workflow **${workflow.input.cutoff_date}**). We'll use the JQ Transform to simplify the output:

```json
    {
      "name": "jq_cleanup_stars",
      "taskReferenceName": "jq_cleanup_stars_ref",
      "inputParameters": {
        "starlist": "${hundred_stargazers_ref.output.response.body}",
        "queryExpression": "[.starlist[] | select (.starred_at > \"${workflow.input.cutoff_date}\") |{occurred_at:.starred_at, member: {github:  .user.login}}]"
      },
      "type": "JSON_JQ_TRANSFORM"
    }
```

The JSON is stored in **starlist**. The **queryExpression** reads in the JSON, selects only entries where the **starred_at** value meets the date criteria, and generates output JSON of the form:
```json
    {
      "occurred_at": "date from JSON",
      "member": {
        "github": "github Login from JSON"
      }
    }
```
The entire expression is wrapped in [] to indicate that the response should be an array.
</p>
</details>