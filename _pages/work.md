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

# Publications

We've published in many reputed conferences and journals such as

<div style="text-align: center; justify-content: center; display: flex; flex-wrap: wrap; margin: 0 auto;">
<p>{% assign num_conf_jour = 1 %}
{% assign len_conf_jour = site.data.conflist.len %}
{% for conf_jour in site.data.conflist.list %}
{% if conf_jour.logo %}<img src="{{ site.url }}{{ site.baseurl }}/images/confpic/{{ conf_jour.logo }}" style="max-height: 90px; margin: 0px" />{% else %}
{{ conf_jour.name }}{% endif %}{% assign num_conf_jour = num_conf_jour | plus: 1 %}{% if num_conf_jour < len_conf_jour %}, {% elsif num_conf_jour == len_conf_jour %} and {% endif %}{% endfor %}.</p>
</div>

## Our Recent Publications

{% bibliography  %}

<!--
## Patents
<em>Milan P Allan, S Gröblacher, RA Norte, M Leeuwenhoek</em><br />Novel atomic force microscopy probes with phononic crystals<br /> PCT/NL20-20/050797 (2020)

<em>Milan P Allan</em><br /> Methods of manufacturing superconductor and phononic elements <br /> <a href="https://patents.google.com/patent/US10439125B2/en?inventor=Milan+ALLAN&oq=inventor:(Milan+ALLAN)">US10439125B2 (2016)</a>

## Full List of publications

{% for publi in site.data.publist %}

  {{ publi.title }} <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>
{% endfor %} -->
