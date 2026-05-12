---
title: "Managing Tags"
description: "Learn how to use tags to organize resources and grant access to multiple workflows, tasks, and other resources through tag-based permissions in Orkes Conductor."
---

# Managing Tags

Tags organize resources and make access control easier to manage at scale. A tag uses the `key:value` format and can be applied to workflows, tasks, user forms, event handlers, schedules, secrets, webhooks, prompts, environment variables, integrations, applications, and API/MCP Gateway services.

!!! tip "5-minute path"
    Choose a small tag taxonomy, apply tags to related resources, grant permissions to the tag, and review tag membership as part of release or access-control reviews.

Common tag patterns:

| Tag | Use |
| --- | --- |
| `team:payments` | Ownership and team-level access. |
| `env:prod` | Environment separation. |
| `app:checkout` | Application or domain grouping. |
| `data:pii` | Sensitive-data handling and review. |
| `tier:critical` | Operational priority. |

## Assigning tags to resources

Add tags to resources that share ownership, environment, compliance requirements, or permission boundaries. Keep tag names stable and predictable so they can be used in automation and audits.

Guidelines:

- Use lowercase keys and values where possible.
- Prefer a controlled set of keys such as `team`, `env`, `app`, `data`, and `tier`.
- Avoid personal tags for production access control.
- Review tag membership before granting broad permissions to a tag.

## Tags dashboard

The tags dashboard shows tags in the cluster and the resources associated with each tag. Use it to audit whether tag-based permissions are still scoped correctly.

Useful review questions:

- Does every production workflow have an owner tag?
- Are sensitive resources tagged consistently?
- Do tag permissions grant access to resources that no longer belong in the group?
- Are deprecated resources still inheriting access through old tags?

## Bulk-access to resources using tags

Tag-based permissions let you grant access to a set of resources without adding each resource individually to a group or application. This is useful when many workflows, tasks, secrets, schedules, or gateway routes belong to the same team or product area.

Use tag-based permissions when:

- A team owns many related resources.
- A deployment process creates resources that should inherit access automatically.
- You want permission reviews to focus on a tag membership list instead of hundreds of individual grants.

Do not use one broad tag as a shortcut for cluster-wide access. If a group or application needs cluster-wide power, use the appropriate role and review it as privileged access.

### Granting tag permissions

You can grant tag permissions to both groups and applications.

| Target | Typical use |
| ------ | ----------- |
| Group | Human teams that need read, update, execute, or delete access to tagged resources. |
| Application | Workers, services, CI/CD jobs, or gateways that need programmatic access to tagged resources. |

Permission levels are:

| Permission | Allows |
| ---------- | ------ |
| Read | View all resources with the tag. |
| Update | Modify all resources with the tag. |
| Execute | Run workflows, poll/complete tasks, or use executable resources with the tag. |
| Delete | Delete resources with the tag. |

Before granting tag permissions, confirm that the resources already using the tag are intended to be included. Future resources that receive the same tag can inherit access through the existing permission grant, so tag assignment should be part of your release review process.
