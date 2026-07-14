---
title: "Build Your First AI Agent"
description: "Build your first durable AI agent in 5 minutes with the Orkes Agent SDK on Orkes Conductor's free Developer Edition. Define a tool-calling agent and run it —."
canonical_route: "ai-agents/first-ai-agent"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Build Your First AI Agent, AI orchestration, LLM orchestration, agent workflows"
---

# Build Your First AI Agent

**Build a durable AI agent in 5 minutes.** Orkes Conductor includes native support for durable agents through the Orkes Agent SDK: your agent's reasoning loop, tool calls, and pauses are all persisted as a durable Conductor execution. If the process running your agent crashes, the server resumes it with no lost progress, no re-run LLM calls.

!!! info "Prerequisite"
    Sign up for a free [Developer Edition](https://developer.orkescloud.com) account. No credit card required.

## Step 1: Install the SDK

```bash
pip install agentspan httpx
```

(`httpx` is used by the example tool below to call a real weather API.)

## Step 2: Get your access keys and configure a model

To connect your agent with Orkes Conductor, you need to retrieve the access keys from an application in Conductor.

**To retrieve the access keys:**

1. Go to [Access Control > Applications](https://developer.orkescloud.com/applicationManagement/applications), from the left navigation menu.
2. Select **+ Create application**, name it, and save.
3. Open it, go to **Access Keys**, and select **+ Create access key**. Copy the **Key ID** and **Key Secret** securely, as the secret is shown only once.

Next, add an LLM integration and model in Conductor. An agent's `model` must reference an integration and model that already exist on your Conductor cluster. Follow the setup guide for [any supported provider](/content/category/integrations/ai-llm) you want to use (for example, [Anthropic Claude](/content/integrations/ai-llm/anthropic-claude) or [OpenAI](/content/integrations/ai-llm/open-ai)) to add the integration and at least one model.

!!! note
    Note the exact model name you add — you'll reference it in your agent's code as `model="<provider>/<model-name>"` (for example, `anthropic/claude-sonnet-4-6`). Whatever you configure here is what Step 4's code needs to match exactly.

## Step 3: Connect to your cluster

Point the SDK at your Developer Edition cluster, and set the same provider key you used in Step 2:

```bash
export AGENTSPAN_SERVER_URL=https://developer.orkescloud.com/api
export AGENTSPAN_AUTH_KEY=<YOUR_KEY_ID>
export AGENTSPAN_AUTH_SECRET=<YOUR_KEY_SECRET>
```

## Step 4: Define and run your first agent

Save this as `first_agent.py`. Tools are plain Python functions — the `@tool` decorator makes them callable by the agent, and the docstring tells the LLM what the tool does. This example calls a real, free weather API ([Open-Meteo](https://open-meteo.com), no API key required) so the agent gets a genuine result, not a hardcoded one:

```python
import multiprocessing
multiprocessing.set_start_method("fork", force=True)

from agentspan.agents import Agent, AgentRuntime, tool
import httpx

@tool
def get_weather(city: str) -> dict:
    """Get current weather for a city."""
    geo = httpx.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        params={"name": city, "count": 1},
    ).json()
    lat, lon = geo["results"][0]["latitude"], geo["results"][0]["longitude"]
    weather = httpx.get(
        "https://api.open-meteo.com/v1/forecast",
        params={"latitude": lat, "longitude": lon, "current_weather": True},
    ).json()
    current = weather["current_weather"]
    return {"city": city, "temp_c": current["temperature"], "windspeed_kmh": current["windspeed"]}

agent = Agent(
    name="weatherbot",
    model="anthropic/claude-sonnet-4-6",
    tools=[get_weather],
    instructions="You are a helpful weather assistant.",
)

with AgentRuntime() as runtime:
    result = runtime.run(agent, "What's the weather in San Francisco?")
    result.print_result()
```

!!! note "macOS and Windows"
    `multiprocessing.set_start_method("fork", force=True)` ensures your tool functions run correctly on macOS and Windows, which use a different multiprocessing start method by default. No effect on Linux.

Run it:

```bash
python first_agent.py
```

The agent decides on its own that it needs to call `get_weather`, calls the real Open-Meteo API, and uses the result to answer. Every step — the LLM call, the tool call, and the final answer — is persisted server-side as it happens. Output looks like this:

```
The current weather in San Francisco is:

- Temperature: 13.1°C (55.6°F)
- Wind Speed: 13.0 km/h

It's a mild but cool day in San Francisco! You might want to
bring a light jacket if you're heading out.

Tokens: 1418 total (1271 prompt, 147 completion)
Finish reason: FinishReason.STOP
Execution ID: fd7sc684fbfc-7a0d-11f1-9d8c-4e41cb2964e1
```

Exact temperature and token count vary by run and by city.

To view the agent execution in UI, open your Developer Edition cluster and go to [Agents > Executions](https://developer.orkescloud.com/agent-executions) to see the agent's execution. Open the latest run of the `weatherbot` execution.

<p align="center"><img src="/content/img/agent-execution.png" alt="Latest weatherbot execution in the Agents to Executions UI" width="100%" height="auto"></img></p>

You can also view the underlying Conductor workflow that ran behind the hood.

<p align="center"><img src="/content/img/workflow-under-hood.gif" alt="Conductor workflow diagram compiled from the weatherbot agent" width="100%" height="auto"></img></p>

!!! tip "What just happened"
    The agent looped through reasoning and tool-calling on its own (up to `max_turns`, default 25) until it had enough information to answer. If your process had crashed mid-call, the next `AgentRuntime` connected to the same cluster would have resumed from the last completed step instead of starting over.

!!! note "Troubleshooting: "No such model configured or enabled""
    This means the `model` string in your code doesn't match an integration and model that actually exist on your cluster. Go back to **Integrations > Connections and Resources** in your Developer Edition cluster, open the integration for your provider (e.g. `anthropic`), and check the exact model name(s) listed there. Use that exact string as `model="<provider>/<model-name>"`.

## What you built

In a few minutes, you built an agent that:

- **Decides which tools to call**, and with what arguments, from a natural-language prompt.
- **Calls a real external API** and reasons over the result, not a hardcoded response.
- **Loops autonomously** across multiple tool calls until it has enough information to answer, with no custom loop code.
- **Persists every step** — model calls, tool calls, and the final answer are stored server-side as they happen.
- **Survives crashes** — since state lives on the Conductor server, not in the Python process running your script.

## Next steps

- **Multi-agent patterns** — handoffs, sequential pipelines (`researcher >> writer >> editor`), and parallel sub-agents, all built on the same durable execution model.
- **[Durable Agents](/content/ai-agents/durable-agents)** — how Conductor's durable execution model applies to agent workflows generally, including patterns beyond the Orkes Agent SDK.
- **[Human-in-the-Loop](/content/ai-agents/human-in-the-loop)** — approval patterns beyond a single tool gate: conditional review, LLM-as-judge.
- **[Failure Semantics](/content/ai-agents/failure-semantics)** — what happens when a tool call or model call fails mid-agent.
- **[Token Efficiency](/content/ai-agents/token-efficiency)** — how durable execution avoids re-running completed LLM calls after a crash.
