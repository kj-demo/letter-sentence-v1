(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var puzzleGrid = document.getElementById("puzzleGrid");
  var tray = document.getElementById("tray");
  var feedbackEl = document.getElementById("feedback");

  var WORD = "cat";
  var stars = 0;

  // ネコの絵（レターレッスン等と同じ図形）。4分割してパズルのピースにする。
  var CAT_PATHS =
    '<path d="M60 60 L75 25 L95 65 Z" fill="#F2A65A"/><path d="M140 60 L125 25 L105 65 Z" fill="#F2A65A"/><path d="M68 55 L76 38 L86 60 Z" fill="#FADCC2"/><path d="M132 55 L124 38 L114 60 Z" fill="#FADCC2"/><circle cx="100" cy="95" r="48" fill="#F2A65A"/><ellipse cx="100" cy="150" rx="55" ry="42" fill="#F2A65A"/><circle cx="80" cy="92" r="6" fill="#2E2320"/><circle cx="120" cy="92" r="6" fill="#2E2320"/><path d="M92 108 Q100 114 108 108" stroke="#2E2320" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M100 102 L94 108 L106 108 Z" fill="#E4795C"/><path d="M55 100 L20 95 M55 108 L18 108 M55 116 L20 122" stroke="#2E2320" stroke-width="1.5" stroke-linecap="round"/><path d="M145 100 L180 95 M145 108 L182 108 M145 116 L180 122" stroke="#2E2320" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="70" cy="180" rx="16" ry="12" fill="#FADCC2"/><ellipse cx="130" cy="180" rx="16" ry="12" fill="#FADCC2"/><path d="M150 165 Q185 150 175 100" stroke="#F2A65A" stroke-width="16" fill="none" stroke-linecap="round"/>';

  // 4分割の座標（0:左上 1:右上 2:左下 3:右下）
  var QUADS = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ];

  function pieceSvg(idx) {
    var q = QUADS[idx];
    return '<svg viewBox="' + q.x + ' ' + q.y + ' 100 100" xmlns="http://www.w3.org/2000/svg">' + CAT_PATHS + '</svg>';
  }

  var selectedPiece = null; // { index, btn }
  var filledCount = 0;

  function buildSlots() {
    puzzleGrid.innerHTML = "";
    for (var i = 0; i < 4; i++) {
      var slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.index = i;
      slot.addEventListener("click", function () { handleSlotClick(this); });
      puzzleGrid.appendChild(slot);
    }
  }

  function buildTray() {
    tray.innerHTML = "";
    var order = [0, 1, 2, 3].sort(function () { return Math.random() - 0.5; });
    order.forEach(function (idx) {
      var btn = document.createElement("button");
      btn.className = "piece-btn";
      btn.dataset.index = idx;
      btn.innerHTML = pieceSvg(idx);
      btn.addEventListener("click", function () { handlePieceClick(this); });
      tray.appendChild(btn);
    });
  }

  function handlePieceClick(btn) {
    if (btn.classList.contains("used")) return;
    Array.prototype.forEach.call(tray.children, function (b) { b.classList.remove("selected"); });
    btn.classList.add("selected");
    selectedPiece = { index: parseInt(btn.dataset.index, 10), btn: btn };
  }

  function handleSlotClick(slot) {
    if (slot.classList.contains("filled")) return;
    if (!selectedPiece) return;

    var slotIndex = parseInt(slot.dataset.index, 10);
    if (slotIndex === selectedPiece.index) {
      slot.innerHTML = pieceSvg(slotIndex);
      slot.classList.add("filled");
      selectedPiece.btn.classList.add("used");
      selectedPiece = null;
      filledCount++;
      feedbackEl.innerHTML = "";
      if (filledCount === 4) {
        setTimeout(onComplete, 300);
      }
    } else {
      slot.classList.add("wrong-shake");
      setTimeout(function () { slot.classList.remove("wrong-shake"); }, 400);
      playWrongBuzzer();
    }
  }

  function onComplete() {
    stars = Math.min(5, stars + 1);
    renderStars(starsEl, stars);
    speak(WORD);
    setTimeout(function () {
      renderStars(starsDoneEl, stars);
      showPhase(app, "done");
      spawnConfetti(confettiEl);
      playCelebrationChime();
    }, 500);
  }

  document.getElementById("listenBtn").addEventListener("click", function () {
    speak(WORD);
  });

  document.getElementById("restartBtn").addEventListener("click", function () {
    filledCount = 0;
    selectedPiece = null;
    buildSlots();
    buildTray();
    showPhase(app, "puzzle");
  });

  buildSlots();
  buildTray();
  setTimeout(function () { speak(WORD); }, 500);
})();
