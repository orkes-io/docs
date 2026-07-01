---
title: "Redis Operations Reference"
description: "Look up the input and output parameters for each operation available in the Redis integration with Orkes Conductor."
canonical_route: "integrations/redis-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Redis Operations Reference

Orkes Conductor integrates with Redis to let you manage keys, values, and data structures directly from your workflows. Once you configure the Redis integration, you can use the following operations to read and write data, manage key expiration, and interact with Redis pub/sub channels.

This page covers the parameters and expected output for each operation available in the [Redis integration](/content/integrations/redis).

## Set Value

Sets a string value for a key, with optional expiration and conditional write support.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Key | The key to set. | string | Required. |
    | Value | The value to store. | string | Required. |
    | TTL Seconds | The time to live in seconds. Set to 0 for no expiry. | integer | Optional. |
    | Only If Absent | Whether to set the key only if it does not already exist. | boolean | Optional. |

=== "Output Parameters"

    Returns the key that was set, the operation status (`OK` on success), and the TTL of the key in seconds.


## Get Value

Retrieves a string value for a specified key.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Key | The key to retrieve. | string | Required. |

=== "Output Parameters"

    Returns the key, a flag indicating whether the key was found, and the stored value.


## Set Hash Field

Upserts a single field in a hash key.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Key | The hash key name. | string | Required. |
    | Field | The field name to set. | string | Required. |
    | Value | The value to store in the field. | string | Required. |

=== "Output Parameters"

    Returns the key, field, and value that were set, and a flag indicating whether the field was newly created (**1**) or updated (**0**).


## Get Hash

Retrieves all fields and values from a hash key.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Key | The hash key name to retrieve. | string | Required. |

=== "Output Parameters"

    Returns the key and all its fields as an object.


## List Keys

Lists keys matching a specified pattern using SCAN.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Pattern | The glob-style pattern to match keys against. Defaults to __*__ (all keys). | string | Optional. |
    | Limit | The maximum number of keys to return. | integer | Optional. |

=== "Output Parameters"

    Returns the pattern used, the count of keys returned, and the list of matching keys.


## Delete Keys

Deletes one or more keys from the Redis database.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Keys | A comma-separated list of keys to delete. | string | Required. |

=== "Output Parameters"

    Returns the list of keys targeted for deletion and the number of keys successfully deleted.


## Get TTL

Retrieves the remaining time to live for a key in seconds.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Key | The key to inspect. | string | Required. |

=== "Output Parameters"

    Returns the key and its remaining TTL in seconds. Returns **-1** if the key exists but has no expiry, and **-2** if the key does not exist.


## Increment By

Increments a counter key by a specified delta value.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Key | The key to increment. | string | Required. |
    | Delta | The amount to increment by. Defaults to 1. | integer | Optional. |

=== "Output Parameters"

    Returns the key and its new value after incrementing.


## Publish Message

Publishes a message to a Redis pub/sub channel.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Channel | The channel name to publish to. | string | Required. |
    | Message | The message payload to publish. | string | Required. |

=== "Output Parameters"

    Returns the channel name and the number of subscribers that received the message.


## Get Info

Retrieves information and statistics about the Redis instance.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Section | The INFO section to retrieve (e.g., `server`, `clients`). If not provided, all sections are returned. | string | Optional. |

=== "Output Parameters"

    Returns the requested section name, the parsed info fields as an object, and the raw INFO response string.
