---
title: "GitHub Operations Reference"
description: "Look up the input and output parameters for each operation available in the GitHub integration with Orkes Conductor."
canonical_route: "integrations/github-operations"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, GitHub Operations Reference, GitHub Operations Reference integration, GitHub Operations Reference workflow automation"
---

# GitHub Operations Reference

Orkes Conductor integrates with GitHub to let you manage repositories, issues, pull requests, branches, files, releases, and workflows directly from your workflows. Once you configure the GitHub integration, you can use the following operations to interact with your GitHub resources without leaving your workflow.

This page covers the parameters and expected output for each operation available in the [GitHub integration](/content/integrations/github).

## Get Current User

Retrieves the authenticated GitHub user's profile information.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    | Parameter | Description |
    | --------- | ----------- | 
    | status | Status of the operation. | 
    | data.**id** | The unique numeric ID of the authenticated user. | 
    | data.**login** | The GitHub username of the authenticated user. | 
    | data.**type** | The account type. For example, User. | 
    | data.**htmlUrl** | The URL of the authenticated user's GitHub profile. | 


## List Repositories

Lists the repositories accessible to the authenticated user.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Per Page | Maximum number of results per page. The maximum value is 100. | integer | Optional. | 
    | Page | The page number. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of repositories, where each entry includes `id`, `name`, `fullName`, `owner` (with `id`, `login`, `type`, and `htmlUrl`), `private`, `description`, `htmlUrl`, and `defaultBranch`.


## List Organization Repositories

Lists the repositories for a specific organization.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Org | The organization name to list the repositories from. | string | Required. | 
    | Type | The type of repositories to list. Supported values:<ul><li>all</li><li>public</li><li>private</li><li>forks</li><li>sources</li><li>member</li></ul> | string | Optional. | 
    | Sort | The property to sort repositories by. Supported values:<ul><li>created</li><li>updated</li><li>pushed</li><li>full_name</li></ul> | string | Optional. |
    | Direction | The sort order. Supported values are `asc` or `desc`. | string | Optional. | 
    | Per Page | Maximum number of results per page. The maximum value is 100. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of repositories for the specified organization, where each entry includes `id`, `name`, `fullName`, `owner` (with `id`, `login`, `type`, and `htmlUrl`), `private`, `description`, `htmlUrl`, and `defaultBranch`.


## Get Repository

Retrieves the details of a specific repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name to retrieve. | string | Required. | 

=== "Output Parameters"

    Returns the repository details, including `id`, `name`, `fullName`, `owner` (with `id`, `login`, `type`, and `htmlUrl`), `private`, `description`, `htmlUrl`, and `defaultBranch`.


## Create Repository

Creates a new repository for the authenticated user.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Name | The repository name to create. | string | Required. |
    | Description | A description of the repository. | string | Optional. |
    | Is Private | Whether the repository is private. | boolean | Optional. |
    | Auto Init | Whether to initialize the repository with a README file. | boolean | Optional. |

=== "Output Parameters"

    Returns the created repository details, including `id`, `name`, `fullName`, `owner` (with `id`, `login`, `type`, and `htmlUrl`), `private`, `description`, `htmlUrl`, and `defaultBranch`.


## Fork Repository

Forks a repository to the authenticated user's account.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The name of the repository to fork. | string | Required. | 

=== "Output Parameters"

    Returns the forked repository details, including `id`, `name`, `fullName`, `owner` (with `id`, `login`, `type`, and `htmlUrl`), `private`, `description`, `htmlUrl`, and `defaultBranch`.


## Star Repository

Stars a repository for the authenticated user.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The name of the repository to star. | string | Required. | 

=== "Output Parameters"

    Returns `status: success` upon successfully starring the repository.


## Unstar Repository

Unstars a repository for the authenticated user.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The name of the repository to unstar. | string | Required. | 

=== "Output Parameters"

    Returns `status: success` upon successfully unstarring the repository.


## Search Repositories

Searches for repositories on GitHub matching the specified query.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query. | string | Required. | 
    | Sort | The property to sort repositories by. Supported values:<ul><li>stars</li><li>forks</li><li>updated</li></ul> | string | Optional. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns `totalCount`, `incompleteResults`, and `items`, where each item includes `id`, `name`, `fullName`, `owner` (with `id`, `login`, `type`, and `htmlUrl`), `private`, `description`, `htmlUrl`, and `defaultBranch`.


## Search Code

Searches for code across GitHub repositories matching the specified query.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query. | string | Required. |
    | Sort | The property to sort results by. Supported values: <ul><li>indexed</li></ul> | string | Optional. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns `totalCount`, `incompleteResults`, and `items`, where each item includes `name`, `path`, `sha`, `url`, `gitUrl`, `htmlUrl`, and `repository` (with `id`, `name`, `fullName`, `owner`, `private`, `description`, `htmlUrl`, and `defaultBranch`).


## List Issues

Lists the issues in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name to list the issues from. | string | Required. | 
    | State | The issue state to filter by. Supported values: <ul><li>open</li><li>closed</li><li>all</li></ul> | string | Optional. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of issues, where each entry includes `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## Get Issue

Retrieves the details of a specific issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name to retrieve issues from. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 

=== "Output Parameters"

    Returns the issue details, including `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## Create Issue

Creates a new issue in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name to create the issue in. | string | Required. | 
    | Title | The issue title. | string | Required. |
    | Body | The issue body. | string | Optional. |
    | Assignees | The usernames to assign to the issue, as a comma-separated list. | string | Optional. |
    | Labels | The labels to apply to the issue, as a comma-separated list. | string | Optional. |

=== "Output Parameters"

    Returns the created issue details, including `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## Update Issue

Updates an existing issue in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name contains the issue to update. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 
    | Title | The updated issue title. | string | Optional. | 
    | Body | The updated issue body. | string | Optional. |
    | State | The updated issue state. Supported values:<ul><li>open</li><li>closed</li></ul> | string | Optional. |
    | Labels | The updated labels to apply to the issue, as a comma-separated list. | string | Optional. |

=== "Output Parameters"

    Returns the updated issue details, including `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## Add Issue Comment

Adds a comment to an issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name contains the issue to add comment to. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 
    | Body | The comment text. | string | Required. | 

=== "Output Parameters"

    Returns the created comment details, including `id`, `body`, `htmlUrl`, `createdAt`, `updatedAt`, and `user` (with `id`, `login`, `type`, and `htmlUrl`).


## List Issue Comments

Retrieves the comments for an issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name contains the issue to add comment to. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. | 

=== "Output Parameters"

    Returns a list of comments, where each entry includes `id`, `body`, `htmlUrl`, `createdAt`, `updatedAt`, and `user` (with `id`, `login`, `type`, and `htmlUrl`).


## Get Parent Issue

Retrieves the parent issue of a sub-issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 

=== "Output Parameters"

    Returns the parent issue details, including `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## Add Sub Issue

Links an existing issue as a sub-issue of a parent issue. This operation does not create a new issue, both the parent and sub-issue must already exist.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 
    | Sub Issue Id | The sub-issue ID. You can retrieve it from the `id` field returned by the  [List Issues](#list-issues) operation. | integer | Required. | 

=== "Output Parameters"

    The operation returns the `status` of the request and a `data` object containing the parent issue details, including the issue `id`, `number`, `title`, `state`, `htmlUrl`, and the `user` who created it.


## Remove Sub Issue

Removes a sub-issue from an issue.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Issue Number | The issue number. You can get the issue number from the repository URL. For example, in `https://github.com/conductor-oss/conductor/issues/1090`, the issue number is `1090`. You can also retrieve it from the `number` field returned by the [List Issues](#list-issues) operation. | string | Required. | 
    | Sub Issue Id | The sub-issue ID. You can retrieve it from the `id` field returned by the  [List Issues](#list-issues) operation. | integer | Required. | 

=== "Output Parameters"

    Returns the parent issue details, including `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## Search Issues

Searches for issues on GitHub matching the specified query.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query. | string | Required. |
    | Sort | The property to sort results by. Accepted values: <ul><li>comments</li><li>created</li><li>updated</li></ul> | string | Optional. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns `totalCount`, `incompleteResults`, and `items`, where each item includes `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `assignees`, and `labels`.


## List Commits

Lists the commits in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Sha | The branch name or commit SHA to list commits from. Defaults to the repository's default branch if not specified. | string | Optional. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of commits, where each entry includes `sha`, `commit` (with `author`, `committer`, `message`, `tree`, `url`, `comment_count`, and `verification`), `url`, `html_url`, `comments_url`, `author`, `committer`, and `parents`.


## Get Commit

Retrieves the details of a specific commit.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Sha | The commit SHA. You can retrieve this from the `sha` field returned by the [List Commits](#list-commits) operation. | string | Required. | 

=== "Output Parameters"

    Returns the commit details, including `sha`, `commit`, `url`, `html_url`, `author`, `committer`, `parents`, `stats`, and `files`.


## List Branches

Lists the branches in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of branches, where each entry includes `name`, `commit` (with `sha` and `url`), and `protected`.


## Create Branch

Creates a new branch in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Branch Name | The name of the new branch. | string | Required. |
    | Sha | The starting point for the new branch. Accepts a branch name (for example, `main`), a 40-character commit SHA, or a fully-qualified ref (for example, `heads/main` or `tags/v1.0`). | string | Required. | 

=== "Output Parameters"

    Returns the created branch details, including `ref`, `url`, and `object` (with `sha`, `type`, and `url`).


## Get File Contents

Retrieves the contents of a file or directory in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Path| The file or directory path relative to the repository root. For example, `README.md` for a file in the root, `src/main/App.java` for a file in a subfolder, or `src` for a directory. Do not include a leading slash. Use forward slashes as separators. The path is case-sensitive. | string | Required. |
    | Ref | The branch name, tag, or commit SHA to retrieve the contents from. Defaults to the repository's default branch if not specified. | string | Optional. | 

=== "Output Parameters"

    Returns the file details, including `name`, `path`, `sha`, `size`, `url`, `html_url`, `git_url`, `download_url`, `type`, `content` (Base64-encoded file content), `encoding`, and `_links`.


## Create or Update File

Creates or updates a file in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Path| The file path relative to the repository root. For example, `src/main/App.java`. Do not include a leading slash. | string | Required. |
    | Message | The commit message. | string | Required. | 
    | Content | The file content in plain text. The content is automatically Base64-encoded before being sent to GitHub. | string | Required. | 
    | Branch | The branch to commit to. Defaults to the repository's default branch if not specified. | string | Optional. |
    | Sha | The SHA of the file being updated. Required for updates. If not provided, it is fetched automatically. | string | Optional. |
    | Committer Name | The name of the committer. | string | Optional. |
    | Committer Email | The email address of the committer. | string | Optional. | 

=== "Output Parameters"

    Returns `content` (file metadata including `sha`, `url`, and `_links`) and `commit` (with `sha`, `author`, `committer`, `message`, and `verification`).


## Push Files

Pushes multiple files to a repository in a single commit.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Branch | The branch to push the files to. | string | Required. | 
    | Message |The commit message. | string | Required. | 
    | Files | The files to push, as a JSON array. Each entry must include `path` (file path relative to the repository root) and `content` (plain UTF-8 text, automatically Base64-encoded). For example: `[{"path": "test.txt", "content": "hello world"}]`. | string | Required. | 

=== "Output Parameters"

    Returns `commit` (with `sha`, `url`, and `tree`), `ref` (with `ref`, `url`, and `object`), and `filesChanged`.


## Delete File

Deletes a file from a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Path | The file path relative to the repository root. | string | Required. |
    | Message | The commit message. | string | Required. |
    | Sha | The file's blob SHA. This is the SHA of the specific file content, not the branch name. To get the file SHA, use the [Get File Contents](/content/integrations/github-operations#get-file-contents) operation first and retrieve the `sha` field from the output. | string | Required. |
    | Branch | The branch to delete the file from. Defaults to the repository's default branch if not specified. | string | Optional. | 

=== "Output Parameters"

    Returns `content` (null on deletion) and `commit` (with `sha`, `url`, `html_url`, `author`, `committer`, `tree`, `message`, `parents`, and `verification`).


## List Pull Requests

Lists the pull requests in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | State | The pull request state to filter by. Accepted values:<ul><li>open</li><li>closed</li><li>all</li></ul> | string | Optional. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of pull requests, where each entry includes `id`, `number`, `title`, `body`, `state`, `draft`, `htmlUrl`, `mergeCommitSha`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `head` (with `label`, `ref`, `sha`, `repo`, and `user`), and `base` (with `label`, `ref`, `sha`, `repo`, and `user`).


## Get Pull Request

Retrieves the details of a specific pull request.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 

=== "Output Parameters"

    Returns the pull request details, including `id`, `number`, `title`, `body`, `state`, `draft`, `htmlUrl`, `mergeCommitSha`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `head` (with `label`, `ref`, `sha`, `repo`, and `user`), and `base` (with `label`, `ref`, `sha`, `repo`, and `user`).


## Create Pull Request

Creates a new pull request in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Title | The pull request title. | string | Required. |
    | Head | The name of the branch containing the changes (source branch). | string | Required. |
    | Base | The name of the branch to merge the changes into (target branch). | string | Required. |
    | Body | The pull request description. | string | Optional. |
    | Draft | Whether to create the pull request as a draft. | boolean | Optional. |

=== "Output Parameters"

    Returns the created pull request details, including `id`, `number`, `title`, `body`, `state`, `draft`, `htmlUrl`, `mergeCommitSha`, `user`, `head`, and `base`.


## Update Pull Request

Updates an existing pull request.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Title | The updated pull request title. | string | Optional. |
    | Body | The updated pull request description. | string | Optional. |
    | State | The updated pull request state. Supported values: `open`, `closed`. | string | Optional. |
    | Base | The updated target branch name. | string | Optional. |

=== "Output Parameters"

    Returns the updated pull request details, including `id`, `number`, `title`, `body`, `state`, `draft`, `htmlUrl`, `mergeCommitSha`, `user`, `head`, and `base`.


## Merge Pull Request

Merges a pull request in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Commit Message | The commit message for the merge commit. | string | Optional. |
    | Merge Method | The merge method to use. Supported values:<ul><li>merge</li><li>squash</li><li>rebase</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns `merged` (boolean indicating whether the merge was successful),` message` (confirmation message), and `sha` (SHA of the merge commit).


## Search Pull Requests

Searches for pull requests on GitHub matching the specified query. 

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Query | The search query. | string | Required. | 
    | Sort | The property to sort results by. Supported values: <ul><li>comments</li><li>created</li><li>updated</li></ul> | string | Optional. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | Page number. | integer | Optional. |

=== "Output Parameters"

    Returns `totalCount`, `incompleteResults`, and `items` (list of pull requests, each with `id`, `number`, `title`, `body`, `state`, `htmlUrl`, `user`, `assignees`, and `labels`).


## List Pull Request Files

Lists the files changed in a pull request.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | Page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of files, where each entry includes `filename`, `status`, `additions`, `deletions`, `changes`, `blobUrl`, `rawUrl`, and `patch`.


## List Pull Request Reviews

Retrieves the reviews for a pull request.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | Page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of reviews, where each entry includes `id`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), and `submittedAt`.


## List Pull Request Review Comments

Retrieves the review comments for a pull request.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | Page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of review comments, where each entry includes `id`, `body`, `path`, `line`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), `createdAt`, and `updatedAt`.


## Create Pending Review

Creates a pending review for a pull request. The review is not submitted until the Submit Pending Review operation is called.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Body | The review body text. | string | Optional. |
    | Commit Id | The commit SHA to associate the review with. Must be a valid 40-character commit SHA from the pull request. You can retrieve it from the `head.sha` field returned by the [Get Pull Request](/content/integrations/github-operations#get-pull-request) operation. If not provided, defaults to the latest commit on the PR. | string | Optional. |

=== "Output Parameters"

    Returns `id`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), and `submittedAt` (null until the review is submitted).


## Add Pending Review Comment

Adds a review comment to a pull request. Replaces any existing pending review.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Review Id | The ID of an existing pending review to replace. You can retrieve it from the `id` field returned by the [Create Pending Review](#create-pending-review) operation. | integer | Optional. | 
    | Body | The comment text. | string | Required. |
    | Path | The file path to comment on. Must be a file present in the pull request diff. If not specified, defaults to the first changed file. | string | Optional. |
    | Line | The line number in the file to comment on. | integer | Required. | 

=== "Output Parameters"

    Returns `id`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), and `submittedAt` (null until the review is submitted).


## Submit Pending Review

Submits a pending pull request review.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Pull Number | The pull request number. For example, in https://github.com/acme/docs/pull/1000, the pull request number is 1000. You can also retrieve it from the `number` field returned by the [List Pull Requests](#list-pull-requests) operation. | integer | Required. | 
    | Review Id | The ID of the pending review to submit. You can retrieve it from the `id` field returned by the [Create Pending Review](#create-pending-review) operation. | integer | Required. | 
    | Event | The review action. Supported values:<ul><li>APPROVE</li><li>REQUEST_CHANGES</li><li>COMMENT</li></ul> | string | Required. |
    | Body | The review summary text. | string | Optional. |

=== "Output Parameters"

    Returns `id`, `body`, `state`, `htmlUrl`, `user` (with `id`, `login`, `type`, and `htmlUrl`), and `submittedAt`.


## List Releases

Lists the releases in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of releases, where each entry includes `id`, `tagName`, `name`, `body`, `draft`, `prerelease`, `createdAt`, `publishedAt`, `author`, `htmlUrl`, and `assets`.


## Get Latest Release

Retrieves the latest published release in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 

=== "Output Parameters"

    Returns the latest release details, including `id`, `tagName`, `name`, `body`, `draft`, `prerelease`, `createdAt`, `publishedAt`, `author`, `htmlUrl`, and `assets`.


## Get Release by Tag

Retrieves a release by its tag name.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Tag Name | The tag name to retrieve the release from. | string | Required. | 

=== "Output Parameters"

    Returns the release details, including `id`, `tagName`, `name`, `body`, `draft`, `prerelease`, `createdAt`, `publishedAt`, `author`, `htmlUrl`, and `assets`.


## Create Release

Creates a new release in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Tag Name | The name of the tag for the release. | string | Required. | 
    | Target Commitish | The branch or commit SHA the release is based on. Defaults to the repository's default branch if not specified. | string | Optional. | 
    | Name | The name of the release. | string | Optional. | 
    | Body | The description of the release. | string | Optional. | 
    | Draft | Whether to create the release as a draft. | boolean | Optional. | 
    | Prerelease | Whether to identify the release as a prerelease. | boolean | Optional. | 
    | Discussion Category Name | The discussion category to create and link to the release. | string | Optional. | 
    | Generate Release Notes | Whether to automatically generate the release name and body. | boolean | Optional. | 
    | Make Latest | Whether to set this release as the latest. Supported values:<ul><li>true</li><li>false</li><li>legacy</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns the created release details, including `id`, `tagName`, `name`, `body`, `draft`, `prerelease`, `createdAt`, `publishedAt`, `author`, `htmlUrl`, and `assets`.


## Update Release

Updates an existing release in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Release Id | The unique ID of the release. You can retrieve it from the `id` field returned by the [List Releases](#list-releases) or [Create Release](#create-release) operation. | integer | Required. | 
    | Tag Name | The updated tag name for the release. | string | Optional. | 
    | Target Commitish | The updated branch or commit SHA the release is based on. | string | Optional. | 
    | Name | The updated name of the release. | string | Optional. | 
    | Body | The updated description of the release. | string | Optional. | 
    | Draft | Whether to create the release as a draft. | boolean | Optional. | 
    | Prerelease | Whether to identify the release as a prerelease. | boolean | Optional. | 
    | Discussion Category Name | The discussion category to create and link to the release. | string | Optional. | 
    | Make Latest | Whether to set this release as the latest. Supported values:<ul><li>true</li><li>false</li><li>legacy</li></ul> | string | Optional. | 

=== "Output Parameters"

    Returns the updated release details, including `id`, `tagName`, `name`, `body`, `draft`, `prerelease`, `createdAt`, `publishedAt`, `author`, `htmlUrl`, and `assets`.


## Delete Release

Deletes a release from a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Release Id | The unique ID of the release. You can retrieve it from the `id` field returned by the [List Releases](#list-releases) or [Create Release](#create-release) operation. | integer | Required. | 

=== "Output Parameters"

    Returns `status: success` upon successfully deleting the release.


## List Tags

Lists the tags in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of tags, where each entry includes `name`, `commit` (with `sha` and `url`), `zipballUrl`, and `tarballUrl`.


## Get Tag

Retrieves a specific tag by name.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Tag Name | The tag name to retrieve. For example, **v1.0.0**. | string | Required. | 

=== "Output Parameters"

    Returns the tag details, including `ref`, `node_id`, `url`, and `object` (with `sha`, `type`, and `url`).


## List Workflows

Lists the GitHub Actions workflows in a repository.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns `totalCount` and `workflows`, where each entry includes `id`, `name`, `path`, and `state`.


## List Workflow Runs

Lists the workflow runs for a repository or a specific workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Workflow Id | The workflow ID to filter runs by. You can retrieve it from the `id` field returned by the [List Workflows](#list-workflows) operation. | integer | Optional.|
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns `totalCount` and `workflowRuns`, where each entry includes `id`, `name`, `status`, `conclusion`, `runNumber`, `headSha`, and `htmlUrl`.


## Get Workflow Run

Retrieves the details of a specific workflow run.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Run Id | The workflow run ID. For example, in `https://github.com/acme/docs/actions/runs/12345678901`, the run ID is `12345678901`. You can also retrieve it from the `id` field returned by the [List Workflow Runs](#list-workflow-runs) operation. | integer | Required. | 

=== "Output Parameters"

    Returns the workflow run details, including `id`, `name`, `status`, `conclusion`, `runNumber`, `event`, `headSha`, `htmlUrl`, `createdAt`, `updatedAt`, `actor`, `headCommit`, and `repository`.


## Run Workflow

Triggers a workflow dispatch event to run a GitHub Actions workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Workflow Id | The workflow ID or filename. Example for  filename is `test.yml`.<br/>For workflow ID, You can retrieve it from the `id` field returned by the [List Workflows](#list-workflows) operation. | string | Required. | 
    | Ref | The branch or tag name to run the workflow on. | string | Required. |
    | Inputs | The workflow input parameters as a JSON object. | string | Optional. | 

=== "Output Parameters"

    Returns `status: success` upon successfully triggering the workflow run.


## Disable Workflow

Disables a GitHub Actions workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Workflow Id | The workflow ID or filename. Example for  filename is `test.yml`.<br/>For workflow ID, You can retrieve it from the `id` field returned by the [List Workflows](#list-workflows) operation. | string | Required. | 

=== "Output Parameters"

    Returns `status: success` upon successfully disabling the workflow.


## Enable Workflow

Enables a disabled GitHub Actions workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Workflow Id | The workflow ID or filename. Example for  filename is `test.yml`.<br/>For workflow ID, You can retrieve it from the `id` field returned by the [List Workflows](#list-workflows) operation. | string | Required. | 

=== "Output Parameters"

    Returns `status: success` upon successfully enabling the workflow.


## Get Workflow Usage

Retrieves the usage statistics and billing information for a GitHub Actions workflow.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Owner | The repository owner's username or organization name.For example, to retrieve https://github.com/conductor-oss/conductor, enter owner as **conductor-oss**. | string | Required. |
    | Repo | The repository name. | string | Required. | 
    | Workflow Id | The workflow ID or filename. Example for  filename is `test.yml`.<br/>For workflow ID, You can retrieve it from the `id` field returned by the [List Workflows](#list-workflows) operation. | string | Required. | 

=== "Output Parameters"

    Returns `billable`, which contains usage data broken down by operating system (for example, `UBUNTU`, `MACOS`, `WINDOWS`), each with `totalMs` (total billable milliseconds).


## List Teams

Lists the teams for the authenticated user across all organizations

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of teams, where each entry includes `name`, `id`, `slug`, `description`, `privacy`, `url`, `htmlUrl`, `membersCount`, `reposCount`, and `organization` (with `login`, `id`, `email`, `createdAt`, and `updatedAt`).


## List Team Members

Retrieves the members of a team in an organization.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | Org | The organization name. | string | Required. |
    | Team Slug | The team slug. You can retrieve it from the `slug` field returned by the [List Teams](/content/integrations/github-operations#list-teams) operation. | string | Required. |
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of team members, where each entry includes `id`, `login`, `type`, and `htmlUrl`.


## List Notifications

Lists the notifications for the authenticated user.

=== "Input Parameters"

    | Parameter | Description | Type | Required/Optional |
    | --------- | ----------- | ---- | ----------------- |
    | All | Whether to show all notifications, including read ones. Defaults to showing only unread notifications. | boolean | Optional. | 
    | Per Page | Maximum number of results per page. | integer | Optional. |
    | Page | The page number. | integer | Optional. |

=== "Output Parameters"

    Returns a list of notifications, where each entry includes details such as the notification ID, subject, repository, reason, and read status.


## Mark Notifications Read

Marks all notifications as read for the authenticated user.

=== "Input Parameters"

    This operation has no input parameters.

=== "Output Parameters"

    Returns `status: success` upon successfully marking all notifications as read.
