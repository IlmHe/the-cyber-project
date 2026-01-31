---
title: Phish-Guard
description: Browser extension that catches phishing sites browsers miss
image: /assets/img/projects/phish-guard.png
tech_stack:
  - TypeScript
  - React
  - Webpack
  - Manifest V3
  - Supabase
  - Bulma CSS
status: Active Development
github: https://github.com/IlmHe/Phish-Guard
featured: true
order: 1
---

## Overview

Phish-Guard is a browser extension I built to add extra phishing protection on top of what browsers already do pretty well. Think of it as a complementary tool that exposes the security context your browser typically hides.

Browsers do a solid job with basic security, but there is a gap: when you visit a site with a valid HTTPS certificate, you see that reassuring "Secure 🔒" indicator. However, if that domain and certificate were both created 3 hours ago, that is a significant risk indicator that standard interfaces often obscure.

## Why This Matters

I wanted a tool that would explicitly flag anomalies—like a domain registered 3 hours ago with an SSL certificate issued 5 minutes ago. Phish-Guard adds that layer of situational awareness atop your browser's existing protection.

## Key Features

### Automatic Resource Monitoring (Optional)
I made this opt-in to respect user privacy and performance. When enabled, it will:
- Monitor for suspicious external scripts and iframes loaded by pages
- Identify mixed content issues (HTTP resources on HTTPS pages)
- Alert you to anomalous resource patterns
- Perform all analysis locally without sending data to external APIs

**Note:** This feature is currently highly sensitive and can be "trigger-happy," sometimes flagging legitimate third-party resources on sites like YouTube. Fine-tuning the detection logic is an ongoing process.

### Manual Scanning (The Main Event)
Right-click any link and hit "Scan with Phish-Guard" to get:
- Database check against a curated list of known phishing sites
- Homograph detection for lookalike domains (e.g., Cyrillic 'а' in "pаypal.com")
- Domain age info via WHOIS
- Certificate age from CT logs
- A calculated risk score (0-100)

### Certificate Age Checking
This is a core feature. If a domain is 2 hours old with a 2-hour-old certificate, it is highly likely to be malicious. Browsers focus on certificate validity; Phish-Guard focuses on certificate context.

Also built two view modes: Simple (essentials) and Advanced (technical details).

## Risk Assessment

The extension assigns a risk score:
- **0-29**: Low Risk
- **30-59**: Moderate Risk
- **60-79**: High Risk
- **80-100**: Critical Risk

It checks various factors including phishing databases, suspicious patterns, domain age, cert age, high-risk TLDs (like .tk or .ml), and IP addresses used as domains.

## Tech Stack

Built with TypeScript and React, bundled with Webpack. Uses Manifest V3 for Chrome/Firefox compatibility. The phishing database runs on Supabase, and I'm using Certificate Transparency logs for cert age checks. WHOIS APIs for domain info. UI styled with Bulma CSS.

## Status & Contributing

This is a personal project that serves my needs, but there is room for improvement.

**Ideas and PRs are welcome.** I am open to suggestions for better detection methods, new features, or UX improvements. This project served as a practical exploration of browser extension security models and Manifest V3. While the codebase reflects an iterative learning process, I am working on refactoring core components to align with stricter design patterns.

Available for both Chrome and Firefox.

**Want the full story?** I wrote a blog post about the development process: [What I Learned Building Phish-Guard](/posts/what-i-learned-building-phish-guard/) - covering technical details on SSL certificates, homograph attacks, and iframe security.

<div class="project-buttons" style="margin: 2rem 0;">
  <a href="https://github.com/IlmHe/Phish-Guard" class="btn btn-primary" style="display: inline-block; padding: 0.5rem 1.5rem; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px; margin-right: 1rem;">
    <i class="fab fa-github"></i> View on GitHub
  </a>
  <a href="https://github.com/IlmHe/Phish-Guard#readme" class="btn btn-secondary" style="display: inline-block; padding: 0.5rem 1.5rem; background: #2196F3; color: white; text-decoration: none; border-radius: 4px;">
    <i class="fas fa-book"></i> Documentation
  </a>
</div>

---

**License**: GNU Affero General Public License
