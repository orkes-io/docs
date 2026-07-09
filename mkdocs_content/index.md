---
hide:
  - navigation
  - toc
description: "Orkes Conductor documentation for building durable workflows, API orchestration, microservice orchestration, and AI agent orchestration."
---

<div class="home-wrapper">

<!-- ===================== HERO ===================== -->
<section class="hp-section">
  <div class="hp-wrap">
    <h1 class="hp-title">Orkes Conductor Documentation</h1>
    <div class="hp-hero-panel">
      <div class="hp-hero-left">
        <h2>Build unbreakable workflows and AI agents</h2>
        <p>Orkes Conductor is the managed enterprise platform for Conductor OSS &mdash; a durable workflow engine for production AI agents and distributed systems.</p>
        <div>
          <a href="https://developer.orkescloud.com/?ga_id=GA1.1.114307086.1749276711&amp;utm_source=google&amp;utm_medium=organic&amp;_gl=1*mi3s3s*_gcl_au*MTU0NDU1MTQuMTc3ODM5MTkyMw.." class="hp-cta-pill">Start for free <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
        </div>
      </div>
      <div class="hp-hero-right">
        <div class="hp-editor-chrome">
          <span class="hp-dot red"></span><span class="hp-dot yellow"></span><span class="hp-dot green"></span>
          <span class="hp-filename">order_fulfillment</span>
        </div>
        <div class="hp-diagram">
          <div class="hp-diagram-node">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.9"><path d="M8 5v14l11-7z"></path></svg>
            <span>Trigger</span>
          </div>
          <div class="hp-diagram-connector"></div>
          <div class="hp-diagram-node accent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M12 3v3M5 8l1.6 1.6M19 8l-1.6 1.6M12 21a5 5 0 0 0 5-5c0-3-2-4-2-7a3 3 0 0 0-6 0c0 3-2 4-2 7a5 5 0 0 0 5 5Z"></path></svg>
            <span>Agent reasoning</span>
          </div>
          <div class="hp-diagram-connector"></div>
          <div class="hp-diagram-row">
            <div class="hp-diagram-node">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8"><circle cx="12" cy="12" r="3"></circle><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5H9.4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.4L5 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4.2l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"></path></svg>
              <span>Tool</span>
            </div>
            <div class="hp-diagram-node">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8"><circle cx="5" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="12" r="2"></circle><path d="M7 6.4 17 11M7 17.6 17 13"></path></svg>
              <span>Workflow</span>
            </div>
            <div class="hp-diagram-node">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg>
              <span>Human</span>
            </div>
          </div>
          <div class="hp-diagram-connector"></div>
          <div class="hp-diagram-node result">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.2"><path d="M20 6 9 17l-5-5"></path></svg>
            <span>Result</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===================== BUILD ON ORKES ===================== -->
<section class="hp-section" style="padding:52px 40px 18px;">
  <div class="hp-wrap"><h2 class="hp-eyebrow">Build on Orkes</h2></div>
</section>
<section class="hp-build-split">
  <div class="hp-build-panel workflows">
    <div class="hp-build-inner">
      <h3>Build Workflows</h3>
      <p>Model business logic as durable workflows &mdash; sequential, parallel, conditional, and event-driven.</p>
      <div class="hp-code-block"><pre><code><span style="color:var(--pun)">{</span>
  <span style="color:var(--kw)">"name"</span><span style="color:var(--pun)">:</span> <span style="color:var(--str)">"hello_workflow"</span><span style="color:var(--pun)">,</span>
  <span style="color:var(--kw)">"version"</span><span style="color:var(--pun)">:</span> <span style="color:var(--dec)">1</span><span style="color:var(--pun)">,</span>
  <span style="color:var(--kw)">"tasks"</span><span style="color:var(--pun)">:</span> <span style="color:var(--pun)">[</span>
    <span style="color:var(--pun)">{</span>
      <span style="color:var(--kw)">"name"</span><span style="color:var(--pun)">:</span> <span style="color:var(--str)">"fetch_data"</span><span style="color:var(--pun)">,</span>
      <span style="color:var(--kw)">"type"</span><span style="color:var(--pun)">:</span> <span style="color:var(--str)">"HTTP"</span>
    <span style="color:var(--pun)">},</span>
    <span style="color:var(--pun)">{</span>
      <span style="color:var(--kw)">"name"</span><span style="color:var(--pun)">:</span> <span style="color:var(--str)">"parse_response"</span><span style="color:var(--pun)">,</span>
      <span style="color:var(--kw)">"type"</span><span style="color:var(--pun)">:</span> <span style="color:var(--str)">"INLINE"</span>
    <span style="color:var(--pun)">}</span>
  <span style="color:var(--pun)">]</span>
<span style="color:var(--pun)">}</span></code></pre></div>
      <div class="hp-feature-list">
        <div>Persisted state &mdash; resume after failure</div>
        <div>Isolated retries &mdash; only failed steps retry</div>
        <div>Execution history &mdash; inputs, outputs, and a full audit trail</div>
        <div>Polyglot workers &mdash; Python, Java, Go, and more</div>
      </div>
      <a href="/content/quickstarts" class="hp-text-cta">Build your first workflow &rarr;</a>
    </div>
  </div>
  <div class="hp-build-panel agents">
    <div class="hp-build-inner">
      <h3>Build AI Agents</h3>
      <p>Build tool-calling agents with the Orkes Agent SDK &mdash; durable by default, with automatic crash recovery.</p>
      <div class="hp-code-block"><pre><code><span style="color:var(--kw)">from</span> agentspan.agents <span style="color:var(--kw)">import</span> Agent<span style="color:var(--pun)">,</span> AgentRuntime<span style="color:var(--pun)">,</span> tool

<span style="color:var(--dec)">@tool</span>
<span style="color:var(--kw)">def</span> <span style="color:var(--fn)">get_weather</span><span style="color:var(--pun)">(</span>city<span style="color:var(--pun)">:</span> <span style="color:var(--typ)">str</span><span style="color:var(--pun)">)</span> -&gt; <span style="color:var(--typ)">dict</span><span style="color:var(--pun)">:</span>
    <span style="color:var(--str)">"""Get current weather for a city."""</span>
    ...

agent <span style="color:var(--pun)">=</span> <span style="color:var(--fn)">Agent</span><span style="color:var(--pun)">(</span>
    name<span style="color:var(--pun)">=</span><span style="color:var(--str)">"weatherbot"</span><span style="color:var(--pun)">,</span>
    model<span style="color:var(--pun)">=</span><span style="color:var(--str)">"anthropic/claude-sonnet-4-6"</span><span style="color:var(--pun)">,</span>
    tools<span style="color:var(--pun)">=</span><span style="color:var(--pun)">[</span>get_weather<span style="color:var(--pun)">],</span>
<span style="color:var(--pun)">)</span></code></pre></div>
      <div class="hp-feature-list">
        <div>Durable agent state &mdash; resumes after a crash, no lost progress</div>
        <div>Human-in-the-loop approvals and waits</div>
        <div class="hp-inline-chip">Decorate a typed function with <span class="hp-chip">@tool</span> &mdash; its docstring tells the LLM what it does.</div>
      </div>
      <a href="/content/ai-agents/first-ai-agent" class="hp-text-cta">Build your first AI agent &rarr;</a>
    </div>
  </div>
</section>

<!-- ===================== SDK STRIP ===================== -->
<section class="hp-section" style="padding:72px 40px;">
  <div class="hp-wrap">
    <div class="hp-sdk-header">
      <span class="hp-sdk-eyebrow">Developer first</span>
      <h2>SDKs in your favorite language</h2>
      <p>Native clients for the languages your team already ships.</p>
    </div>

    <input type="radio" name="hp-sdklang" id="hp-sdk-python" class="hp-sdk-input" checked>
    <input type="radio" name="hp-sdklang" id="hp-sdk-java" class="hp-sdk-input">
    <input type="radio" name="hp-sdklang" id="hp-sdk-js" class="hp-sdk-input">
    <input type="radio" name="hp-sdklang" id="hp-sdk-go" class="hp-sdk-input">
    <input type="radio" name="hp-sdklang" id="hp-sdk-csharp" class="hp-sdk-input">

    <div class="hp-sdk-card">
      <div class="hp-sdk-tabbar">
        <label for="hp-sdk-python" class="hp-sdk-tab">Python</label>
        <label for="hp-sdk-java" class="hp-sdk-tab">Java</label>
        <label for="hp-sdk-js" class="hp-sdk-tab">JavaScript</label>
        <label for="hp-sdk-go" class="hp-sdk-tab">Go</label>
        <label for="hp-sdk-csharp" class="hp-sdk-tab">C#</label>
      </div>

      <div class="hp-sdk-panel" data-panel="python">
        <div class="hp-sdk-install-col">
          <div class="hp-sdk-install-label">Install</div>
          <pre class="hp-sdk-install-cmd">pip install conductor-python</pre>
          <p class="hp-sdk-caption">Decorate a function with @worker_task &mdash; Conductor handles polling, retries, and threads.</p>
          <a class="hp-sdk-link" href="/content/sdks/python">Python SDK reference &rarr;</a>
        </div>
        <div class="hp-sdk-code-col">
          <div class="hp-editor-chrome"><span class="hp-dot red"></span><span class="hp-dot yellow"></span><span class="hp-dot green"></span><span class="hp-filename">greet_worker</span></div>
          <pre>from conductor.client.worker.worker_task import worker_task

@worker_task(task_definition_name="greet")
def greet(name: str) -&gt; str:
    return f"Hello, {name}!"</pre>
        </div>
      </div>

      <div class="hp-sdk-panel" data-panel="java">
        <div class="hp-sdk-install-col">
          <div class="hp-sdk-install-label">Install</div>
          <pre class="hp-sdk-install-cmd">implementation 'org.conductoross:conductor-client:5.0.1'</pre>
          <p class="hp-sdk-caption">Annotate a method with @WorkerTask &mdash; Conductor handles polling, retries, and thread management.</p>
          <a class="hp-sdk-link" href="/content/sdks/java">Java SDK reference &rarr;</a>
        </div>
        <div class="hp-sdk-code-col">
          <div class="hp-editor-chrome"><span class="hp-dot red"></span><span class="hp-dot yellow"></span><span class="hp-dot green"></span><span class="hp-filename">greet_worker</span></div>
          <pre>@WorkerTask("greet")
public String greet(@InputParam("name") String name) {
    return "Hello, " + name + "!";
}</pre>
        </div>
      </div>

      <div class="hp-sdk-panel" data-panel="js">
        <div class="hp-sdk-install-col">
          <div class="hp-sdk-install-label">Install</div>
          <pre class="hp-sdk-install-cmd">npm install @io-orkes/conductor-javascript</pre>
          <p class="hp-sdk-caption">Decorate an async function with @worker and return a task result.</p>
          <a class="hp-sdk-link" href="/content/sdks/javascript">JavaScript SDK reference &rarr;</a>
        </div>
        <div class="hp-sdk-code-col">
          <div class="hp-editor-chrome"><span class="hp-dot red"></span><span class="hp-dot yellow"></span><span class="hp-dot green"></span><span class="hp-filename">greet_worker</span></div>
          <pre>import { worker } from "@io-orkes/conductor-javascript";

@worker({ taskDefName: "greet" })
async function greet(task: Task) {
  return {
    status: "COMPLETED",
    outputData: { result: `Hello ${task.inputData.name}` },
  };
}</pre>
        </div>
      </div>

      <div class="hp-sdk-panel" data-panel="go">
        <div class="hp-sdk-install-col">
          <div class="hp-sdk-install-label">Install</div>
          <pre class="hp-sdk-install-cmd">go get github.com/conductor-sdk/conductor-go</pre>
          <p class="hp-sdk-caption">Register a plain function as a worker &mdash; Conductor runs the polling loop.</p>
          <a class="hp-sdk-link" href="/content/sdks/golang">Go SDK reference &rarr;</a>
        </div>
        <div class="hp-sdk-code-col">
          <div class="hp-editor-chrome"><span class="hp-dot red"></span><span class="hp-dot yellow"></span><span class="hp-dot green"></span><span class="hp-filename">greet_worker</span></div>
          <pre>func Greet(task *model.Task) (interface{}, error) {
    return map[string]interface{}{
        "hello": "Hello, " + fmt.Sprintf("%v", task.InputData["person_to_be_greated"]),
    }, nil
}</pre>
        </div>
      </div>

      <div class="hp-sdk-panel" data-panel="csharp">
        <div class="hp-sdk-install-col">
          <div class="hp-sdk-install-label">Install</div>
          <pre class="hp-sdk-install-cmd">dotnet add package conductor-csharp</pre>
          <p class="hp-sdk-caption">Implement IWorkflowTask for a class-based worker with full control over execution.</p>
          <a class="hp-sdk-link" href="/content/sdks/csharp">C# SDK reference &rarr;</a>
        </div>
        <div class="hp-sdk-code-col">
          <div class="hp-editor-chrome"><span class="hp-dot red"></span><span class="hp-dot yellow"></span><span class="hp-dot green"></span><span class="hp-filename">greet_worker</span></div>
          <pre>public class GreetWorker : IWorkflowTask
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
}</pre>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ===================== CORE CONCEPTS ===================== -->
<section class="hp-section" style="padding:16px 40px 72px;">
  <div class="hp-wrap">
    <h2 class="hp-eyebrow" style="margin-bottom:22px;">Core concepts</h2>
    <div class="hp-concepts-grid">

      <a class="hp-concept-card" href="/content/quickstarts/concepts">
        <div class="hp-concept-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><circle cx="5" cy="6" r="2.2"></circle><circle cx="5" cy="18" r="2.2"></circle><circle cx="19" cy="12" r="2.2"></circle><path d="M7.2 6.6 16.8 11M7.2 17.4 16.8 13"></path></svg></div>
        <h3>Core Concepts</h3>
        <p>Workflows, tasks, workers, and the operators (loops, conditionals, fork/join) that control them.</p>
      </a>

      <a class="hp-concept-card" href="/content/conductor-architecture">
        <div class="hp-concept-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M12 3 2 8l10 5 10-5-10-5Z"></path><path d="M2 12l10 5 10-5"></path><path d="M2 16l10 5 10-5"></path></svg></div>
        <h3>Conductor Architecture &amp; Worker Polling</h3>
        <p>The state machine evaluator, task queues, workers, data stores, and APIs behind Conductor.</p>
      </a>

      <a class="hp-concept-card" href="/content/error-handling">
        <div class="hp-concept-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M21 12a9 9 0 1 1-3-6.7"></path><path d="M21 4v4h-4"></path></svg></div>
        <h3>Handling Failures</h3>
        <p>Configure retries, timeouts, and failure workflows to keep executions reliable.</p>
      </a>

      <a class="hp-concept-card" href="/content/agentic-workflow-engine">
        <div class="hp-concept-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M12 3v3M5 8l1.6 1.6M19 8l-1.6 1.6M12 21a5 5 0 0 0 5-5c0-3-2-4-2-7a3 3 0 0 0-6 0c0 3-2 4-2 7a5 5 0 0 0 5 5Z"></path></svg></div>
        <h3>Agentic Workflow Engine</h3>
        <p>Durable AI agents, reliable tool execution, human approvals, retries, and audit history.</p>
      </a>

      <a class="hp-concept-card" href="/content/category/event-driven-orchestration">
        <div class="hp-concept-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M3 12a9 9 0 0 1 9-9M12 3a9 9 0 0 1 9 9M7 12a5 5 0 0 1 5-5"></path><circle cx="12" cy="12" r="1.6"></circle></svg></div>
        <h3>Event-Driven Orchestration</h3>
        <p>React to webhooks, publish events, and coordinate with Kafka, RabbitMQ, SQS, and more.</p>
      </a>

      <a class="hp-concept-card" href="/content/category/access-control-and-security">
        <div class="hp-concept-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg></div>
        <h3>Role Based Access Control</h3>
        <p>Configure RBAC for users, groups, applications, roles, permissions, and tags.</p>
      </a>

    </div>
  </div>
</section>

<!-- ===================== WHAT'S NEW + COMMUNITY ===================== -->
<section class="hp-section" style="padding:8px 40px 80px;">
  <div class="hp-wrap hp-resources-grid">

    <div class="hp-resource-card featured">
      <span class="hp-resource-kicker">Product updates</span>
      <h3>Changelog</h3>
      <div class="hp-changelog-list">
        <a class="hp-changelog-item" href="https://orkes.io/changelog">
          <div class="hp-changelog-meta">
            <span class="hp-changelog-dot"></span><span class="hp-changelog-date">Jun 26, 2026</span><span class="hp-changelog-tag">Integrations</span>
          </div>
          <div class="hp-changelog-headline">Connect workflows to Slack, GitHub, Jira &amp; more</div>
        </a>
        <a class="hp-changelog-item" href="https://orkes.io/changelog">
          <div class="hp-changelog-meta">
            <span class="hp-changelog-date">Jun 05, 2026</span><span class="hp-changelog-tag">Integrations</span>
          </div>
          <div class="hp-changelog-headline">Connect workflows to Google Workspace, Notion &amp; more</div>
        </a>
        <a class="hp-changelog-item" href="https://orkes.io/changelog">
          <div class="hp-changelog-meta">
            <span class="hp-changelog-date">May 01, 2026</span><span class="hp-changelog-tag">Platform</span>
          </div>
          <div class="hp-changelog-headline">AI Assistant supports Claude and OpenAI</div>
        </a>
      </div>
      <a class="hp-resource-cta" href="https://orkes.io/changelog">View changelog &rarr;</a>
    </div>

    <div class="hp-resource-card">
      <span class="hp-resource-kicker">Learning</span>
      <h3>Academy</h3>
      <p>Learn workflow orchestration with hands-on labs, structured paths, and certification from Orkes.</p>
      <div class="hp-resource-links">
        <a href="https://orkes.io/academy/introduction">Introduction <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" stroke-width="2"><path d="M9 6l6 6-6 6"></path></svg></a>
        <a href="https://orkes.io/academy/architecture-design">Architecture &amp; Design <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" stroke-width="2"><path d="M9 6l6 6-6 6"></path></svg></a>
        <a href="https://orkes.io/academy/projects">Projects <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" stroke-width="2"><path d="M9 6l6 6-6 6"></path></svg></a>
      </div>
      <a class="hp-resource-cta" href="https://orkes.io/academy">Explore courses &rarr;</a>
    </div>

    <div class="hp-resource-card">
      <span class="hp-resource-kicker">Articles</span>
      <h3>Blog</h3>
      <p>Technical use cases, community posts, and product updates from the Orkes team.</p>
      <div class="hp-resource-links">
        <a href="https://orkes.io/blog/how-to-build-a-screenshot-to-react-ai-agent">How to Build a UI Screenshot-to-Code AI Agent <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" stroke-width="2"><path d="M9 6l6 6-6 6"></path></svg></a>
        <a href="https://orkes.io/blog/what-is-loop-engineering">What Is Loop Engineering? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" stroke-width="2"><path d="M9 6l6 6-6 6"></path></svg></a>
        <a href="https://orkes.io/blog/building-durable-loops-with-conductor-part-1">Building Durable Loops with Conductor, Part 1 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" stroke-width="2"><path d="M9 6l6 6-6 6"></path></svg></a>
      </div>
      <a class="hp-resource-cta" href="https://orkes.io/blog/">Read blogs &rarr;</a>
    </div>

  </div>
</section>

</div>
