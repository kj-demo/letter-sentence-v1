(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var grid = document.getElementById("animalGrid");

  var TARGET = "mom";
  var stars = 0;
  var answered = false;

  var ANIMALS = {
    dad: '<path d="M55 200 Q100 175 145 200 L150 210 L50 210 Z" fill="#3B6EA5"/> <ellipse cx="100" cy="150" rx="55" ry="50" fill="#3B6EA5"/> <circle cx="100" cy="88" r="40" fill="#FFD9B3"/> <path d="M60 78 Q100 40 140 78 L140 65 Q100 50 60 65 Z" fill="#5A3A22"/> <path d="M62 70 Q60 60 68 55" stroke="#5A3A22" stroke-width="8" fill="none" stroke-linecap="round"/> <path d="M138 70 Q140 60 132 55" stroke="#5A3A22" stroke-width="8" fill="none" stroke-linecap="round"/> <circle cx="86" cy="90" r="5" fill="#2E2320"/> <circle cx="114" cy="90" r="5" fill="#2E2320"/> <path d="M86 106 Q93 110 100 106 Q107 110 114 106" stroke="#3A2A1E" stroke-width="5" fill="none" stroke-linecap="round"/> <path d="M90 120 Q100 126 110 120" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    mom: '<path d="M55 200 Q100 175 145 200 L150 210 L50 210 Z" fill="#E4587A"/> <ellipse cx="100" cy="150" rx="55" ry="50" fill="#E4587A"/> <path d="M55 100 Q50 160 65 190 L80 185 Q68 140 70 95 Z" fill="#3A2A1E"/> <path d="M145 100 Q150 160 135 190 L120 185 Q132 140 130 95 Z" fill="#3A2A1E"/> <circle cx="100" cy="88" r="40" fill="#FFD9B3"/> <path d="M58 85 Q100 42 142 85 Q142 60 100 55 Q58 60 58 85 Z" fill="#3A2A1E"/> <circle cx="86" cy="90" r="5" fill="#2E2320"/> <circle cx="114" cy="90" r="5" fill="#2E2320"/> <path d="M90 110 Q100 116 110 110" stroke="#2E2320" stroke-width="3" fill="none" stroke-linecap="round"/> <path d="M70 82 Q78 76 86 80" stroke="#B5773F" stroke-width="2.5" fill="none" stroke-linecap="round"/> <path d="M130 82 Q122 76 114 80" stroke="#B5773F" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    brother: '<path d="M60 185 Q100 165 140 185 L143 195 L57 195 Z" fill="#5FA777"/> <ellipse cx="100" cy="145" rx="46" ry="40" fill="#5FA777"/> <circle cx="100" cy="90" r="38" fill="#FFD9B3"/> <path d="M64 82 Q100 48 136 82 Q138 65 100 58 Q62 65 64 82 Z" fill="#7A4A28"/> <path d="M64 78 L58 68 M76 68 L72 58 M124 68 L128 58 M136 78 L142 68" stroke="#7A4A28" stroke-width="5" fill="none" stroke-linecap="round"/> <circle cx="87" cy="92" r="6" fill="#2E2320"/> <circle cx="113" cy="92" r="6" fill="#2E2320"/> <path d="M88 110 Q100 118 112 110" stroke="#2E2320" stroke-width="3" fill="none" stroke-linecap="round"/>',
    sister: '<path d="M60 185 Q100 165 140 185 L143 195 L57 195 Z" fill="#FFC43D"/> <ellipse cx="100" cy="145" rx="46" ry="40" fill="#FFC43D"/> <ellipse cx="52" cy="96" rx="14" ry="20" fill="#4A2E1E" transform="rotate(-20 52 96)"/> <ellipse cx="148" cy="96" rx="14" ry="20" fill="#4A2E1E" transform="rotate(20 148 96)"/> <circle cx="52" cy="82" r="7" fill="#FF6B6B"/> <circle cx="148" cy="82" r="7" fill="#FF6B6B"/> <circle cx="100" cy="90" r="38" fill="#FFD9B3"/> <path d="M64 84 Q100 50 136 84 Q138 66 100 60 Q62 66 64 84 Z" fill="#4A2E1E"/> <circle cx="87" cy="92" r="6" fill="#2E2320"/> <circle cx="113" cy="92" r="6" fill="#2E2320"/> <path d="M88 110 Q100 118 112 110" stroke="#2E2320" stroke-width="3" fill="none" stroke-linecap="round"/>',
    baby: '<ellipse cx="100" cy="140" rx="42" ry="34" fill="#FDE9B0"/> <circle cx="100" cy="88" r="42" fill="#FFDFC0"/> <path d="M92 52 Q100 44 108 52" stroke="#C9A876" stroke-width="6" fill="none" stroke-linecap="round"/> <circle cx="86" cy="92" r="5.5" fill="#2E2320"/> <circle cx="114" cy="92" r="5.5" fill="#2E2320"/> <circle cx="74" cy="100" r="8" fill="#FFC1B3" opacity="0.6"/> <circle cx="126" cy="100" r="8" fill="#FFC1B3" opacity="0.6"/> <circle cx="100" cy="112" r="9" fill="#FFFFFF" stroke="#E2DCCB" stroke-width="1.5"/> <circle cx="100" cy="112" r="4" fill="#DDBFA0"/>',
    grandpa: '<path d="M55 200 Q100 175 145 200 L150 210 L50 210 Z" fill="#8B6A4F"/> <ellipse cx="100" cy="150" rx="55" ry="50" fill="#8B6A4F"/> <circle cx="100" cy="88" r="40" fill="#FFD9B3"/> <path d="M60 88 Q56 65 66 58 Q60 75 64 92 Z" fill="#E8E8E8"/> <path d="M140 88 Q144 65 134 58 Q140 75 136 92 Z" fill="#E8E8E8"/> <ellipse cx="87" cy="90" rx="9" ry="6" fill="none" stroke="#5C5C5C" stroke-width="2.5"/> <ellipse cx="113" cy="90" rx="9" ry="6" fill="none" stroke="#5C5C5C" stroke-width="2.5"/> <line x1="96" y1="90" x2="104" y2="90" stroke="#5C5C5C" stroke-width="2.5"/> <circle cx="87" cy="90" r="3" fill="#2E2320"/> <circle cx="113" cy="90" r="3" fill="#2E2320"/> <path d="M85 106 Q93 110 100 106 Q107 110 115 106" stroke="#E8E8E8" stroke-width="5" fill="none" stroke-linecap="round"/> <path d="M90 120 Q100 125 110 120" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    grandma: '<path d="M55 200 Q100 175 145 200 L150 210 L50 210 Z" fill="#9B7FB8"/> <ellipse cx="100" cy="150" rx="55" ry="50" fill="#9B7FB8"/> <circle cx="100" cy="88" r="40" fill="#FFD9B3"/> <path d="M58 88 Q54 50 100 48 Q146 50 142 88 Q146 70 140 60 Q100 38 60 60 Q54 70 58 88 Z" fill="#E8E8E8"/> <circle cx="100" cy="46" r="14" fill="#E8E8E8"/> <ellipse cx="87" cy="92" rx="9" ry="6" fill="none" stroke="#5C5C5C" stroke-width="2.5"/> <ellipse cx="113" cy="92" rx="9" ry="6" fill="none" stroke="#5C5C5C" stroke-width="2.5"/> <line x1="96" y1="92" x2="104" y2="92" stroke="#5C5C5C" stroke-width="2.5"/> <circle cx="87" cy="92" r="3" fill="#2E2320"/> <circle cx="113" cy="92" r="3" fill="#2E2320"/> <path d="M90 112 Q100 118 110 112" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/> <circle cx="72" cy="108" r="4" fill="#E4587A"/> <circle cx="128" cy="108" r="4" fill="#E4587A"/>',
  };

  function animalSvg(name) {
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' + ANIMALS[name] + '</svg>';
  }

  // 英語の発音を1件ずつ確実に再生するためのシンプルなキュー
  function speakOne(text, onDone, rate) {
    try {
      if (!window.speechSynthesis) { if (onDone) onDone(); return; }
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.rate = rate || 0.85;
      u.lang = "en-US";
      u.onend = function () { if (onDone) onDone(); };
      u.onerror = function () { if (onDone) onDone(); };
      window.speechSynthesis.speak(u);
    } catch (e) {
      if (onDone) onDone();
    }
  }

  function buildGrid() {
    grid.innerHTML = "";
    var others = Object.keys(ANIMALS).filter(function (n) { return n !== TARGET; });
    others.sort(function () { return Math.random() - 0.5; });
    var distractors = others.slice(0, 3);
    var names = [TARGET].concat(distractors).sort(function () { return Math.random() - 0.5; });
    names.forEach(function (name) {
      var btn = document.createElement("button");
      btn.className = "animal-btn";
      btn.dataset.name = name;
      btn.innerHTML = animalSvg(name);
      btn.addEventListener("click", function () { handleChoice(name, btn); });
      grid.appendChild(btn);
    });
  }

  function handleChoice(name, btn) {
    if (answered) return;

    if (name === TARGET) {
      answered = true;
      btn.classList.add("correct-flash");
      stars = Math.min(5, stars + 1);
      renderStars(starsEl, stars);
      speakOne(TARGET, function () {
        setTimeout(function () {
          renderStars(starsDoneEl, stars);
          showPhase(app, "done");
          spawnConfetti(confettiEl);
          playCelebrationChime();
        }, 300);
      });
    } else {
      btn.classList.add("wrong-shake");
      setTimeout(function () { btn.classList.remove("wrong-shake"); }, 400);
      // 間違えた動物の名前を読み上げてから、ブザー音、そして "Try again" の音声
      // その直後に組み合わせ・配置をシャッフルし直す（消去法で当てられないようにする）
      speakOne(name, function () {
        playWrongBuzzer();
        setTimeout(function () {
          speakOne("Try again", function () {
            buildGrid();
          }, 0.9);
        }, 450);
      });
    }
  }

  document.getElementById("listenBtn").addEventListener("click", function () {
    speakOne(TARGET);
  });

  document.getElementById("restartBtn").addEventListener("click", function () {
    answered = false;
    buildGrid();
    showPhase(app, "quiz");
  });

  buildGrid();
  setTimeout(function () { speakOne(TARGET); }, 500);
})();
