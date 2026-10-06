---
title: "LLM orchestration"
description: "Native LLM orchestration with Conductor - supported LLM providers and vector database integration for RAG pipelines."
canonical_route: "ai-orchestration/llm-orchestration"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, LLM orchestration, AI orchestration, agent workflows"
---

# LLM orchestration

Orkes Conductor provides native system tasks for LLM orchestration and integration. No external frameworks or custom workers required - configure a provider on your Orkes Conductor cluster and use it in any workflow.

## Supported LLM providers

| Provider | Chat Completion | Text Completion | Embeddings |
|---|---|---|---|
| Anthropic Claude | ✓ | ✓ | - |
| AWS Bedrock | ✓ | ✓ | ✓ (Titan models only) |
| Azure OpenAI | ✓ | ✓ | ✓ |
| Google Gemini AI | ✓ | ✓ | - |
| Google Vertex AI | ✓ | ✓ | ✓ |
| Cohere | ✓ | ✓ | ✓ |
| Grok (xAI) | ✓ | ✓ | - |
| HuggingFace | ✓ | ✓ | - |
| Mistral | ✓ | ✓ | ✓ |
| Ollama | ✓ | ✓ | ✓ |
| OpenAI | ✓ | ✓ | ✓ |
| Perplexity | ✓ | ✓ | - |

Each provider is a configured integration - switch models by changing a parameter, not your code. Google Gemini AI and Google Vertex AI are separate integrations: use Vertex AI for non-Gemini Google models and for text embeddings.

## Vector database workflows

Orkes Conductor's built-in vector database integration enables RAG (retrieval-augmented generation) pipelines as standard Conductor workflows.

| Vector Database | Store Embeddings | Index Text | Semantic Search |
|---|---|---|---|
| Pinecone | ✓ | ✓ | ✓ |
| Weaviate | ✓ | ✓ | ✓ |
| pgvector (PostgreSQL) | ✓ | ✓ | ✓ |
| MongoDB Atlas Vector Search | ✓ | ✓ | ✓ |


### Example: RAG pipeline

A complete RAG workflow using native system tasks - index documents, search, and generate an answer. No custom workers required.

```json
{
  "name": "rag_pipeline",
  "description": "Index documents, search, and generate RAG answer",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "index_document",
      "taskReferenceName": "index_ref",
      "type": "LLM_INDEX_TEXT",
      "inputParameters": {
        "vectorDB": "postgres-prod",
        "index": "knowledge_base",
        "namespace": "docs",
        "docId": "${workflow.input.docId}",
        "text": "${workflow.input.text}",
        "embeddingModelProvider": "openai",
        "embeddingModel": "text-embedding-3-small",
        "dimensions": 1536
      }
    },
    {
      "name": "search_index",
      "taskReferenceName": "search_ref",
      "type": "LLM_SEARCH_INDEX",
      "inputParameters": {
        "vectorDB": "postgres-prod",
        "index": "knowledge_base",
        "namespace": "docs",
        "query": "${workflow.input.question}",
        "embeddingModelProvider": "openai",
        "embeddingModel": "text-embedding-3-small",
        "dimensions": 1536,
        "maxResults": 3
      }
    },
    {
      "name": "generate_answer",
      "taskReferenceName": "answer_ref",
      "type": "LLM_CHAT_COMPLETE",
      "inputParameters": {
        "llmProvider": "openai",
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "system",
            "message": "Answer the question using only the provided context."
          },
          {
            "role": "user",
            "message": "Context:\n${search_ref.output.result}\n\nQuestion: ${workflow.input.question}"
          }
        ],
        "temperature": 0.2
      }
    }
  ],
  "outputParameters": {
    "searchResults": "${search_ref.output.result}",
    "answer": "${answer_ref.output.result}"
  }
}
```

Every task type here - `LLM_INDEX_TEXT`, `LLM_SEARCH_INDEX`, `LLM_CHAT_COMPLETE` - is a native Conductor system task. The vector database, embedding model, and LLM provider are all configuration parameters. Switch from pgvector to Pinecone or from OpenAI to Anthropic by changing a parameter value.


## Next steps

- **[Durable Agents](/content/ai-agents/durable-agents)** - What persists, what gets retried, and why JSON is AI-native.
- **[Dynamic Workflows](/content/ai-agents/dynamic-workflows)** - Agents that build their own execution plans at runtime.
- **[AI & LLM Recipes](/content/ai-orchestration/ai-llm-recipes)** - Practical recipes for common LLM workflow patterns.
