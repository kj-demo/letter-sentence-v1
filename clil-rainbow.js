(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var passageEl = document.getElementById("passage");
  var roygbivHint = document.getElementById("roygbivHint");
  var builtRow = document.getElementById("builtRow");
  var builtPlaceholder = document.getElementById("builtPlaceholder");
  var colorTray = document.getElementById("colorTray");
  var feedbackEl = document.getElementById("feedback");

  var stars = 0;

  var SENTENCES = [
    { text: "A rainbow appears when sunlight passes through raindrops in the sky." },
    { text: "Each raindrop acts like a tiny prism, bending the light into many colors." },
    { text: "A rainbow always shows seven colors in the same order." },
    { text: "We remember them with a special word: ROYGBIV.",
      speech: "We remember them with a special word: Roy-jee-biv." },
    { text: "That means red, orange, yellow, green, blue, indigo, and violet." },
    { text: "Red sits on the outside, and violet sits on the inside." },
    { text: "Next time it rains, try to find all seven colors in the sky!" }
  ];

  var COLORS = [
    { name: "Red", letter: "R", speakLetter: "are", hex: "#E63946", text: "#FFFFFF" },
    { name: "Orange", letter: "O", speakLetter: "oh", hex: "#F3722C", text: "#FFFFFF" },
    { name: "Yellow", letter: "Y", speakLetter: "why", hex: "#F9C74F", text: "#5C4A00" },
    { name: "Green", letter: "G", speakLetter: "jee", hex: "#6A994E", text: "#FFFFFF" },
    { name: "Blue", letter: "B", speakLetter: "bee", hex: "#277DA1", text: "#FFFFFF" },
    { name: "Indigo", letter: "I", speakLetter: "eye", hex: "#4B3F72", text: "#FFFFFF" },
    { name: "Violet", letter: "V", speakLetter: "vee", hex: "#9B5DE5", text: "#FFFFFF" }
  ];

  // ---- 音読パート ----
  function buildPassage() {
    passageEl.innerHTML = "";
    SENTENCES.forEach(function (s, i) {
      var span = document.createElement("span");
      span.className = "sentence";
      span.dataset.idx = i;
      span.textContent = s.text + " ";
      span.addEventListener("click", function () {
        highlightSentence(i);
        speak(s.speech || s.text, 0.9);
      });
      passageEl.appendChild(span);
    });
  }

  function highlightSentence(i) {
    var spans = passageEl.querySelectorAll(".sentence");
    spans.forEach(function (el) { el.classList.remove("active"); });
    if (i !== null) spans[i].classList.add("active");
  }

  function playAllSentences(i) {
    i = i || 0;
    if (i >= SENTENCES.length) { highlightSentence(null); return; }
    highlightSentence(i);
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(SENTENCES[i].speech || SENTENCES[i].text);
      u.rate = 0.9;
      u.lang = "en-US";
      u.onend = function () { playAllSentences(i + 1); };
      u.onerror = function () { playAllSentences(i + 1); };
      window.speechSynthesis.speak(u);
    } catch (e) {
      playAllSentences(i + 1);
    }
  }

  document.getElementById("playAllBtn").addEventListener("click", function () {
    playAllSentences(0);
  });

  function buildHint() {
    roygbivHint.innerHTML = "";
    COLORS.forEach(function (c) {
      var chip = document.createElement("div");
      chip.className = "roygbiv-chip";
      chip.style.background = c.hex;
      chip.style.color = c.text;
      chip.style.cursor = "pointer";
      chip.textContent = c.letter;
      // 表示は文字（例：G）のまま、読み上げだけ speakLetter（例：gee）を使う
      chip.addEventListener("click", function () {
        highlightHintChip(chip);
        speak(c.speakLetter, 0.8);
      });
      roygbivHint.appendChild(chip);
    });
  }

  function highlightHintChip(chip) {
    var chips = roygbivHint.querySelectorAll(".roygbiv-chip");
    chips.forEach(function (el) { el.style.outline = "none"; });
    chip.style.outline = "3px solid #22333B";
  }

  function playRoygbivAll() {
    var chips = roygbivHint.querySelectorAll(".roygbiv-chip");
    chips.forEach(function (el) { el.style.outline = "3px solid #22333B"; });
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance("Roy-jee-biv");
      u.rate = 0.85;
      u.lang = "en-US";
      var clear = function () { chips.forEach(function (el) { el.style.outline = "none"; }); };
      u.onend = clear;
      u.onerror = clear;
      window.speechSynthesis.speak(u);
    } catch (e) {
      chips.forEach(function (el) { el.style.outline = "none"; });
    }
  }

  document.getElementById("playRoygbivBtn").addEventListener("click", function () {
    playRoygbivAll();
  });

  document.getElementById("toQuizBtn").addEventListener("click", function () {
    buildQuiz();
    showPhase(app, "quiz");
  });

  // ---- クイズパート（ROYGBIVの順にタップ） ----
  var built = [];
  var done = false;
  var scrambled = [];

  function buildQuiz() {
    built = [];
    done = false;
    scrambled = COLORS.slice().sort(function () { return Math.random() - 0.5; });
    renderBuilt();
    renderTray();
    feedbackEl.innerHTML = "";
  }

  function renderBuilt() {
    builtRow.innerHTML = "";
    if (built.length === 0) {
      builtRow.appendChild(builtPlaceholder);
      return;
    }
    built.forEach(function (c) {
      var span = document.createElement("span");
      span.className = "color-built";
      span.style.background = c.hex;
      span.style.color = c.text;
      span.textContent = c.letter;
      builtRow.appendChild(span);
    });
  }

  function renderTray() {
    colorTray.innerHTML = "";
    scrambled.forEach(function (c) {
      var btn = document.createElement("button");
      btn.className = "color-btn";
      btn.style.background = c.hex;
      btn.style.color = c.text;
      btn.textContent = c.name;
      btn.dataset.name = c.name;
      btn.addEventListener("click", function () { handleTap(c, btn); });
      colorTray.appendChild(btn);
    });
  }

  function nextExpected() {
    return COLORS[built.length];
  }

  function handleTap(color, btn) {
    if (done) return;
    var expected = nextExpected();
    if (color.name === expected.name) {
      built.push(color);
      btn.remove();
      renderBuilt();
      feedbackEl.innerHTML = "";
      if (built.length === COLORS.length) {
        done = true;
        stars = Math.min(5, stars + 1);
        renderStars(starsEl, stars);
        speak("Red, orange, yellow, green, blue, indigo, violet!", 1);
        feedbackEl.innerHTML = '<div class="feedback-row feedback-correct">✔ Great job! ROYGBIV!</div>';
        var nextBtn = document.createElement("button");
        nextBtn.id = "nextBtn";
        nextBtn.className = "btn-primary";
        nextBtn.textContent = "次へ進む";
        nextBtn.style.marginTop = "10px";
        nextBtn.addEventListener("click", function () {
          renderStars(starsDoneEl, stars);
          showPhase(app, "done");
          spawnConfetti(confettiEl);
          playCelebrationChime();
        });
        feedbackEl.appendChild(nextBtn);
      }
    } else {
      btn.classList.add("shake");
      setTimeout(function () { btn.classList.remove("shake"); }, 400);
      playWrongBuzzer();
      feedbackEl.innerHTML = '<div class="feedback-row feedback-wrong">✕ Try again!</div>';

      var prevHTML = builtRow.innerHTML;
      var hintRow = document.createElement("div");
      hintRow.style.cssText = "display:flex; gap:4px; justify-content:center; flex-wrap:wrap;";
      COLORS.forEach(function (c) {
        var chip = document.createElement("span");
        chip.className = "color-built";
        chip.style.background = c.hex;
        chip.style.color = c.text;
        chip.style.opacity = "0.5";
        chip.textContent = c.letter;
        hintRow.appendChild(chip);
      });
      builtRow.innerHTML = "";
      builtRow.appendChild(hintRow);
      setTimeout(function () {
        builtRow.innerHTML = prevHTML;
      }, 1400);
    }
  }

  document.getElementById("restartBtn").addEventListener("click", function () {
    showPhase(app, "reading");
  });

  buildPassage();
  buildHint();
})();
