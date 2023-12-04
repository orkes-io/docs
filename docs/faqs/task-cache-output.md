# How are task outputs cached in Conductor?

Certain task types support the task caching functionality, where you can enable the "Cache output" option that allows saving of task outputs for future use. On enabling this option, you need to provide the following parameters:

```json
"cacheConfig": {
       "ttlInSecond": 3600,
       "key": "someCacheKey"
     }
```

- **tlInSecondt**- Provide the time to live in seconds. You can also pass this parameter as a variable.
- **key**- Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this parameter as a variable.

This field is currently supported for the following task types:

- [HTTP](https://orkes.io/content/reference-docs/system-tasks/http)
- [HTTP Poll](https://orkes.io/content/reference-docs/system-tasks/http-poll)
- [Business Rule](https://orkes.io/content/reference-docs/system-tasks/business-rule)
- [JDBC](https://orkes.io/content/reference-docs/system-tasks/jdbc)
- [Opsgenie](https://orkes.io/content/reference-docs/system-tasks/opsgenie)
- [LLM Text Complete](https://orkes.io/content/reference-docs/ai-tasks/llm-text-complete)
- [LLM Generate Embeddings](https://orkes.io/content/reference-docs/ai-tasks/llm-generate-embeddings)
- [LLM Get Embeddings](https://orkes.io/content/reference-docs/ai-tasks/llm-get-embeddings)
- [LLM Search Index](https://orkes.io/content/reference-docs/ai-tasks/llm-search-index)
- [LLM Index Document](https://orkes.io/content/reference-docs/ai-tasks/llm-index-document)
- [LLM Get Document](https://orkes.io/content/reference-docs/ai-tasks/llm-get-document)
- [LLM Index Text](https://orkes.io/content/reference-docs/ai-tasks/llm-index-text)
- [Worker Task](https://orkes.io/content/reference-docs/worker-task)
