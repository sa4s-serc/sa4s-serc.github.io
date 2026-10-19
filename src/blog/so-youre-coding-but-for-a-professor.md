---
title: "So you're coding, but for a professor?"
excerpt: "What software engineering research actually does, for the relative at Diwali who is convinced there is nothing in software left to research."
date: "2026-10-19"
author: "Sreemaee Akshathala"
category: "Software Engineering"
thumbnail: "/images/blogpic/CharlieKelly.jpg"
---

Diwali is coming up, and somewhere between the sweets and the crackers, I will inevitably be asked by a relative what I'm doing these days. It's usually the one who works as a software engineer. I tell them I'm doing research in software engineering, and I can see them trying to place it. They write software every day. They don't see what research in SE is about.

"So you're coding, but for a professor?"

"Research? In software? What is there to research, you just write it."

I might not have had a clear answer to that question two years ago, but I surely do now.

Most people, even those who work in the industry, are not as familiar with the idea of research in software engineering. Which to me is a little funny, given they use its fruits every single day. They just don't know where those results came from.

## What SE research actually does

Software engineering research studies how we design and build software, figure out how to test it, and keep it running in the wild. Most of our problems start as someone's bad day at work. Some codebases get harder to change every year, and research on coupling and code smells is why tools today can flag the class most likely to cause trouble before it does. Models that looked great in testing get slow and expensive once real traffic arrives, which turns out to be a question about how the whole ML system is designed more than about the model itself. And on almost every team there's a service that was split in some strange way, for reasons nobody can remember anymore.

That last one is a good example of how unglamorous some of our problems can be. Teams are supposed to record their architecture decisions, and almost nobody does, because it's tedious and the deadline is always closer than it seems. A study from our group explored whether LLMs could draft those records from the context of a decision [[1]](#ref1). They could, reasonably well, though a good engineer still writes them better. No company is going to pause a release to study that properly, but the answer helps anyone who has ever inherited an undocumented system (so, everyone).

The other half of the work is making answers hold up beyond one project. That means running experiments across many systems, measuring carefully, and publishing the code so others can check it. When it goes well, the results become so ordinary and commonplace that nobody remembers they were ever research… (sigh)

## Waterfall was a warning

Every engineer knows the waterfall model, usually as the thing their company moved away from: requirements, then design, then code, then test, each finished before the next begins. It's generally traced to a 1970 paper by Winston Royce, who had spent years managing large government software projects (I swear the story is a fun read, link at the end).

![Managing the Development of Large Software Systems, Winston W. Royce, 1970](/images/blogpic/royce-paper-intro.png)

The diagram everyone draws is in that paper, but the diabolical part is the text under it. Royce called the single-pass version "risky and invites failure", and spent the rest of the paper arguing for feedback between stages, building a pilot version early, and involving the customer throughout. He never used the word "waterfall". Within a few years the bare diagram had found its way into government software standards, and from there into how a big chunk of the industry planned projects for decades. Agile, in a sense, was the industry rediscovering what the original paper already said. (Moral of the story: always read past the figure).

![The famous figure, and the sentence immediately after it](/images/blogpic/royce-waterfall-figure.png)

Waterfall is the rare case where the research got chinese-whispered on its way to industry. Far more often it arrives intact and simply loses its name somewhere along the way. If you took a software engineering course in college, you've met plenty of it. A few weeks on refactoring and code smells, a few more on design principles and patterns, then up to architecture, microservices and event-driven systems. At the time it probably felt like a catalogue of best practices to memorise before the exam. Except, every one of those topics is a research question someone answered well enough that it basically became common sense. Code smells are names for the structures that make software painful to change or maintain. Patterns came from noticing the same good designs recurring across many systems and writing them down so others could reuse them. And microservices came with years of studies on when splitting an app up is actually worth the overhead.

## Same problems, different questions

From the outside, a lot of SE research looks like the work a platform or MLOps team does. The difference is mostly in the question being asked. In production ML, most teams pick one model and live with its trade-offs: the big one is accurate but slow and costly to run, the small one is fast but misses things. Researchers, including people in our lab, have looked at letting the system switch between models at runtime as load and data change. It turns out a system that adapts this way can do better than a single fixed choice, and spend less energy doing it. [[2](#ref2),[3](#ref3)]

Or take infrastructure code. Engineers now routinely ask an LLM to write whole pieces of their system, and whether that code is any good is something you can actually measure. One study from our group took real open-source serverless projects, hid one function, and asked LLMs to write it back, giving them different amounts of context about the rest of the system [[4]](#ref4). That's a much harder test than writing a snippet, because the function has to fit the system around it: call the right services, pass the right data, follow the same conventions as everything else. These are testing problems, and testing has been at the heart of SE research for decades.

## The mess AI leaves behind

This time, the Diwali question might come with an upgrade: "Doesn't AI write all the code now? Why would anyone still study software engineering?"

AI agents are essentially just programs built around large language models that can plan, use tools, remember things and take actions on their own. To us, they're software. Very unusual, slightly unpredictable software, but software. They have an architecture. They have components that talk to each other. They fail, sometimes quietly and sometimes very expensively. Someone still has to design the architecture, figure out how to test the unpredictable outputs, and fix them when they eventually break. *This sorta reminds me of the scene in Tim Burton's Charlie and the Chocolate Factory where Charlie's dad gets replaced from his job by a machine, only for the end of the movie to show him fixing the said machine when it breaks.*

![Charlie and the Chocolate Factory: eliminating Mr. Bucket's job](/images/blogpic/charlie-chocolate-factory.png)

All the old problems come back, harder. Testing is difficult now because the output changes every time you run it, so one passing run proves very little and you end up testing across many runs. Judging success is harder because an agent will unironically tell you it finished a task it only half did, so you have to find a way to evaluate the outcome instead of taking its word for it (shameless plug: I worked on a paper tackling exactly this [[5]](#ref5)). Cost is harder to see because the waste hides in extra tool calls and bloated prompts, and the only way to find it is to trace what the agent actually did, step by step.

The memory problem is a good example. A model can be brilliant and the agent built on top of it can still forget the one detail it needed twenty steps ago. Fixing that comes down to how the agent is built around the model, which is very much in our jurisdiction.

So if anyone asks whether AI makes software engineering research less relevant, our answer is that it's made us busier. The industry is having a bit of a Jurassic Park moment, and someone has to build the actual infrastructure to keep it from collapsing.

![They were so preoccupied with whether or not they could, they didn't stop to think if they should](/images/blogpic/jurassic-park-meme.png)

To the relative at Diwali: yes, there is plenty to research in software. Most of what we study are the exact problems that are making your job difficult right now. We're the people trying to figure out why it keeps happening. Save me a kaju katli and I'll tell you the rest :D

## References

1. <span id="ref1"></span>R. Dhar, K. Vaidhyanathan, V. Varma. [Can LLMs Generate Architectural Design Decisions? An Exploratory Empirical Study](https://arxiv.org/abs/2403.01709). ICSA 2024.
2. <span id="ref2"></span>S. Kulkarni, A. Marda, K. Vaidhyanathan. [Towards Self-Adaptive Machine Learning-Enabled Systems Through QoS-Aware Model Switching](https://arxiv.org/abs/2308.09960). ASE 2023 (NIER track).
3. <span id="ref3"></span>H. Bhatt, S. Biswas, S. Rakhunathan, K. Vaidhyanathan. [HarmonE: A Self-Adaptive Approach to Architecting Sustainable MLOps](https://arxiv.org/abs/2505.13693). ECSA 2025.
4. <span id="ref4"></span>S. Arun, M. Tedla, K. Vaidhyanathan. [LLMs for Generation of Architectural Components: An Exploratory Empirical Study in the Serverless World](https://arxiv.org/abs/2502.02539). ICSA 2025.
5. <span id="ref5"></span>S. Akshathala et al. [Beyond Task Completion: An Assessment Framework for Evaluating Agentic AI Systems](https://arxiv.org/abs/2512.12791). AGENT Workshop at ICSE 2026.

## Further reading

- Winston Royce, [Managing the Development of Large Software Systems](https://web.archive.org/web/20190307012048/http://www-scf.usc.edu/~csci201/lectures/Lecture11/royce1970.pdf) (1970), the original paper. Look for the diagram on page 2, then read what he says right after it. Don't skim the diagram and skip the text like the industry did.
- BCS, The Chartered Institute for IT, [Machiavellian software engineering](https://www.bcs.org/articles-opinion-and-research/machiavellian-software-engineering/), on how the waterfall model was built in spite of Royce's paper.
