---
title: "Google Calendar Operations Reference"
description: "Look up the input and output parameters for each operation available in the Google Calendar integration with Orkes Conductor."
canonical_route: "integrations/google-calendar-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Google Calendar Operations Reference, Google Calendar Operations Reference integration, Google Calendar Operations Reference workflow automation"
---

# Google Calendar Operations Reference

Orkes Conductor integrates with Google Calendar to let you create and manage calendars directly from your workflows. You can use the following operations to create, read, update, and modify content in Google Calendar, without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [Google Calendar integration](/content/integrations/google-calendar).

## Add Event

Create a new event to a Google Calendar with details including title, description, location, and time. Use it when you need to schedule meetings, set reminders, or create calendar entries programmatically from workflow data.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Summary | The title of the event. | string | Required. |
    | Description | The detailed description of the event. | string | Optional. | 
    | Location | The event location, such as an address or meeting room name. | string | Optional. | 
    | Start ISO 8601 | The event start time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. | 
    | End ISO 8601 | The event end time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. |
    | Time Zone Id | The time zone ID in IANA format. Defaults to **UTC** if not specified.<br/>For example: **America/Los_Angeles**. | string | Optional. |

=== "Output Parameters"

    The output contains the created event's details. For a full list of output parameters, see the [Google Calendar Events API reference](https://developers.google.com/workspace/calendar/api/v3/reference/events#resource).


## List Upcoming Events

Retrieve a list of upcoming events from a Google Calendar within a specified time range. Use it when you need to check availability, display scheduled meetings, or gather calendar data for analytics and reporting.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Max Results | The maximum number of events to return. | integer | Required. |
    | Time Min ISO 8601 | The lower bound (inclusive) for the event’s start time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. |
    | Time Zone Id | The time zone ID in IANA format. Defaults to **UTC** if not specified.<br/>For example: **America/Los_Angeles**. | string | Optional. |

=== "Output Parameters"

    The output contains a list of upcoming calendar events and associated metadata. For a full list of output parameters, see the [Google Calendar Events: list API reference](https://developers.google.com/workspace/calendar/api/v3/reference/events/list).


## Update Event

Update an existing event with details including title, description, location, and time. Use it when you need a full update.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Event Id | The event ID of the calendar event to update. You can get the event ID from the `id` field in the output of the [Add Event](/content/integrations/google-calendar-operations#add-event) or [List Upcoming Events](/content/integrations/google-calendar-operations#list-upcoming-events) operation. | string | Required. |
    | Summary | The updated title of the event. | string | Optional. |
    | Description | The updated description of the event. | string | Optional. | 
    | Location | The event location, such as an address or meeting room name. | string | Optional. | 
    | Start ISO 8601 | The updated event start time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Optional. |
    | End ISO 8601 | The updated event end time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Optional. |
    | Time Zone Id | The updated time zone ID in IANA format. Defaults to **UTC** if not specified.<br/>For example: **America/Los_Angeles**. | string | Optional. |

=== "Output Parameters"

    The output contains the updated event's details. For a full list of output parameters, see the [Google Calendar Events API reference](https://developers.google.com/workspace/calendar/api/v3/reference/events#resource).


## Update Event Time

Update the start and end times of an existing calendar event by its event ID. Use it when meetings need to be rescheduled, time zones adjusted, or event durations modified in response to changing requirements.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Event Id | The event ID of the calendar event to update. You can get the event ID from the `id` field in the output of the [Add Event](/content/integrations/google-calendar-operations#add-event) or [List Upcoming Events](/content/integrations/google-calendar-operations#list-upcoming-events) operation. | string | Required. |
    | Start ISO 8601 | The updated event start time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. |
    | End ISO 8601 | The updated event end time in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. |
    | Time Zone Id | The updated time zone ID in IANA format. Defaults to **UTC** if not specified.<br/>For example: **America/Los_Angeles**. | string | Optional. |

=== "Output Parameters"

    The output contains the updated event's details. For a full list of output parameters, see the [Google Calendar Events API reference](https://developers.google.com/workspace/calendar/api/v3/reference/events#resource).


## Get Event

Retrieve a calendar event by its unique event ID. Use it when you need event details for a workflow step.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Event Id | The event ID of the calendar event to retrieve. You can get the event ID from the `id` field in the output of the [Add Event](/content/integrations/google-calendar-operations#add-event) or [List Upcoming Events](/content/integrations/google-calendar-operations#list-upcoming-events) operation. | string | Required. |

=== "Output Parameters"

    The output contains the retrieved event's details. For a full list of output parameters, see the [Google Calendar Events API reference](https://developers.google.com/workspace/calendar/api/v3/reference/events#resource).


## Check Availability

Check calendar availability for a time slot. Use it when you need to know if a slot is free.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Start ISO 8601 | The event start time to check for availability in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. |
    | End ISO 8601 | The event end time to check for availability in ISO 8601 format. For example: **2025-09-22T15:00:00-07:00**. | string | Required. |
    | Time Zone Id | The time zone ID in IANA format. Defaults to **UTC** if not specified.<br/>For example: **America/Los_Angeles**. | string | Optional. |

=== "Output Parameters"

    | Parameter | Description | 
    | --------- | ----------- |
    | available | Indicates whether the time slot is free. Returns `true` if no conflicts exist. | 
    | conflictCount | The number of conflicting events found in the time slot. | 
    | conflictEventIds | The list of event IDs that conflict with the requested time slot. |


## Delete Event

Delete a calendar event by its unique event ID. Use it when you need to cancel meetings, remove outdated entries, or clean up calendar data as part of a workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Event Id | The event ID of the calendar event to delete. You can get the event ID from the `id` field in the output of the [Add Event](/content/integrations/google-calendar-operations#add-event) or [List Upcoming Events](/content/integrations/google-calendar-operations#list-upcoming-events) operation. | string | Required. |

=== "Output Parameters"

    The output contains the details of the deleted event as a snapshot captured before deletion. For a full list of output parameters, see the [Google Calendar Events API reference](https://developers.google.com/workspace/calendar/api/v3/reference/events#resource).
