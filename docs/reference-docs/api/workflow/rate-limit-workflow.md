# Rate Limit Workflow

The **workflow rate limit** limits the number of workflow executions at any given time. 
Workflow triggered after exceeding the rate limit will get queued based on the trigger time.
RateLimit config is a part of the workflow definition. The key can be parameterized.

## Java Example
```shell
        RateLimitConfig rateLimitConfig = new RateLimitConfig();
        rateLimitConfig.setRateLimitKey("http");
        rateLimitConfig.setConcurrentExecLimit(3);
        workflowDef.setRateLimitConfig(rateLimitConfig);
```

Here the execution limit is set as 3, which means that no more than 3 workflows will be allowed to execute at any given time.

## Dynamic rate limit.
For a use cases where the rate limit is to be configured dynamically, we can use below example,
```shell
        RateLimitConfig rateLimitConfig = new RateLimitConfig();
        rateLimitConfig.setRateLimitKey("${workflow.correlationId}");
        rateLimitConfig.setConcurrentExecLimit(3);
        workflowDef.setRateLimitConfig(rateLimitConfig);
```
So for each correlationId separate rate limiting will be applied.
For example, the workflow is triggered with correlationids 1 and 2, there will be two rate limiting queues for the workflow.
We can create a dynamic rate limit based on input, workflowType, correlationid and version.
  
