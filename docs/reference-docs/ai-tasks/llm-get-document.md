---
sidebar_position: 7
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LLM Get Document

The LLM Get Document task is used to retrieve the content of a specified document for further data processing using AI tasks. It supports a wide range of media types and allows integration with various file formats to facilitate comprehensive data handling and processing.

The LLM Get Document task fetches a document from a specified URL based on the provided media type. It supports different formats, ensuring the retrieval of various types of documents. The task initiates a GET request to the URL and retrieves the document in the specified format, which is then available for subsequent AI-driven tasks or data processing.

## Task configuration

Configure these parameters for the LLM Get Document task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**url** | The URL of the file to be retrieved. | Required. |
| inputParameters.**mediaType** | The media type of the file to be retrieved. Supported media types:<ul><li>application/java-archive</li><li>application/EDI-X12</li><li>application/EDIFACT</li><li>application/javascript</li><li>application/octet-stream</li><li>application/ogg</li><li>application/pdf</li><li>application/xhtml+xml</li><li>application/x-shockwave-flash</li><li>application/json</li><li>application/ld+json</li><li>application/xml</li><li>application/zip</li><li>application/x-www-form-urlencoded</li><li>audio/mpeg</li><li>audio/x-ms-wma</li><li>audio/vnd.rn-realaudio</li><li>audio/x-wav</li><li>image/gif</li><li>image/jpeg</li><li>image/png</li><li>image/tiff</li><li>image/vnd.microsoft.icon</li><li>image/x-icon</li><li>image/vnd.djvu</li><li>image/svg+xml</li></ul> | Optional. |

## Task definition

This is the JSON schema for an LLM Get Document task definition.

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

## Adding an LLM Get Document task in UI

**To add an LLM Get Document task:**

1. In your workflow, select the (**+**) icon and add an **LLM Get Document** task.
2. Enter the document **URL** and choose the media type from the available options.

<center><p><img src="/content/img/llm-get-document-ui-method.png " alt="LLM Get Document Task - UI" width="80%" height="auto"/></p></center>