# Rate Limit Workflow

The **workflow rate limit** limits the number of workflow executions at any given time. Workflow triggered after exceeding the rate limit will get queued based on the trigger time.

## API Endpoint

Below is the sample curl command to assign a rate limit tag to the workflow:

```shell
curl -X 'POST' \
  'https://your_conductor_server_url/api/metadata/workflow/<WORKFLOW_NAME>/tags' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  	"key": "<YOUR_WORKFLOW_NAME>",
  	"type": "RATE_LIMIT",
  	"value": 5 // concurrent execution limit for this workflow
}'
```

Here the execution limit is set as 5, which means that no more than 5 workflows will be allowed to execute at any given time. You can change this to the required limit.