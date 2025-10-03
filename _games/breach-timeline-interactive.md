---
title: Interactive Breach Timeline
emoji: 📊
order: 4
game_id: breach-interactive
exclude_from_home: true
---

<div style="padding: 2rem; border: 1px solid var(--main-border-color, #ddd); border-radius: 8px; margin: 2rem 0;">
  <p style="text-align: center; margin-bottom: 1.5rem; font-size: 1.1rem;">Click on breaches in the timeline to explore what went wrong</p>

  <!-- Timeline Container -->
  <div style="position: relative; margin: 3rem 0; padding: 2rem 0;">
    <!-- Timeline axis -->
    <div style="position: relative; height: 4px; background: linear-gradient(to right, #4CAF50 0%, #2196F3 50%, #d32f2f 100%); border-radius: 2px; margin-bottom: 2rem;">
      <!-- Year markers -->
      <div style="position: absolute; top: 20px; left: 0%; transform: translateX(-50%); font-size: 0.85rem; font-weight: bold;">2012</div>
      <div style="position: absolute; top: 20px; left: 25%; transform: translateX(-50%); font-size: 0.85rem; font-weight: bold;">2014</div>
      <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); font-size: 0.85rem; font-weight: bold;">2016</div>
      <div style="position: absolute; top: 20px; left: 75%; transform: translateX(-50%); font-size: 0.85rem; font-weight: bold;">2018</div>
      <div style="position: absolute; top: 20px; left: 100%; transform: translateX(-50%); font-size: 0.85rem; font-weight: bold;">2020</div>
    </div>

    <!-- Breach markers -->
    <div id="timeline-markers" style="position: relative; height: 80px; margin-top: 3rem;">
      <!-- Populated by JavaScript -->
    </div>
  </div>

  <!-- Details Panel -->
  <div id="breach-details-panel" style="display: none; margin-top: 2rem; padding: 1.5rem; background: var(--card-bg, #f9f9f9); border-radius: 8px; border-left: 4px solid #2196F3;">
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
      <h3 id="detail-title" style="margin: 0; color: #d32f2f;"></h3>
      <button onclick="closeDetails()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
    </div>

    <div id="detail-content"></div>
  </div>

  <!-- Statistics Summary -->
  <div id="stats-summary" style="margin-top: 2rem; padding: 1rem; background: var(--prompt-tip-bg, #e3f2fd); border-radius: 4px;">
    <strong>📈 Overall Statistics:</strong>
    <div style="margin-top: 0.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div>
        <div style="font-size: 1.5rem; font-weight: bold; color: #d32f2f;">4.5B+</div>
        <div style="font-size: 0.85rem; color: #666;">Total Records Exposed</div>
      </div>
      <div>
        <div style="font-size: 1.5rem; font-weight: bold; color: #d32f2f;">14</div>
        <div style="font-size: 0.85rem; color: #666;">Major Breaches Documented</div>
      </div>
      <div>
        <div style="font-size: 1.5rem; font-weight: bold; color: #d32f2f;">$8B+</div>
        <div style="font-size: 0.85rem; color: #666;">Combined Costs</div>
      </div>
    </div>
  </div>
</div>

<script src="/assets/js/games/breach-timeline.js"></script>

<style>
.breach-marker:hover {
  z-index: 10;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

#breach-details-panel {
  animation: fadeIn 0.3s ease-in;
}
</style>
