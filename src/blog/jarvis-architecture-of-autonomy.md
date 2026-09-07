---
title: "The Architecture of Autonomy: Why Building JARVIS is a Systems Engineering Problem"
excerpt: "An intelligent system is not one that acts without humans. It is one that has the capacity to act independently while remaining strictly aligned with boundaries and goals."
date: "2026-08-19"
author: "Prakhar Singhal"
category: "Self Adaptation"
thumbnail: "/images/blogpic/JARVIS.png"
---

Like many people who fell in love with computer science, I grew up fascinated by the idea of truly intelligent systems. For my generation, that ideal was perfectly encapsulated by JARVIS from the *Iron Man* films. JARVIS was not merely a voice interface executing predetermined scripts. He understood intent, observed its environment, reasoned about changing circumstances, and seamlessly adapted to unpredictable failures.

When I began working in software engineering and self-adaptive systems research, the contrast between that cinematic vision and the reality of production environments hit me quickly. Building software that can genuinely take care of itself is incredibly difficult.

We initially imagined intelligent software as software that could do everything by itself, viewing the problem through the lens of systems engineering revealed a more complicated truth. The real challenge of intelligent systems is not achieving unrestricted autonomy. It is engineering architectures that can remain strictly bounded by human-defined goals, safety constraints, and mechanisms for accountability while allowing autonomous adaptation.

### The Stubbornness of Traditional Software

Early in my research career, working with distributed architectures, one fundamental reality of our discipline became obvious: traditional software is deeply stubborn. By design, we write systems governed by explicitly engineered control logic.

Consider a standard microservice architecture. If a service experiences unexpected load, or if a downstream dependency begins to degrade, the system's response is dictated entirely by what the engineers anticipated. If we implemented circuit breakers, retries with exponential backoff, and autoscaling rules, the system degrades gracefully. But if the system encounters a novel failure mode (say a specific database lock combined with a network partition and a misconfigured timeout) it generally has no capacity to reason about the situation.

The software simply executes its deterministic paths until resources are exhausted, the architecture cascades into failure, and an engineer gets paged at 3:00 AM.

Traditional software has no awareness of its own health. It lacks the capacity to observe its environment, hypothesize about the root cause of an anomaly, and formulate a novel response. Operating traditional distributed systems often feels like driving a car where you have to manually adjust every valve in the engine just to keep moving. The human engineer is the ultimate runtime fallback for any unanticipated state.

### The First Step Toward Self-Management

I encountered this limitation firsthand while working on the problem of function placement for serverless workloads in resource-constrained edge environments. In environments like that, demand shifts constantly, and hardware resources are strictly limited. A placement decision that looks perfectly optimal under one workload can become a severe bottleneck just moments later when network traffic shifts.

You simply cannot hard-code a deterministic response for every possible permutation of network state. The environment changes too fast. We had to use deep reinforcement learning to train policies that could dynamically optimize placement decisions on the fly. This was my first real exposure to the necessity of dynamic decision-making, the realization that in a changing environment, the "right" decision cannot be explicitly programmed; it must be continuously discovered. 

**reference:** [[2410.11879] POSEIDON : Efficient Function Placement at the Edge using Deep Reinforcement Learning](https://arxiv.org/abs/2410.11879)

This realization parallels a broader conceptual shift in our field: the understanding that software requires its own internal feedback mechanism, a sort of autonomic nervous system.

Instead of treating automation as a static sequence of commands, the research community began engineering software around closed-loop feedback. One of the most influential embodiments of this idea is the MAPE-K architecture, a conceptual framework that breaks self-adaptation into a continuous cycle: Monitor, Analyze, Plan, Execute, and Knowledge.

To understand why this was such a profound shift, consider how a MAPE-K loop handles a degrading distributed service.

1. **Monitor:** The system continuously gathers telemetry, observing that request latency has crept from 50 milliseconds to 800 milliseconds.
2. **Analyze:** It queries its current state and diagnoses that a specific database read-replica is experiencing high I/O pressure.
3. **Plan:** It formulates a reconfiguration strategy, deciding to shift read traffic to a secondary cluster and spin up two additional application instances.
4. **Execute:** It issues the API calls to alter the load balancer and provision the new instances.
5. **Knowledge:** Throughout the process, it relies on a central repository of topological data, historical performance metrics, and explicitly defined business policies.

Once the execution is complete, the loop begins again, allowing the system to observe whether its intervention actually stabilized the latency. Seeing a system dynamically shift workloads to save itself at runtime feels remarkably close to intelligence.

### Predictive Adaptation and the Limits of Reaction

But as powerful as runtime feedback loops are, they represent only one kind of intelligence: *reactive adaptation, i.e.*  finding a suitable action under known issue in real time.

I began to realize that better adaptation is not always about reacting faster to a failure. Sometimes, the most intelligent system decisions happen before the software ever enters the environment.

I explored this idea while working on a project to estimate the carbon emissions of cloud infrastructure before it was deployed. By building an approach to parse Terraform configurations, model expected workload behaviors, and factor in regional carbon intensity, we could reason about the environmental impact of a system architecture proactively.

**reference:** LEAF: A Layered Emission Assessment Framework for Cloud Deployments (ICSA 2026 - Journal First) - ICSA 2026

This conceptual bridge changed how I viewed intelligent systems. If we could reason about the consequences of a static configuration before deployment, what would happen if the system configuration was no longer static, but continuously rewritten by an AI? Good adaptation requires more than just rapid reaction; it requires the ability to predict consequences.

For a long time, self-adaptive systems lacked the generalized reasoning required to do this dynamically. If a failure mode fell entirely outside the predefined policies in a system's Knowledge base, the system could not invent a new strategy. It could only execute the rules it was given.

### The Arrival of LLMs: *Age of Agents*

This limitation is precisely why the explosion of modern machine learning, specifically large language models (LLMs) and foundation agents, has been so disruptive to the field of self-adaptive computing.

Traditional self-adaptation relies on structured data, predefined rules, explicit system models, and known adaptation strategies. Modern LLM-based agents introduce a radically different set of capabilities. They can parse messy, unstructured server logs. They can interpret human-readable documentation to reason over unfamiliar situations. They can generate complex plans on the fly, interact with custom tools and APIs, and synthesize remediation actions that were never explicitly programmed into a lookup table beforehand.

More recently, I have been exploring this shift toward systems that can reason about their own adaptation. Instead of just executing a predefined policy, we can design multi-agent architectures that divide the cognitive load of self-management.

**reference:** POLARIS: Is Multi-Agentic Reasoning the Next Wave in Engineering Self-Adaptive Systems? (SEAMS 2026 - Research Track) - SEAMS 2026

The role of AI in adaptive systems is moving beyond simply predicting a metric or selecting an action. We are entering an era of *reasoning intelligence*, where systems can potentially evaluate and rewrite their own operational strategies.

When you watch an AI agent ingest a cryptic error stack, hypothesize a root cause, draft a plan, and successfully patch a failing service, it is hard not to feel that we have finally arrived at the JARVIS vision. We now have computing entities capable of generalized reasoning about dynamic environments.

But as an engineer, this is exactly where the transition becomes deeply uncomfortable.

### The Autonomy Paradox

As we move from optimization toward reasoning and self-improvement, a massive technical tension emerges: the system's ability to act threatens to grow faster than our ability to guarantee what it will do.

This is the autonomy paradox. The very flexibility that allows foundation models to handle unforeseen situations is exactly what makes them so difficult to trust in safety-critical environments.

When an LLM generates text for a chatbot, a hallucination is a nuisance. When an autonomous agent is wired into the control plane of a production system, any hallucinations and errors quickly get snowballed into cascading failures (and a very angry manager).

In a distributed system, an action changes the environment. That change alters the telemetry, which forms the system's next observation, which dictates its next decision. If an agent misinterprets the system state due to out-of-distribution behavior or a probabilistic hallucination, it may execute an incorrect tool call. That wrong action corrupts the environment further, causing the agent to ingest degraded context on its next cycle, often leading to an accelerating spiral of cascading failures.

Consider the following case of a safety-sensitive environment,
**Autonomous load-management of an Energy Grid:**

Suppose a localized spike in power demand triggers an anomaly detection system. A traditional, explicitly programmed control loop might default to a safe, deterministic fallback (perhaps shedding load from non-critical sectors to protect the primary substation).

Now imagine an AI agent managing the same scenario. It parses the telemetry, cross-references recent weather data, and attempts to reason about the load spike. But because the specific data signature is out-of-distribution compared to its training data, it confidently misinterprets the anomaly as a physical hardware failure at the substation. The agent autonomously decides to completely shut down the primary node to "prevent electrical fires," instantly shifting massive load to neighboring grids that cannot handle the capacity.

The agent generated a highly sophisticated, multi-step plan. But it lacked calibration, it lacked a rigorous understanding of the system's architectural invariants, and it executed a catastrophic failure. If an autonomous agent alters an architecture at runtime and we cannot guarantee its adherence to safety boundaries or even audit the exact causal chain of its reasoning. We simply CANNOT responsibly deploy it.

### The Scaling Problem and Human-on-the-Loop

The central question shifts from "Can the system adapt?" to "How do we make that autonomy trustworthy?"

Faced with the unpredictable nature of probabilistic AI, the immediate reaction is often to demand that humans manually approve every action. If the AI is unreliable, the thinking goes, humans must retain ultimate control.

But that approach is architecturally doomed. Pure human control does not scale.

If a system requires an engineer to review and approve every micro-adaptation, the human becomes a catastrophic bottleneck. The system loses the very responsiveness, the machine-speed reaction time, that motivated the pursuit of autonomy in the first place. We are left with an unanswerable design question: how do we give machines enough autonomy to respond to chaos at runtime without giving them unrestricted authority over the system?

The answer lies in moving away from a "Human-in-the-Loop" model toward a "Human-on-the-Loop" paradigm.

In a Human-in-the-loop system, the operator explicitly participates in individual decisions. They are a node in the critical path. In a Human-on-the-loop system, the software operates completely autonomously, but only within a rigorously defined, mathematically grounded envelope designed and monitored by the Human.

In this paradigm, the AI agent is free to monitor telemetry, hypothesize causes, and execute routine adaptations at machine speed. But before any action is executed, it must pass through a deterministic validation layer. The system is bounded by absolute architectural invariants. The human sits *on* the loop, supervising at a higher level of abstraction, refining the boundaries, and intervening only when the system escalates a problem that approaches the edge of its safe operating region.

### The Changing Role of the Engineer

This architectural shift profoundly changes what it means to be a software engineer. The future of engineering is not about being removed from the system, nor is it about being relegated to a desk to mindlessly click "approve" on AI-generated pull requests. (Inspired by real experinces)

Instead, engineers will increasingly become designers and curators of the system's knowledge and constraints.

If we trust an agent to manipulate the system state, the engineering challenge shifts from writing explicit execution logic to defining the space in which autonomous decisions are allowed to occur. We will spend our time encoding high-level business objectives, designing explicit safety constraints, establishing escalation conditions, and proving architectural invariants. We will build the guardrails that make probabilistic reasoning safe to deploy in deterministic environments.

### The Architecture of Intelligence

Connecting the dots we see that a truly useful intelligent system is not merely a powerful agent capable of taking action.

**Reliable intelligence is an architectural property.**

It requires perception to understand the environment, reasoning to plan a response, and action to execute it. But crucially, it also requires closed-loop feedback to measure the result, hard constraints to prevent catastrophe, and engineered knowledge to align the system with reality. The intelligence exists just as much in the safety wrappers, the policy constraints, and the validation checks as it does in the neural weights of the model itself.

This brings me back to JARVIS.

When we watch that fictional interface seamlessly manages a chaotic situation, we assume we are looking at unrestricted autonomy. But looked at closely, JARVIS never operated outside the core constraints, values, and directives of his creator.

An intelligent system is not one that acts without humans. It is one that has the capacity to act independently while remaining strictly aligned with the boundaries and goals humans have established. We aren't chasing unrestrained autonomy just for the sake of novelty. We are engineering trustworthy systems, and the path to that future is built one safe, adaptable loop at a time.

Lastly I would like to end with a famously prescient directive from a 1979 IBM training presentation that recently resurfaced in the AI community:
 *"A computer can never be held accountable, therefore a computer must never make a management decision."*