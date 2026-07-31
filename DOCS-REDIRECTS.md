# Docs redirects & URL-preserving mappings

Strategy: a dropped Orkes page whose OSS counterpart is **1:1** is **served at the same Orkes URL** via `shared-docs-map.json` `pages` (no redirect, URL unchanged). Only **many:1** cases (several Orkes pages → one OSS page: API endpoints, AI-tasks, and a few dev-guide dupes) get a **redirect**.

- **Served at same URL (no redirect): 62** → handled in `shared-docs-map.json`.
- **Redirects (many:1): 83** → MkDocs `redirects` plugin / CloudFront.

---

## Served at the same Orkes URL — via `shared-docs-map.json` (no redirect)

OSS content, existing Orkes URL preserved. `source route ← OSS page`.

| Orkes URL (kept) | Served from (OSS) |
|---|---|
| `/content/ai-cookbook/ai-llm-recipes` | `/content/devguide/cookbook/ai-llm` |
| `/content/ai-cookbook/durable-agents` | `/content/devguide/ai/durable-agents` |
| `/content/ai-cookbook/dynamic-workflows` | `/content/devguide/ai/dynamic-workflows` |
| `/content/ai-cookbook/failure-semantics` | `/content/devguide/ai/failure-semantics` |
| `/content/ai-cookbook/first-ai-agent` | `/content/devguide/ai/first-ai-agent` |
| `/content/ai-cookbook/human-in-the-loop` | `/content/devguide/ai/human-in-the-loop` |
| `/content/ai-cookbook/production-agent-architecture` | `/content/devguide/ai/production-agent-architecture` |
| `/content/ai-cookbook/token-efficiency` | `/content/devguide/ai/token-efficiency` |
| `/content/ai-cookbook/why-conductor` | `/content/devguide/ai/why-conductor` |
| `/content/conceptual-guides/directed-acyclic-graph` | `/content/devguide/architecture/directed-acyclic-graph` |
| `/content/conceptual-guides/workflow-and-task-status` | `/content/devguide/how-tos/workflow-status-events` |
| `/content/cookbook/dynamic-parallelism` | `/content/devguide/cookbook/dynamic-parallelism` |
| `/content/cookbook/dynamic-workflows` | `/content/devguide/cookbook/dynamic-workflows` |
| `/content/cookbook/microservice-orchestration` | `/content/devguide/cookbook/microservice-orchestration` |
| `/content/cookbook/task-timeouts-and-retries` | `/content/devguide/cookbook/task-timeouts-and-retries` |
| `/content/cookbook/wait-and-timers` | `/content/devguide/cookbook/wait-and-timers` |
| `/content/cookbook/workflow-scheduling` | `/content/devguide/cookbook/workflow-scheduling` |
| `/content/developer-guides/conductor-skills` | `/content/devguide/how-tos/conductor-skills` |
| `/content/developer-guides/debugging-workflows` | `/content/devguide/how-tos/Workflows/debugging-workflows` |
| `/content/developer-guides/error-handling` | `/content/devguide/how-tos/Workflows/handling-errors` |
| `/content/developer-guides/integration-with-cicd` | `/content/devguide/how-tos/cicd-integration` |
| `/content/developer-guides/metrics-and-observability` | `/content/documentation/metrics/server` |
| `/content/developer-guides/rate-limits` | `/content/documentation/configuration/taskdef` |
| `/content/developer-guides/running-workflows` | `/content/devguide/how-tos/Workflows/starting-workflows` |
| `/content/developer-guides/scaling-workers` | `/content/devguide/how-tos/Workers/scaling-workers` |
| `/content/developer-guides/scheduling-workflows` | `/content/devguide/how-tos/Workflows/scheduling-workflows` |
| `/content/developer-guides/schema-validation` | `/content/devguide/how-tos/schema-validation` |
| `/content/developer-guides/sending-signals-to-workflows` | `/content/devguide/cookbook/sending-signals` |
| `/content/developer-guides/task-to-domain` | `/content/documentation/api/taskdomains` |
| `/content/developer-guides/unit-and-regression-tests` | `/content/devguide/how-tos/Workflows/testing-workflows` |
| `/content/developer-guides/webhook-integration` | `/content/devguide/how-tos/incoming-webhooks` |
| `/content/developer-guides/write-workflows-using-code` | `/content/devguide/how-tos/Workflows/creating-workflows` |
| `/content/event-driven-orchestration/publish-events` | `/content/devguide/how-tos/publish-events` |
| `/content/event-driven-orchestration/receive-events` | `/content/devguide/how-tos/consume-route-events` |
| `/content/faqs/general-faqs` | `/content/devguide/faq` |
| `/content/quickstart/durable-execution` | `/content/architecture/durable-execution` |
| `/content/quickstart/json-code-native` | `/content/architecture/json-native` |
| `/content/quickstart/task-lifecycle` | `/content/devguide/architecture/tasklifecycle` |
| `/content/reference-docs/api` | `/content/documentation/api` |
| `/content/reference-docs/api/workflow/start-workflow-execution` | `/content/documentation/api/startworkflow` |
| `/content/reference-docs/operators/do-while` | `/content/documentation/configuration/workflowdef/operators/do-while-task` |
| `/content/reference-docs/operators/dynamic` | `/content/documentation/configuration/workflowdef/operators/dynamic-task` |
| `/content/reference-docs/operators/dynamic-fork` | `/content/documentation/configuration/workflowdef/operators/dynamic-fork-task` |
| `/content/reference-docs/operators/fork-join` | `/content/documentation/configuration/workflowdef/operators/fork-task` |
| `/content/reference-docs/operators/join` | `/content/documentation/configuration/workflowdef/operators/join-task` |
| `/content/reference-docs/operators/set-variable` | `/content/documentation/configuration/workflowdef/operators/set-variable-task` |
| `/content/reference-docs/operators/start-workflow` | `/content/documentation/configuration/workflowdef/operators/start-workflow-task` |
| `/content/reference-docs/operators/sub-workflow` | `/content/documentation/configuration/workflowdef/operators/sub-workflow-task` |
| `/content/reference-docs/operators/switch` | `/content/documentation/configuration/workflowdef/operators/switch-task` |
| `/content/reference-docs/operators/terminate` | `/content/documentation/configuration/workflowdef/operators/terminate-task` |
| `/content/reference-docs/operators/wait` | `/content/documentation/configuration/workflowdef/systemtasks/wait-task` |
| `/content/reference-docs/system-tasks/event` | `/content/documentation/configuration/workflowdef/systemtasks/event-task` |
| `/content/reference-docs/system-tasks/http` | `/content/documentation/configuration/workflowdef/systemtasks/http-task` |
| `/content/reference-docs/system-tasks/inline` | `/content/documentation/configuration/workflowdef/systemtasks/inline-task` |
| `/content/reference-docs/system-tasks/jdbc` | `/content/documentation/configuration/workflowdef/systemtasks/jdbc-task` |
| `/content/reference-docs/system-tasks/jq-transform` | `/content/documentation/configuration/workflowdef/systemtasks/json-jq-transform-task` |
| `/content/sdks/csharp` | `/content/documentation/clientsdks/csharp-sdk` |
| `/content/sdks/golang` | `/content/documentation/clientsdks/go-sdk` |
| `/content/sdks/java` | `/content/documentation/clientsdks/java-sdk` |
| `/content/sdks/javascript` | `/content/documentation/clientsdks/js-sdk` |
| `/content/sdks/python` | `/content/documentation/clientsdks/python-sdk` |
| `/content/sdks/sdk-index` | `/content/documentation/clientsdks/index` |

---

## Redirects — many:1 (old Orkes URL → merged OSS URL)

Several Orkes pages collapse to one OSS page; the extras redirect. (For each OSS target, one Orkes URL may instead be chosen as the canonical served page — implementation detail.)

| From (old Orkes) | To (merged OSS) |
|---|---|
| `/content/ai-cookbook/llm-orchestration` | `/content/devguide/ai/llm-orchestration` |
| `/content/developer-guides/ai-orchestration` | `/content/devguide/ai/llm-orchestration` |
| `/content/developer-guides/using-llms-in-your-orkes-conductor-workflows` | `/content/devguide/ai/llm-orchestration` |
| `/content/conceptual-guides/architecture` | `/content/devguide/concepts/conductor` |
| `/content/core-concepts` | `/content/devguide/concepts/conductor` |
| `/content/quickstart/concepts` | `/content/devguide/concepts/conductor` |
| `/content/developer-guides/tasks-in-workflows` | `/content/devguide/concepts/tasks` |
| `/content/quickstart/tasks` | `/content/devguide/concepts/tasks` |
| `/content/developer-guides/using-workers` | `/content/devguide/concepts/workers` |
| `/content/quickstart/workers` | `/content/devguide/concepts/workers` |
| `/content/developer-guides/workflows` | `/content/devguide/concepts/workflows` |
| `/content/quickstart/workflows` | `/content/devguide/concepts/workflows` |
| `/content/cookbook/event-driven` | `/content/devguide/cookbook/event-driven` |
| `/content/event-driven-orchestration` | `/content/devguide/cookbook/event-driven` |
| `/content/developer-guides/passing-inputs-to-task-in-conductor` | `/content/devguide/how-tos/Tasks/task-inputs` |
| `/content/developer-guides/task-input-templates` | `/content/devguide/how-tos/Tasks/task-inputs` |
| `/content/developer-guides/versioning-workflows` | `/content/devguide/how-tos/Workflows/versioning-workflows` |
| `/content/developer-guides/workflow-version-behavior-on-execution` | `/content/devguide/how-tos/Workflows/versioning-workflows` |
| `/content/developer-guides/workflow-versioning` | `/content/devguide/how-tos/Workflows/versioning-workflows` |
| `/content/reference-docs/api/metadata/creating-task-definitions` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/creating-workflow-definition` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/delete-task-definition` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/delete-workflow-definition` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/get-all-task-definitions` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/get-all-workflow-definitions` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/get-task-definition` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/get-workflow-definition` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/import-bpmn` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/update-task-definitions` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/metadata/update-workflow-definitions` | `/content/documentation/api/metadata` |
| `/content/reference-docs/api/schedule/add-tags-to-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/create-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/delete-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/delete-tags-from-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/get-all-schedules` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/get-nex-few-schedules` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/get-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/get-schedules-using-tags` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/get-tags-from-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/pause-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/pause-schedule-bulk` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/resume-schedule` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/resume-schedule-bulk` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/search-schedule-definitions` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/schedule/search-schedule-executions` | `/content/documentation/api/scheduler` |
| `/content/reference-docs/api/task/add-task-log` | `/content/documentation/api/task` |
| `/content/reference-docs/api/task/get-task` | `/content/documentation/api/task` |
| `/content/reference-docs/api/task/signal-running-task-asynchronously` | `/content/documentation/api/task` |
| `/content/reference-docs/api/task/signal-running-task-synchronously` | `/content/documentation/api/task` |
| `/content/reference-docs/api/task/update-task-status-in-workflow` | `/content/documentation/api/task` |
| `/content/reference-docs/api/workflow/delete-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/get-workflow-by-id` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/get-workflow-size` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/get-workflows-by-correlation-id` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/pause-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/rerun-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/restart-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/resume-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/retry-failed-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/search-workflow-executions` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/skip-task-from-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/synchronous-workflow-execution` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/terminate-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/test-workflow` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/test-workflow-synchronously` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/update-variable` | `/content/documentation/api/workflow` |
| `/content/reference-docs/api/workflow/upgrade-workflow` | `/content/documentation/api/workflow` |
| `/content/developer-guides/using-vector-databases-in-your-orkes-conductor-workflows` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/chunk-text` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/list-files` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-chat-complete` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-generate-embeddings` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-get-document` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-get-embeddings` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-index-document` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-index-text` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-search-index` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-store-embeddings` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/llm-text-complete` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/reference-docs/ai-tasks/parse-document` | `/content/documentation/configuration/workflowdef/systemtasks/ai-tasks` |
| `/content/developer-guides/orchestrating-human-tasks` | `/content/documentation/configuration/workflowdef/systemtasks/human-task` |
| `/content/reference-docs/operators/human` | `/content/documentation/configuration/workflowdef/systemtasks/human-task` |
