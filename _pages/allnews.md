---
title: "News"
layout: textlay
excerpt: "SA4S Group at IIIT Hyderabad"
sitemap: false
permalink: /allnews.html
---

# News

{% for article in site.data.news %}
<p><b>{{ article.date }}</b> <br> {{ article.headline }} <br> {{ article.description  }} </p>
{% endfor %}
