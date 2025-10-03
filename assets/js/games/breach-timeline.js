const timelineBreaches = {
  yahoo: {
    year: 2013,
    position: 0.3,
    verticalOffset: 0, // 0 = top row, 1 = bottom row
    title: "Yahoo",
    affected: "3B accounts",
    category: "tech",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "State-sponsored hackers, weak MD5 hashing",
    fullDetails: {
      date: "August 2013",
      impact: "3 billion user accounts",
      rootCause: "Yahoo used weak MD5 hashing for passwords, making them easy to crack once stolen. Attackers also forged cookies to access accounts without passwords. The company waited 3 years to disclose the breach, allowing hackers to maintain access and expand the damage.",
      keyFixes: ["Use bcrypt instead of MD5", "Implement 2FA", "Regular security audits"],
      cost: "$117.5M settlement",
      lesson: "Weak encryption + 3-year delayed response = catastrophe"
    }
  },

  target: {
    year: 2013,
    position: 1,
    verticalOffset: 1,
    title: "Target",
    affected: "110M customers",
    category: "retail",
    severity: "high",
    color: "#f44336",
    shortDesc: "Third-party HVAC vendor compromise + POS malware",
    fullDetails: {
      date: "Nov-Dec 2013",
      impact: "110 million customers (40M cards + 70M records)",
      rootCause: "Hackers first compromised an HVAC vendor with access to Target's network, then used stolen credentials to move laterally into Target's payment systems. Target's security team (using FireEye) actually detected the malware and sent alerts, but management ignored them. Poor network segmentation allowed the attackers to move freely from the HVAC system to point-of-sale terminals.",
      keyFixes: ["Vendor security audits", "Network segmentation", "Act on security alerts"],
      cost: "$200M+",
      lesson: "Security is only as strong as weakest vendor"
    }
  },

  marriott: {
    year: 2016,
    position: 0.3,
    verticalOffset: 0,
    title: "Marriott/Starwood",
    affected: "500M guests",
    category: "hospitality",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "4-year undetected breach inherited via M&A",
    fullDetails: {
      date: "2014-2018",
      impact: "500 million hotel guests",
      rootCause: "When Marriott acquired Starwood Hotels in 2016, they didn't perform adequate cybersecurity due diligence and unknowingly inherited an ongoing breach that had started in 2014. Hackers had been in Starwood's systems for 4 years before discovery. Making matters worse, encryption keys were stored alongside the encrypted data, rendering the encryption useless.",
      keyFixes: ["M&A cybersecurity audits", "Separate encryption keys", "Enhanced monitoring"],
      cost: "$52M settlement",
      lesson: "Acquire a company, inherit their breaches"
    }
  },

  uber: {
    year: 2016,
    position: 1,
    verticalOffset: 1,
    title: "Uber + Coverup",
    affected: "57M users",
    category: "tech",
    severity: "high",
    color: "#ff5722",
    shortDesc: "GitHub credentials exposed + executive coverup",
    fullDetails: {
      date: "Oct 2016 (hidden until Nov 2017)",
      impact: "57 million riders/drivers + 600K licenses",
      rootCause: "Uber developers left AWS credentials hardcoded in a GitHub repository, which hackers discovered and used to access backup data stored in S3. Instead of disclosing the breach, Uber executives paid the hackers $100,000 to delete the data and keep quiet, disguising the payment as a bug bounty. The coverup lasted a year until a new CEO discovered and disclosed it, leading to criminal charges against the Chief Security Officer.",
      keyFixes: ["Never hardcode credentials", "Secret management tools", "Proper disclosure"],
      cost: "$148M + CSO convicted",
      lesson: "The coverup was worse than the crime"
    }
  },

  equifax: {
    year: 2017,
    position: 0.5,
    verticalOffset: 0,
    title: "Equifax",
    affected: "147.9M records",
    category: "financial",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "Unpatched Apache Struts for 2 months",
    fullDetails: {
      date: "Mar-Jul 2017",
      impact: "147.9 million Americans + UK/Canadian citizens",
      rootCause: "Equifax had a critical Apache Struts vulnerability that had a patch available for 2 months, but they failed to apply it. The vulnerability allowed hackers to execute commands and steal data for months undetected. The breach was compounded by expired security certificates that prevented detection, databases with plaintext passwords, and lack of proper network segmentation.",
      keyFixes: ["Timely patching", "Network segmentation", "Encrypt credentials"],
      cost: "$1.38B",
      lesson: "Compliance ≠ Security. Basic hygiene matters"
    }
  },

  facebook: {
    year: 2018,
    position: 1,
    verticalOffset: 1,
    title: "Facebook/Cambridge Analytica",
    affected: "87M users",
    category: "tech",
    severity: "high",
    color: "#ff5722",
    shortDesc: "API abuse + friend data harvesting",
    fullDetails: {
      date: "2013-2018",
      impact: "87 million Facebook users",
      rootCause: "A personality quiz app called \"This Is Your Digital Life\" collected data not just from users who installed it, but also from all their Facebook friends without their knowledge or consent. Facebook's API at the time allowed apps to access friends' data by default, and the company failed to audit what third-party apps were doing with the data. The data was then sold to Cambridge Analytica for political targeting.",
      keyFixes: ["Limit API access", "Require explicit consent", "Audit third-party apps"],
      cost: "$5B FTC fine",
      lesson: "Data misuse doesn't require a hack"
    }
  },

  vastaamo: {
    year: 2018,
    position: 0.3,
    verticalOffset: 0,
    title: "Vastaamo",
    affected: "36K patients",
    category: "healthcare",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "NO password for 17 months + patient extortion",
    fullDetails: {
      date: "2018-2020",
      impact: "36,000 psychotherapy patients",
      rootCause: "No database password + no encryption + individual extortion",
      keyFixes: ["Encrypt sensitive data", "ALWAYS use passwords", "GDPR compliance"],
      cost: "Bankruptcy + 6yrs prison",
      lesson: "Catastrophic negligence with sensitive healthcare data"
    }
  },

  capitalone: {
    year: 2019,
    position: 0.5,
    verticalOffset: 1,
    title: "Capital One",
    affected: "100M+ records",
    category: "financial",
    severity: "high",
    color: "#ff9800",
    shortDesc: "Cloud misconfiguration + SSRF attack",
    fullDetails: {
      date: "Mar 2019",
      impact: "100+ million credit card applications",
      rootCause: "A former employee exploited a misconfigured web application firewall using an SSRF (Server-Side Request Forgery) attack to access internal AWS metadata services. The attack worked because Capital One had over-provisioned IAM roles that gave the WAF far more permissions than it needed. The attacker could then list and download S3 buckets containing sensitive customer data, all while monitoring systems failed to detect the suspicious activity.",
      keyFixes: ["Least privilege IAM", "AWS GuardDuty", "Cloud monitoring"],
      cost: "$270M total",
      lesson: "Cloud security requires different thinking"
    }
  },

  solarwinds: {
    year: 2020,
    position: 0.5,
    verticalOffset: 0,
    title: "SolarWinds",
    affected: "18K+ orgs",
    category: "tech",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "Sophisticated supply chain attack",
    fullDetails: {
      date: "2019-2020 (14 months)",
      impact: "18,000+ organizations including US govt",
      rootCause: "Russian state-sponsored hackers compromised SolarWinds' software build system and injected malicious code into legitimate software updates for their Orion platform. The malware was digitally signed with SolarWinds' legitimate certificates, making it appear trustworthy. The backdoor remained undetected for 14 months, giving attackers access to thousands of organizations including US government agencies who trusted and installed the \"official\" updates.",
      keyFixes: ["Secure SDLC", "Code integrity checks", "Zero-trust architecture"],
      cost: "Billions across govt/private sector",
      lesson: "Supply chain attacks exploit trust"
    }
  },

  homedepot: {
    year: 2014,
    position: 0.5,
    verticalOffset: 1,
    title: "Home Depot",
    affected: "56M cards",
    category: "retail",
    severity: "high",
    color: "#ff5722",
    shortDesc: "Vendor credentials + unpatched Windows + custom malware",
    fullDetails: {
      date: "Apr-Sep 2014",
      impact: "56 million payment cards",
      rootCause: "Criminals stole credentials from a third-party vendor through phishing, then used those to access Home Depot's network. They exploited an unpatched Windows vulnerability that Microsoft had already released a fix for, but Home Depot's IT staff failed to apply it. The attackers deployed custom BlackPOS malware on self-checkout systems that evaded antivirus detection and captured card data for months.",
      keyFixes: ["Timely patching", "Vendor security", "Network segmentation"],
      cost: "$200M+",
      lesson: "Unpatched systems + vendor access = disaster"
    }
  },

  anthem: {
    year: 2015,
    position: 0.3,
    verticalOffset: 0,
    title: "Anthem Health",
    affected: "78.8M records",
    category: "healthcare",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "Phishing + no encryption + 9 months undetected",
    fullDetails: {
      date: "Apr 2014 - Jan 2015",
      impact: "78.8 million healthcare records (largest healthcare breach in US history)",
      rootCause: "Nation-state hackers used phishing emails to gain initial access to Anthem's systems in April 2014. Once inside, they found that Anthem failed to encrypt sensitive files containing names, birthdates, Social Security numbers, and income data. The company also lacked proper detection systems, allowing hackers to exfiltrate data for 9 months before discovery in January 2015.",
      keyFixes: ["Encrypt sensitive data", "Enhanced monitoring", "Phishing awareness training"],
      cost: "$16M HIPAA fine + $115M settlement",
      lesson: "Healthcare's biggest breach: no encryption"
    }
  },

  ashleymadison: {
    year: 2015,
    position: 1,
    verticalOffset: 1,
    title: "Ashley Madison",
    affected: "36M users",
    category: "tech",
    severity: "high",
    color: "#ff9800",
    shortDesc: "Weak security + extortion + real-world harm",
    fullDetails: {
      date: "Jul-Aug 2015",
      impact: "36 million users of infidelity dating site",
      rootCause: "The 'Impact Team' hackers breached Ashley Madison between November 2014 and June 2015, but the company had no written security policy, inadequate access controls, no employee security training, and no monitoring systems to detect the intrusion. While most passwords used strong bcrypt hashing, 15 million were hashed with weak MD5. The hackers publicly released 60GB of data including real names and payment details, linked to two suicides.",
      keyFixes: ["Consistent encryption (bcrypt everywhere)", "Security monitoring", "Written security policies"],
      cost: "$11.2M settlement + reputational catastrophe",
      lesson: "Lax security + sensitive data = lives at risk"
    }
  },

  sonypictures: {
    year: 2014,
    position: 1.2,
    verticalOffset: 0,
    title: "Sony Pictures",
    affected: "Entire studio",
    category: "entertainment",
    severity: "critical",
    color: "#d32f2f",
    shortDesc: "State-sponsored attack + wiper malware + political motive",
    fullDetails: {
      date: "Nov 2014",
      impact: "100TB of data: emails, salaries, unreleased films, SSNs",
      rootCause: "North Korean state-sponsored hackers (Guardians of Peace) infiltrated Sony's network to retaliate against 'The Interview' film mocking Kim Jong-un. They stole massive amounts of confidential data including executive emails, employee personal information, and unreleased films. Then they deployed Shamoon wiper malware to permanently destroy Sony's computer infrastructure, crippling operations. The FBI linked the attack to North Korean infrastructure and malware.",
      keyFixes: ["Nation-state threat modeling", "Data loss prevention", "Incident response planning"],
      cost: "$100M+ (recovery + lost business)",
      lesson: "Geopolitics can make you a target"
    }
  },

  linkedin: {
    year: 2012,
    position: 0.5,
    verticalOffset: 1,
    title: "LinkedIn",
    affected: "117M accounts",
    category: "tech",
    severity: "high",
    color: "#ff9800",
    shortDesc: "Weak SHA-1 hashing without salt",
    fullDetails: {
      date: "Jun 2012 (full scope discovered 2016)",
      impact: "117 million accounts (initially reported as 6.5M)",
      rootCause: "LinkedIn used weak SHA-1 hashing for passwords without adding salt (random data that makes each hash unique). This allowed hackers to use rainbow tables—precomputed hash databases—to crack passwords extremely quickly. The breach was initially thought to affect 6.5 million users, but in 2016 the full dataset of 117 million accounts surfaced for sale on the dark web, revealing the true scale.",
      keyFixes: ["Use bcrypt/Argon2 with salt", "Regular security audits", "Transparent disclosure"],
      cost: "$1.25M settlement",
      lesson: "Unsalted hashes = instant password cracking"
    }
  }
};

function hoverBreach(marker, isEnter) {
  const dot = marker.querySelector('.breach-dot');
  const tooltip = marker.querySelector('.breach-tooltip');
  if (isEnter) {
    dot.style.transform = 'scale(1.4)';
    tooltip.style.transform = 'translateX(-50%) scale(1)';
    tooltip.style.opacity = '1';
  } else {
    dot.style.transform = 'scale(1)';
    tooltip.style.transform = 'translateX(-50%) scale(0)';
    tooltip.style.opacity = '0';
  }
}

function initTimeline() {
  const container = document.getElementById('timeline-markers');
  container.innerHTML = '';

  Object.entries(timelineBreaches).forEach(([key, breach]) => {
    // Calculate position on timeline (2012 = 0%, 2020 = 100%)
    const yearPosition = ((breach.year - 2012) / 8) * 100 + (breach.position * 4);

    const marker = document.createElement('div');
    marker.className = 'breach-marker';
    marker.setAttribute('data-breach', key);
    marker.style.cssText = `
      position: absolute;
      left: ${yearPosition}%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: all 0.3s ease;
    `;

    const size = breach.severity === 'critical' ? '20px' : '16px';

    marker.innerHTML = `
      <div class="breach-dot" style="
        width: ${size};
        height: ${size};
        background: ${breach.color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
      ">
      </div>
      <div class="breach-tooltip" style="
        position: absolute;
        bottom: calc(100% + 15px);
        left: 50%;
        transform: translateX(-50%) scale(0);
        background: var(--card-bg, #2c2c2c);
        color: var(--text-color, #fff);
        padding: 8px 12px;
        border-radius: 6px;
        white-space: nowrap;
        font-size: 0.75rem;
        font-weight: 600;
        pointer-events: none;
        opacity: 0;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 100;
      ">
        ${breach.title}
        <div style="font-size: 0.65rem; font-weight: normal; opacity: 0.8; margin-top: 2px;">${breach.affected}</div>
        <div style="
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid var(--card-bg, #2c2c2c);
        "></div>
      </div>
    `;

    marker.setAttribute('onmouseenter', 'hoverBreach(this, true)');
    marker.setAttribute('onmouseleave', 'hoverBreach(this, false)');
    marker.setAttribute('onclick', `showBreachDetails('${key}')`);
    container.appendChild(marker);
  });
}

function showBreachDetails(breachKey) {
  const breach = timelineBreaches[breachKey];
  const panel = document.getElementById('breach-details-panel');
  const content = document.getElementById('detail-content');

  document.getElementById('detail-title').textContent = `${breach.title} (${breach.fullDetails.date})`;

  content.innerHTML = `
    <div style="margin: 1rem 0;">
      <strong>📊 Impact:</strong> ${breach.fullDetails.impact}
    </div>
    <div style="margin: 1rem 0;">
      <strong>⚠️ Root Cause:</strong> ${breach.fullDetails.rootCause}
    </div>
    <div style="margin: 1rem 0;">
      <strong>💡 Key Prevention Measures:</strong>
      <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
        ${breach.fullDetails.keyFixes.map(fix => `<li style="margin: 0.3rem 0;">${fix}</li>`).join('')}
      </ul>
    </div>
    <div style="margin: 1rem 0;">
      <strong>💰 Cost:</strong> ${breach.fullDetails.cost}
    </div>
    <div style="margin: 1rem 0; padding: 1rem; background: var(--prompt-warning-bg, #fff3cd); border-left: 4px solid ${breach.color}; border-radius: 4px;">
      <strong>🎓 Lesson:</strong> ${breach.fullDetails.lesson}
    </div>
  `;

  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeDetails() {
  document.getElementById('breach-details-panel').style.display = 'none';
}

// Initialize on load
initTimeline();
