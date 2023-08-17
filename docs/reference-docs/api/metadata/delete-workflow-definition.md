---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remove the Workflow Definition

Remove the workflow defintion

## Input Payload

| Attribute | Description |
| --------- | -------------- |
| name      | The *name* of the workflow you want to retrieve definition of |
| version   | Choose the workflow version |

## API Endpoint

```
DELETE /api/metadata/workflow/{name}/{version}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
WorkflowDef OrkesMetadataClient.unregisterWorkflowDef(String name, Integer version) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (a *MetadataResourceApiService) UnregisterWorkflowDef(ctx context.Context, name string, version int32) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
metadata_client = MetadataResourceApi(api_client)
metadata_client.unregister_workflow_def(name, version, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void MetadataResourceApi.UnregisterWorkflowDef(string name, int? version)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
MatadataResourceService.unregisterWorkflowDef(name: string, version: number): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
MatadataResourceService.unregisterWorkflowDef(name: string, version: number): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(metadata/nregister-workflow-def options name version)
```

</TabItem>
</Tabs>
