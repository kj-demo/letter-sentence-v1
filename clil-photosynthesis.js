(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var passageEl = document.getElementById("passage");
  var optionsEl = document.getElementById("options");
  var feedbackEl = document.getElementById("feedback");
  var quizActionsEl = document.getElementById("quizActions");

  var stars = 0;
  var answered = false;

  var SENTENCES = [
    "Plants make their own food through a process called photosynthesis.",
    "This happens mostly in the leaves, where a green substance called chlorophyll captures sunlight.",
    "Plants also take in carbon dioxide from the air through tiny holes in their leaves.",
    "Their roots absorb water from the soil and carry it up through the stem.",
    "Inside the leaf, sunlight, carbon dioxide, and water combine in a chemical reaction.",
    "This reaction produces glucose, a kind of sugar that gives the plant energy to grow.",
    "As a result, plants also release oxygen into the air.",
    "That oxygen is what humans and animals breathe every day.",
    "Without photosynthesis, there would be no oxygen for us to breathe.",
    "The next time you see a green leaf, remember that it is quietly making food and air for the world."
  ];

  var OPTIONS = [
    { label: "Oxygen", correct: true, color: "#1D9E75" },
    { label: "Nitrogen", correct: false, color: "#06AED5" },
    { label: "Carbon dioxide", correct: false, color: "#FF6B6B" }
  ];

  function buildPassage() {
    passageEl.innerHTML = "";
    SENTENCES.forEach(function (s, i) {
      var span = document.createElement("span");
      span.className = "sentence";
      span.dataset.idx = i;
      span.textContent = s + " ";
      span.addEventListener("click", function () {
        highlightSentence(i);
        speak(s, 0.92);
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
      var u = new SpeechSynthesisUtterance(SENTENCES[i]);
      u.rate = 0.92;
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

  document.getElementById("toQuizBtn").addEventListener("click", function () {
    buildQuiz();
    showPhase(app, "quiz");
  });

  function buildQuiz() {
    answered = false;
    feedbackEl.innerHTML = "";
    quizActionsEl.innerHTML = "";
    var shuffled = OPTIONS.slice().sort(function () { return Math.random() - 0.5; });
    optionsEl.innerHTML = "";
    shuffled.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.textContent = opt.label;
      btn.style.cssText =
        "padding:14px 18px; border-radius:16px; border:none; color:white; font-family:'Baloo 2',sans-serif;" +
        "font-weight:700; font-size:16px; cursor:pointer; background:" + opt.color + "; box-shadow:0 5px 0 rgba(0,0,0,0.12);";
      btn.addEventListener("click", function () { handleChoice(opt, btn); });
      optionsEl.appendChild(btn);
    });
  }

  function handleChoice(opt, btn) {
    if (answered) return;
    answered = true;

    Array.prototype.forEach.call(optionsEl.children, function (b) {
      if (b !== btn) b.style.opacity = "0.5";
    });

    if (opt.correct) {
      stars = Math.min(5, stars + 1);
      renderStars(starsEl, stars);
      speak("That's right! Oxygen!");
      feedbackEl.innerHTML = '<div class="feedback-row feedback-correct">✔ Great job!</div>';
      quizActionsEl.innerHTML = '<button id="nextBtn" class="btn-primary">次へ進む</button>';
      document.getElementById("nextBtn").addEventListener("click", function () {
        renderStars(starsDoneEl, stars);
        showPhase(app, "done");
        spawnConfetti(confettiEl);
        playCelebrationChime();
      });
    } else {
      btn.classList.add("shake");
      playWrongBuzzer();
      speak("Try again!");
      feedbackEl.innerHTML = '<div class="feedback-row feedback-wrong">✕ Try again!</div>';
      quizActionsEl.innerHTML = '<button id="retryBtn" class="btn-outline-coral">↺ もう一度挑戦</button>';
      document.getElementById("retryBtn").addEventListener("click", function () {
        buildQuiz();
      });
    }
  }

  document.getElementById("restartBtn").addEventListener("click", function () {
    showPhase(app, "reading");
  });

  buildPassage();
})();
