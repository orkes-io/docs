---
sidebar_position: 6
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Get Document

A system task to retrieve the content of the document provided and use it for further data processing using AI tasks.

## Definitions

```json
{
"name": "get_document_task",
"taskReferenceName": "get_document_task_ref",
"inputParameters": {
"url": "${workflow.input.url}",
"mediaType": "application/pdf"
},
"type": "GET_DOCUMENT"
}
```

## Input Parameters

| Attribute | Description |
| --------- | ----------- |
| url | Provide the URL of the document to be retrieved.<br/><br/>Check out our documentation on [how to pass parameters to tasks](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| mediaType | Select the media type of the file to be retrieved. Currently, supported media types include:<ul><li>application/pdf</li><li>text/html</li><li>text/plain</li><li>json</li></ul> | 
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling you can provide the following parameters:<ul><li>**TTL (in seconds)** - Provide the time to live in seconds.You can also pass this parameter as variables.</li><li>**Cache Key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this parameter as variables.</li></ul>|

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **LLM Get Document**.
2. Provide the document URL and choose the media type.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/llm-get-document-ui-method.png" alt="LLM Get Document Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
{
"name": "get_document_task",
"taskReferenceName": "get_document_task_ref",
"inputParameters": {
"url": "${workflow.input.url}",
"mediaType": "application/pdf"
},
"type": "GET_DOCUMENT"
}
```
</TabItem>
</Tabs>