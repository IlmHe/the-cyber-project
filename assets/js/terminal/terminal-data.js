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
      "README.txt": `Interactive CV Terminal v1.0.0
System: Linux (Emulated)
User: visitor

I am Ilmar Heinonen, an ICT Engineer with a strong focus on cybersecurity.
My background is in software development and DevOps, and I apply that experience
to security hardening, defensive tooling, and blue team operations.

Currently, I'm dedicating my free time to personal projects, including
homelabbing and building a Linux From Scratch (LFS) system.

Type 'help' to view available commands.`,

      "about.txt": `About Me
========

I am an ICT Engineer with a passion for cybersecurity. My work focuses on the
intersection of software development, operations, and security (DevSecOps).
I build and maintain secure systems, automate defensive strategies, and
contribute to blue team efforts.

I actively participate in learning platforms like Hack The Box to sharpen my skills
and stay current with emerging threats.`,

      "skills.txt": `Areas of Expertise
====================

Software Development
DevOps & CI/CD
System Hardening & DevSecOps
Cloud Infrastructure (GCP, AWS)
SIEM & Log Analysis
Security Automation

Languages:
- Python
- Go
- JavaScript / TypeScript
- Bash
- SQL

Tools & Platforms:
- Docker & Kubernetes
- Terraform & Ansible
- Git / GitHub Actions
- Linux (Multiple Distros)
- Prometheus & Grafana
- Wireshark`,

      "contact.txt": `Contact Information
===================

Email:    contact@heinonen.monster
GitHub:   github.com/IlmHe
LinkedIn: linkedin.com/in/ilmar
Website:  heinonen.monster

Open to collaboration on security research and tool development.`,

      "profile.png": "_binary_image_file_",

      "projects/": "_directory_",
      "secret_projects/": "_locked_directory_"
    },

    "/projects": {
      "phish-guard.md": `# Phish Guard

Browser extension for real-time phishing detection. Adds a layer of
contextual security by checking domain/certificate age and other risk factors.

**Tech Stack:** TypeScript, React, Webpack, Manifest V3
**Status:** Active Development
**Metadata:** cHJvZmlsZS5wbmc=

[GitHub] github.com/IlmHe/Phish-Guard`,

      "breach-timeline.md": `# Interactive Breach Timeline

Interactive visualization of major cybersecurity breaches from 2012-2020.

**Tech Stack:** JavaScript, HTML5, Data Visualization
**Status:** Complete

Explore 14 major data breaches with detailed analysis of root causes,
impact, and remediation. Built as an educational tool.

[Live Demo] heinonen.monster/games`,

      "the-cyber-project.md": `# The Cyber Project

Personal cybersecurity blog and project showcase built with Jekyll.

**Tech Stack:** Jekyll, Ruby, GitHub Pages, Cloudflare
**Status:** Active

My personal space for sharing security projects, CTF writeups, and
thoughts on cybersecurity.

[Website] heinonen.monster`,

      "ctf-writeups.md": `# CTF Writeups

Collection of writeups from HackTheBox, TryHackMe, and other CTF platforms.

**Tech Stack:** Markdown, Security Tools
**Status:** Ongoing

Documentation of various CTF challenges, including methodology,
tools used, and lessons learned.

[Coming Soon] Pending publication.`
    },

    "/secret_projects": {
      "_locked": true,
      "_password": "a3f9b2",
      "_hint": "Permission denied.",
      "flag.txt": `Access Granted.

flag{y0u_f0und_th3_fl4g}

Curiosity is the engine of security research.
Thank you for digging deeper.

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
    "Areas of Expertise": [
      "Software Development",
      "DevOps & CI/CD",
      "System Hardening & DevSecOps",
      "Cloud Infrastructure (GCP, AWS)",
      "SIEM & Log Analysis",
      "Security Automation"
    ],
    languages: [
      "Python",
      "Go",
      "JavaScript / TypeScript",
      "Bash",
      "SQL"
    ],
    "Tools & Platforms": [
      "Docker & Kubernetes",
      "Terraform & Ansible",
      "Git / GitHub Actions",
      "Linux (Multiple Distros)",
      "Prometheus & Grafana",
      "Wireshark"
    ]
  },

  // Easter Eggs
  easterEggs: {
    whoami: "visitor\nuid=1000(visitor) gid=1000(visitor) groups=1000(visitor)",
    sudo: "visitor is not in the sudoers file. This incident will be reported.",
    hack: "Analyzing target... \n[+] Target is secure.\n[!] Authorization required for further actions.",
    coffee: "Starting process 'brew_coffee'...\n[+] Beans ground\n[+] Water heated\n[+] Extraction complete\nDone. ☕",
    hint: "Try exploring the 'projects' directory and checking file metadata."
  }
};
