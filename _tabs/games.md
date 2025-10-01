---
title: Games
icon: fas fa-gamepad
order: 2
layout: page
---

Need a break from serious security stuff? Here are some silly games to mess around with.

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

<p style="text-align: center; color: var(--text-muted-color, #666); margin-top: 3rem;">
  More silly games coming soon... probably. Maybe. Who knows. 🤷
</p>
