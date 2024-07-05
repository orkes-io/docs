---
sidebar_position: 7
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

| Parameter | Description |
| --------- | ----------- |
| url | Provide the URL of the document to be retrieved. This can also be [passed as variables.](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| mediaType | Select the media type of the file to be retrieved. Currently, supported media types include:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul> | 

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
 <TabItem value="JSON" label="JSON">

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