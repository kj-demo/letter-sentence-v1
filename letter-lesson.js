(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var optionsEl = document.getElementById("options");
  var feedbackEl = document.getElementById("feedback");
  var quizActionsEl = document.getElementById("quizActions");

  var TARGET = { char: "A", sound: "a", word: "Apple" };
  var DISTRACTORS = ["B", "S"];
  var COLORS = { A: "#FF6B6B", B: "#06AED5", S: "#FFC43D" };

  var stars = 0;
  var answered = false;

  renderStars(starsEl, stars);

  // ---- レッスンフェーズ ----
  document.getElementById("letterBtn").addEventListener("click", function (e) {
    e.currentTarget.classList.add("bounce");
    speak(TARGET.sound);
    setTimeout(function () {
      e.currentTarget.classList.remove("bounce");
    }, 500);
  });

  document.getElementById("wordBtn").addEventListener("click", function () {
    speak(TARGET.word);
  });

  document.getElementById("toQuizBtn").addEventListener("click", function () {
    buildQuizOptions();
    showPhase(app, "quiz");
  });

  // ---- クイズフェーズ ----
  function buildQuizOptions() {
    var all = [TARGET.char].concat(DISTRACTORS);
    all.sort(function () { return Math.random() - 0.5; });
    optionsEl.innerHTML = "";
    all.forEach(function (ch) {
      var btn = document.createElement("button");
      btn.textContent = ch;
      btn.dataset.char = ch;
      btn.style.cssText =
        "width:84px;height:84px;border-radius:24px;border:none;color:white;" +
        "font-family:'Baloo 2',sans-serif;font-weight:800;font-size:40px;cursor:pointer;" +
        "box-shadow:0 6px 0 rgba(0,0,0,0.12);background:" + COLORS[ch] + ";";
      btn.addEventListener("click", function () { handleChoice(ch, btn); });
      optionsEl.appendChild(btn);
    });
    answered = false;
    feedbackEl.innerHTML = "";
    quizActionsEl.innerHTML = "";
  }

  document.getElementById("replaySoundBtn").addEventListener("click", function () {
    speak(TARGET.sound);
  });

  function handleChoice(ch, btn) {
    if (answered) return;
    answered = true;

    Array.prototype.forEach.call(optionsEl.children, function (b) {
      var isCorrect = b.dataset.char === TARGET.char;
      if (!isCorrect) b.style.opacity = "0.55";
      if (isCorrect) b.style.transform = "scale(1.06)";
    });

    if (ch === TARGET.char) {
      stars = Math.min(5, stars + 1);
      renderStars(starsEl, stars);
      speak("Great job!");
      feedbackEl.innerHTML =
        '<div class="feedback-row feedback-correct">✔ Great job! よくできました</div>';
      quizActionsEl.innerHTML =
        '<button id="nextBtn" class="btn-primary">次へ進む</button>';
      document.getElementById("nextBtn").addEventListener("click", function () {
        renderStars(starsDoneEl, stars);
        showPhase(app, "done");
        spawnConfetti(confettiEl);
        playCelebrationChime();
        setTimeout(function () { speak("よくできたね", 1, "ja-JP"); }, 550);
      });
    } else {
      btn.classList.add("shake");
      speak("Try again!");
      feedbackEl.innerHTML =
        '<div class="feedback-row feedback-wrong">✕ おしい！もう一度</div>';
      quizActionsEl.innerHTML =
        '<button id="retryBtn" class="btn-outline-coral">↺ もう一度挑戦</button>';
      document.getElementById("retryBtn").addEventListener("click", function () {
        buildQuizOptions();
      });
    }
  }

  // ---- 完了フェーズ ----
  document.getElementById("restartBtn").addEventListener("click", function () {
    showPhase(app, "lesson");
  });
})();
