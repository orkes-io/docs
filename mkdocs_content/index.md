---
hide:
  - navigation
  - toc
description: "Orkes Conductor documentation for building durable workflows, API orchestration, microservice orchestration, and AI agent orchestration."
---

<div class="home-wrapper">

<div class="hero">
  <h1 class="hero-title">Build unbreakable workflows<br/><span class="hero-highlight">and AI agents.</span></h1>
  <p class="hero-subtitle">Orkes Conductor is the managed enterprise version of Conductor OSS, with durable execution, visual debugging, access control, and internet-scale orchestration.</p>
  <p class="hero-differentiators">No SDK restrictions. No non-determinism bugs. No cloud lock-in.</p>
  <div class="hero-actions">
    <a href="https://developer.orkescloud.com/?ga_id=GA1.1.114307086.1749276711&amp;utm_source=google&amp;utm_medium=organic&amp;_gl=1*mi3s3s*_gcl_au*MTU0NDU1MTQuMTc3ODM5MTkyMw.." class="btn-primary">Start for free<span class="btn-arrow">&rarr;</span></a>
    <a href="/content/quickstarts" class="btn-ghost">Read the quickstarts</a>
  </div>
  <div class="hero-install"><code>$ npm install -g @conductor-oss/conductor-cli</code></div>
  <div class="hero-ai-card">
    <div class="hero-ai-header">
      <h3>Build with AI Agents</h3>
    </div>
    <div class="hero-ai-body">
      <div class="hero-ai-item">
        <a href="/content/developer-guides/creating-and-managing-gen-ai-prompt-templates" class="hero-ai-link">AI Prompts &rarr;</a>
        <span class="hero-ai-sub">Create reusable prompts for AI tasks.</span>
      </div>
      <div class="hero-ai-item">
        <a href="/content/ai-orchestration" class="hero-ai-link">AI Cookbook &rarr;</a>
        <span class="hero-ai-sub">LLM providers, vector databases, MCP, and human-in-the-loop workflows.</span>
      </div>
    </div>
  </div>
</div>

<div class="value-strip">
  <div class="value-item"><div class="value-metric">Guaranteed at-least-once</div><div class="value-label">Task Delivery</div></div>
  <div class="value-divider"></div>
  <div class="value-item"><div class="value-metric">Any language</div><div class="value-label">Worker Support</div></div>
  <div class="value-divider"></div>
  <div class="value-item"><div class="value-metric">Millions</div><div class="value-label">Concurrent Workflows</div></div>
  <div class="value-divider"></div>
  <div class="value-item"><div class="value-metric">Billions of workflows</div><div class="value-label">Internet Scale Execution</div></div>
</div>

<div class="features-section" id="built-for-production">
  <div class="section-header-inline">
    <h2>Built for workflows that can't afford to fail.</h2>
  </div>
  <div class="features-grid">
    <div class="feature-card feature-accent">
      <div class="feature-tag">Core</div>
      <h3>Durable execution by default</h3>
      <p>Workflow state is persisted at every step. Survive server restarts, worker crashes, and network failures with retries, timeouts, and compensation flows.</p>
      <a href="/content/error-handling" class="feature-link">Failure semantics &rarr;</a>
    </div>
    <div class="feature-card">
      <div class="feature-tag">Primitives</div>
      <h3>Replay, restart, pause, resume</h3>
      <p>Pause workflows on time, external signals, webhooks, or human approval. Resume safely after minutes, hours, or days.</p>
      <a href="/content/developer-guides/running-workflows" class="feature-link">How it works &rarr;</a>
    </div>
    <div class="feature-card">
      <div class="feature-tag">AI</div>
      <h3>AI agent orchestration</h3>
      <p>Orchestrate AI agents with native LLM providers, tool calling, human approval, structured output, and vector database support.</p>
      <a href="/content/ai-orchestration" class="feature-link">AI Cookbook &rarr;</a>
    </div>
    <div class="feature-card">
      <div class="feature-tag">Workers</div>
      <h3>Polyglot workers</h3>
      <p>Write task workers in any language. Workers poll for tasks, execute your logic, and report results from wherever they run.</p>
      <a href="/content/developer-guides/using-workers" class="feature-link">Worker guide &rarr;</a>
    </div>
  </div>
</div>

<div class="arch-section">
  <div class="section-header-inline">
    <h2>Understand the engine.</h2>
  </div>
  <div class="arch-grid">
    <a href="/content/conductor-architecture" class="arch-card">
      <div class="arch-number">01</div>
      <h3>Architecture</h3>
      <p>Worker-task queues, persistence, polling, and distributed execution.</p>
    </a>
    <a href="/content/core-concepts" class="arch-card">
      <div class="arch-number">02</div>
      <h3>Core Concepts</h3>
      <p>Workflows, tasks, workers, and workflow executions.</p>
    </a>
    <a href="/content/reference-docs/worker-task" class="arch-card">
      <div class="arch-number">03</div>
      <h3>Worker Tasks</h3>
      <p>How custom workers poll, execute, and complete tasks.</p>
    </a>
    <a href="/content/reference-docs/system-tasks/http" class="arch-card">
      <div class="arch-number">04</div>
      <h3>System Tasks</h3>
      <p>Built-in task primitives for HTTP, events, AI, and more.</p>
    </a>
  </div>
</div>

<div class="resources-section">
  <div class="section-header-inline">
    <h2>More resources.</h2>
  </div>
  <div class="resources-grid">
    <a href="https://www.orkes.io/changelog" class="resource-card">
      <span class="resource-kicker">Product updates</span>
      <h3>Changelog</h3>
      <p>See what's new in Orkes Conductor: features, enhancements, and product updates.</p>
      <span class="resource-link">View changelog &rarr;</span>
    </a>
    <a href="https://orkes.io/academy/" class="resource-card">
      <span class="resource-kicker">Learning</span>
      <h3>Academy</h3>
      <p>Learn workflow orchestration with hands-on labs, structured paths, and certification from Orkes.</p>
      <span class="resource-link">Explore courses &rarr;</span>
    </a>
    <a href="https://orkes.io/blog/" class="resource-card">
      <span class="resource-kicker">Articles</span>
      <h3>Blog</h3>
      <p>Technical use cases, community posts, and product updates from the Orkes team.</p>
      <span class="resource-link">Read blogs &rarr;</span>
    </a>
  </div>
</div>

<div class="faq-section">
  <div class="section-header-inline">
    <h2>Frequently asked questions.</h2>
  </div>
  <div class="faq-grid">
    <details class="faq-item">
      <summary>How do I run Orkes Conductor?</summary>
      <p>Use Developer Edition to start quickly, or follow the setup guide to connect to Orkes Cloud.</p>
    </details>
    <details class="faq-item">
      <summary>Can Orkes Conductor orchestrate AI agents and LLMs?</summary>
      <p>Yes. Orkes Conductor supports native AI tasks, LLM providers, vector databases, and human-in-the-loop workflows.</p>
    </details>
    <details class="faq-item">
      <summary>Can I replay or retry workflows?</summary>
      <p>Yes. Conductor preserves execution state so you can retry failed tasks, rerun from a task, or restart workflows.</p>
    </details>
    <details class="faq-item">
      <summary>Is Orkes Conductor compatible with Conductor OSS?</summary>
      <p>Yes. Orkes Conductor is built on Conductor and keeps compatibility with the core engine and APIs.</p>
    </details>
  </div>
</div>

</div>
