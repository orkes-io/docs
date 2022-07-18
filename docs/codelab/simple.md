# A simple 2-step workflow

Here's a simple 2 step Workflow.  For more details on how this works, see the [sequential HTTP tasks](/content/docs/codelab/sequentialHTTPtasks) codelab.

## Workflow definition

```json
{
  "name": "simple_two_step_workflow",
  "description": "a simple 2 step workflow",
  "version": 1,
  "tasks": [
    {
      "name": "Get_IP",
      "taskReferenceName": "get_IP_ref",
      "inputParameters": {
        "http_request": {
          "uri": "http://ip-api.com/json/${workflow.input.ipaddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,query",
          "method": "GET"
        }
      },
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "retryCount": 3
    },
    {
      "name": "Get_weather",
      "taskReferenceName": "get_weather_ref",
      "inputParameters": {
        "zip_code": "${get_IP_ref.output.response.body.zip}",
        "http_request": {
          "uri": "https://weatherdbi.herokuapp.com/data/weather/${get_IP_ref.output.response.body.zip}",
          "method": "GET",
          "connectionTimeOut": 2000,
          "readTimeOut": 2000
        }
      },
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }
  ],
  "inputParameters": [],
  "outputParameters": {
    "zipcode": "${get_IP_ref.output.response.body.zip}",
    "forecast": "${get_weather_ref.output.response.body.currentConditions.comment}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "devrel@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}
```

## Create the workflow

In [Orkes Playground](https://play.orkes.io), click `Workflow Definition`, and then `Define Workflow`.  Paste in the JSON above. (you'll need a unique workflow name.)