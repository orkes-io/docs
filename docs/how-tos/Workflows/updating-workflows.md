---
sidebar_position: 1
---

# Updating Workflow Definitions

The easiest way to update a workflow is via the Conductor UI. Select a workflow from the workflow definitions list and edit the JSON directly in the browser. Press save when you have completed your edits, and the diagram will update accordingly.

![updating a workflow via the UI](/img/workflow_update.jpg)

## Via API

Workflows can be created or updated using the workflow metadata API

```html
PUT /api/metadata/workflow
```

### Example using curl 

```shell
curl 'http://localhost:8080/api/metadata/workflow' \
  -X 'PUT' \
  -H 'accept: */*' \
  -H 'content-type: application/json' \
  --data-raw '[{"name":"sample_workflow","version":1,"tasks":[{"name":"ship_via_fedex","taskReferenceName":"ship_via_fedex","type":"SIMPLE"}],"schemaVersion":2}]'
```

### Example using node fetch

```javascript
fetch("http://localhost:8080/api/metadata/workflow", {
  "headers": {
    "accept": "*/*",
    "content-type": "application/json"
  },
  "body": "[{\"name\":\"sample_workflow\",\"version\":1,\"tasks\":[{\"name\":\"ship_via_fedex\",\"taskReferenceName\":\"ship_via_fedex\",\"type\":\"SIMPLE\"}],\"schemaVersion\":2}]",
  "method": "PUT"
});
```
## Best Practices

1. If you are updating the workflow with new tasks, remember to register the task definitions first
2. You can also use the Conductor Swagger UI to update the workflows 

