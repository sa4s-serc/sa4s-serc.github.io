---
title: "SA4S Group - Research"
layout: default
excerpt: "SA4S Group -- Research"
sitemap: false
permalink: /research/
---

# Research

### Research Areas

#### Machine Learning for Software Architecture (ML4SA) 
Machine Learning for Software Architecture (ML4SA) focuses on enhancing self-adaptive systems to handle run-time uncertainties, thereby improving Quality of Service (QoS). Traditional self-adaptive systems address specific uncertainties but lack continuous improvement in adaptation capabilities. ML4SA aims to integrate machine learning techniques to enable systems to not only adapt but also improve their architecture over time. This approach is particularly relevant for microservice-based systems, robotics, and cyber-physical systems (CPS), ensuring they can dynamically respond to changing conditions and enhance their performance and reliability.

#### Software Architecture for Machine Learning (SA4ML)
Software Architecture for Machine Learning (SA4ML) addresses the unique challenges of developing ML-enabled systems, which differ significantly from traditional software due to factors like probabilistic outputs, data quality dependence, and model drift. The intensive computational and energy demands of ML algorithms also impact overall system performance. SA4ML aims to develop architectural patterns and tactics to improve the maintainability and scalability of ML-enabled systems. Given that a significant percentage of ML projects fail to reach production due to these challenges, this research area seeks to enhance the success rate and efficiency of deploying ML systems in real-world applications.

#### Software Architecture for Internet of Things
The rise of the Internet of Things (IoT) has transformed software development into creating systems of interconnected sensors and actuators. These systems communicate and function through sophisticated software, leading to pervasive computing environments. The increasing popularity of IoT, driven by advancements like wearable technology and 5G, comes with challenges such as heterogeneity, interoperability, security, and scalability. Research in this area aims to develop hyper-scalable architectures and model-driven frameworks to address these issues, ensuring that large-scale IoT systems can be efficiently developed, maintained, and scaled.

#### Green Software
Green software focuses on reducing the environmental impact of software systems, which are projected to consume a significant portion of global electricity and contribute to carbon emissions. By 2025, ICT is expected to consume 30% of the world's electricity and contribute 10% to the global carbon footprint. This research area aims to develop architecture-centric approaches for creating green software systems, applying these methods to real-life ML-enabled and IoT systems. The goal is to create energy-efficient and sustainable software solutions that can mitigate the environmental impact of the growing ICT sector

### Our Collaborators

{% assign number_collab = 0 %}
{% for collab in site.data.collaborators %}

{% assign col_num = number_collab | modulo: 3 %}

{% if col_num == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-4 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/collabpic/{{ collab.logo }}" class="img-responsive" style="max-height: 80px; margin: 0 auto; display: block;" />
  <h4><a href="{{ collab.url }}" style="text-decoration: none; color:inherit">{{ collab.name }}</a></h4>
</div>
    
{% assign number_collab = number_collab | plus: 1 %}
    
{% if col_num == 2 %}   
</div>
{% endif %}

{% endfor %}

{% assign col_num = number_collab | modulo: 3 %}
{% if col_num != 0 %}
</div>
{% endif %}

