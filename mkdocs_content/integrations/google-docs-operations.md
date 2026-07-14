---
title: "Google Docs Operations Reference"
description: "Look up the input and output parameters for each operation available in the Google Docs integration with Orkes Conductor."
canonical_route: "integrations/google-docs-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Google Docs Operations Reference, Google Docs Operations Reference integration, Google Docs Operations Reference workflow automation"
---

# Google Docs Operations Reference

Orkes Conductor integrates with Google Docs to let you create and manage documents directly from your workflows. You can use the following operations to create, read, update, and append content in Google Docs, without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Google Docs integration](/content/integrations/google-docs).

## Create Document

Create a new Google Doc with a title and optional initial content. Use this when a workflow needs a fresh document for authoring, summarizing, or templated output.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Title | The title of the Google Doc. | string | Required. | 
    | Initial Content | The plain text content to place in the Google Doc. | string | Optional. | 

=== "Output Parameters"

    Returns a full Google Docs `Document` object containing: `documentId`, `title`, `body`, `documentStyle`, `namedStyles`, `lists`, `headers`, `footers`, and all structural content. For the complete schema, refer to the [Google Docs API documentation](https://developers.google.com/docs/api/reference/rest/v1/documents#Document).


## Update Document

Replace all document content with new text. The existing content is fully deleted before the new text is inserted. Use this when you need to overwrite a document with fresh output. 

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Document ID | The ID of the document to update. If left empty/blank, it falls back to the default document ID provided in the integration.<br/>To get the document ID, open the Google doc. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/1<YOUR-DOC-IS>/edit?tab=t.0`. | string | Optional. | 
    | Text | The new plain text content to replace the entire document body. | string | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | documentId | The ID of the updated document. | 
    | updated | Indicates whether the update was applied successfully. | 


## Get Document

Fetch a Google Doc by ID, including structure and content metadata. Use this when you need to inspect headings, content, or layout before deciding what to change or append.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Document ID | The ID of the Google Doc to retrieve. If left empty/blank, it falls back to the default document provided in the integration.<br/>To get the document ID, open the document. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/<YOUR-DOC-ID>/edit?tab=t.0`. | string | Optional. | 

=== "Output Parameters"

    Returns a full Google Docs Document `object` containing `documentId`, `title`, `body`, `documentStyle`, `namedStyles`, `revisionId`, and all structural content. For the complete schema, refer to the [Google Docs API documentation](https://developers.google.com/docs/api/reference/rest/v1/documents#Document).


## Replace Text

Find and replace all occurrences of target text in a Google Doc. Use this when you need to update placeholders, fix wording, or apply template substitutions at scale.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Document Id | The Google Doc ID where text is to be replaced. If left empty/blank, it falls back to the default document provided in the integration.<br/>To get the document ID, open the document. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/<YOUR-DOC-ID>/edit?tab=t.0`. | string | Optional. | 
    | Search Text | The target text to search for in the Google Doc. | string | Required. | 
    | Replacement Text | The text to replace in the Google Doc. Defaults to empty if not provided. | string | Optional. | 
    | Match Case | Set to `true` for case-sensitive matching, or `false` to ignore case. | boolean | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | documentId | The ID of the document where the replacement was made. | 
    | replies.replaceAllText.**occurrencesChanged** | The number of occurrences replaced in the document. | 
    | writeControl.**requiredRevisionId** | The revision ID of the document after the replacement. | 


## Append Text

Append text to the end of an existing Google Doc. Use this when you want to progressively build up content or add AI-generated sections to a document.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Document Id | The Google Doc ID where text will be appended. If left empty/blank, it falls back to the default document provided in the integration.<br/>To get the document ID, open the document. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/<YOUR-DOC-ID>/edit?tab=t.0`. | string | Optional. | 
    | Text | The text to append at the end of the document. Defaults to empty if not provided. | string | Required. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | documentId | The ID of the document that was updated. | 
    | replies | An array of operation results. | 
    | writeControl.**requiredRevisionId** | The revision ID confirming the write operation. |

## Related pages

- [Google Docs Integration with Orkes Conductor](/content/integrations/google-docs)
