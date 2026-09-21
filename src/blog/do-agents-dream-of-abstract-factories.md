---
title: "Do Agents Dream of Abstract Factories?"
excerpt: "Do AI coding agents use more design patterns than humans?"
date: "2026-09-21"
author: "Shaunak Biswas"
category: "AI Engineering"
thumbnail: "/images/blogpic/factorypattern.jpeg"
---

The title is a nod to Philip K. Dick's novel 'Do Androids Dream of Electric Sheep?' where humans and androids become hard to tell apart. Turns out, we're at a stage where we ask a similar question about code.

Last semester, I was a TA for the Software Engineering course at IIITH. The assignments were built around Apache Roller, an open-source Java blogging platform. Given the existing system, students had to add features to it. The grading rubric created an odd incentive: once you know using design patterns carries marks, you start looking for places to force-fit them in.

For the uninitiated: [design patterns](https://refactoring.guru/design-patterns) are reusable solutions to problems that come up again and again in software design.

![Figure: Common design patterns at a glance](/images/blogpic/factory1.png)

I've seen (and am still traumatized by) an implementation using the Factory Pattern to initialize Strategy Patterns that created Adapters for the task of adding web translation to Apache Roller.

And I can't really blame the student (unfortunately they did lose marks for that task). What makes design patterns hard isn't knowing what a Factory is. It's knowing when you need one. This Reddit thread sums it up:

![A Reddit thread on knowing when to use patterns](/images/blogpic/factory2.png)

We spend years teaching programmers that patterns are a good engineering practice. But a pattern isn't automatically a good solution just because it is a pattern.

And then there are LLMs. They have been exposed to an enormous amount of software and software-engineering writing, where design patterns are repeatedly presented as the vocabulary of good software engineering. If patterns really are part of what "good code" looks like to an LLM agent, how often should we expect to see them? Let's find out!

### Finding the robots

The first task at hand is to distinguish code written by AI from human-written code. This seems impossible but agentic coding tools give us something pretty close.

They sign their commits.

```
Co-Authored-By: Claude <noreply@anthropic.com>
Co-authored-by: Copilot <...@users.noreply.github.com>
```

GitHub's search brings up around 91 million public commits with the Claude trailer and another 3.8 million with Copilot's.

For this experiment, we categorize commits with these trailers as AI and treat everything else as human. Developers use AI in plenty of ways that leave no trace, but this is a simple, observable distinction that we can apply consistently across a large corpus. It's good enough for my over-the-weekend investigation.

### What counts as a pattern?

Whether something is a pattern often depends on what the programmer intended it to do. To simplify things, we go with names. When someone puts Factory in a class name, they're making a fairly explicit choice to use that vocabulary. It doesn't tell me everything about the implementation, but it gives me something concrete to count.

But what if AI just has a habit of giving everything more elaborate names? To this end, we keep 3 lists:

- **GoF words:** Factory, Strategy, Adapter, Visitor, Observer, etc.
- **Architectural vocabulary:** Repository, Provider, Registry, Middleware, etc.
- **Control vocabulary:** Manager, Helper, Service, Wrapper, Processor, etc.

The control vocabulary gives us a way to check whether AI actually uses more pattern names, or whether it just likes more elaborate names in general. If AI uses more Factory names along with more Manager, Helper, and Service names, the difference probably isn't specific to design patterns.

Patterns like [state](https://refactoring.guru/design-patterns/state), [command](https://refactoring.guru/design-patterns/command) and [template](https://refactoring.guru/design-patterns/template-method) occur as common words in code. OrderState shouldn't be considered evidence that the State pattern was implemented. Such words are thus excluded when computing results.

### Holding everything else constant

Comparing AI and human code from different years introduces changes in framework usage and project activity that could confound our results.

So we compare them within each repository. AI-signed and human commits come from the same project, during the same twelve-month window, and everything is normalised by lines of code. We look at public, non-archived Java and Python repositories with at least ten stars, sampling across different sizes. To make the comparison meaningful, each repository needs at least four AI-signed and four human commits to be considered.

![Figure: Public Java and Python repositories with at least 4 AI-signed and 4 human commits in the window](/images/blogpic/factory3.png)

That leaves us with 1,506 commits across 117 repositories and 188,241 added lines of code.

### The Results

![Figure: Design Pattern Vocabulary in AI-signed vs human commits](/images/blogpic/factory4.png)

AI-written code isn't noticeably more pattern-heavy than human-written code. Across the 117 repositories, AI-signed commits use about 0.40 pattern-named declarations per thousand added lines, compared with 0.38 for human commits.

The language-wise results are interesting. AI commits use less pattern vocabulary than human commits in Java, but more in Python. Neither difference, however, is large enough to give us convincing evidence that AI actually prefers design-pattern vocabulary.

Across all 188,241 added lines, I found just 77 GoF-named declarations, roughly one for every 2,500 lines. For some anecdotal context, I remember seeing more design-pattern-heavy code while grading a single SE class activity than in this entire sample.

![Figure: Ratio of pattern lexicons in AI-signed to human code](/images/blogpic/factory5.png)

For the statistically inclined: the overall AI-to-human ratio is 1.05, with a p-value of 0.92. The Java ratio is 0.71 and the Python ratio is 1.64. We also split the analysis by language and vocabulary category and apply Benjamini-Hochberg correction for multiple comparisons. None of the differences are statistically significant.

So, do these pattern-predicting transformers dream of design patterns?

Apparently not.

At least not in their class names. Across 117 repositories, I couldn't find evidence that AI-signed commits reach for design-pattern vocabulary more than human ones.

Maybe their training data is a perfect balance between pattern evangelists and programmers yelling that this ten-class module should have been a function.

Maybe LLM agents are better at resisting pattern fever than we give them credit for.

Maybe the best design patterns are the friends we made along the way.
