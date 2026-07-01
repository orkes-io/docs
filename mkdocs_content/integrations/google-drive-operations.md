---
title: "Google Drive Operations Reference"
description: "Look up the input and output parameters for each operation available in the Google Drive integration with Orkes Conductor."
canonical_route: "integrations/google-drive-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Google Drive Operations Reference

Orkes Conductor integrates with Google Drive to let you interact with your files, folders, and shared drives directly from workflows. Once you configure the Google Drive integration, you can use the following operations to upload, download, create, move, search, share, and delete content in Google Drive, without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Google Drive integration](/content/integrations/google-drive).

## Create Folder

Create a folder in Drive, optionally under a parent folder. Use this to organize artifacts or create per-run directories.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the folder to be created. | string | Required. |
    | Parent Folder Id | The ID of the parent folder under which the new folder will be created. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Optional. |

=== "Output Parameters"

    Returns the full Google Drive `File`object containing all file fields. For the complete schema, refer to the [Google Drive Files API documentation](https://developers.google.com/drive/api/reference/rest/v3/files).


## Delete Folder

Delete a folder in Drive. Use this when cleaning up obsolete directories. This is a permanent delete; the folder is removed directly from Google Drive without being moved to the trash.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Folder ID | The ID of the folder to be deleted.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Required. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | folderId | The ID of the deleted folder. |
    | deleted | Indicates whether the folder was successfully deleted. | 


## Share Folder

Share a folder with a user. Use this when you need to grant access to folder contents.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Folder ID | The ID of the folder to share.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Required. |
    | Email Address | The email address of the user to share the folder with. | string | Required. | 
    | Role | The access role. Supported values:<ul><li>`reader`</li><li>`commenter`</li><li>`writer`</li></ul> | string | Optional. |
    | Send Notification Email | Whether to send a notification email to the user. | boolean | Optional. |
    | Email Message | A message to include in the notification email. | string | Optional. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | fileId | The ID of the shared folder. | 
    | permissionId | The unique ID of the permission granted. | 
    | role | The access role granted to the user. | 
    | emailAddress | The email address of the user the folder was shared with. | 


## Upload File from Base64 

Upload a file from base64-encoded content into Drive. Use this to persist generated PDFs, text reports, or other artifacts to a folder.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the file to be created. | string | Required. |
    | Mime Type | The MIME type of the file. For example, `application/pdf`.<br/>For a full list, refer to the [Google Drive MIME types documentation](https://developers.google.com/drive/api/guides/mime-types). | string | Optional. |
    | Base64 Content | The base64-encoded content of the file to upload.<br/>To encode a file to base64, you can use tools such as a command-line utility (`base64` on macOS/Linux, `certutil` on Windows), an online encoder, or a programming language of your choice (for example, Python's `base64` module or JavaScript's `btoa()` function). | string | Required. |
    | Parent Folder Id | The ID of the folder to upload the file into. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Optional. |

=== "Output Parameters"

    Returns a full Google Drive `File` object. For the complete schema, refer to the [Google Drive Files API documentation](https://developers.google.com/drive/api/reference/rest/v3/files).


## Download File Base64

Download file content as base64 by file ID. Use this to feed file contents into LLM tools or other binary-capable systems.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | File Id | The ID of the file to download.<br/> To get the file ID, open the file in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/file/d/<FILE-ID>/view`. | string | Required. |

=== "Output Parameters"

    Returns the full Google Drive `File` object and the `base64Content` (base64-encoded content of the file).


## Create File From Text 

Create a new file in Drive from plain text content. Use this when you want to store generated text as a file.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the file to be created. | string | Required. |
    | Text | The plain text content to place in the file. | string | Optional. |
    | Mime Type | The MIME type of the file. Default is `text/plain`. | string | Optional. |
    | Parent Folder ID | The ID of the folder where the file will be created. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Optional. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the created file.| 
    | name | The name of the created file. | 
    | mimeType | The MIME type of the created file. | 
    | parents | The IDs of the parent folders. | 


## Create Google Doc

Create a Google Doc with a title and plain text content. Use this to quickly spin up a doc from text generated by an LLM or workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Text | The plain text content to place in the Google Doc. | string | Optional. | 
    | Title | The title of the Google Doc. | string | Required. |
    | Parent Folder Id | The ID of the folder where the Google Doc will be created. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Optional. |

=== "Output Parameters"

    Returns the full Google Drive `File` object containing all file fields. For the complete schema, refer to the [Google Drive Files API documentation](https://developers.google.com/drive/api/reference/rest/v3/files).


## Copy File

Copy a file in Google Drive. Use this when you need a duplicate for templating or safe edits.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | File ID | The ID of the file to copy.<br/>To get the file ID, open the file in Google Drive. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/<YOUR-DOC-ID>`. | string | Required. | 
    | New Name | A new name for the copied file. | string | Optional. | 
    | Parent Folder ID | The ID of the folder to copy files into. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the copied file. | 
    | name | The name of the copied file. | 
    | mimeType | The mime type of the copied file. | 
    | parents | The IDs of the parent folders. | 


## Update File

Update a file's metadata or content. Use this when you need to rename or overwrite a file.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | Updated name of the file. | string | Optional. | 
    | Mime Type | The mime type of the updated file. | string | Optional. |  
    | File ID | The ID of the file to be updated.<br/>To get the file ID, open the file in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/file/d/<FILE-ID>/view`. | string | Required. | 
    | Base 64 Content | The base64-encoded content to be updated.<br/>To encode a file to base64, you can use tools such as a command-line utility (`base64` on macOS/Linux, `certutil` on Windows), an online encoder, or a programming language of your choice (for example, Python's `base64` module or JavaScript's `btoa()` function). | string | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the updated file. | 
    | name | The name of the updated file. | 
    | mimeType | The mime type of the updated file. | 
    | parents | The IDs of the parent folders. | 


## Move File

Move a file to another folder. Use this when you need to reorganize Drive contents.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | File ID | The ID of the file to move.<br/>To get the file ID, open the file in Google Drive. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/<YOUR-DOC-ID>`. | string | Required. |
    | Destination Folder ID | The folder ID of the destination folder to which the file is to be moved. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>`. | string | Optional. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the moved file.| 
    | name | The name of the moved file. | 
    | mimeType | The MIME type of the moved file. | 
    | parents | The IDs of the parent folders. | 


## Share File

Share a file with a user. Use this when you need to grant access to Drive files.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | File ID | The ID of the file to share.<br/> To get the file ID, open the file in Google Drive. The ID is the string of characters at the end of the URL: `https://docs.google.com/document/d/<YOUR-DOC-ID>`. | string | Required. |
    | Email Address | The email address of the user to share the file with. | string | Required. | 
    | Role | The access role. Supported values:<ul><li>`reader`</li><li>`commenter`</li><li>`writer`</li></ul> | string | Optional. | 
    | Send Notification Email | Whether to send a notification email to the user. | boolean | Optional. | 
    | Email Message | A message to include in the notification email. | string | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | fileId | The ID of the shared file. | 
    | permissionId | The unique ID of the permission granted. | 
    | role | The access role granted to the user. | 
    | emailAddress | The email address of the user the file was shared with. | 


## List Files

List files matching an optional Drive query and/or restricted to a parent folder. Use this to locate documents for downstream tools.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The Drive query to filter files. For example, `mimeType='application/pdf'`.<br/>Leave empty to list all the files. | string | Optional. | 
    | Page Size | The number of files to return per page. | integer | Required. | 
    | Parent Folder Id | The ID of the folder to list files from. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`.  | string | Optional. | 

=== "Output Parameters"

    Returns a `FileList` object containing a `files` array of full Google Drive `File` objects, a `nextPageToken` for pagination, and an `incompleteSearch` flag. For the complete schema, refer to the [Google Drive Files API documentation](https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list).


## Delete File 

Delete a file by file ID. Use this when cleaning up temporary content or obsolete artifacts. This is a permanent delete; the file is removed directly from Google Drive without being moved to the trash.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | File Id | The ID of the file to delete.<br/>To get the file ID, open the file in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/file/d/<FILE-ID>/view`. | string | Required. |

=== "Output Parameters"

    Returns a full Google Drive `File` object containing all file fields. For the complete schema, refer to the [Google Drive Files API documentation](https://developers.google.com/workspace/drive/api/reference/rest/v3/files#resource).


## Search Files and Folders

Search files and folders in Google Drive. Use this when you need a quick filtered list.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The Drive query string to filter files and folders. For example, `mimeType='application/pdf'` or `name='report.pdf'`. Leave empty to return all files.<br/>For supported query fields and operators, refer to the [Google Drive query string documentation](https://developers.google.com/workspace/drive/api/guides/search-files#examples). | string | Optional. |
    | Page Size | The number of results to return per page. | integer | Optional. | 
    | Parent Folder ID | The ID of the folder to search in. If left empty/blank, it falls back to the default folder provided in the integration.<br/>To get the folder ID, open the folder in Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<FOLDER-ID>?ths=true`. | string | Optional. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | files | An array of file and folder objects matching the query. | 
    | files.**id** | The unique ID of the file or folder. | 
    | files.**name** | The name of the file or folder. | 
    | files.**mimeType** | The MIME type of the file or folder. | 
    | files.**parents** | The IDs of the parent folders. | 
    | nextPageToken | The token to retrieve the next page of results. Returns `null` if there are no more results. | 


## Create Shared Drive

Create a shared drive. Use this when you need a shared workspace for a team.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the shared drive. | string | Required. |
    | Request ID | A unique request ID for idempotency. Auto-generated if left empty. | string | Optional. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the created shared drive. | 
    | name | The name of the created shared drive. | 


## Update Shared Drive

Update shared drive metadata. Use this when you need to rename a shared drive.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Drive ID | The ID of the shared drive to update.<br/>To get the drive ID, open the shared Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<YOUR-DRIVE-ID>?ths=true`. | string | Required. | 
    | Name | The updated name of the drive. | string | Required. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the updated shared drive. | 
    | name | Updated name of the shared drive. | 


## Get Shared Drive

Retrieve a shared drive by ID. Use this when you need shared drive metadata.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Drive ID | The ID of the shared drive to retrieve.<br/>To get the drive ID, open the shared Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<YOUR-DRIVE-ID>?ths=true`. | string | Required. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the shared drive. | 
    | name | The name of the shared drive. | 


## Get Many Shared Drives

List shared drives available to the user. Use this when you need to enumerate team drives.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Page Size | The maximum number of shared drives to return. | integer | Optional. | 
    | Page Token | The page token for pagination. To paginate through results, pass the `nextPageToken` value from a previous response into this field. | string | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | sharedDrives | An array of shared drive objects available to the user. | 
    | sharedDrives.**id** | The unique ID of the shared drive. | 
    | sharedDrives.**name** | The name of the shared drive. | 
    | nextPageToken | The token to retrieve the next page of results. Returns `null` if there are no more results. | 


## Delete Shared Drive

Deletes a shared drive. Use this when decommissioning a team workspace. The drive must be empty before deletion.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Drive ID | The ID of the shared drive to delete.<br/>To get the drive ID, open the shared Google Drive. The ID is the string of characters at the end of the URL: `https://drive.google.com/drive/u/0/folders/<YOUR-DRIVE-ID>?ths=true`. | string | Required. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | id | The unique ID of the deleted shared drive. | 
    | name | The name of the deleted shared drive. | 
    | deleted | Indicates whether the shared drive was successfully deleted. |
