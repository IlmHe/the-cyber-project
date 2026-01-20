---
title: Projects
icon: fas fa-project-diagram
order: 1
layout: page
---

Here's what I'm working on - cybersecurity tools and side projects that scratch my own itches. Each project has its own page with all the details.

<div class="projects-grid" style="margin: 2rem 0;">
{% if site.projects %}
  {% assign sorted_projects = site.projects | sort: 'order' %}
  {% for project in sorted_projects %}
<div class="project-card" style="border: 1px solid var(--main-border-color, #ddd); padding: 1.5rem; margin-bottom: 1.5rem; border-radius: 8px; background: var(--card-bg, white);">
  <h2 style="margin-top: 0;">
    <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
    {% if project.featured %}
    <span style="background: #4CAF50; color: white; padding: 0.2rem 0.5rem; font-size: 0.7rem; border-radius: 3px; margin-left: 0.5rem;">FEATURED</span>
    {% endif %}
  </h2>

  <p style="font-size: 1.1rem;">{{ project.description }}</p>

  <div class="project-meta" style="margin: 1rem 0; font-size: 0.9rem;">
    <strong>Status:</strong> {{ project.status }}
  </div>

  <div class="project-actions" style="margin-top: 1rem;">
    <a href="{{ project.url | relative_url }}" class="btn" style="display: inline-block; padding: 0.5rem 1rem; background: #2196F3; color: white; text-decoration: none; border-radius: 4px; margin-right: 0.5rem;">
      Learn More →
    </a>
    {% if project.github %}
    <a href="{{ project.github }}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="display: inline-block; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; background: var(--sidebar-bg, #e8e8e8); color: var(--text-color, #2c2c2c); border: 1px solid var(--main-border-color, #c0c0c0);">
      <i class="fab fa-github"></i> GitHub
    </a>
    {% endif %}
  </div>
</div>
  {% endfor %}
{% else %}
  <p>No projects found. Projects will appear here soon!</p>
{% endif %}
</div>

---

Got ideas for new projects or want to contribute? All my projects are open source and PRs are welcome!
