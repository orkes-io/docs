---
title: "AI & LLM orchestration recipes"
description: "LLM orchestration cookbook - AI agent orchestration recipes for chat completion, RAG pipelines, and web search in Orkes Conductor."
canonical_route: "ai-orchestration/ai-llm-recipes"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, AI & LLM orchestration recipes, AI orchestration, LLM orchestration, agent workflows"
---

# AI & LLM orchestration recipes

Build durable agents and LLM workflows with Conductor's native AI capabilities. Every recipe below runs with full durable execution guarantees - retries, state persistence, and crash recovery.

Each recipe uses `llmProvider` to reference the name of an LLM integration you've configured on your Orkes Conductor cluster (from the **Integrations** tab), not a fixed provider identifier - the example values below (`openai`, `anthropic`, `google_gemini`) are illustrative integration names. See [AI/LLM integrations](/content/category/integrations/ai-llm) to configure a provider before running these examples.

### Chat completion

A single-step workflow that sends a question to an LLM and returns the answer.

```json
{
  "name": "chat_workflow",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "chat_task",
      "taskReferenceName": "chat",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o-mini",
        "messages": [
          {"role": "system", "message": "You are a helpful assistant."},
          {"role": "user", "message": "${workflow.input.question}"}
        ],
        "temperature": 0.7,
        "maxTokens": 500
      }
    }
  ],
  "inputParameters": ["question"],
  "outputParameters": {
    "answer": "${chat.output.result}"
  }
}
```

**Register and run:**

```shell
curl -X POST 'http://localhost:8080/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -d @chat_workflow.json

curl -X POST 'http://localhost:8080/api/workflow/chat_workflow' \
  -H 'Content-Type: application/json' \
  -d '{"question": "What is workflow orchestration?"}'
```

---

### RAG pipeline with vector database (search + answer)

A vector database workflow for retrieval-augmented generation: vector search retrieves relevant documents, then an LLM generates an answer grounded in those results.

```json
{
  "name": "rag_workflow",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["question"],
  "tasks": [
    {
      "name": "search_knowledge_base",
      "taskReferenceName": "search",
      "type": "LLM_SEARCH_INDEX",
      "inputParameters": {
        "vectorDB": "postgres-prod",
        "namespace": "kb",
        "index": "articles",
        "embeddingModelProvider": "openai",
        "embeddingModel": "text-embedding-3-small",
        "query": "${workflow.input.question}",
        "maxResults": 3
      }
    },
    {
      "name": "generate_answer",
      "taskReferenceName": "answer",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "anthropic",
        "model": "claude-sonnet-4-20250514",
        "messages": [
          {"role": "system", "message": "Answer based on the following context: ${search.output.result}"},
          {"role": "user", "message": "${workflow.input.question}"}
        ],
        "temperature": 0.3
      }
    }
  ],
  "outputParameters": {
    "answer": "${answer.output.result}",
    "sources": "${search.output.result}"
  }
}
```

**Register and run:**

```shell
curl -X POST 'http://localhost:8080/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -d @rag_workflow.json

curl -X POST 'http://localhost:8080/api/workflow/rag_workflow' \
  -H 'Content-Type: application/json' \
  -d '{"question": "How do I configure retry policies?"}'
```

!!! tip "Prerequisites"
    Requires a vector database (Pinecone, Weaviate, pgvector, or MongoDB Atlas) and an LLM provider configured as integrations on your Orkes Conductor cluster. See [Vector database integrations](/content/category/integrations/vector-databases) and [AI/LLM integrations](/content/category/integrations/ai-llm).

---

### Web search - real-time information retrieval

Enable the LLM's web search to answer questions about current events or find up-to-date information, when supported by the configured provider.

```json
{
  "name": "web_search_workflow",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["question"],
  "tasks": [
    {
      "name": "web_search_chat",
      "taskReferenceName": "chat",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o-mini",
        "messages": [
          {"role": "system", "message": "Use web search to find current information."},
          {"role": "user", "message": "${workflow.input.question}"}
        ],
        "maxTokens": 1000
      }
    }
  ],
  "outputParameters": {
    "answer": "${chat.output.result}"
  }
}
```

**Register and run:**

```shell
curl -X POST 'http://localhost:8080/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -d @web_search_workflow.json

curl -X POST 'http://localhost:8080/api/workflow/web_search_workflow' \
  -H 'Content-Type: application/json' \
  -d '{"question": "What are the latest developments in AI regulation?"}'
```

---

### Coding agent - plan, code, and review

A three-step agent that plans an implementation, writes the code, and reviews the result. Useful as a starting pattern for automated code-generation tasks.

```json
{
  "name": "coding_agent",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["task"],
  "tasks": [
    {
      "name": "plan",
      "taskReferenceName": "plan",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {"role": "system", "message": "Break down the coding task into clear numbered steps."},
          {"role": "user", "message": "${workflow.input.task}"}
        ],
        "temperature": 0.2,
        "maxTokens": 1000
      }
    },
    {
      "name": "write_code",
      "taskReferenceName": "code",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {"role": "system", "message": "Write the code and explain how to verify it."},
          {"role": "user", "message": "Plan:\n${plan.output.result}\n\nTask: ${workflow.input.task}"}
        ],
        "temperature": 0.1,
        "maxTokens": 4000
      }
    },
    {
      "name": "review",
      "taskReferenceName": "review",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o-mini",
        "messages": [
          {"role": "system", "message": "Review the implementation for correctness and code quality."},
          {"role": "user", "message": "Task: ${workflow.input.task}\n\nCode:\n${code.output.result}"}
        ],
        "maxTokens": 1000
      }
    }
  ],
  "outputParameters": {
    "code": "${code.output.result}",
    "review": "${review.output.result}"
  }
}
```

**Register and run:**

```shell
curl -X POST 'http://localhost:8080/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -d @coding_agent.json

curl -X POST 'http://localhost:8080/api/workflow/coding_agent' \
  -H 'Content-Type: application/json' \
  -d '{"task": "Write a Python function that converts Roman numerals to integers, with unit tests"}'
```

---

### Multi-turn conversation chaining

Chain multiple LLM calls as a conversation, passing prior output forward as context for the next call.

```json
{
  "name": "multi_turn_chain",
  "description": "Two-step conversation where the second call builds on the first",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["topic"],
  "tasks": [
    {
      "name": "first_turn",
      "taskReferenceName": "turn1",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {"role": "system", "message": "You are a technical architect. Be concise."},
          {"role": "user", "message": "Design a high-level architecture for: ${workflow.input.topic}"}
        ],
        "temperature": 0.3,
        "maxTokens": 2000
      }
    },
    {
      "name": "follow_up",
      "taskReferenceName": "turn2",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {"role": "system", "message": "You are a technical architect. Be concise."},
          {"role": "user", "message": "Architecture:\n${turn1.output.result}\n\nNow list the key risks and mitigations for this architecture."}
        ],
        "temperature": 0.3,
        "maxTokens": 2000
      }
    }
  ],
  "outputParameters": {
    "architecture": "${turn1.output.result}",
    "risks": "${turn2.output.result}"
  }
}
```

**Register and run:**

```shell
curl -X POST 'http://localhost:8080/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -d @multi_turn_chain.json

curl -X POST 'http://localhost:8080/api/workflow/multi_turn_chain' \
  -H 'Content-Type: application/json' \
  -d '{"topic": "Real-time collaborative document editor"}'
```

---

### Web research agent - search and synthesize

A multi-step agent that gathers information via web search, then uses a second LLM call to synthesize it into a structured report.

```json
{
  "name": "web_research_agent",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["topic"],
  "tasks": [
    {
      "name": "gather_information",
      "taskReferenceName": "research",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o",
        "messages": [
          {"role": "system", "message": "Use web search to find comprehensive, current information. Search for multiple perspectives and recent developments."},
          {"role": "user", "message": "Research this topic thoroughly: ${workflow.input.topic}"}
        ],
        "temperature": 0.3,
        "maxTokens": 3000
      }
    },
    {
      "name": "synthesize_report",
      "taskReferenceName": "report",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "anthropic",
        "model": "claude-sonnet-4-20250514",
        "messages": [
          {"role": "system", "message": "Synthesize the research into a well-structured markdown report with sections, key findings, and citations."},
          {"role": "user", "message": "Topic: ${workflow.input.topic}\n\nResearch:\n${research.output.result}\n\nWrite a comprehensive report."}
        ],
        "maxTokens": 4000
      }
    }
  ],
  "outputParameters": {
    "report": "${report.output.result}"
  }
}
```

**Register and run:**

```shell
curl -X POST 'http://localhost:8080/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -d @web_research_agent.json

curl -X POST 'http://localhost:8080/api/workflow/web_research_agent' \
  -H 'Content-Type: application/json' \
  -d '{"topic": "The state of WebAssembly adoption in 2026"}'
```

---

## Configure AI providers and vector databases

These recipes require an LLM provider integration, and the RAG recipe additionally requires a vector database integration. Configure both from the **Integrations** tab on your Orkes Conductor cluster:

- [AI/LLM integrations](/content/category/integrations/ai-llm) - Anthropic, OpenAI, Azure OpenAI, Google Gemini, AWS Bedrock, Mistral, Cohere, HuggingFace, Ollama, and more.
- [Vector database integrations](/content/category/integrations/vector-databases) - Pinecone, Weaviate, pgvector, and MongoDB Atlas.

Once configured, reference the integration's name as `llmProvider` (or `embeddingModelProvider`/`vectorDB`) in your task definitions.
