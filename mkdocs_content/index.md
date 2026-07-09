---
hide:
  - navigation
  - toc
description: "Orkes Conductor documentation for building durable workflows, API orchestration, microservice orchestration, and AI agent orchestration."
---

<div class="home-wrapper">

<h1 class="page-title">Orkes Conductor Documentation</h1>

<div class="hero-card">
  <div class="hero-card-left">
    <h2>Build unbreakable workflows and AI agents</h2>
    <p>Orkes Conductor is the managed enterprise platform for Conductor OSS &mdash; a durable workflow engine for production AI agents and distributed systems.</p>
    <a href="https://developer.orkescloud.com/" class="btn-primary">Start for free<span class="btn-arrow">&rarr;</span></a>
  </div>
  <div class="hero-card-right">
    <div class="editor-chrome">
      <span class="editor-dot red"></span><span class="editor-dot yellow"></span><span class="editor-dot green"></span>
      <span class="editor-filename">order_fulfillment</span>
    </div>
    <div class="diagram">
      <div class="diagram-node">
        <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11" fill="currentColor"/></svg>
        Trigger
      </div>
      <div class="diagram-connector"></div>
      <div class="diagram-node accent">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>
        Agent reasoning
      </div>
      <div class="diagram-connector"></div>
      <div class="diagram-row">
        <div class="diagram-node">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
          Tool
        </div>
        <div class="diagram-node">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6h6a4 4 0 0 1 4 4M7 18h6a4 4 0 0 0 4-4"/></svg>
          Workflow
        </div>
        <div class="diagram-node">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
          Human
        </div>
      </div>
      <div class="diagram-connector"></div>
      <div class="diagram-node result">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"/></svg>
        Result
      </div>
    </div>
  </div>
</div>

<div class="build-section" id="build-on-orkes">
  <span class="section-label">BUILD ON ORKES</span>
  <div class="pathway-grid">

    <div class="pathway-card workflows">
      <h3>Build Workflows</h3>
      <p>Model business logic as durable workflows &mdash; sequential, parallel, conditional, and event-driven.</p>
      <pre class="pathway-code"><code>{
  "name": "hello_workflow",
  "version": 1,
  "tasks": [
    { "name": "fetch_data", "type": "HTTP" },
    { "name": "parse_response", "type": "INLINE" }
  ]
}</code></pre>
      <ul class="pathway-features">
        <li>Persisted state &mdash; resume after failure</li>
        <li>Isolated retries &mdash; only failed steps retry</li>
        <li>Polyglot workers &mdash; Python, Java, Go, and more</li>
      </ul>
      <a class="pathway-cta" href="/content/quickstarts">Build your first workflow &rarr;</a>
    </div>

    <div class="pathway-card agents">
      <h3>Build AI Agents</h3>
      <p>Build tool-calling agents with the Orkes Agent SDK &mdash; durable by default, with automatic crash recovery.</p>
      <pre class="pathway-code"><code>from agentspan.agents import Agent, AgentRuntime, tool

@tool
def get_weather(city: str) -&gt; dict:
    """Get current weather for a city."""
    ...

agent = Agent(
    name="weatherbot",
    model="anthropic/claude-sonnet-4-6",
    tools=[get_weather],
)</code></pre>
      <ul class="pathway-features">
        <li>Durable agent state &mdash; resumes after a crash, no lost progress</li>
        <li>Human-in-the-loop approvals and waits</li>
        <li>Decorate a typed function with <code>@tool</code> &mdash; its docstring tells the LLM what it does</li>
      </ul>
      <a class="pathway-cta" href="/content/ai-agents/first-ai-agent">Build your first AI agent &rarr;</a>
    </div>

  </div>
</div>

<div class="sdk-section">
  <span class="section-label center">DEVELOPER FIRST</span>
  <h2>SDKs in your favorite language</h2>
  <p>Native clients for the languages your team already ships.</p>

  <div class="sdk-switcher">
    <input type="radio" name="sdklang" id="sdk-python" class="sdk-input" checked>
    <input type="radio" name="sdklang" id="sdk-java" class="sdk-input">
    <input type="radio" name="sdklang" id="sdk-js" class="sdk-input">
    <input type="radio" name="sdklang" id="sdk-go" class="sdk-input">
    <input type="radio" name="sdklang" id="sdk-csharp" class="sdk-input">

    <div class="sdk-card">
      <div class="sdk-tabbar">
        <label for="sdk-python" class="sdk-tab-label">Python</label>
        <label for="sdk-java" class="sdk-tab-label">Java</label>
        <label for="sdk-js" class="sdk-tab-label">JavaScript</label>
        <label for="sdk-go" class="sdk-tab-label">Go</label>
        <label for="sdk-csharp" class="sdk-tab-label">C#</label>
      </div>

      <div class="sdk-panel" data-panel="python">
        <div class="sdk-install-col">
          <div class="sdk-install-label">INSTALL</div>
          <pre class="sdk-install-cmd">pip install conductor-python</pre>
          <p class="sdk-caption">Decorate a function with <code>@worker_task</code> &mdash; Conductor handles polling, retries, and threads.</p>
          <a class="sdk-link" href="/content/sdks/python">Python SDK reference &rarr;</a>
        </div>
        <div class="sdk-code-col">
          <div class="editor-chrome"><span class="editor-dot red"></span><span class="editor-dot yellow"></span><span class="editor-dot green"></span><span class="editor-filename">greet_worker</span></div>
          <pre class="sdk-code"><code>from conductor.client.worker.worker_task import worker_task

@worker_task(task_definition_name="greet")
def greet(name: str) -&gt; str:
    return f"Hello, {name}!"</code></pre>
        </div>
      </div>

      <div class="sdk-panel" data-panel="java">
        <div class="sdk-install-col">
          <div class="sdk-install-label">INSTALL</div>
          <pre class="sdk-install-cmd">implementation 'org.conductoross:conductor-client:5.0.1'</pre>
          <p class="sdk-caption">Annotate a method with <code>@WorkerTask</code> &mdash; Conductor handles polling, retries, and thread management.</p>
          <a class="sdk-link" href="/content/sdks/java">Java SDK reference &rarr;</a>
        </div>
        <div class="sdk-code-col">
          <div class="editor-chrome"><span class="editor-dot red"></span><span class="editor-dot yellow"></span><span class="editor-dot green"></span><span class="editor-filename">greet_worker</span></div>
          <pre class="sdk-code"><code>@WorkerTask("greet")
public String greet(@InputParam("name") String name) {
    return "Hello, " + name + "!";
}</code></pre>
        </div>
      </div>

      <div class="sdk-panel" data-panel="js">
        <div class="sdk-install-col">
          <div class="sdk-install-label">INSTALL</div>
          <pre class="sdk-install-cmd">npm install @io-orkes/conductor-javascript</pre>
          <p class="sdk-caption">Decorate an async function with <code>@worker</code> and return a task result.</p>
          <a class="sdk-link" href="/content/sdks/javascript">JavaScript SDK reference &rarr;</a>
        </div>
        <div class="sdk-code-col">
          <div class="editor-chrome"><span class="editor-dot red"></span><span class="editor-dot yellow"></span><span class="editor-dot green"></span><span class="editor-filename">greet_worker</span></div>
          <pre class="sdk-code"><code>import { worker } from "@io-orkes/conductor-javascript";

@worker({ taskDefName: "greet" })
async function greet(task: Task) {
  return {
    status: "COMPLETED",
    outputData: { result: `Hello ${task.inputData.name}` },
  };
}</code></pre>
        </div>
      </div>

      <div class="sdk-panel" data-panel="go">
        <div class="sdk-install-col">
          <div class="sdk-install-label">INSTALL</div>
          <pre class="sdk-install-cmd">go get github.com/conductor-sdk/conductor-go</pre>
          <p class="sdk-caption">Register a plain function as a worker &mdash; Conductor runs the polling loop.</p>
          <a class="sdk-link" href="/content/sdks/golang">Go SDK reference &rarr;</a>
        </div>
        <div class="sdk-code-col">
          <div class="editor-chrome"><span class="editor-dot red"></span><span class="editor-dot yellow"></span><span class="editor-dot green"></span><span class="editor-filename">greet_worker</span></div>
          <pre class="sdk-code"><code>func Greet(task *model.Task) (interface{}, error) {
	return map[string]interface{}{
		"hello": "Hello, " + fmt.Sprintf("%v", task.InputData["person_to_be_greated"]),
	}, nil
}</code></pre>
        </div>
      </div>

      <div class="sdk-panel" data-panel="csharp">
        <div class="sdk-install-col">
          <div class="sdk-install-label">INSTALL</div>
          <pre class="sdk-install-cmd">dotnet add package conductor-csharp</pre>
          <p class="sdk-caption">Implement <code>IWorkflowTask</code> for a class-based worker with full control over execution.</p>
          <a class="sdk-link" href="/content/sdks/csharp">C# SDK reference &rarr;</a>
        </div>
        <div class="sdk-code-col">
          <div class="editor-chrome"><span class="editor-dot red"></span><span class="editor-dot yellow"></span><span class="editor-dot green"></span><span class="editor-filename">greet_worker</span></div>
          <pre class="sdk-code"><code>public class GreetWorker : IWorkflowTask
{
    public string TaskType =&gt; "greet";
    public WorkflowTaskExecutorConfiguration WorkerSettings { get; } = new();

    public TaskResult Execute(Task task)
    {
        var name = task.InputData["name"];
        var result = task.Completed();
        result.OutputData = new Dictionary&lt;string, object&gt; { ["result"] = $"Hello, {name}!" };
        return result;
    }
}</code></pre>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="concepts-section">
  <span class="section-label">CORE CONCEPTS</span>
  <div class="concepts-grid">

    <a class="concept-card" href="/content/core-concepts">
      <span class="concept-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6h6a4 4 0 0 1 4 4M7 18h6a4 4 0 0 0 4-4"/></svg></span>
      <h3>Core Concepts</h3>
      <p>Workflows, tasks, workers, and the operators (loops, conditionals, fork/join) that control them.</p>
    </a>

    <a class="concept-card" href="/content/conductor-architecture">
      <span class="concept-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></span>
      <h3>Conductor Architecture &amp; Worker Polling</h3>
      <p>The state machine evaluator, task queues, workers, data stores, and APIs behind Conductor.</p>
    </a>

    <a class="concept-card" href="/content/error-handling">
      <span class="concept-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg></span>
      <h3>Handling Failures</h3>
      <p>Configure retries, timeouts, and failure workflows to keep executions reliable.</p>
    </a>

    <a class="concept-card" href="/content/agentic-workflow-engine">
      <span class="concept-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg></span>
      <h3>Agentic Workflow Engine</h3>
      <p>Durable AI agents, reliable tool execution, human approvals, retries, and audit history.</p>
    </a>

    <a class="concept-card" href="/content/category/event-driven-orchestration">
      <span class="concept-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg></span>
      <h3>Event-Driven Orchestration</h3>
      <p>React to webhooks, publish events, and coordinate with Kafka, RabbitMQ, SQS, and more.</p>
    </a>

    <a class="concept-card" href="/content/category/access-control-and-security">
      <span class="concept-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
      <h3>Role Based Access Control</h3>
      <p>Configure RBAC for users, groups, applications, roles, permissions, and tags.</p>
    </a>

  </div>
</div>

<div class="resources-section">
  <div class="resources-grid">

    <div class="resource-card">
      <span class="resource-kicker">Product updates</span>
      <h3>Changelog</h3>
      <ul class="changelog-list">
        <li>
          <span class="changelog-date">Jun 26, 2026</span><span class="changelog-tag">Integrations</span>
          <p>Connect workflows to Slack, GitHub, Jira &amp; more</p>
        </li>
        <li>
          <span class="changelog-date">Jun 05, 2026</span><span class="changelog-tag">Integrations</span>
          <p>Connect workflows to Google Workspace, Notion &amp; more</p>
        </li>
        <li>
          <span class="changelog-date">May 01, 2026</span><span class="changelog-tag">Platform</span>
          <p>AI Assistant supports Claude and OpenAI</p>
        </li>
      </ul>
      <a class="resource-link" href="https://orkes.io/changelog">View changelog &rarr;</a>
    </div>

    <div class="resource-card">
      <span class="resource-kicker">Learning</span>
      <h3>Academy</h3>
      <p>Learn workflow orchestration with hands-on labs, structured paths, and certification from Orkes.</p>
      <ul class="resource-links">
        <li><a href="https://orkes.io/academy/introduction">Introduction &rarr;</a></li>
        <li><a href="https://orkes.io/academy/architecture-design">Architecture &amp; Design &rarr;</a></li>
        <li><a href="https://orkes.io/academy/projects">Projects &rarr;</a></li>
      </ul>
      <a class="resource-link" href="https://orkes.io/academy">Explore courses &rarr;</a>
    </div>

    <div class="resource-card">
      <span class="resource-kicker">Articles</span>
      <h3>Blog</h3>
      <p>Technical use cases, community posts, and product updates from the Orkes team.</p>
      <ul class="resource-links">
        <li><a href="https://orkes.io/blog/how-to-build-a-screenshot-to-react-ai-agent">How to Build a UI Screenshot-to-Code AI Agent &rarr;</a></li>
        <li><a href="https://orkes.io/blog/what-is-loop-engineering">What Is Loop Engineering? &rarr;</a></li>
        <li><a href="https://orkes.io/blog/building-durable-loops-with-conductor-part-1">Building Durable Loops with Conductor, Part 1 &rarr;</a></li>
      </ul>
      <a class="resource-link" href="https://orkes.io/blog/">Read blogs &rarr;</a>
    </div>

  </div>
</div>

</div>
