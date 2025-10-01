---
title: Data Breach Timeline
emoji: 🔓
order: 3
game_id: breach-timeline
---

<div style="padding: 2rem; border: 1px solid var(--main-border-color, #ddd); border-radius: 8px; margin: 2rem 0;">
  <p style="text-align: center; margin-bottom: 1.5rem;">Explore major data breaches in history and learn what went wrong</p>

  <div id="breach-selector" style="margin-bottom: 2rem;">
    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Select a breach to learn more:</label>
    <select id="breach-dropdown" onchange="showBreach()" style="width: 100%; padding: 0.75rem; font-size: 1rem; border: 1px solid var(--main-border-color, #ddd); border-radius: 4px; background: var(--card-bg, white); color: var(--text-color, black);">
      <option value="">-- Choose a breach --</option>
      <option value="yahoo">Yahoo (2013) - 3 Billion Accounts</option>
      <option value="equifax">Equifax (2017) - 147.9 Million Records</option>
      <option value="target">Target (2013) - 110 Million Customers</option>
      <option value="marriott">Marriott/Starwood (2014-2018) - 500 Million Guests</option>
      <option value="capitalone">Capital One (2019) - 100 Million+ Records</option>
      <option value="facebook">Facebook/Cambridge Analytica (2018) - 87 Million Users</option>
      <option value="uber">Uber (2016) - 57 Million Users + Coverup</option>
      <option value="vastaamo">Vastaamo Finland (2018-2020) - 36,000 Therapy Patients</option>
      <option value="solarwinds">SolarWinds (2020) - 18,000+ Organizations</option>
    </select>
  </div>

  <div id="breach-details" style="display: none; background: var(--card-bg, #f9f9f9); padding: 1.5rem; border-radius: 4px; margin-bottom: 1rem;">
    <h3 id="breach-title" style="margin-top: 0; color: #d32f2f;"></h3>

    <div style="margin: 1rem 0;">
      <strong>📅 Date:</strong> <span id="breach-date"></span>
    </div>

    <div style="margin: 1rem 0;">
      <strong>📊 Impact:</strong> <span id="breach-impact"></span>
    </div>

    <div style="margin: 1rem 0;">
      <strong>⚠️ What Happened:</strong>
      <p id="breach-what" style="margin: 0.5rem 0;"></p>
    </div>

    <div style="margin: 1rem 0;">
      <strong>🔍 Root Cause:</strong>
      <p id="breach-cause" style="margin: 0.5rem 0;"></p>
    </div>

    <div style="margin: 1rem 0;">
      <strong>💡 How It Could Have Been Prevented:</strong>
      <ul id="breach-prevention" style="margin: 0.5rem 0; padding-left: 1.5rem;"></ul>
    </div>

    <div style="margin: 1rem 0;">
      <strong>💰 Cost:</strong> <span id="breach-cost"></span>
    </div>

    <div style="margin: 1rem 0; padding: 1rem; background: var(--prompt-tip-bg, #e3f2fd); border-left: 4px solid var(--prompt-tip-icon-color, #2196F3); border-radius: 4px;">
      <strong>🎓 Key Lesson:</strong>
      <p id="breach-lesson" style="margin: 0.5rem 0 0 0;"></p>
    </div>
  </div>
</div>

<script>
const breaches = {
  yahoo: {
    title: "Yahoo Data Breach (2013)",
    date: "August 2013 (Discovered in 2016)",
    impact: "3 billion user accounts - largest breach in history",
    what: "State-sponsored Russian hackers exploited a vulnerability in Yahoo's system and stole personal data of every single user. The breach went undetected for 3 years.",
    cause: "Weak password hashing (MD5), unpatched vulnerabilities, and cookie forgery attacks. Hackers also accessed Yahoo's proprietary code to forge authentication cookies.",
    prevention: [
      "Use strong password hashing algorithms (bcrypt instead of MD5)",
      "Implement two-factor authentication (2FA) for all users",
      "Regular security audits and penetration testing",
      "Prompt disclosure and response to security incidents",
      "Invalidate and rotate security tokens regularly"
    ],
    cost: "$117.5 million settlement + massive reputational damage",
    lesson: "Weak encryption and delayed incident response can turn a breach into a catastrophe. Yahoo took 3 years to discover the breach and even longer to fully disclose it, violating user trust."
  },

  equifax: {
    title: "Equifax Data Breach (2017)",
    date: "March - July 2017 (Disclosed September 2017)",
    impact: "147.9 million Americans + 15.2 million UK citizens + 19,000 Canadians",
    what: "Attackers exploited CVE-2017-5638, a vulnerability in Apache Struts framework. Despite having 2 months to patch after the vulnerability was disclosed, Equifax failed to apply the update.",
    cause: "Unpatched Apache Struts vulnerability + expired security certificate + poor network segmentation. Attackers found credentials stored in plain text and moved laterally through the network.",
    prevention: [
      "Timely patch management - patches were available but not applied",
      "Network segmentation to limit lateral movement",
      "Never store passwords in plain text - use proper encryption",
      "Renew security certificates before expiration",
      "Automated vulnerability scanning and patch deployment",
      "Zero-trust architecture with strict access controls"
    ],
    cost: "$1.38 billion in settlements, fines, and security improvements",
    lesson: "Compliance ≠ Security. Equifax passed PCI audits but still got breached. Basic security hygiene (patching, segmentation, credential management) matters more than checkbox compliance."
  },

  target: {
    title: "Target Data Breach (2013)",
    date: "November 15 - December 15, 2013",
    impact: "110 million customers (40 million payment cards + 70 million personal records)",
    what: "Attackers gained access through a third-party HVAC vendor's stolen credentials, then installed POS malware (Kaptoxa) to scrape credit card data from checkout terminals.",
    cause: "Weak third-party vendor security + lack of network segmentation + ignored security alerts. FireEye detected the malware but Target didn't act on the warning.",
    prevention: [
      "Strict third-party vendor security requirements and audits",
      "Network segmentation - HVAC vendor shouldn't access payment systems",
      "Act on security alerts immediately (FireEye warned them!)",
      "Enable automatic malware removal features",
      "Implement Zero-Trust architecture for vendor access",
      "Advanced POS system hardening and monitoring"
    ],
    cost: "$200+ million in direct costs + loss of customer trust",
    lesson: "Your security is only as strong as your weakest vendor. Target had good security tools but poor vendor management and ignored automated alerts. Multi-layered security beyond compliance is essential."
  },

  marriott: {
    title: "Marriott/Starwood Hotels Data Breach (2014-2018)",
    date: "2014-2018 (Discovered September 2018)",
    impact: "500 million hotel guests worldwide",
    what: "Attackers infiltrated Starwood Hotels' systems in 2014, remaining undetected for 4 years. When Marriott acquired Starwood in 2016, they inherited the breach without knowing it. The hackers accessed names, addresses, passport numbers, payment cards, and loyalty program data.",
    cause: "Long-term undetected breach due to inadequate security monitoring + poor M&A due diligence. Attackers used Remote Access Trojans (RAT) and found encryption keys stored on the same server as encrypted data.",
    prevention: [
      "Cybersecurity due diligence during mergers & acquisitions",
      "Never store encryption keys with encrypted data - separate them",
      "Secure RDP ports - never leave them open to internet",
      "Implement VPNs and MFA for remote access",
      "Enhanced monitoring to detect unusual access patterns",
      "Just-in-time access controls with session timeouts",
      "Regular security audits of inherited systems after M&A"
    ],
    cost: "$52 million settlement with states + massive remediation costs",
    lesson: "M&A cybersecurity matters. Marriott acquired Starwood's breach along with its hotels because they didn't thoroughly assess security during acquisition. Companies must audit acquisition targets' security posture and integrate security during mergers."
  },

  capitalone: {
    title: "Capital One Cloud Breach (2019)",
    date: "March 22-23, 2019 (Discovered July 2019)",
    impact: "100+ million credit card applications and accounts",
    what: "Attacker exploited a misconfigured Web Application Firewall (WAF) on AWS to perform a Server-Side Request Forgery (SSRF) attack. This allowed them to trick the firewall into accessing AWS metadata service and steal credentials, then access S3 buckets containing customer data.",
    cause: "Cloud misconfiguration + over-provisioned IAM roles + lack of monitoring. The WAF was misconfigured, IAM role had excessive permissions (shouldn't have had access to S3 and encryption keys), and Capital One failed to detect the intrusion.",
    prevention: [
      "Implement principle of least privilege for IAM roles",
      "Use AWS Access Advisor to identify over-provisioned roles",
      "Enable AWS GuardDuty to detect scanning and unusual behavior",
      "Configure AWS WAF properly to prevent SSRF attacks",
      "Use AWS IMDSv2 to defend against metadata service exploits",
      "Separate resources - don't store WAF and customer data together",
      "Enable CloudTrail and continuous monitoring",
      "Create 'golden configurations' and scan for non-compliance"
    ],
    cost: "$80 million fine from OCC + $190 million for affected customers",
    lesson: "Cloud security requires different thinking than traditional infrastructure. Misconfigurations and over-privileged roles are critical vulnerabilities in cloud environments. The shared responsibility model means you're responsible for securing what you deploy, not just the cloud provider."
  },

  facebook: {
    title: "Facebook/Cambridge Analytica Scandal (2018)",
    date: "2013-2018 (Disclosed March 2018)",
    impact: "87 million Facebook users' data harvested without consent",
    what: "A personality quiz app called 'This Is Your Digital Life' collected data not just from users who took the quiz, but also from all their Facebook friends. Cambridge Analytica used this data to create psychographic profiles and target political ads in the 2016 US election.",
    cause: "Overly permissive API access + poor third-party app oversight. Facebook's Open Graph platform allowed apps to access friends' data without their consent. Cambridge Analytica violated terms by using data for political purposes instead of academic research.",
    prevention: [
      "Limit third-party API access to only essential data",
      "Remove developer access if app unused for 3+ months",
      "Require explicit user consent for friend data access",
      "Implement GDPR-level privacy controls globally",
      "72-hour data breach notification requirements",
      "Audit third-party apps regularly for terms violations",
      "Give users transparency and control over their data",
      "Platform transparency for political advertising"
    ],
    cost: "$5 billion FTC fine + global regulatory scrutiny",
    lesson: "Data misuse doesn't require a 'hack' - lax API permissions and poor oversight of third parties can be just as damaging. Privacy-by-design and limiting data collection to what's truly necessary are critical. Users should understand what data they're sharing and with whom."
  },

  uber: {
    title: "Uber Data Breach & Coverup (2016)",
    date: "October 2016 (Concealed until November 2017)",
    impact: "57 million riders and drivers + 600,000 driver license numbers",
    what: "Hackers found AWS credentials that Uber engineers accidentally exposed on GitHub. They used these to access Uber's data. What made this worse: Uber's CSO orchestrated a coverup, paying hackers $100,000 disguised as a 'bug bounty' and having them sign NDAs. The breach wasn't disclosed for over a year.",
    cause: "Hardcoded credentials in GitHub + attempted coverup. Engineers left AWS keys in public GitHub repo. Instead of reporting to FTC and users, executives tried to hide it.",
    prevention: [
      "NEVER hardcode credentials or store them in repositories",
      "Use secret management tools (AWS Secrets Manager, HashiCorp Vault)",
      "Implement GitHub secret scanning and alerts",
      "Enhanced MFA to prevent MFA fatigue attacks",
      "Security awareness training on social engineering",
      "Proper breach disclosure - it's legally required",
      "Maintain ISO 27001 compliance for breach management",
      "Create culture where reporting bad news is rewarded, not punished"
    ],
    cost: "$148 million settlement + criminal conviction of CSO",
    lesson: "The coverup was worse than the crime. Uber's Chief Security Officer was convicted of federal charges for hiding the breach. Attempting to conceal a breach compounds legal consequences and destroys trust. Organizations must report breaches promptly and transparently - it's not just ethical, it's the law."
  },

  vastaamo: {
    title: "Vastaamo Psychotherapy Data Breach (2018-2020)",
    date: "December 2018 & March 2019 breaches, discovered October 2020",
    impact: "36,000 psychotherapy patients + 400 employees in Finland",
    what: "Finnish psychotherapy clinic Vastaamo suffered catastrophic security failures. Attackers accessed sensitive therapy session notes, then extorted individual patients directly - threatening to publish their mental health records unless they paid ransoms.",
    cause: "Egregious security negligence: NO database password for 17+ months, NO encryption, NO anonymization of sensitive data. The patient database was publicly accessible without authentication from November 2017 to March 2019.",
    prevention: [
      "Encrypt ALL sensitive data, especially medical/therapy records",
      "ALWAYS require strong passwords - never leave databases passwordless",
      "Implement multi-factor authentication (MFA) on all systems",
      "Regular security audits and penetration testing",
      "Anonymize/pseudonymize data where possible",
      "Store highly sensitive notes offline or with additional encryption",
      "Comply with healthcare data protection regulations (GDPR)",
      "Network segmentation to limit breach scope"
    ],
    cost: "Bankruptcy in Feb 2021 + perpetrator sentenced to 6 years prison (2024)",
    lesson: "This breach represents one of the most catastrophic security failures in history. Leaving psychotherapy records unencrypted and publicly accessible is criminal negligence. The human cost was immense - patients were individually extorted with their most vulnerable moments. Basic security hygiene (passwords, encryption) is not optional for sensitive data."
  },

  solarwinds: {
    title: "SolarWinds Supply Chain Attack (2020)",
    date: "September 2019 - December 2020 (14+ months undetected)",
    impact: "18,000+ organizations including US government agencies (DHS, Pentagon, Treasury)",
    what: "Russian state-sponsored hackers (APT29/Cozy Bear) compromised SolarWinds' build system and injected malicious code (Sunburst backdoor) into Orion software updates. The malware was digitally signed, so it appeared legitimate.",
    cause: "Sophisticated supply chain attack targeting software development pipeline. Attackers had 14+ months of access before discovery. The malware used advanced evasion: code obfuscation, steganography, and geolocation-based activation.",
    prevention: [
      "Secure software development lifecycle (SDLC) with code integrity checks",
      "Build system isolation and hardening",
      "Code signing with hardware security modules (HSMs)",
      "Multi-factor authentication for all development systems",
      "Zero-trust architecture - don't blindly trust software updates",
      "Behavioral analysis and anomaly detection for outbound traffic",
      "Software Bill of Materials (SBOM) for supply chain visibility"
    ],
    cost: "Estimated billions in impact across government and private sector",
    lesson: "Supply chain attacks exploit trust. Even digitally signed software from trusted vendors can be compromised. Organizations need defense-in-depth and can't rely solely on vendor trust."
  }
};

function showBreach() {
  const selected = document.getElementById('breach-dropdown').value;
  const detailsDiv = document.getElementById('breach-details');

  if (!selected) {
    detailsDiv.style.display = 'none';
    return;
  }

  const breach = breaches[selected];

  document.getElementById('breach-title').textContent = breach.title;
  document.getElementById('breach-date').textContent = breach.date;
  document.getElementById('breach-impact').textContent = breach.impact;
  document.getElementById('breach-what').textContent = breach.what;
  document.getElementById('breach-cause').textContent = breach.cause;
  document.getElementById('breach-cost').textContent = breach.cost;
  document.getElementById('breach-lesson').textContent = breach.lesson;

  // Build prevention list
  const preventionList = document.getElementById('breach-prevention');
  preventionList.innerHTML = '';
  breach.prevention.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.style.margin = '0.3rem 0';
    preventionList.appendChild(li);
  });

  detailsDiv.style.display = 'block';
  detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
</script>

<style>
#breach-dropdown {
  cursor: pointer;
}

#breach-dropdown:hover {
  border-color: var(--link-color, #2196F3);
}

#breach-details {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
