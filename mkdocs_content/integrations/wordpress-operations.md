---
title: "WordPress Operations Reference"
description: "Look up the input and output parameters for each operation available in the WordPress integration with Orkes Conductor."
canonical_route: "integrations/wordpress-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, WordPress Operations Reference, WordPress Operations Reference integration, WordPress Operations Reference workflow automation"
---

# WordPress Operations Reference

Orkes Conductor integrates with WordPress to let you create and manage posts, pages, media, and taxonomies directly from your workflows. Once you configure the WordPress integration, you can use the following operations to create, retrieve, update, and delete content in WordPress, without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [WordPress integration](/content/integrations/wordpress).

## Get Me

Get the current authenticated user profile in WordPress.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | ID | The unique ID of the authenticated user. |
    | username | The username of the authenticated user. | 
    | email | The email address of the authenticated user. | 
    | displayName | The display name of the authenticated user. | 


## Create Post

Create a new post or page in WordPress.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Type | The content type. Supported values:<ul><li>`post` (default)</li><li>`page`</li></ul> | string | Optional. | 
    | Title | The title of the post or page. | string | Required. | 
    | Content | The content of the post or page. HTML is supported. | string | Required. | 
    | Status | The post status. Supported values: <ul><li>`draft` (default)</li><li>`publish`</li><li>`pending`</li><li>`private`</li></ul> | string | Optional. | 
    | Excerpt | The post excerpt. | string | Optional. | 
    | Categories | The category names or IDs, entered as comma-separated values. Applicable to posts only. | string | Optional. | 
    | Tags | The tag names or IDs, entered as comma-separated values. Applicable to posts only. | string | Optional. | 
    | Featured Media | The media ID of the featured image.<br/>To get the media ID, open the media item in the WordPress admin panel. The ID is the value of the `item` parameter in the URL: `https://<YOUR-SITE>/wp-admin/upload.php?item=<MEDIA-ID>`. | integer | Optional. | 
    | Parent | The ID of the parent page. Used to nest the new page under an existing page, supporting multi-level hierarchies. Applicable to pages only. | integer | Optional. | 
    | Menu Order | The menu order of the page. Applicable to pages only. | integer | Optional. | 

=== "Output Parameters"

    Returns a full WordPress post object containing all post fields.


## Update Post

Update an existing post or page in WordPress. It cannot update the type, which means it can't change a page to a post and vice versa.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Post Id | The ID of the post or page to update.<br/>To get the post ID, open the post or page in the WordPress admin panel. The ID is the value of the `post` parameter in the URL: `https://<YOUR-SITE>/wp-admin/post.php?post=<POST-ID>&action=edit`. | integer | Required. | 
    | Title | The updated title of the post or page. | string | Optional. | 
    | Content | The updated content of the post or page. HTML is supported. | string | Required. | 
    | Status | The updated post status. Supported values:<ul><li>`draft`</li><li>`publish`</li><li>`pending`</li><li>`private`</li></ul> | string | Optional. | 
    | Excerpt | The updated post excerpt. | string | Optional. | 
    | Categories | The updated category names or IDs, entered as comma-separated values. Applicable to posts only. | string | Optional. | 
    | Tags | The updated tag names or IDs, entered as comma-separated values. Applicable to posts only. | string | Optional. | 
    | Featured Media | The updated media ID of the featured image.<br/>To get the media ID, open the media item in the WordPress admin panel. The ID is the value of the `item` parameter in the URL: `https://<YOUR-SITE>/wp-admin/upload.php?item=<MEDIA-ID>`. | integer | Optional. | 
    | Parent | The ID of an existing published page to set as the parent. When updated, the page is moved under the specified parent in the hierarchy. Applicable to pages only. | integer | Optional. | 
    | Menu Order | The updated menu order of the page. Applicable to pages only. | integer | Optional. | 

    !!! info "Note"
        In addition to the mandatory field **Post ID**, at least one other field must also be provided for the operation to work.

=== "Output Parameters"

    Returns a full WordPress post object containing all post fields.


## Delete Post

Delete a post or page by ID. The post or page is moved to trash and can be recovered from the WordPress admin panel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Post id | The ID of the post or page to delete.<br/>To get the post ID, open the post or page in the WordPress admin panel. The ID is the value of the `post` parameter in the URL: `https://<YOUR-SITE>/wp-admin/post.php?post=<POST-ID>&action=edit`. | integer | Required. | 
    | Type | The content type for validation. Supported values:<ul><li>`post`</li><li>`page`</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns a full WordPress post object containing all post fields.


## Get Post

Get a specific post or page by ID.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Post id | The ID of the post or page to retrieve.<br/>To get the post ID, open the post or page in the WordPress admin panel. The ID is the value of the `post` parameter in the URL: `https://<YOUR-SITE>/wp-admin/post.php?post=<POST-ID>&action=edit`. | integer | Required. | 
    | Type | The content type for validation. Supported values:<ul><li>`post`</li><li>`page`</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns a full WordPress post object containing all post fields.


## List Posts

List posts or pages with optional filters.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Type | The type to filter. Supported values:<ul><li>`page`</li><li>`post`</li></ul> | string | Optional. | 
    | Per Page | The number of items to return per page. Maximum value is 100. Default is 20. | integer | Optional. | 
    | Page | The page number for pagination. Default is 1. | integer | Optional. | 
    | Status | The status to filter. Supported values:<ul><li>`publish`</li><li>`draft`</li><li>`pending`</li><li>`private`</li><li>`any` (default)</li></ul> | string | Optional. | 
    | Search | The search term. | string | Optional. | 
    | Order By | Sort field. Supported values:<ul><li>`date`</li><li>`modified` (default)</li><li>`title`</li></ul> | string | Optional. | 
    | Order | The sorting order. Supported values:<ul><li>`ASC`</li><li>`DESC` (default)</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns a list of posts or pages, including metadata such as ID, title, author, status, categories, tags, and pagination details.


## List Tags

List all tags in the Wordpress site.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Per Page | The number of tags to return per page. Maximum value is 100. Default is 100. | integer | Optional. | 
    | Page | The page number for pagination. Default is 1. | integer | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | data | List of tags available in the WordPress site, including details such as ID, name, slug, description, post count, and related metadata. | 
    | otal | Total number of tags available for the site. | 
    | totalPages | Total number of pages available based on the pagination settings. | 
    | perPage | Number of tags returned per page in the response. | 
    | page | Current page number of the returned results. | 


## List Categories

List all categories in the WordPress site.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Per Page | The number of categories to return per page. Maximum value is 100. Default is 100. | integer | Optional. | 
    | Page | The page number for pagination. Default is 1. | integer | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | data | List of categories available in the WordPress site, including details such as ID, name, slug, description, parent category, post count, feed URL, and related metadata. | 
    | total | Total number of categories available for the site. | 
    | totalPages | Total number of pages available based on the pagination settings. | 
    | perPage | Number of categories returned per page in the response. | 
    | page | Current page number of the returned results. | 


## Upload Media

Upload a media file to WordPress from a URL.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Media Url | The publicly accessible URL of the media file to upload. | string | Required. | 

=== "Output Parameters"

    Returns details of the uploaded media file, including the media ID, file URL, MIME type, size, dimensions, generated thumbnails, and related metadata.


## Get Media

Get a specific media item by ID.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Media Id | The unique identifier of the media item to retrieve.<br/>To get the media ID, open the media item in the WordPress admin panel. The ID is the value of the `item` parameter in the URL: `https://<YOUR-SITE>/wp-admin/upload.php?item=<MEDIA-ID>`. | integer | Required. | 

=== "Output Parameters"

    Returns details of the uploaded media asset, including its ID, file URL, MIME type, size, dimensions, generated thumbnails, EXIF metadata, and related API links.


## List Media

List all media items.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Per Page | The number of media items to return per page. Maximum value is 100. Default is 50. | integer | Optional. | 
    | Page | The page number for pagination. Default is 1. | integer | Optional. | 

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- | 
    | data | List of media files available in the WordPress site, including details such as media ID, file URL, MIME type, size, dimensions, thumbnails, EXIF metadata, and related links. | 
    | total | Total number of media items available for the site. | 
    | totalPages | Total number of pages available based on the pagination settings. | 
    | perPage | Number of media items returned per page in the response. | 
    | page | Current page number of the returned results. |

## Related pages

- [WordPress Integration with Orkes Conductor](/content/integrations/wordpress)
