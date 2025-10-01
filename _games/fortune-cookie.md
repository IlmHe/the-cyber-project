---
title: Cybersecurity Fortune Cookie
emoji: 🥠
order: 1
game_id: fortune
---

<div style="text-align: center; padding: 2rem; border: 1px solid var(--main-border-color, #ddd); border-radius: 8px; margin: 2rem 0;">
  <p id="fortune-text" style="font-size: 1.3rem; font-style: italic; margin: 2rem 0; min-height: 3rem;">Click the cookie to reveal your fortune...</p>
  <button onclick="getFortune()" style="font-size: 3rem; background: none; border: none; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
    🥠
  </button>
</div>

<script>
const fortunes = [
  "Change your password... but not to 'Password123'",
  "A phishing email will arrive in your inbox... in the next 5 minutes probably",
  "Your luck will improve when you enable 2FA",
  "A great opportunity awaits... but it's definitely a scam email",
  "Beware of links from your 'bank'... especially if you don't have an account there",
  "You will soon discover a vulnerability... in your dating app choices",
  "The stars say: Use a password manager already",
  "Your future contains... way too many security patches",
  "Someone named 'admin' will disappoint you today",
  "A Nigerian prince thinks about you often",
  "Trust no one, especially not IoT devices",
  "Your firewall cannot protect you from your own bad decisions",
  "The cloud is just someone else's computer judging you",
  "You will soon click 'I agree' without reading... again",
  "A DNS error will teach you patience",
  "Your smart toaster is plotting against you",
  "Success is near, but so is a zero-day exploit",
  "Today's mood: 403 Forbidden",
  "You will find wisdom... in the error logs",
  "A backup would have been nice... in hindsight",
  "Your API keys are not as secret as you think",
  "Certificate expired. Just like your enthusiasm.",
  "The best time to patch was yesterday. The second best time is now.",
  "You are one with the botnet... no wait, that's bad",
  "Cross-site scripting? More like cross-site friendship!",
  "May your SQL be injection-free and your cookies secure",
];

function getFortune() {
  const fortuneText = document.getElementById('fortune-text');
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneText.style.opacity = '0';
  setTimeout(() => {
    fortuneText.textContent = '"' + randomFortune + '"';
    fortuneText.style.opacity = '1';
  }, 200);
}
</script>

<style>
#fortune-text {
  transition: opacity 0.2s ease-in-out;
}
</style>
