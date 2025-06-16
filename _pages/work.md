---
title: "SA4S - Work"
layout: default
excerpt: "SA4S -- Work"
sitemap: false
permalink: /work/
---

# Current projects

We are currently working on the following projects:

{% assign num_proj = 0 %}
{% for proj in site.data.projects %}
{% assign proj_num = num_proj | modulo: 2 %}
{% if proj_num == 0 %}

  <div class="row"> 
{% endif %}

<div class="col-sm-6 clearfix">
<h3>{{ proj.title }}</h3>
<p>{{ proj.description }}</p>

{% if proj.url %}

<p><a href="{{ proj.url }}">More details</a></p>
{% endif %}

{% if proj.members %}

<h4>Members</h4>
<ul>
{% for member in proj.members %}
<li>{{ member.name }} {% if member.role %}({{ member.role }}){% endif %}</li>
{% endfor %}
</ul>
{% endif %}

{% if proj.funding %}

<h4>Funding</h4>
<p>{{ proj.funding }}</p>
{% endif %}

{% if proj.duration %}

<h4>Duration</h4>
<p>{{ proj.duration }}</p>
{% endif %}

</div>

{% assign num_proj = num_proj | plus: 1 %}
{% if proj_num == 1 %}

</div>
{% endif %}

{% endfor %}

</div>
