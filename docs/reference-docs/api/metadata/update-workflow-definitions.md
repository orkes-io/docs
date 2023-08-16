---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflow Definition

Used to retrieve a workflow definition.

## Input Payload

| Attribute | Description |
| --------- | -------------- |
| name      | The *name* of the workflow you want to retrieve definition of |
| version   | Choose the workflow version |
| metadata  | Get with metadata |

## API Endpoint

```
GET /api/metadata/workflow/{name}?version=<version>&metadata=false
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
WorkflowDef OrkesMetadataClient.getWorkflowDef(String name, Integer version)
WorkflowDef OrkesMetadataClient.getWorkflowDefWithMetadata(String name, Integer version) 
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (*MetadataResourceApiService) Get(ctx context.Context, name string, localVarOptionals *MetadataResourceApiGetOpts) (model.WorkflowDef, *http.Response, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
MetadataResourceApi.get(name, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
WorkflowDef MetadataResourceApi.Get(string name, int? version = null, bool? metadata = null);
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
MatadataResourceService.get(
    name: string,
    version?: number,
    metadata: boolean = false,
  ): CancelablePromise<WorkflowDef>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
MatadataResourceService.get(
    name: string,
    version?: number,
    metadata: boolean = false,
  ): CancelablePromise<WorkflowDef>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(metadata/get options name version)
```

</TabItem>
</Tabs>
