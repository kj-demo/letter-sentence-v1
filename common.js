// ---- 共通ユーティリティ（3プロトタイプ共通） ------------------------------

function speak(text, rate, lang) {
  rate = rate || 0.85;
  lang = lang || "en-US";
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.lang = lang;
    window.speechSynthesis.speak(u);
  } catch (e) {
    /* no-op: 環境によっては音声合成が使えない */
  }
}

// Duolingo風の達成チャイム（上昇アルペジオ）を合成音で再生
function playCelebrationChime() {
  try {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    var ctx = new AudioCtx();
    var notes = [523.25, 659.25, 783.99, 1046.5]; // C5-E5-G5-C6
    notes.forEach(function (freq, i) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      var t0 = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.32);
    });
  } catch (e) {
    /* no-op */
  }
}

// 不正解時の「ブー」という効果音
function playWrongBuzzer() {
  try {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    var ctx = new AudioCtx();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.32);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    /* no-op */
  }
}

// 指定コンテナ内にスター(★)をcount個ハイライトして描画
function renderStars(container, count) {
  container.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    var filled = i < count;
    var svgNs = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("width", "22");
    svg.setAttribute("height", "22");
    svg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS(svgNs, "path");
    path.setAttribute(
      "d",
      "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
    );
    path.setAttribute("fill", filled ? "#FFC43D" : "none");
    path.setAttribute("stroke", filled ? "#FFC43D" : "#E2DCCB");
    path.setAttribute("stroke-width", "1.5");
    svg.appendChild(path);
    container.appendChild(svg);
  }
}

// 紙吹雪を1回だけ弾けさせる（呼ぶたびに新しい粒子を追加して自動的に消える）
function spawnConfetti(layerEl) {
  var emojis = ["🎉", "✨", "⭐", "🎊", "🥳"];
  for (var i = 0; i < 18; i++) {
    var angle = Math.random() * Math.PI * 2;
    var dist = 70 + Math.random() * 90;
    var dx = Math.cos(angle) * dist;
    var dy = Math.sin(angle) * dist - 40;
    var rot = Math.random() * 360 - 180;
    var delay = Math.random() * 0.15;
    var span = document.createElement("span");
    span.className = "confetti-piece";
    span.textContent = emojis[i % emojis.length];
    span.style.setProperty("--dx", dx + "px");
    span.style.setProperty("--dy", dy + "px");
    span.style.setProperty("--rot", rot + "deg");
    span.style.animationDelay = delay + "s";
    layerEl.appendChild(span);
    (function (el) {
      setTimeout(function () {
        el.remove();
      }, 1400);
    })(span);
  }
}

// フェーズ（lesson/quiz/done）の表示切り替え共通処理
function showPhase(root, phaseName) {
  var phases = root.querySelectorAll("[data-phase]");
  phases.forEach(function (el) {
    el.classList.toggle("hidden", el.getAttribute("data-phase") !== phaseName);
  });
}
