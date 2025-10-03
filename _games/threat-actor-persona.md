---
title: Threat Actor Persona Generator
emoji: 🎭
order: 2
game_id: persona
---

<div style="padding: 2rem; border: 1px solid var(--main-border-color, #ddd); border-radius: 8px; margin: 2rem 0;">
  <div id="persona-display" style="padding: 2rem; background: var(--card-bg, #f9f9f9); border-radius: 4px; margin-bottom: 1.5rem; min-height: 200px;">
    <p style="text-align: center; color: #666;">Click the button below to generate your hacker persona!</p>
  </div>

  <div style="text-align: center;">
    <button onclick="generatePersona()" style="padding: 0.75rem 2rem; background: #FF5722; color: white; border: none; border-radius: 4px; font-size: 1.1rem; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#E64A19'" onmouseout="this.style.background='#FF5722'">
      Generate Persona 🎲
    </button>
  </div>
</div>

<script>
const names = ["Shadow", "Dark", "Phantom", "Ghost", "Silent", "Digital", "Cyber", "Stealth", "Rogue", "Chaos"];
const animals = ["Panda", "Dragon", "Wolf", "Raven", "Viper", "Falcon", "Tiger", "Cobra", "Phoenix", "Lynx"];
const numbers = Array.from({length: 99}, (_, i) => i + 1);

const locations = ["Eastern Europe", "Southeast Asia", "a basement somewhere", "a coffee shop", "an undisclosed location", "behind several proxies", "the dark web", "a secure bunker"];

const specialties = [
  "Exploiting misconfigured cloud buckets",
  "Advanced persistent threats (APT)",
  "Supply chain attacks",
  "Zero-day vulnerability research",
  "Social engineering and phishing campaigns",
  "Ransomware deployment",
  "Credential stuffing attacks",
  "API exploitation",
  "Network infiltration",
  "Malware development",
  "Data exfiltration techniques",
  "SQL injection at scale",
];

const nemeses = [
  "Well-trained security teams",
  "Proper patch management",
  "Multi-factor authentication",
  "Network segmentation",
  "Intrusion detection systems",
  "Security-aware employees",
  "Updated firewall rules",
  "Encrypted databases",
  "Regular security audits",
  "Incident response teams",
  "Bug bounty hunters",
  "Security researchers",
];

const motivations = [
  "financial gain",
  "political activism",
  "corporate espionage",
  "state-sponsored objectives",
  "proving a security point",
  "research purposes",
  "ideological reasons",
  "competitive advantage",
  "exposing vulnerabilities",
];

function generatePersona() {
  const name = names[Math.floor(Math.random() * names.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const specialty = specialties[Math.floor(Math.random() * specialties.length)];
  const nemesis = nemeses[Math.floor(Math.random() * nemeses.length)];
  const motivation = motivations[Math.floor(Math.random() * motivations.length)];

  const personaDisplay = document.getElementById('persona-display');
  personaDisplay.innerHTML = `
    <h3 style="margin-top: 0; text-align: center; color: #FF5722;">Your Threat Actor Persona</h3>
    <div style="margin: 1.5rem 0;">
      <p style="font-size: 1.3rem; text-align: center; margin: 1rem 0;">
        <strong style="color: #FF5722;">${name}_${animal}_${number}</strong>
      </p>
      <p style="margin: 0.5rem 0;"><strong>Location:</strong> ${location}</p>
      <p style="margin: 0.5rem 0;"><strong>Specialty:</strong> ${specialty}</p>
      <p style="margin: 0.5rem 0;"><strong>Nemesis:</strong> ${nemesis}</p>
      <p style="margin: 0.5rem 0;"><strong>Motivation:</strong> ${motivation}</p>
    </div>
    <p style="text-align: center; margin-top: 1.5rem; font-style: italic; color: #666;">
      Share your persona with friends (at your own risk)!
    </p>
  `;
}
</script>
