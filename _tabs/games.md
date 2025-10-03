---
title: Games
icon: fas fa-gamepad
order: 2
layout: page
---

<hr style="margin: 2rem 0;">

{% for game in site.games %}
<div style="margin: 3rem 0;">
  <h2>{{ game.emoji }} {{ game.title }}</h2>
  {{ game.content }}
</div>
{% unless forloop.last %}
<hr style="margin: 3rem 0;">
{% endunless %}
{% endfor %}

