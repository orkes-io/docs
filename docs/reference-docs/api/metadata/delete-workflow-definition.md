---
sidebar_position: 11
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
