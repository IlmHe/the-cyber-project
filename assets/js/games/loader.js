(function() {
  const gameIds = window.availableGames || [];
  if (gameIds.length === 0) return;

  const randomId = gameIds[Math.floor(Math.random() * gameIds.length)];
  const gameElement = document.getElementById('game-' + randomId);
  const container = document.getElementById('random-game-container');

  if (gameElement) {
    container.innerHTML = gameElement.innerHTML;

    // Execute any scripts in the inserted content
    const scripts = container.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      script.parentNode.replaceChild(newScript, script);
    }

    gameElement.remove();
  }
})();
