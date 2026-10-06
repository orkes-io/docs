import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

const workerLanguages = [
  {
    label: "Java",
    href: "https://github.com/conductor-oss/java-sdk",
  },
  {
    label: "Python",
    href: "https://github.com/conductor-oss/python-sdk",
  },
  {
    label: "Go",
    href: "https://github.com/conductor-oss/go-sdk",
  },
  {
    label: "C#",
    href: "https://github.com/conductor-oss/csharp-sdk",
  },
  {
    label: "JavaScript",
    href: "https://github.com/conductor-oss/javascript-sdk",
  },
];

const logoNames = [
  "Netflix",
  "Tesla",
  "LinkedIn",
  "JP Morgan",
  "Freshworks",
  "American Express",
  "Redfin",
  "VMware",
  "Coupang",
  "Swiggy",
];

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default function HomePageLanding() {
  const workerImageUrls = {
    Java: useBaseUrl("/img/java.svg"),
    Python: useBaseUrl("/img/Python_logo.svg"),
    Go: useBaseUrl("/img/Go_Logo_Blue.svg"),
    "C#": useBaseUrl("/img/csharp.png"),
    JavaScript: useBaseUrl("/img/JavaScript_logo_2.svg"),
  };

  return (
    <main className="mainContainer container homePage">
      <section className="home-hero">
        <p className="home-hero__badge">Apache 2.0 Licensed · Originally created at Netflix</p>
        <h1 className="home-hero__title">
          Code breaks. Infrastructure fails. <span className="home-hero__highlight">Your workflows don&apos;t.</span>
        </h1>
        <p className="home-hero__subtitle">
          Crash-proof workflows and AI agents that finish what they start, powered by durable execution at Netflix scale.
        </p>
        <p className="home-hero__tagline">No SDK restrictions. No non-determinism bugs. No cloud lock-in.</p>
        <div className="home-hero__cta">
          <Link className="home-btn home-btn--primary" to="/category/getting-started">
            Get Started <span className="home-btn__arrow">→</span>
          </Link>
          <a
            className="home-btn home-btn--ghost"
            href="https://github.com/conductor-oss/conductor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
            conductor-oss/conductor
          </a>
        </div>
        <div className="home-hero__terminal">
          <span className="home-hero__terminal-prompt">$</span>
          <code>npm install -g @conductor-oss/conductor-cli</code>
        </div>
        <div className="home-ai-card">
          <h2>Build with AI Agents</h2>
          <div className="home-ai-card__body">
            <Link className="home-ai-card__link" to="/ai-orchestration">
              Conductor Skills →
            </Link>
            <span>Install Conductor Skills for your AI agent.</span>
            <Link className="home-ai-card__link" to="/tutorials/ai">
              AI Cookbook →
            </Link>
            <span>14+ LLM providers, MCP tool calling, human-in-the-loop, and durable agent execution.</span>
          </div>
        </div>
      </section>

      <section className="home-metrics" aria-label="Conductor platform metrics">
        <div className="home-metric">
          <div className="home-metric__value">Guaranteed</div>
          <div className="home-metric__label">at-least-once task delivery</div>
        </div>
        <div className="home-metric">
          <div className="home-metric__value">Any language</div>
          <div className="home-metric__label">worker support</div>
        </div>
        <div className="home-metric">
          <div className="home-metric__value">Millions</div>
          <div className="home-metric__label">concurrent workflows</div>
        </div>
        <div className="home-metric">
          <div className="home-metric__value">Billions</div>
          <div className="home-metric__label">internet scale execution</div>
        </div>
      </section>

      <section className="home-logo-wall" aria-label="Trusted by engineering teams">
        <p>Trusted by engineering teams at</p>
        <div className="home-logo-wall__track">
          {[...logoNames, ...logoNames].map((name, index) => (
            <span key={`${name}-${index}`}>{name}</span>
          ))}
        </div>
      </section>

      <section className="home-features">
        <h2 className="home-section__title">Built for workflows that can&apos;t afford to fail.</h2>
        <div className="home-features__grid">
          <Link className="home-feature-card" to="/error-handling">
            <span className="home-feature-card__tag">Core</span>
            <h3>Durable execution by default</h3>
            <p>
              Workflow state is persisted at every step. Survive server restarts, worker crashes, and network failures
              with at-least-once task delivery, retries, timeouts, and compensation flows.
            </p>
            <span className="home-feature-card__cta">Failure semantics →</span>
          </Link>

          <Link className="home-feature-card" to="/category/conceptual-guides">
            <span className="home-feature-card__tag">JSON superpower</span>
            <h3>JSON native, deterministic by default</h3>
            <p>
              JSON definitions separate orchestration from implementation. Generate workflows at runtime, modify
              per-execution, and use dynamic forks, dynamic tasks, and sub-workflows.
            </p>
            <span className="home-feature-card__cta">Why JSON wins →</span>
          </Link>

          <Link className="home-feature-card" to="/developer-guides/running-workflows">
            <span className="home-feature-card__tag">Primitives</span>
            <h3>Replay, restart, pause, resume</h3>
            <p>
              Pause on time, external signals, webhooks, or human approval. Restart from the beginning, rerun from a
              specific task, or retry just the failed step, even months later.
            </p>
            <span className="home-feature-card__cta">How it works →</span>
          </Link>

          <Link className="home-feature-card" to="/ai-orchestration">
            <span className="home-feature-card__tag">AI</span>
            <h3>AI agent orchestration and LLM orchestration</h3>
            <p>
              Orchestrate AI agents with native LLM providers, MCP tool calling, function calling, human-in-the-loop
              approval, structured output, and vector database support for RAG.
            </p>
            <span className="home-feature-card__cta">AI Cookbook →</span>
          </Link>

          <div className="home-feature-card home-feature-card--workers">
            <span className="home-feature-card__tag">Workers</span>
            <h3>Polyglot workers</h3>
            <p>Write task workers in any language. Workers poll for tasks, execute your logic, and report results.</p>
            <div className="home-feature-card__langs">
              {workerLanguages.map((language) => (
                <a
                  key={language.label}
                  href={language.href}
                  title={language.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={workerImageUrls[language.label]} alt={language.label} />
                </a>
              ))}
              <a href="https://github.com/conductor-oss/ruby-sdk" title="Ruby" target="_blank" rel="noopener noreferrer">
                <span className="home-feature-card__lang-text">Rb</span>
              </a>
              <a href="https://github.com/conductor-oss/rust-sdk" title="Rust" target="_blank" rel="noopener noreferrer">
                <span className="home-feature-card__lang-text">Rs</span>
              </a>
            </div>
          </div>

          <Link className="home-feature-card" to="/error-handling">
            <span className="home-feature-card__tag">Reliability</span>
            <h3>Saga pattern and compensation</h3>
            <p>
              Model distributed transactions as sagas. When a step fails, Conductor can run compensating actions without
              manual intervention.
            </p>
            <span className="home-feature-card__cta">Error handling →</span>
          </Link>
        </div>
      </section>

      <section className="home-engine">
        <h2 className="home-section__title">Understand the engine.</h2>
        <div className="home-engine__grid">
          <Link className="home-engine-card" to="/conductor-architecture">
            <span className="home-engine-card__num">01</span>
            <h3>Durable Execution</h3>
            <p>What persists, what gets retried, failure matrix, and state transitions.</p>
          </Link>
          <Link className="home-engine-card" to="/ai-orchestration">
            <span className="home-engine-card__num">02</span>
            <h3>AI Cookbook</h3>
            <p>LLM tasks, tool calls, human approval, dynamic workflows, MCP tools.</p>
          </Link>
          <Link className="home-engine-card" to="/developer-guides/write-workflows-using-code">
            <span className="home-engine-card__num">03</span>
            <h3>JSON + Code Native</h3>
            <p>Runtime generation, versioning, dynamic definitions, API/SDK parity.</p>
          </Link>
          <Link className="home-engine-card" to="/conductor-architecture">
            <span className="home-engine-card__num">04</span>
            <h3>System Architecture</h3>
            <p>Worker-task queues, persistence, polling, distributed consistency.</p>
          </Link>
        </div>
      </section>

      <section className="home-faq">
        <h2 className="home-section__title">Frequently asked questions.</h2>
        <div className="home-faq__grid">
          <details className="home-faq__item">
            <summary>How do I run Conductor with Docker?</summary>
            <p>
              Run <code>docker run -p 8080:8080 conductoross/conductor:latest</code> to start Conductor with all
              dependencies included. The server will be available at <code>http://localhost:8080</code>.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>Is Conductor open source?</summary>
            <p>
              Yes. Conductor is a fully open source workflow engine, Apache 2.0 licensed. You can self-host it on your
              own infrastructure with no vendor lock-in.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>Is this the same as Netflix Conductor?</summary>
            <p>
              Yes. Conductor OSS is the continuation of the original Netflix Conductor project after Netflix contributed
              it to the open-source foundation.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>Can Conductor scale to handle my workload?</summary>
            <p>
              Conductor was built at Netflix to handle massive scale and has been battle-tested in production processing
              millions of workflows. It scales horizontally to meet demand.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>Can I replay a workflow after it completes or fails?</summary>
            <p>
              Yes. Conductor preserves execution history. You can restart from the beginning, rerun from a specific
              task, or retry just the failed step.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>Can Conductor orchestrate AI agents and LLMs?</summary>
            <p>
              Yes. Conductor supports native LLM providers, MCP tool calling, function calling, vector database
              integration, and human-in-the-loop approval with the same durability guarantees.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>Is Orkes Conductor compatible with Conductor OSS?</summary>
            <p>
              Yes. Orkes Conductor is built on Conductor OSS and keeps compatibility with the core engine and APIs.
            </p>
          </details>
          <details className="home-faq__item">
            <summary>How does Conductor compare to other workflow engines?</summary>
            <p>
              Conductor combines durable execution, JSON and SDK workflows, polyglot workers, native AI task types, MCP
              integration, and self-hosted deployment.
            </p>
          </details>
        </div>
      </section>

      <section className="home-cta">
        <h2 className="home-cta__title">Open source workflow engine. Community driven.</h2>
        <p className="home-cta__body">
          Apache-2.0 licensed. Self-hosted, no vendor lock-in. Originally created at Netflix, now maintained by the
          community.
        </p>
        <div className="home-cta__buttons">
          <a className="home-btn home-btn--primary" href="https://github.com/conductor-oss/conductor">
            Star on GitHub <span className="home-btn__arrow">→</span>
          </a>
          <a className="home-btn home-btn--ghost" href="https://github.com/conductor-oss/conductor/blob/main/CONTRIBUTING.md">
            Contributing guide
          </a>
        </div>
      </section>
    </main>
  );
}
