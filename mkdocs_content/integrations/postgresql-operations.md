---
title: "PostgreSQL Operations Reference"
description: "Look up the input and output parameters for each operation available in the PostgreSQL integration with Orkes Conductor."
canonical_route: "integrations/postgresql-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, PostgreSQL Operations Reference, PostgreSQL Operations Reference integration, PostgreSQL Operations Reference workflow automation"
---

# PostgreSQL Operations Reference

Orkes Conductor integrates with PostgreSQL to let you manage database tables and records directly from your workflows. Once you configure the PostgreSQL integration, you can use the following operations to create, retrieve, update, and delete data in PostgreSQL without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [PostgreSQL integration](/content/integrations/postgresql).

## Create Table

Creates a new table in the PostgreSQL database with the specified columns and constraints.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table to create. | string | Required. |
    | Column Definitions | The column definitions for the table. Supported values:<ul><li>JSON array (e.g., `[{"name":"id","type":"SERIAL PRIMARY KEY"},{"name":"name","type":"VARCHAR(255) NOT NULL"}]`)</li><li>comma-separated string (e.g., `id:SERIAL PRIMARY KEY,name:VARCHAR(255) NOT NULL`)</li></ul> | string | Required. |

=== "Output Parameters"

    Returns a confirmation message indicating whether the table was created successfully.


## Delete Table

Deletes an existing table from the database.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table to delete. | string | Required. |

=== "Output Parameters"

    Returns a confirmation message indicating whether the table was deleted successfully.


## Insert Rows

Inserts one or more rows into a table.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table to insert rows into. | string | Required. |
    | Columns | The column names to insert data into. Supported formats:<ul><li>JSON array (e.g.,` ["id","name","email"]`)</li><li>comma-separated string (e.g., `"id,name,email"`)</li></ul> | string | Required. |
    | Values | The row values to insert. Supported formats:<ul><li>JSON array of arrays for multiple rows (e.g., `[[1,"John","john@example.com"],[2,"Jane","jane@example.com"]]`)</li><li>a single JSON array for one row (e.g., `[1,"John","john@example.com"]`)</li></ul> | string | Required. |

=== "Output Parameters"

    Returns the status of the operation and the number of rows inserted.


## Update Rows

Updates existing rows in a table.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table that contains the rows to update. | string | Required. |
    | Set Clause | The column assignments to apply, in SET clause format (e.g., `name = 'John', age = 30`). | string | Required. |
    | Where Clause | The condition to filter rows to update, in WHERE clause format (e.g., `id = 1`). If not provided, all rows are updated. | string | Optional. |

=== "Output Parameters"

    Returns the status of the operation and the number of rows updated.


## Upsert Rows

Inserts rows or updates them if they already exist. Unlike Update Rows, Upsert Rows inserts the row if no matching record is found, making it suitable when you are unsure whether the record already exists.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table to upsert rows into. | string | Required. |
    | Columns | The column names to insert data into. Supported formats:<ul><li>JSON array (e.g., `["id","name"]`)</li><li>comma-separated string (e.g., `id,name`)</li></ul> | string | Required. |
    | Values | The row values to insert. Supported formats:<ul><li>JSON array of arrays for multiple rows (e.g., `[[1,"John"],[2,"Jane"]]`)</li><li>a single JSON array for one row (e.g., `[1,"John"]`)</li></ul> | string | Required. |
    | Conflict Target | The column name(s) with a unique constraint used to detect duplicate rows. If a row with the same value already exists, it is updated instead of inserted (e.g., `id` or `email`). | string | Required. |
    | Update Columns | The columns to update on conflict. Supported formats:<ul><li>JSON array</li><li>comma-separated string</li></ul> Defaults to all columns except the conflict target. | string | Optional. |

=== "Output Parameters"

    Returns the status of the operation and the number of rows affected.


## Select Rows

Retrieves rows from a table based on specified conditions.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table to retrieve rows from. | string | Required. |
    | Columns | The column names to retrieve. Supported formats: JSON array (e.g., `["id","name"]`) or comma-separated string (e.g., `id,name`). Defaults to all columns (`*`). | string | Optional. |
    | Where Clause | The condition to filter rows, in WHERE clause format (e.g., `id > 100 AND status = 'active'`). If not provided, all rows are returned. | string | Optional. |
    | Order By | The column(s) to sort the results by, in ORDER BY clause format (e.g., `id DESC`). | string | Optional. |
    | Limit | The maximum number of rows to return. | integer | Optional. |

=== "Output Parameters"

    Returns the retrieved rows as an array of objects and the total count of rows returned.


## Delete Rows

Deletes rows from a table based on specified conditions.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Table Name | The name of the table to delete rows from. | string | Required. |
    | Where Clause | The condition to filter rows to delete, in WHERE clause format (e.g., `id = 1`). If not provided, all rows are deleted. | string | Optional. |

=== "Output Parameters"

    Returns the status of the operation and the number of rows deleted.


## Execute SQL

Executes a raw SQL query against the database.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | SQL Query | The SQL query to execute (e.g., `SELECT * FROM users WHERE id = 1`). | string | Required. |

=== "Output Parameters"

    Returns the status of the operation, the query results as an array of objects for SELECT queries, and the number of rows affected for INSERT, UPDATE, or DELETE queries.
