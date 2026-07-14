---
title: "HubSpot Operations Reference"
description: "Look up the input and output parameters for each operation available in the HubSpot integration with Orkes Conductor."
canonical_route: "integrations/hubspot-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, HubSpot Operations Reference, HubSpot Operations Reference integration, HubSpot Operations Reference workflow automation"
---

# HubSpot Operations Reference

Orkes Conductor integrates with HubSpot to let you create and manage contacts, companies, deals, tickets, and other CRM data directly from your workflows. Once you configure the HubSpot integration, you can use the following operations to create, retrieve, update, and delete records in HubSpot without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [HubSpot integration](/content/integrations/hubspot).

## Create Contact

Creates a new contact in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Email | The contact's email address. | string | Required. | 
    | First Name | The contact's first name. | string | Optional. | 
    | Last Name | The contact's last name. | string | Optional. | 
    | Phone | The contact's phone number. | string | Optional. | 
    | Company | The company associated with the contact. | string | Optional. | 

=== "Output Parameters"

    Returns the created contact's ID, properties (name, email, phone, company, lifecycle stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Get Contact

Retrieves a contact by ID from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Contact ID | The unique ID of the contact to retrieve. To get this value, use [Search Contacts](/content/integrations/hubspot-operations#search-contacts) or [List Contacts](/content/integrations/hubspot-operations#list-contacts) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a contact record. For example, in `app.hubspot.com/contacts/123456789/record/0-1/777350510839`, the contact ID is 777350510839. | string | Required. |

=== "Output Parameters"

    Returns the contact's ID, properties (name, email, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## List Contacts

List Contacts from HubSpot with optional pagination and sorting.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of contacts to return. Defaults to 10. | integer | Optional. | 
    | After | The pagination cursor from the previous response, used to retrieve the next page of results. | string | Optional. | 
    | Sort | The field to sort results by. For example, `-createdate` for most recently created or `-hs_lastmodifieddate` for most recently modified. | string | Optional. | 

=== "Output Parameters"

    Returns a list of contacts, each containing the contact's ID, properties (name, email, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns a paging cursor for retrieving the next page of results.


## Search Contacts

Search contacts in HubSpot with filters.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query to filter contacts by. Use `*` to return all contacts. | string | Optional. | 
    | Limit | The maximum number of contacts to return. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of matching contacts, each containing the contact's ID, properties (name, email, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns the total number of matching contacts and a paging cursor for retrieving the next page of results.


## Search Contacts by Email

Search contacts in HubSpot with exact email addresses.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Email | The email address to search for. | string | Required. | 
    | Limit | The maximum number of contacts to return. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of contacts matching the email address, each containing the contact's ID, properties (name, email, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns the total number of matching contacts and a paging cursor for retrieving the next page of results.


## Update Contact

Update an existing contact in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Contact ID | The unique ID of the contact to update. To get this value, use [Search Contacts](/content/integrations/hubspot-operations#search-contacts) or [List Contacts](/content/integrations/hubspot-operations#list-contacts) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a contact record. For example, in `app.hubspot.com/contacts/123456789/record/0-1/777350510839`, the contact ID is `777350510839`. | string | Required. | 
    | Properties | The contact properties to update, provided as a JSON object. For example, `{"firstname": "Jane", "phone": "123456789"}`. | JSON map | Required. | 

=== "Output Parameters"

    Returns the updated contact's ID, properties (name, phone, lifecycle stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Delete Contact

Delete a contact from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Contact ID | The unique ID of the contact to delete. To get this value, use [Search Contacts](/content/integrations/hubspot-operations#search-contacts) or [List Contacts](/content/integrations/hubspot-operations#list-contacts) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a contact record. For example, in `app.hubspot.com/contacts/123456789/record/0-1/777350510839`, the contact ID is `777350510839`. | string | Required. | 

=== "Output Parameters"

    Returns the deletion status.


## Create Company

Create a new company in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The name of the company. | string | Required. | 
    | Domain | The company’s website domain. | string | Optional.
    | Industry | The company's industry. Accepted values include:<ul><li>INFORMATION_TECHNOLOGY_AND_SERVICES</li><li>COMPUTER_SOFTWARE</li><li>FINANCIAL_SERVICES</li><li>MARKETING_AND_ADVERTISING</li></ul> |string | Optional. | 
    | Phone | The company's phone number. | string | Optional. | 

=== "Output Parameters"

    Returns the created company's ID, properties (name, industry, lifecycle stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Get Company

Retrieves a company by ID from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Company ID | The unique ID of the company to retrieve. To get this value, use [Search Companies](/content/integrations/hubspot-operations#search-companies) or [List Companies](/content/integrations/hubspot-operations#list-companies) and copy the `id` from the response. <br/>You can also find it in the HubSpot URL when viewing a company record. For example, in `app.hubspot.com/contacts/123456789/record/0-2/429954357457`, the company ID is `429954357457`. | string | Required. | 

=== "Output Parameters"

    Returns the company's ID, properties (name, domain, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## List Companies

List companies from HubSpot with optional pagination and sorting.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of companies to return. Defaults to 10. | integer | Optional. | 
    | After | The pagination cursor from the previous response, used to retrieve the next page of results. | string | Optional. | 
    | Sort | The field to sort results by. For example, `-createdate` for most recently created or `-hs_lastmodifieddate` for most recently modified. | string | Optional. | 

=== "Output Parameters"

    Returns a list of companies, each containing the company's ID, properties (name, domain, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns a paging cursor for retrieving the next page of results.


## Search Companies

Search companies in HubSpot with filters.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The company name to search for. Use `*` to return all companies. | string | Optional. | 
    | Limit | The maximum number of companies to return. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of matching companies, each containing the company's ID, properties (name, domain, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns the total number of matching companies and a paging cursor for retrieving the next page of results.


## Search Companies by Domain

Search companies in HubSpot by domain name.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Domain | The domain name to search for. For example, `example.com`. | string | Required. |
    | Limit | The maximum number of companies to return. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of companies matching the domain, each containing the company's ID, properties (name, domain, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns the total number of matching companies and a paging cursor for retrieving the next page of results.


## Update Company

Update an existing company in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Company ID | The unique ID of the company to update. To get this value, use [Search Companies](/content/integrations/hubspot-operations#search-companies) or [List Companies](/content/integrations/hubspot-operations#list-companies) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a company record. For example, in `app.hubspot.com/contacts/123456789/record/0-2/429954357457`, the company ID is `429954357457`. | string | Required. | 
    | Properties | The company properties to update, provided as a JSON object. For example, `{"name": "Acme Corp", "domain": "acme.com"}`. | JSON map | Required. | 

=== "Output Parameters"

    Returns the updated company's ID, properties (name, domain, website, lifecycle stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Delete Company

Delete a company from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Company ID | The unique ID of the company to delete. To get this value, use [Search Companies](/content/integrations/hubspot-operations#search-companies) or [List Companies](/content/integrations/hubspot-operations#list-companies) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a company record. For example, in `app.hubspot.com/contacts/123456789/record/0-2/429954357457`, the company ID is `429954357457`. | string | Required. | 

=== "Output Parameters"

    Returns the deletion status.


## Get Deal Pipelines

Retrieves all deal pipelines and their stages from HubSpot.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    Returns a list of deal pipelines, each containing the pipeline ID, label, display order, and stages. Each stage includes the stage ID, label, display order, and metadata such as whether the stage is closed and its probability.


## Get Ticket Pipelines

Retrieves all ticket pipelines and their stages from HubSpot.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    Returns a list of ticket pipelines, each containing the pipeline ID, label, display order, and stages. Each stage includes the stage ID, label, display order, and metadata such as the ticket state and whether the stage is closed.


## Create Deal

Create a new deal in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Deal Name | The name of the deal. | string | Required. |
    | Amount | The monetary value of the deal. | string | Optional. | 
    | Deal Stage | The stage of the deal in the pipeline. Use [Get Deal Pipelines](/content/integrations/hubspot-operations#get-deal-pipelines) to retrieve the valid stage IDs for your account. If not set, the deal will not appear in the pipeline board view in HubSpot. | string | Optional. | 
    | Pipeline | The pipeline the deal belongs to. Use [Get Deal Pipelines](/content/integrations/hubspot-operations#get-deal-pipelines) to retrieve the available pipeline IDs for your account. If not set, the deal will not appear in the pipeline board view in HubSpot. | string | Optional. | 

=== "Output Parameters"

    Returns the created deal's ID, properties (deal name, amount, pipeline stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Get Deal

Retrieves a deal by ID from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Deal Id | The unique ID of the deal to retrieve. To get this value, use [Search Deals](/content/integrations/hubspot-operations#search-deals) or [List Deals](/content/integrations/hubspot-operations#list-deals) and copy the `id` from the response. <br/>You can also find it in the HubSpot URL when viewing a deal record. For example, in `app.hubspot.com/contacts/148480743/record/0-3/502507770065`, the deal ID is `502507770065`. | string | Required. | 

=== "Output Parameters"

    Returns the deal's ID, properties (deal name, amount, pipeline, deal stage, close date, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## List Deals

List deals from HubSpot with optional pagination and sorting.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of deals to return. Defaults to 10. | integer | Optional. | 
    | After | The pagination cursor from the previous response, used to retrieve the next page of results. | string | Optional. | 
    | Sort | The field to sort results by. For example, `-createdate` for most recently created or `-hs_lastmodifieddate` for most recently modified. | string | Optional. | 

=== "Output Parameters"

    Returns a list of deals, each containing the deal's ID, properties (deal name, amount, pipeline, deal stage, close date, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns a paging cursor for retrieving the next page of results.


## Search Deals

Search deals in HubSpot with filters.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Deal Name | The deal name to search for. Use `*` to return all deals. | string | Optional. | 
    | Limit | The maximum number of deals to return. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of matching deals, each containing the deal's ID, properties (deal name, amount, pipeline, deal stage, close date, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns the total number of matching deals and a paging cursor for retrieving the next page of results.


## Update Deal

Update an existing deal in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Deal Id | The unique ID of the deal to update. To get this value, use [Search Deals](/content/integrations/hubspot-operations#search-deals) or [List Deals](/content/integrations/hubspot-operations#list-deals) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a deal record. For example, in `app.hubspot.com/contacts/148480743/record/0-3/502507770065`, the deal ID is `502507770065`. | string | Required. | 
    | Properties | The deal properties to update, provided as a JSON object. For example, `{"dealname": "New Deal Name", "amount": "10000"}`. | JSON map | Required. | 

=== "Output Parameters"

    Returns the updated deal's ID, properties (deal name, amount, pipeline, deal stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Delete Deal

Delete a deal from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Deal Id | The unique ID of the deal to delete. To get this value, use [Search Deals](/content/integrations/hubspot-operations#search-deals) or [List Deals](/content/integrations/hubspot-operations#list-deals) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a deal record. For example, in `app.hubspot.com/contacts/148480743/record/0-3/502507770065`, the deal ID is `502507770065`. | string | Required. | 

=== "Output Parameters"

    Returns the deletion status.


## Create Ticket

Create a new ticket in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Subject | The subject or name of the ticket. | string | Required. | 
    | Pipeline Stage | The stage ID of the ticket in the pipeline. Use [Get Ticket Pipelines](/content/integrations/hubspot-operations#get-ticket-pipelines) to retrieve the valid stage IDs for your account. Defaults to the default pipeline. | string | Required. | 
    | Content | The description or content of the ticket. | string | Optional. | 
    | Pipeline | The pipeline ID the ticket belongs to. Use [Get Ticket Pipelines](/content/integrations/hubspot-operations#get-ticket-pipelines) to retrieve the available pipeline IDs. Defaults to the `default` pipeline. | string | Optional. | 

=== "Output Parameters"

    Returns the created ticket's ID, properties (subject, pipeline, pipeline stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Get Ticket

Retrieves a ticket by ID from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Ticket Id | The unique ID of the ticket to retrieve. To get this value, use [List Tickets](/content/integrations/hubspot-operations#list-tickets) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a ticket record. For example, in `app.hubspot.com/contacts/148480743/record/0-5/417248509143`, the ticket ID is `417248509143`. | string | Required. |

=== "Output Parameters"

    Returns the ticket's ID, properties (subject, content, pipeline, pipeline stage, ticket category, ticket priority, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## List Tickets

List tickets from HubSpot with optional pagination and sorting.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of tickets to return. Defaults to 10. | integer | Optional. | 
    | After | The pagination cursor from the previous response, used to retrieve the next page of results. | string | Optional. | 
    | Sort | The field to sort results by. For example, `-createdate` for most recently created or `-hs_lastmodifieddate` for most recently modified. | string | Optional. | 

=== "Output Parameters"

    Returns a list of tickets, each containing the ticket's ID, properties (subject, content, pipeline, pipeline stage, ticket category, ticket priority, creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns a paging cursor for retrieving the next page of results.


## Update Ticket

Updates an existing ticket in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Ticket Id | The unique ID of the ticket to update. To get this value, use [List Tickets](/content/integrations/hubspot-operations#list-tickets) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a ticket record. For example, in `app.hubspot.com/contacts/148480743/record/0-5/417248509143`, the ticket ID is `417248509143`. | string | Required. |
    | Properties | The ticket properties to update, provided as a JSON object. For example, `{"subject": "Updated Ticket", "hs_pipeline_stage": "2"}`. | JSON map | Required. | 

=== "Output Parameters"

    Returns the updated ticket's ID, properties (subject, pipeline, pipeline stage, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Delete Ticket

Delete a ticket from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Ticket Id | The unique ID of the ticket to delete. To get this value, use [List Tickets](/content/integrations/hubspot-operations#list-tickets) and copy the `id` from the response.<br/>You can also find it in the HubSpot URL when viewing a ticket record. For example, in `app.hubspot.com/contacts/148480743/record/0-5/417248509143`, the ticket ID is `417248509143`. | string | Required. | 

=== "Output Parameters"

    Returns the deletion status.


## Create Note

Create a new note in HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Body | The content of the note. | string | Required. | 
    | Timestamp | The timestamp for the note in milliseconds since epoch. If not set, defaults to the current time in the timezone of your HubSpot account. | string | Optional. | 

=== "Output Parameters"

    Returns the created note's ID, properties (note body, timestamp, creation date, and more), creation timestamp, last updated timestamp, and archived status.


## Get Note

Retrieves a note by ID from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Note ID | The unique ID of the note to retrieve. To get this value, use [List Notes](/content/integrations/hubspot-operations#list-notes) and copy the `id` from the response. | string | Required. | 

=== "Output Parameters"

    Returns the note's ID, properties (creation date, and more), creation timestamp, last updated timestamp, and archived status.


## List Notes

List notes from HubSpot with optional pagination and sorting.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Limit | The maximum number of notes to return. Defaults to 10. | integer | Optional. | 
    | After | The pagination cursor from the previous response, used to retrieve the next page of results. | string | Optional. | 
    | Sort | The field to sort results by. For example, `-createdate` for most recently created or `-hs_lastmodifieddate` for most recently modified. | string | Optional. | 

=== "Output Parameters"

    Returns a list of notes, each containing the note's ID, properties (creation date, and more), creation timestamp, last updated timestamp, and archived status. Also returns a paging cursor for retrieving the next page of results.


## Delete Note

Delete a note from HubSpot.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Note ID | The unique ID of the note to delete. To get this value, use [List Notes](/content/integrations/hubspot-operations#list-notes) and copy the `id` from the response. | string | Required. | 

=== "Output Parameters"

    Returns the deletion status.


## Create Association

Associates two CRM objects in HubSpot, such as a contact to a company or a deal to a contact.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | From Object Type | The type of the source object. Accepted values are<ul><li>contacts</li><li>companies</li><li>deals</li><li>tickets</li><li>notes</li></ul> | string | Required. |
    | From Object ID | The unique ID of the source object. Use the corresponding List or Search operation for the object type to retrieve the ID. For example, use *List Contacts* to get a contact ID. | string | Required. | 
    | To Object Type | The type of the target object. Accepted values are<ul><li>contacts</li><li>companies</li><li>deals</li><li>tickets</li><li>notes</li></ul> | string | Required. |
    | To Object ID | The unique ID of the target object. Use the corresponding List or Search operation for the object type to retrieve the ID. For example, use *List Companies* to get a company ID. | string | Required. | 
    | Association Type ID | The ID that defines the association type between the two objects. Refer to the [HubSpot Associations API documentation](https://developers.hubspot.com/docs/api-reference/latest/crm/associations/associate-records/guide#association-type-id-values) for the full list of valid type IDs. | string | Required. | 

=== "Output Parameters"

    Returns the association status.


## Get Associations

Get associations for a CRM object.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Object Type | The type of the object to retrieve associations for. Accepted values are <ul><li>contacts</li><li>companies</li><li>deals</li><li>tickets</li><li>notes</li></ul> | string | Required. | 
    | Object ID | The unique ID of the object to retrieve associations for. Use the corresponding List or Search operation for the object type to retrieve the ID. For example, use *List Companies* to get a company ID. | string | Required. | 
    | To Object Type | The type of the associated object to retrieve. Accepted values are <ul><li>contacts</li><li>companies</li><li>deals</li><li>tickets</li><li>notes</li></ul> | string | Required. |

=== "Output Parameters"

    Returns a list of associated object IDs and their association types.


## Get Owners

List all owners in HubSpot.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    Returns a list of owners, each containing the owner's ID, email address, first name, and last name.


## Get Form Fields

Gets all fields for a HubSpot form.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Form ID | The unique ID of the form. To find this, go to **Marketing** > **Forms** in HubSpot, open a form, and copy the UUID after `/form/` in the URL. For example, in `app.hubspot.com/submissions/123456789/form/4cf6934c-e42e-4585-a944-d709e2e685fd`, the form ID is `4cf6934c-e42e-4585-a944-d709e2e685fd`. | string | Required. |

=== "Output Parameters"

    Returns a list of form fields, each containing the field name, label, field type, and whether the field is required.


## Submit Form

Submits data to a HubSpot form using the public submission endpoint.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Portal Id | The numeric HubSpot portal ID. To find this, select your account name in the top-right corner of HubSpot, and the ID is displayed in the dropdown, or copy the number from your any HubSpot URL. For example, in `app.hubspot.com/contacts/123456789`, the portal ID is 123456789. | string | Required. |
    | Form ID | The unique ID of the form. To find this, go to **Marketing** > **Forms** in HubSpot, open a form, and copy the UUID after `/form/` in the URL. For example, in `app.hubspot.com/submissions/123456789/form/4cf6934c-e42e-4585-a944-d709e2e685fd`, the form ID is `4cf6934c-e42e-4585-a944-d709e2e685fd`. | string | Required. | 
    | Fields | The form field values to submit, provided as a JSON object. For example, `{"email": "test@example.com", "firstname": "Jane"}`. | JSON map | Required. | 

=== "Output Parameters"

    Returns the form submission status.
