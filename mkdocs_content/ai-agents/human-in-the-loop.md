---
title: "Human-in-the-loop"
description: "Human-in-the-loop patterns for AI agents - pre-execution approval, conditional post-execution review, LLM-as-judge automated review, and durable human tasks."
canonical_route: "ai-agents/human-in-the-loop"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, AI orchestration, LLM orchestration, MCP gateway, agent workflows"
---

# Human-in-the-loop

Production agents need oversight. Conductor's `HUMAN` task is a durable pause - the workflow stops, persists its state, and resumes only when a human responds via the Task Update API. This pause survives server restarts, deploys, and infrastructure changes. Whether the reviewer responds in 5 seconds or 5 days, the workflow state is preserved and execution resumes exactly where it left off.

Conductor supports two distinct patterns for human oversight, plus LLM-as-judge for automated review.

Every `HUMAN` task's configuration lives under an `inputParameters.__humanTaskDefinition` object, and requires a `displayName`, a `userFormTemplate` (referencing a [user form](/content/developer-guides/orchestrating-human-tasks) you've created), and an `assignmentCompletionStrategy`. The task's output is whatever fields that form defines - not arbitrary keys.


## Pre-execution review

The LLM plans an action and a human reviews it **before** it executes. The agent cannot proceed without approval.

```json
[
  {
    "name": "plan_action",
    "type": "LLM_CHAT_COMPLETE",
    "taskReferenceName": "plan",
    "inputParameters": {
      "llmProvider": "anthropic",
      "model": "claude-sonnet-4-20250514",
      "messages": [
        { "role": "user", "message": "Decide what action to take for: ${workflow.input.task}" }
      ]
    }
  },
  {
    "name": "human_approval",
    "type": "HUMAN",
    "taskReferenceName": "approval",
    "inputParameters": {
      "__humanTaskDefinition": {
        "displayName": "Agent Action Approval",
        "userFormTemplate": { "name": "AgentActionApproval", "version": 1 },
        "assignmentCompletionStrategy": "LEAVE_OPEN"
      },
      "plannedAction": "${plan.output.result}",
      "reason": "Review before executing tool call"
    }
  },
  {
    "name": "execute_action",
    "type": "HTTP",
    "taskReferenceName": "execute",
    "inputParameters": {
      "uri": "${workflow.input.toolServerUrl}/${plan.output.result.action}",
      "method": "POST",
      "body": "${plan.output.result.arguments}"
    }
  }
]
```

Use this when the action has real-world consequences (sending emails, modifying data, making purchases) and you want a human gate before anything happens.


## Conditional post-execution review

The tool executes, but the result goes to a human for review **only when a condition is met** - for example, when the confidence is low, the amount exceeds a threshold, or the output affects sensitive data.

```json
[
  {
    "name": "execute_action",
    "type": "HTTP",
    "taskReferenceName": "execute",
    "inputParameters": {
      "uri": "${workflow.input.toolServerUrl}/${workflow.input.action}",
      "method": "POST",
      "body": "${workflow.input.arguments}"
    }
  },
  {
    "name": "check_if_review_needed",
    "type": "SWITCH",
    "taskReferenceName": "review_gate",
    "evaluatorType": "graaljs",
    "expression": "($.execute.output.response.body.confidence < 0.8 || $.execute.output.response.body.amount > 1000) ? 'needs_review' : 'auto_approve'",
    "decisionCases": {
      "needs_review": [
        {
          "name": "human_review",
          "type": "HUMAN",
          "taskReferenceName": "review",
          "inputParameters": {
            "__humanTaskDefinition": {
              "displayName": "Low-Confidence Result Review",
              "userFormTemplate": { "name": "ResultReview", "version": 1 },
              "assignmentCompletionStrategy": "LEAVE_OPEN"
            },
            "toolResult": "${execute.output.response.body}",
            "reason": "Low confidence or high-value action"
          }
        }
      ]
    },
    "defaultCase": []
  }
]
```

Use this when most actions are safe to auto-approve but certain conditions require human oversight. The `SWITCH` task evaluates the condition; the `HUMAN` task only triggers when needed.


## LLM-as-judge: automated review

Instead of (or in addition to) a human reviewer, you can add an LLM task to evaluate the output of another LLM or tool call. This is useful for quality checks, safety screening, or validating structured output before it proceeds.

```json
[
  {
    "name": "generate_response",
    "type": "LLM_CHAT_COMPLETE",
    "taskReferenceName": "response",
    "inputParameters": {
      "llmProvider": "anthropic",
      "model": "claude-sonnet-4-20250514",
      "messages": [
        { "role": "user", "message": "Draft a customer reply for: ${workflow.input.complaint}" }
      ]
    }
  },
  {
    "name": "judge_response",
    "type": "LLM_CHAT_COMPLETE",
    "taskReferenceName": "judge",
    "inputParameters": {
      "llmProvider": "openai",
      "model": "gpt-4o",
      "messages": [
        {
          "role": "system",
          "message": "You are a quality reviewer. Evaluate the response for tone, accuracy, and policy compliance. Respond with JSON: {\"approved\": true/false, \"reason\": \"...\"}"
        },
        {
          "role": "user",
          "message": "Customer complaint: ${workflow.input.complaint}\n\nDraft response: ${response.output.result}"
        }
      ],
      "temperature": 0.1
    }
  },
  {
    "name": "check_approval",
    "type": "SWITCH",
    "taskReferenceName": "gate",
    "evaluatorType": "graaljs",
    "expression": "$.judge.output.result.approved ? 'approved' : 'rejected'",
    "decisionCases": {
      "rejected": [
        {
          "name": "escalate_to_human",
          "type": "HUMAN",
          "taskReferenceName": "escalation",
          "inputParameters": {
            "__humanTaskDefinition": {
              "displayName": "Rejected Response Escalation",
              "userFormTemplate": { "name": "ResponseEscalation", "version": 1 },
              "assignmentCompletionStrategy": "LEAVE_OPEN"
            },
            "draftResponse": "${response.output.result}",
            "judgeReason": "${judge.output.result.reason}"
          }
        }
      ]
    },
    "defaultCase": []
  }
]
```

**What happens:**

1. The first LLM generates a response.
2. A second LLM (potentially a different provider or model) reviews it for quality, tone, or policy compliance.
3. If approved, the workflow continues. If rejected, it escalates to a `HUMAN` task with the judge's reasoning attached.

You can use different models for generation and review - for example, a fast model for drafting and a more capable model for judging. You can also chain multiple judges, or combine LLM-as-judge with human review as a final gate. Because each LLM call is a separate persisted task, the generation is never re-run if the judge or human review step fails.


## Combining patterns

These patterns compose naturally. A single workflow can use all three:

1. **LLM-as-judge** screens every output automatically.
2. **Conditional HITL** escalates to a human only when the judge rejects or confidence is low.
3. **Pre-execution review** gates high-stakes actions regardless of judge outcome.

Because each review step is a separate persisted task, no upstream work is repeated if a review step fails or takes time. The LLM generation that took 10 seconds and cost tokens is preserved - only the review decision needs to happen.


## Next steps

- **[Durable Agents](/content/ai-agents/durable-agents)** - What persists, what gets retried, error handling, and multi-agent composition.
- **[Dynamic Workflows](/content/ai-agents/dynamic-workflows)** - Agent loops, dynamic workflow generation, and tool use examples.
- **[HUMAN task reference](/content/reference-docs/operators/human)** - Full configuration options for the HUMAN system task.
