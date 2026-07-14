---
title: "Get User Form by Name and Version"
description: "Use the Orkes Conductor human tasks API to get User Form by Name and Version. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/human-tasks/get-user-form-by-name-version"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get User Form by Name and Version, Get User Form by Name and Version API, API orchestration, API gateway"
---

# Get User Form by Name and Version

## Quick reference

Use this human tasks endpoint to get User Form by Name and Version. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/human/template/{name}/{version}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/human/template/{name}/{version}`

Retrieves the user form associated with a Human task using its user form name and version.

## Path parameters

| Parameter | Description                                         | Type   | Required/ Optional |
| --------- | --------------------------------------------------- | ------ | ------------------ |
| name | The name of the user form to retrieve. | string | Required. | 
| version | The specific version of the user form to retrieve. | integer | Required.| 

## Response

Returns the specific user form for the Human task. 

## Examples

<details>
<summary>Get a user form using its name and version</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/human/template/LoanApproval/1' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns the user form associated with the specified Human task.

```json
{
  "createTime": 1755513469904,
  "updateTime": 1768559637142,
  "createdBy": "USER:john.doe@acme.com",
  "updatedBy": "USER:john.doe@acme.com",
  "name": "LoanApproval",
  "version": 1,
  "jsonSchema": {
    "$schema": "http://json-schema.org/draft-07/schema",
    "properties": {
      "loan_amount": {
        "type": "number"
      },
      "annual_income": {
        "type": "number"
      },
      "monthly_debt": {
        "type": "number"
      },
      "employment_status": {
        "type": "string"
      },
      "payment_history": {
        "type": "string"
      },
      "paperUrl": {
        "type": "string"
      },
      "approve": {
        "type": "string",
        "enum": [
          "Yes",
          "No"
        ]
      },
      "comments": {
        "type": "string"
      }
    },
    "required": [
      "approve",
      "comments"
    ]
  },
  "templateUI": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Group",
        "label": "Loan Application Details",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/loan_amount",
            "label": "Loan Amount",
            "options": {
              "readonly": true
            }
          },
          {
            "type": "Control",
            "scope": "#/properties/annual_income",
            "label": "Annual Income",
            "options": {
              "readonly": true
            }
          },
          {
            "type": "Control",
            "scope": "#/properties/monthly_debt",
            "label": "Monthly Debt",
            "options": {
              "readonly": true
            }
          },
          {
            "type": "Control",
            "scope": "#/properties/employment_status",
            "label": "Employment Status",
            "options": {
              "readonly": true
            }
          },
          {
            "type": "Control",
            "scope": "#/properties/payment_history",
            "label": "Payment History",
            "options": {
              "readonly": true
            }
          },
          {
            "type": "Control",
            "scope": "#/properties/paperUrl",
            "label": "Supporting Documents",
            "options": {
              "readonly": true
            }
          }
        ]
      },
      {
        "type": "Group",
        "label": "Reviewer Decision",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/approve",
            "label": "Approve Loan?"
          },
          {
            "type": "Control",
            "scope": "#/properties/comments",
            "label": "Reviewer Comments"
          }
        ]
      }
    ]
  }
}
```

</details>

## Related pages

- [Human Task](/content/reference-docs/api/human-tasks)
- [Get Human Task](/content/reference-docs/api/human-tasks/get-task)
- [Get Conductor Task by Human Task ID](/content/reference-docs/api/human-tasks/get-conductor-task-by-human-task-id)
- [Claim Task (Conductor User)](/content/reference-docs/api/human-tasks/claim-task-conductor-user)
- [Claim Task (External/All Users)](/content/reference-docs/api/human-tasks/claim-task-external-user)
- [Reassign Human Task](/content/reference-docs/api/human-tasks/reassign-human-task)
