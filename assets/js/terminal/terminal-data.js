// CV Data and Filesystem Structure
const CV_DATA = {
  // Personal Information
  personal: {
    name: "Ilmar Heinonen",
    title: "Cybersecurity Enthusiast",
    location: "Finland",
    email: "contact@heinonen.monster",
    github: "IlmHe",
    linkedin: "ilmar",
    prompt: "visitor@heinonen.monster"
  },

  // Environment Variables
  environment: {
    HOME: "/home/visitor",
    USER: "visitor",
    SHELL: "/bin/bash",
    PATH: "/usr/local/bin:/usr/bin:/bin",
    HINT: "Secrets hide in unexpected places..."
  },

  // Filesystem Structure
  filesystem: {
    "/": {
      "README.txt": `Welcome to my interactive CV terminal!

I'm Ilmar Heinonen, a cybersecurity enthusiast from Finland.
I'm passionate about offensive security, threat analysis, and building
defensive security tools.

Use 'help' to see available commands or start exploring with 'ls'.
Pro tip: Look carefully... there might be hidden content 👀`,

      "about.txt": `About Me
=========

I'm a cybersecurity professional focusing on penetration testing,
threat analysis, and security automation. I enjoy participating in
CTF competitions and contributing to open-source security projects.

When I'm not breaking things (legally), I'm building tools to help
others stay secure online.

Fun fact: I built this entire CV as a terminal emulator. Pretty meta, right?`,

      "skills.txt": `Technical Skills
================

Security:
- Penetration Testing
- Threat Analysis & Modeling
- SIEM & Log Analysis
- Incident Response
- Vulnerability Assessment

Languages:
- Python
- Bash
- JavaScript
- SQL

Tools & Platforms:
- Burp Suite
- Metasploit
- Wireshark
- Nmap
- Linux
- Docker
- Git`,

      "contact.txt": `Contact Information
===================

Email:    contact@heinonen.monster
GitHub:   github.com/IlmHe
LinkedIn: linkedin.com/in/ilmar
Website:  heinonen.monster

Feel free to reach out if you want to discuss security, collaborate
on projects, or just chat about the latest CVEs!`,

      "profile.png": "_binary_image_file_",

      "projects/": "_directory_",
      "secret_projects/": "_locked_directory_"
    },

    "/projects": {
      "phish-guard.md": `# Phish Guard

Chrome extension for real-time phishing detection and prevention.

**Tech Stack:** JavaScript, Chrome Extension API, Machine Learning
**Status:** Active Development
**Metadata:** cHJvZmlsZS5wbmc=

The extension analyzes URLs, page content, and user behavior to detect
and block phishing attempts before users fall victim.

[GitHub] github.com/IlmHe/Phish-Guard`,

      "breach-timeline.md": `# Interactive Breach Timeline

Interactive visualization of major cybersecurity breaches from 2012-2020.

**Tech Stack:** JavaScript, HTML5, Data Visualization
**Status:** Complete

Explore 14 major data breaches with detailed analysis of what went wrong,
impact, and lessons learned. Built as an educational tool.

[Live Demo] heinonen.monster/games`,

      "the-cyber-project.md": `# The Cyber Project

Personal cybersecurity blog and project showcase built with Jekyll.

**Tech Stack:** Jekyll, Ruby, GitHub Pages, Cloudflare
**Status:** Active

My personal space for sharing security projects, CTF writeups, and
thoughts on cybersecurity. You're looking at it right now!

[Website] heinonen.monster`,

      "ctf-writeups.md": `# CTF Writeups

Collection of writeups from HackTheBox, TryHackMe, and other CTF platforms.

**Tech Stack:** Markdown, Security Tools
**Status:** Ongoing

Documenting my journey through various CTF challenges, including
methodology, tools used, and lessons learned.

[Coming Soon] Stay tuned!`
    },

    "/secret_projects": {
      "_locked": true,
      "_password": "a3f9b2",
      "_hint": "🔒 Access denied. This directory requires a password.\n\nTry the 'unlock <password>' command when you find it...",

      "flag.txt": `🎉 Congratulations! 🎉

You successfully navigated the puzzle chain and found the hidden directory!

flag{y0u_cr4ck3d_th3_c0d3}

If you're a recruiter who made it here - I'm impressed! Feel free to
email me this flag at contact@heinonen.monster. We should talk.

If you're a fellow hacker - nice work! Share your solution with me,
I'd love to see your approach.`,

      "advanced_skills.txt": `Advanced Skills (Bonus Content)
================================

You found the secret stash! Here are some additional skills I'm
developing:

- Reverse Engineering (x86/x64 Assembly)
- Malware Analysis & Sandboxing
- Custom Exploit Development
- Red Team Operations
- Advanced Persistent Threat (APT) Analysis
- Security Research & 0-day Hunting

Currently working on: Custom payload development and evasion techniques.`,

      "bonus_info.txt": `Easter Egg Achievement Unlocked! 🎮

You've proven you have:
✓ Attention to detail
✓ Problem-solving skills
✓ Persistence
✓ Security mindset

These are exactly the qualities I bring to cybersecurity work.

Thanks for exploring my interactive CV. Hope you had fun!

- Ilmar`
    }
  },

  // Simulated image metadata (for 'strings' command)
  imageMetadata: {
    "profile.png": {
      type: "PNG Image",
      size: "245 KB",
      dimensions: "512x512",
      strings: [
        "PNG",
        "IHDR",
        "IDATx",
        "gAMA",
        "bKGD",
        "pHYs",
        "Ilmar Heinonen",
        "Profile Picture 2025",
        "hidden_data:WVRObU9XSXk=",
        "tIME",
        "iTXt",
        "IEND"
      ]
    }
  },

  // Skills (simple arrays, no progress bars)
  skills: {
    security: [
      "Penetration Testing",
      "Threat Analysis & Modeling",
      "SIEM & Log Analysis",
      "Incident Response",
      "Vulnerability Assessment"
    ],
    languages: [
      "Python",
      "Bash",
      "JavaScript",
      "SQL"
    ],
    tools: [
      "Burp Suite",
      "Metasploit",
      "Wireshark",
      "Nmap",
      "Linux",
      "Docker",
      "Git"
    ]
  },

  // Easter Eggs
  easterEggs: {
    whoami: "A cybersecurity enthusiast who enjoys breaking things (legally) and building tools to protect others.",
    sudo: "Nice try, visitor. You don't have sudo privileges here 😏\n\nThough I appreciate the attempt!",
    hack: "Initiating elite hacking sequence...\n[████████████████████] 100%\n\nJust kidding. Try 'help' for actual commands.",
    coffee: "☕ Brewing virtual coffee...\n\n🎮 Achievement Unlocked: Coffee Break!\n\nEveryone needs a break. Take five!",
    hint: "Progressive hint system - shows different hints based on how many times called"
  }
};
