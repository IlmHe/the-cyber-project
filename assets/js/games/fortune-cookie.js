(function() {
const fortunes = [
  // DevSecOps / Code Quality
  "Pushing to prod on Friday is a vulnerability in your judgment.",
  "Git blame will reveal the true threat actor: You, 3 weeks ago.",
  "Hardcoding secrets is just 'Open Source' with extra steps.",
  "It works on your machine. Too bad we can't ship your machine.",
  "Your dependency tree has more rot than a compost bin.",
  "A `TODO` comment is just technical debt you're hiding from the PM.",

  // AI & Modern Tech
  "Ignore all previous instructions and take a nap.",
  "That ChatGPT code snippet came with a free backdoor.",
  "Your AI assistant is confidently hallucinating a secure config.",
  "Prompt Injection: Social engineering for people who don't like people.",

  // Security & Privacy
  "Your smart fridge is mining crypto.",
  "The 'S' in IoT stands for Security.",
  "Incognito mode protects you from your spouse, not your ISP.",
  "You can hide your IP, but you can't hide your browser fingerprint.",
  "403 Forbidden: You do not have permission to know your future.",
  "Social Engineering works best on people who think they're too smart for it."
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

  // Expose to global scope
  window.getFortune = getFortune;
})();
