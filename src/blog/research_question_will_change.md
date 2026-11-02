---
title: "Your Research Question Might Change (and That's Fine)"
excerpt: "Research is less about finding the answer and more about pondering the question."
date: "2026-11-02"
author: "Sathvika Miryala"
category: "Software Engineering"
thumbnail: "/images/blogpic/sathvika_blog_cover.jpg"
---



Earlier this year, our paper *LLM-based Automated Architecture View Generation: Where Are We Now?* was published at ICSA 2026. The paper is about *architecture views*: diagrammatic representations of a system shaped for the people who need to read them, whether that is a developer, an operator, or a manager. It asks the question: how far have LLMs actually come in generating them?

But when I look back, that is not where this work began.

Our initial idea was much narrower: could large language models generate **C4 diagrams** from source code? C4 is a popular notation for drawing software architecture at different levels of abstraction: system context, containers, components, and code. Give an LLM a codebase, ask it to draw C4 diagrams, compare those diagrams against ground truth, and assess its capabilities. From there, we would learn what it takes to build better approaches.

Nowhere in that plan was the word *views*. And the question was "can LLMs do it?", not "where are we now?"

What happened in between was a year of turns, and none of them felt like a turn at the time. The first question that came up was how many developers actually use C4 diagrams. Then came the search for the right dataset, which shaped what we could even ask. Then came the experiments, many of them. They did not hand us a new question; they helped us understand the problem better: what was actually worth measuring, and what a fair evaluation needed to look like.

Somewhere in there, the question changed. Looking back, the question we answered was not the one we started with. It was a better one.

For a long time, I thought that meant we had gone off track. I had self-doubts and worried about it.

I didn't go through this alone, and I don't think anyone should. My advisor and colleagues were with me through every phase, cheering me on and helping me realise that this happens to everyone and is part of the process. I still remember our weekly meetings over that year: each time we discussed the updates, identified the issues, worked on the feedback, and met again the next week.

It turns out that the question changing is not a flaw in how I did research. It is built into how our field works.

In 2002, Mary Shaw, one of the founders of software architecture as a discipline, wrote a paper called *What Makes Good Research in Software Engineering?* She describes any piece of research through three choices: the **question** you ask, the **result** you produce, and the **evidence** that makes it believable. She then lists the types of questions software engineering researchers ask. A few of them:

- **Feasibility**: *Is it possible to accomplish X at all?*
- **Design, evaluation, or analysis of an instance**: *What is the current state of X?*
- **Method of development**: *How can we do X better?*

Reading that, I saw my year laid out in front of me. *Can LLMs draw C4 diagrams?* is a feasibility question. *Where are we now?* is, almost word for word, Shaw's "What is the current state of X?" And what came after that paper, building a better approach, is a method question. My question hadn't just been reworded. It had changed *type*.

Shaw saw this happening at the level of the whole field. In her words: *"The questions of interest change as the field matures."* Early research asks whether something is possible; later research builds models and methods. She also points out that framing critical research questions is part of the very first phase of research, not something you finish before research begins. Even her own classification, she admits, had evolved over several years.

Fred Brooks said something similar about software itself in *No Silver Bullet* (1986):

> *"The hardest single part of building a software system is deciding precisely what to build."*

The hard part is the problem, not the code. I think the same is true of research. The hardest single part is deciding precisely what to ask, and you rarely get it right on the first try.

Looking back, the way I picture that year is this. We usually imagine research as a straight line: you start at point A, pick a goal B, and walk towards it. In reality, you head towards B and things don't quite work. You take detours, circle back, and start doubting yourself. It feels like being lost in a cloud. But it is often in that cloud that you notice C, something you would never have seen had you walked straight to B, and C frequently turns out to be more interesting than B ever was. 

For me, C4 was B. Architecture views, and the question of *where we are now*, was C.

If I could tell my younger self one thing at the start of that year, it would be this: **research is more about the problem than the solution.** The problem is not fixed at the start. It changes, and it shapes you as you go: the data you find, the experiments that deepen your understanding, the field moving underneath you, and the people who help you see what you are actually looking at. You don't need to know your C on day one. What you need is the commitment and motivation to keep going until you find it.

A changing question is not a problem. What matters is your perseverance, curiosity, and your honesty in explaining how you got there, because the detour is part of what you learned.

I never answered the question I started with. I found a better one, and answering it became the research.



## References


1. Mary Shaw. *What Makes Good Research in Software Engineering?* International Journal on Software Tools for Technology Transfer, 4(1), pp. 1–7, 2002. https://doi.org/10.1007/s10009-002-0083-4 (full text: https://www.cs.cmu.edu/~Compose/ftp/shaw-fin-etaps.pdf)
2. Frederick P. Brooks Jr. *No Silver Bullet: Essence and Accident in Software Engineering.* IEEE Computer, 20(4), 1987 (first presented 1986). Summary: https://blog.acolyer.org/2016/09/06/no-silver-bullet-essence-and-accident-in-software-engineering/
3. Uri Alon. *How to Choose a Good Scientific Problem.* Molecular Cell, 35(6), pp. 726–728, 2009. https://doi.org/10.1016/j.molcel.2009.09.013 (PDF: https://li.me.jhu.edu/wp-content/uploads/Alon_2009.pdf)
4. Uri Alon. *Why Truly Innovative Science Demands a Leap into the Unknown.* TEDGlobal 2013. https://www.ted.com/talks/uri_alon_why_truly_innovative_science_demands_a_leap_into_the_unknown
