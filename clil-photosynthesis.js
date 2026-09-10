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

  // 日本語↔英語クイズ用の対訳データ（enChunks/jpChunksは並べ替え用の単語のまとまり）
  var SENTENCE_PAIRS = [
    {
      en: "Plants make their own food through a process called photosynthesis.",
      jp: "植物は光合成と呼ばれるプロセスによって自分で栄養を作ります。",
      enChunks: ["Plants", "make", "their own food", "through a process", "called", "photosynthesis."],
      jpChunks: ["植物は", "光合成と呼ばれる", "プロセスによって", "自分で", "栄養を", "作ります。"]
    },
    {
      en: "This happens mostly in the leaves, where a green substance called chlorophyll captures sunlight.",
      jp: "これは主に葉の中で起こり、そこでは葉緑素という緑色の物質が太陽の光を取り込みます。",
      enChunks: ["This happens mostly", "in the leaves,", "where a green substance", "called chlorophyll", "captures", "sunlight."],
      jpChunks: ["これは主に", "葉の中で起こり、", "そこでは葉緑素という", "緑色の物質が", "太陽の光を", "取り込みます。"]
    },
    {
      en: "Plants also take in carbon dioxide from the air through tiny holes in their leaves.",
      jp: "植物はまた、葉にある小さな穴から空気中の二酸化炭素を取り込みます。",
      enChunks: ["Plants", "also take in", "carbon dioxide", "from the air", "through tiny holes", "in their leaves."],
      jpChunks: ["植物はまた、", "葉にある", "小さな穴から", "空気中の", "二酸化炭素を", "取り込みます。"]
    },
    {
      en: "Their roots absorb water from the soil and carry it up through the stem.",
      jp: "根は土から水を吸収し、茎を通して運び上げます。",
      enChunks: ["Their roots", "absorb water", "from the soil", "and carry it", "up", "through the stem."],
      jpChunks: ["根は", "土から", "水を", "吸収し、", "茎を通して", "運び上げます。"]
    },
    {
      en: "This reaction produces glucose, a kind of sugar that gives the plant energy to grow.",
      jp: "この反応によってグルコースという糖が作られ、植物が育つためのエネルギーになります。",
      enChunks: ["This reaction", "produces glucose,", "a kind of sugar", "that gives the plant", "energy", "to grow."],
      jpChunks: ["この反応によって", "グルコースという", "糖が作られ、", "植物が育つ", "ための", "エネルギーになります。"]
    },
    {
      en: "As a result, plants also release oxygen into the air.",
      jp: "その結果、植物は酸素も空気中に放出します。",
      enChunks: ["As a result,", "plants", "also release", "oxygen", "into the air."],
      jpChunks: ["その結果、", "植物は", "酸素も", "空気中に", "放出します。"]
    },
    {
      en: "That oxygen is what humans and animals breathe every day.",
      jp: "その酸素こそ、人間や動物が毎日呼吸しているものです。",
      enChunks: ["That oxygen", "is what", "humans and animals", "breathe", "every day."],
      jpChunks: ["その酸素こそ、", "人間や動物が", "毎日", "呼吸している", "ものです。"]
    }
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
    buildWordOrderQuiz("jp2en");
    showPhase(app, "jp2en");
  });

  // ---- 日本語→英語／英語→日本語の並べ替えクイズ ----
  var wordOrderState = {}; // direction別に built/scrambled/pair を保持

  function buildWordOrderQuiz(direction) {
    var pair = SENTENCE_PAIRS[Math.floor(Math.random() * SENTENCE_PAIRS.length)];
    var chunks = direction === "jp2en" ? pair.enChunks : pair.jpChunks;

    wordOrderState[direction] = {
      pair: pair,
      chunks: chunks,
      built: [],
      done: false
    };

    document.getElementById(direction === "jp2en" ? "jp2enPrompt" : "en2jpPrompt").textContent =
      direction === "jp2en" ? pair.jp : pair.en;
    document.getElementById(direction === "jp2en" ? "jp2enFeedback" : "en2jpFeedback").innerHTML = "";

    renderBuilt(direction);
    renderTray(direction);
  }

  function renderBuilt(direction) {
    var st = wordOrderState[direction];
    var builtEl = document.getElementById(direction === "jp2en" ? "jp2enBuilt" : "en2jpBuilt");
    builtEl.innerHTML = "";
    if (st.built.length === 0) {
      var ph = document.createElement("span");
      ph.style.cssText = "font-family:'Nunito',sans-serif; color:#B7AE9A; font-size:13px;";
      ph.textContent = "ここに ことばが ならびます";
      builtEl.appendChild(ph);
      return;
    }
    st.built.forEach(function (w) {
      var span = document.createElement("span");
      span.style.cssText = "font-family:'Nunito',sans-serif; font-weight:700; font-size:14px; color:#22333B; background:#EAF7F0; border:1px solid #1D9E75; border-radius:8px; padding:4px 8px;";
      span.textContent = w;
      builtEl.appendChild(span);
    });
  }

  function renderTray(direction) {
    var st = wordOrderState[direction];
    var trayEl = document.getElementById(direction === "jp2en" ? "jp2enTray" : "en2jpTray");
    trayEl.innerHTML = "";
    var scrambled = st.chunks.slice().sort(function () { return Math.random() - 0.5; });
    scrambled.forEach(function (chunk) {
      var btn = document.createElement("button");
      btn.textContent = chunk;
      btn.dataset.chunk = chunk;
      btn.style.cssText =
        "padding:10px 14px; border-radius:14px; border:none; color:white; font-family:'Nunito',sans-serif;" +
        "font-weight:700; font-size:14px; cursor:pointer; background:#1D9E75; box-shadow:0 4px 0 rgba(0,0,0,0.12);";
      btn.addEventListener("click", function () { handleWordTap(direction, chunk, btn); });
      trayEl.appendChild(btn);
    });
  }

  function nextExpectedChunk(direction) {
    var st = wordOrderState[direction];
    return st.chunks[st.built.length];
  }

  function handleWordTap(direction, chunk, btn) {
    var st = wordOrderState[direction];
    if (st.done) return;
    var expected = nextExpectedChunk(direction);

    if (chunk === expected) {
      st.built.push(chunk);
      btn.remove();
      renderBuilt(direction);
      document.getElementById(direction === "jp2en" ? "jp2enFeedback" : "en2jpFeedback").innerHTML = "";

      if (st.built.length === st.chunks.length) {
        st.done = true;
        onWordOrderComplete(direction);
      }
    } else {
      btn.classList.add("shake");
      setTimeout(function () { btn.classList.remove("shake"); }, 400);
      playWrongBuzzer();
      var feedbackEl2 = document.getElementById(direction === "jp2en" ? "jp2enFeedback" : "en2jpFeedback");
      feedbackEl2.innerHTML = '<div class="feedback-row feedback-wrong">✕ Try again!</div>';

      // 正しい並びを一瞬ヒント表示してから、今までの進捗表示に戻す
      var builtEl = document.getElementById(direction === "jp2en" ? "jp2enBuilt" : "en2jpBuilt");
      var prevHTML = builtEl.innerHTML;
      var hintEl = document.createElement("div");
      hintEl.style.cssText = "width:100%; font-family:'Nunito',sans-serif; font-style:italic; color:#B7AE9A; font-size:13px;";
      hintEl.textContent = st.chunks.join(" ");
      builtEl.innerHTML = "";
      builtEl.appendChild(hintEl);
      setTimeout(function () {
        builtEl.innerHTML = prevHTML;
      }, 1400);
    }
  }

  function onWordOrderComplete(direction) {
    var st = wordOrderState[direction];
    var feedbackEl2 = document.getElementById(direction === "jp2en" ? "jp2enFeedback" : "en2jpFeedback");
    if (direction === "jp2en") speak(st.pair.en, 0.95);
    feedbackEl2.innerHTML = '<div class="feedback-row feedback-correct">✔ Great job!</div>';
    playCelebrationChime();

    var nextBtn = document.createElement("button");
    nextBtn.className = "btn-primary";
    nextBtn.textContent = "つぎへ →";
    nextBtn.style.marginTop = "10px";
    nextBtn.addEventListener("click", function () {
      if (direction === "jp2en") {
        buildWordOrderQuiz("en2jp");
        showPhase(app, "en2jp");
      } else {
        buildQuiz();
        showPhase(app, "quiz");
      }
    });
    feedbackEl2.appendChild(nextBtn);
  }

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
