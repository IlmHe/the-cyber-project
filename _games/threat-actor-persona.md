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

const locations = ["Eastern Europe", "Southeast Asia", "a basement somewhere", "a coffee shop with free WiFi", "their mom's house", "a secret underground lair", "the cloud", "behind 7 proxies", "an undisclosed location", "international waters"];

const specialties = [
  "Crypto-jacking via smart toasters",
  "Phishing attacks using Comic Sans",
  "SQL injection through carrier pigeons",
  "Social engineering via cat memes",
  "DDoS attacks powered by IoT rubber ducks",
  "Ransomware delivered by strongly-worded emails",
  "Zero-day exploits in obsolete technology",
  "Brute-forcing passwords alphabetically",
  "Stealing data through aggressive sighing",
  "Cryptocurrency mining on TI-84 calculators",
  "Hacking the Gibson (still working on it)",
  "Malware disguised as motivational quotes",
  "Bypassing firewalls with pure determination",
];

const nemeses = [
  "A bored teenager with ChatGPT",
  "Their ISP's customer service",
  "A sysadmin who actually reads logs",
  "The 'forgot password' link",
  "Windows Update",
  "A correctly configured firewall",
  "Someone who spotted the typo in their phishing email",
  "The 'Remember me' checkbox",
  "An intern who changed the admin password",
  "A user who actually enabled 2FA",
  "The coffee machine that's always broken",
  "Stack Overflow being down",
];

const motivations = [
  "chaos and lulz",
  "forgot why they started",
  "proving their ex wrong",
  "thought it would be cooler",
  "the thrill of getting past CAPTCHA",
  "really needs the money for snacks",
  "accidentally stumbled into this",
  "watched too many movies",
  "revenge against autocorrect",
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
