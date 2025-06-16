---
title: "SA4S Group - Pictures"
layout: piclay
excerpt: "SA4S at SERC, IIIT Hyderabad -- Pictures"
permalink: /pictures/
---

<!--
# Pictures
Jump to: [Leiden](#leiden), [ETHZ](#ethz), [Cornell](#cornell), [St Andrews](#st-andrews) -->

# Life@SA4S

<p> &nbsp; </p>

<!-- (Right-click *'view image'* to see a larger image.) -->

{% assign number_printed = 0 %}
{% for pic in site.data.pics%}

<!-- <p>{{ site.url }}{{ site.baseurl }}/images/picpic/Gallery/{{ pic.image }}</p> -->

{% assign even_odd = number_printed | modulo: 4 %}

{% if even_odd == 0 %}

<div class="row">
{% endif %}

<div class="col-sm-3 clearfix">
<img src="{{ site.url }}{{ site.baseurl }}/images/gallery/{{ pic.image }}" class="img-responsive"  style="float: left" />
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd > 2 %}

</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 4 %}
{% if even_odd == 1 %}

</div>
{% endif %}

{% if even_odd == 2 %}

</div>
{% endif %}

{% if even_odd == 3 %}

</div>
{% endif %}

<!-- <p> &nbsp; </p> -->

## Software Engineering Research Center (SERC)

<p> &nbsp; </p>

<!--
#### Timelapse of our STM assembling [(see LION news item)](https://www.physics.leidenuniv.nl/index.php?id=11573&news=867&type=lion&ln=EN):-->
<iframe width="100%" height="400" src="https://www.youtube.com/embed/UTISiA3mei8" title="Software Engineering Research Center (SERC)" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<p> &nbsp; </p>

<!-- First advertisement.
<figure>
<img src="{{ site.url }}{{ site.baseurl }}/images/picpic/WebpageLeiden_red.jpg" width="60%" >
</figure>


## ETHZ
From the [group of Andreas Wallraff](http://www.qudev.ethz.ch/).
<figure>
<img src="{{ site.url }}{{ site.baseurl }}/images/picpic/WebpageETH_red.jpg" width="60%">
</figure>

## Cornell
From the [group of Seamus JC Davis](http://davisgroup.lassp.cornell.edu).
<figure>
<img src="{{ site.url }}{{ site.baseurl }}/images/picpic/WebpageCornell_red.jpg" width="60%">
</figure>

## St Andrews
From the [group of Felix Baumberger](http://dqmp.unige.ch/baumberger/) (now at University of Geneva).
<figure>
<img src="{{ site.url }}{{ site.baseurl }}/images/picpic/WebpageSTA_red.jpg" width="60%">
</figure> -->
