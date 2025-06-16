---
title: "SA4S - Publications"
layout: default
excerpt: "SA4S -- Publications"
sitemap: false
permalink: /publications/
---

# Publications

We've published in many reputed conferences and journals such as

<div style="text-align: center; justify-content: center; display: flex; flex-wrap: wrap; margin: 0 auto;">
<p>{% assign num_conf_jour = 1 %}
{% assign len_conf_jour = site.data.conflist.len %}
{% for conf_jour in site.data.conflist.list %}
{% if conf_jour.logo %}<img src="{{ site.url }}{{ site.baseurl }}/images/confpic/{{ conf_jour.logo }}" style="max-height: 70px; margin: 0px" />{% else %}
{{ conf_jour.name }}{% endif %}{% assign num_conf_jour = num_conf_jour | plus: 1 %}{% if num_conf_jour < len_conf_jour %}, {% elsif num_conf_jour == len_conf_jour %} and {% endif %}{% endfor %}.</p>
</div>

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
