---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remove the Workflow Definition

The API to remove/delete the workflow definition.

## Input Payload

| Attribute | Description |
| --------- | -------------- |
| name      | The *name* of the workflow you want to delete.|
| version   | The version of the workflow to be deleted. |

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
<TabItem value="Go" label="Go">

```go
func (a *MetadataResourceApiService) UnregisterWorkflowDef(ctx context.Context, name string, version int32) (*http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.unregister_workflow_def(name, version, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void MetadataResourceApi.UnregisterWorkflowDef(string name, int? version)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

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
