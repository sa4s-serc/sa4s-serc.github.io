---
title: "Digital Twins: Easy to Imagine, Hard to Build"
excerpt: "Saying a system understands something is easy, but building a system that's actually earned the right to act on it, is hard."
date: "2026-09-07"
author: "Likhith Kanigolla"
category: "Digital Twins"
thumbnail: "/images/blogpic/DTwins.png"
---


# 

I've always had a thing for space, so Apollo 13 is where I usually end up when Digital Twins come up in conversation. NASA had a mirrored version of the spacecraft on the ground, and when the oxygen tank blew up, engineers used it to work out a fix before sending anything back up to the crew. It's a good story, and it's usually the first thing people reach for.

Funny thing is, Michael Grieves, the person usually credited with the term "Digital Twin," has said in his own writing that the Apollo 13 connection is more myth than fact. His actual idea came later, out of work on product lifecycle management, and the name itself was coined by a NASA colleague of his, John Vickers. The story people love isn't quite the real history.

I don't bring this up to correct anyone. I bring it up because it says something about the whole field. People love talking about what a Digital Twin could do. Almost nobody stops to ask what it actually takes to build one.

Say "Digital Twin" to ten different people and you'll get ten different answers. To some it's a fancy dashboard, a nice visualization of sensor data. To others it's a full simulation model. To a few, it's something that can sense, reason, and act on its own, closing the loop back to the physical system. None of these are wrong exactly. But the fact that the definition keeps shifting depending on who you ask tells you something. The idea sounds simple on a slide. Get into the actual engineering and that simplicity disappears fast.

## What are you even modeling

Early in my research, I ran into this exact wall. People imagine a Digital Twin as one clean pipeline: sensor sends data, model updates, done. But step into any real system and you realize you're not modeling one thing. You're modeling a pile of very different things that all happen to share a building or a city block.

A water network behaves like fluid moving through pipes. Pressure, flow rate, how fast something dissolves as it travels between two points. That's a hydraulics problem. Air quality is a completely different angle, closer to a diffusion problem, where a single degraded sensor can throw off your read on an entire zone. Energy usage swings with occupancy and time of day in a way that looks nothing like either of those. Modeling a smart-city environment properly (something a few of us spent a good while stuck on) means you're not writing one model. You're writing several, and none of them share the same physics, the same units, or the same sense of what "normal" looks like.

reference: Architecting Digital Twin for Smart City Systems: A Case Study (ICSA 2024) - https://doi.org/10.1109/ICSA-C63560.2024.00061

And underneath all of that, you still have to model the small stuff: a sensor with its own delay and noise, a controller deciding when to poll for readings, the actual behavior of an actuator when a command reaches it late or not at all. Every device has its own type, its own timing, its own way of misbehaving. Getting all of that into a model that's still simple enough to actually run a simulation on, without hiding the details that matter, is a genuinely different skill than drawing a nice box-and-arrow diagram. There's a decent case study on exactly this, treating an infrastructure as a discrete event system instead of drawing another static diagram.

reference: Modeling and Simulating IoT Infrastructures (SIMULTECH 2025) - https://doi.org/10.5220/0013557400003970

This is where most Digital Twin pitches quietly go silent. It's easy to say "we modeled the building." It's a lot harder to say what physics you used for water, what you used for air, how you handled a sensor that reports garbage half the time, and how all of that fits together into one coherent simulation instead of three disconnected ones stitched together with hope.

## Watching something isn't the same as understanding it

Once you have a working digital model, the obvious next step is to make it show you things. Dashboards, live values, alerts when something crosses a threshold. That's useful, but it only answers one question: what is happening right now.

A more interesting question is what's about to happen, and whether that's actually a problem. Answering that needs simulation, not just visualization. You need a model you can run forward in time, not just look at. Grieves himself put it simply when talking about catching small stutters on a factory floor before they turn into a bigger holdup:

> "We'd like to know that before the bottleneck occurs."

reference: 6 Questions with Michael Grieves on the Future of Digital Twins (ASME) - https://www.asme.org/topics-resources/content/6-question-with-michael-grieves-on-the-future-of-digital-twins

And then there's actuation. It's easy to say a twin can send a command back to the physical system. It's a much harder question to ask who decides that command is correct, and what happens the moment it's wrong. I remember running into this directly while building out an actuation layer for a water quality twin, where the answer ended up being that critical actions still needed a person to confirm them, because a system that always needs a person watching, judging, and pressing the button isn't really adaptive. It's a nice dashboard with extra steps.

## Who gets to decide

All of this circles back to the same open question. If a twin can represent a system honestly across all its different physical parts, and simulate what might happen next, who actually decides what it does with that information? And how do you trust that decision, especially when the twin itself might be wrong?

The tricky part is that a real system doesn't only throw known problems at you. Most of the trouble comes from situations nobody planned for: a sensor drifting in a way you didn't expect, a fault that doesn't match anything in your playbook. You can't just hand-write a rule for every case in advance. So the real question isn't only "does the twin stay inside the boundaries we set." It's whether the twin can take an unfamiliar situation, try out a response in simulation first, and only let it through if that response actually looks safe, before it ever touches the real hardware. A Digital Twin that's allowed to act without checking itself this way isn't more advanced. It's just riskier.

That question, of testing a decision in simulation before letting it touch anything real, is a direction we are taking in the Digital Twins we build, though it's easier said than done.

## What Apollo 13 Actually Got Right

Whatever the real history is, the idea people find compelling about Apollo 13 still holds up: a system that lets you reason about something you can't directly touch, under uncertainty, before you commit to an action.

Most things called Digital Twins today stop at the dashboard, and that's a fine, useful thing to build. But saying a system understands something and building a system that's actually earned the right to act on it, and can show its reasoning for why that action was the right one, are two very different levels of work. Saying it is easy. Building it is hard.

Michael Grieves, the person usually credited with coining the term, said something in a 2021 interview that captures where the field actually stands better than any pitch deck does:

> "Right now, my perception is we're in the conceptual stage of digital twins."

reference: 6 Questions with Michael Grieves on the Future of Digital Twins (ASME) - https://www.asme.org/topics-resources/content/6-question-with-michael-grieves-on-the-future-of-digital-twins

That's the harder problem. It's also the more interesting one.