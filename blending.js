(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var optionsEl = document.getElementById("options");
  var feedbackEl = document.getElementById("feedback");
  var quizActionsEl = document.getElementById("quizActions");
  var wordDisplayEl = document.getElementById("wordDisplay");

  var TARGET = { onset: "sh", rime: "ip", word: "ship" };
  var DISTRACTOR_ONSETS = ["ch", "st"];
  var COLORS = { sh: "#06AED5", ch: "#FF6B6B", st: "#FFC43D" };

  var stars = 0;
  var answered = false;

  renderStars(starsEl, stars);

  // ---- レッスンフェーズ ----
  document.getElementById("onsetBtn").addEventListener("click", function (e) {
    speak(TARGET.onset);
  });
  document.getElementById("rimeBtn").addEventListener("click", function (e) {
    speak(TARGET.rime);
  });
  document.getElementById("blendBtn").addEventListener("click", function () {
    document.getElementById("onsetBtn").classList.add("bounce");
    document.getElementById("rimeBtn").classList.add("bounce");
    speak(TARGET.word);
    setTimeout(function () {
      document.getElementById("onsetBtn").classList.remove("bounce");
      document.getElementById("rimeBtn").classList.remove("bounce");
    }, 500);
  });

  document.getElementById("toQuizBtn").addEventListener("click", function () {
    buildQuizOptions();
    showPhase(app, "quiz");
  });

  // ---- クイズフェーズ ----
  function buildQuizOptions() {
    var all = [TARGET.onset].concat(DISTRACTOR_ONSETS);
    all.sort(function () { return Math.random() - 0.5; });
    optionsEl.innerHTML = "";
    all.forEach(function (onset) {
      var btn = document.createElement("button");
      btn.textContent = onset;
      btn.dataset.onset = onset;
      btn.style.cssText =
        "width:84px;height:84px;border-radius:24px;border:none;color:white;" +
        "font-family:'Baloo 2',sans-serif;font-weight:800;font-size:30px;cursor:pointer;" +
        "box-shadow:0 6px 0 rgba(0,0,0,0.12);background:" + COLORS[onset] + ";";
      btn.addEventListener("click", function () { handleChoice(onset, btn); });
      optionsEl.appendChild(btn);
    });
    answered = false;
    feedbackEl.innerHTML = "";
    quizActionsEl.innerHTML = "";
    wordDisplayEl.innerHTML = '＿ ＿<span style="color:#22333B;">' + TARGET.rime + "</span>";
  }

  function handleChoice(onset, btn) {
    if (answered) return;
    answered = true;

    Array.prototype.forEach.call(optionsEl.children, function (b) {
      var isCorrect = b.dataset.onset === TARGET.onset;
      if (!isCorrect) b.style.opacity = "0.55";
      if (isCorrect) b.style.transform = "scale(1.06)";
    });

    if (onset === TARGET.onset) {
      stars = Math.min(5, stars + 1);
      renderStars(starsEl, stars);
      speak(TARGET.word);
      wordDisplayEl.innerHTML =
        '<span style="color:#22333B;">' + TARGET.onset + TARGET.rime + "</span>";
      feedbackEl.innerHTML =
        '<div class="feedback-row feedback-correct">✔ Great job! よくできました</div>';
      quizActionsEl.innerHTML = '<button id="nextBtn" class="btn-primary">次へ進む</button>';
      document.getElementById("nextBtn").addEventListener("click", function () {
        renderStars(starsDoneEl, stars);
        showPhase(app, "done");
        spawnConfetti(confettiEl);
        playCelebrationChime();
        setTimeout(function () { speak("やったー", 1, "ja-JP"); }, 550);
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
