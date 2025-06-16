---
title: "SA4S - Blog"
layout: default
excerpt: "SA4S -- Blog"
sitemap: false
permalink: /blog/
---
# Blogs

Welcome to our blog section where we share insights, ideas, and updates on various topics related to AI, ML, self-adaptive, and sustainable systems.

<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 20px;">
{% for post in site.posts %}
<div style="width: 300px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    
{% if post.cover_image %}
<div style="height: 180px; background-image: url('{{ site.url }}{{site.baseurl}}/images{{ post.cover_image }}'); background-size: cover; background-position: center;">
</div>
{% else %}
<div style="height: 180px; background-color: #f0f0f0;"></div> <!-- Placeholder background -->
{% endif %}

<!-- Blog Title and Description -->
<div style="padding: 15px;">
<h3 style="margin: 0 0 10px 0; font-size: 18px;">
<a href="{{ post.url }}" style="text-decoration: none; color: #333333;">
{{ post.title }}
</a>
</h3>
<p style="font-size: 14px; color: #666666;">{{ post.excerpt }}</p>

<!-- Author and Date -->
<p style="font-size: 12px; color: #999999; margin: 0;">
    <em>Published on {{ post.date | date: "%B %d, %Y" }}</em><br />
    <strong>Author: {% if post.author %}{{ post.author }}{% else %}Unknown{% endif %}</strong>
</p>
</div>
  </div>
  {% endfor %}
</div>
