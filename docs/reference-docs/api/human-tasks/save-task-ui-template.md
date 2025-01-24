---
sidebar_position: 11
slug: "/reference-docs/api/human-tasks/save-task-ui-template"
description: "This API is used to save a Human task user form."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save User Form

**Endpoint:** `POST /api/human/template`

Saves a user form in the Conductor server.

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| newVersion | Whether to save the user form as a new version. Default is false. <br/><br/> **Note:** If the version number is specified in the request body, it will take precedence even if _newVersion_ is set to false. | string | Required. |

## Request body

Format the request as an object containing the user form JSON schema.

## Response

Returns the updated user form.

## Examples

<details><summary>Save a user form</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/template' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "createTime": 1736938081924,
  "updateTime": 1736938081924,
  "createdBy": "USER:user@example.com",
  "updatedBy": "USER:user@example.com",
  "name": "someForm",
  "jsonSchema": {
    "$schema": "http://json-schema.org/draft-07/schema",
    "properties": {
      "vegetable": {
        "type": "string",
        "enum": [
          "potatoes",
          "carrots",
          "celery"
        ]
      }
    }
  },
  "templateUI": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/vegetable",
        "label": "Pick one",
        "options": {}
      }
    ]
  }
}'
```

**Response**

``` json
{
  "createTime": 1736938081924,
  "updateTime": 1736938081924,
  "createdBy": "USER:user@example.com",
  "updatedBy": "USER:user@example.com",
  "name": "someForm",
  "version": 1,
  "jsonSchema": {
    "$schema": "http://json-schema.org/draft-07/schema",
    "properties": {
      "vegetable": {
        "type": "string",
        "enum": [
          "potatoes",
          "carrots",
          "celery"
        ]
      }
    }
  },
  "templateUI": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/vegetable",
        "label": "Pick one",
        "options": {}
      }
    ]
  }
}
```

</details>


<details><summary>Save a user form as a new version</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/template?newVersion=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "createTime": 1736938081924,
  "updateTime": 1736938081924,
  "createdBy": "USER:user@example.com",
  "updatedBy": "USER:user@example.com",
  "name": "someForm",
  "jsonSchema": {
    "$schema": "http://json-schema.org/draft-07/schema",
    "properties": {
      "vegetable": {
        "type": "string",
        "enum": [
          "potatoes",
          "carrots",
          "celery",
          "apple",
          "banana"
        ]
      }
    }
  },
  "templateUI": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/vegetable",
        "label": "Pick a vegetable or fruit",
        "options": {}
      }
    ]
  }
}'
```

**Response**

``` json
{
  "createTime": 1736938081924,
  "updateTime": 1736938081924,
  "createdBy": "USER:user@example.com",
  "updatedBy": "USER:user@example.com",
  "name": "someForm",
  "version": 2,
  "jsonSchema": {
    "$schema": "http://json-schema.org/draft-07/schema",
    "properties": {
      "vegetable": {
        "type": "string",
        "enum": [
          "potatoes",
          "carrots",
          "celery",
          "apple",
          "banana"
        ]
      }
    }
  },
  "templateUI": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/vegetable",
        "label": "Pick one",
        "options": {}
      }
    ]
  }
}
```
</details>