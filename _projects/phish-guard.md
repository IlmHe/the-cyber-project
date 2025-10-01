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

Phish-Guard is a browser extension I built to add extra phishing protection on top of what browsers already do pretty well. Think of it as a nice complementary tool that shows you the security context your browser doesn't display.

Browsers do a solid job with basic security, but here's the gap I wanted to fill: when you visit a site with a valid HTTPS certificate, you see that reassuring "Secure 🔒" - which is technically correct. But what if that domain and certificate were both created 3 hours ago? That's a massive red flag, but browsers don't really highlight that kind of context.

## Why This Matters

I wanted something that would actually tell me "hey, this domain was registered 3 hours ago and the SSL cert is newer than your lunch" - basically adding that extra layer of awareness as a nice addon to your browser's existing protection.

## Key Features

### Automatic Resource Monitoring (Optional)
I made this opt-in because not everyone wants their extension watching everything. When enabled, it'll:
- Keep an eye on sketchy external scripts and iframes loaded by pages
- Spot mixed content issues (HTTP stuff on HTTPS pages)
- Alert you when something looks really sus
- All analysis happens locally - no phoning home to random APIs

### Manual Scanning (The Main Event)
Right-click any link and hit "Scan with Phish-Guard" to get:
- Database check against known phishing sites (mostly South African ones I've collected)
- Homograph detection for those sneaky lookalike domains (like using Cyrillic 'а' in "pаypal.com")
- Domain age info via WHOIS
- Certificate age from CT logs - this is the good stuff browsers hide
- A risk score from 0-100 so you know what you're dealing with

### Certificate Age Checking
This is what I'm most proud of. If a domain is 2 hours old with a 2 hour old certificate, that's a massive red flag worth knowing about. Browsers focus on whether the cert is valid (which is great!), but this adds the extra context of "how new is this cert?"

Also built two view modes: Simple (just the essentials) and Advanced (all the nerdy details for when you really want to dig in).

## Risk Assessment

The extension gives everything a score:
- **0-29**: You're probably fine
- **30-59**: Maybe be careful here
- **60-79**: Yeah this looks sketchy
- **80-100**: Run. Just run.

It checks a bunch of stuff - phishing databases, suspicious patterns, domain age, cert age, weird TLDs like .tk or .ml, IP addresses pretending to be domains... you get the idea.

## Tech Stack

Built with TypeScript and React, bundled with Webpack. Uses Manifest V3 for Chrome/Firefox compatibility. The phishing database runs on Supabase, and I'm using Certificate Transparency logs for cert age checks. WHOIS APIs for domain info. UI styled with Bulma CSS. Nothing too fancy, just what works.

## Status & Contributing

This is very much a personal side project - it works and does what I need it to, but there's tons of room for improvement! The extension has a long way to go before it's "complete" (if such a thing even exists for security tools).

**Ideas and PRs are super welcome!** Seriously, if you have suggestions for better detection methods, new features, or ways to improve the UX, I'd love to hear them. The code quality is... let's say "creatively structured" since this was my first browser extension and I coded it in my signature schizo style with heavy AI assistance. So if you're expecting pristine, textbook code, prepare yourself accordingly. It works, but there are definitely better ways to do some things.

Available for both Chrome and Firefox.

**Want the full story?** I wrote a blog post about everything I learned: [What I Learned Building Phish-Guard](/posts/what-i-learned-building-phish-guard/) - technical details on SSL certificates, homograph attacks, iframes, and all the edge cases I ran into.

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
