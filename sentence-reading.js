(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var wordRowEl = document.getElementById("wordRow");
  var builtRowEl = document.getElementById("builtRow");
  var builtPlaceholderEl = document.getElementById("builtPlaceholder");
  var scrambledRowEl = document.getElementById("scrambledRow");
  var feedbackEl = document.getElementById("feedback");
  var quizActionsEl = document.getElementById("quizActions");

  var SENTENCE = ["The", "shop", "sells", "fresh", "fish", "from", "the", "ship", "."];
  var SPEAKABLE = SENTENCE.filter(function (w) { return w !== "."; });

  var stars = 0;
  var built = [];
  var done = false;
  var scrambled = SPEAKABLE.slice().sort(function () { return Math.random() - 0.5; });

  renderStars(starsEl, stars);

  // ---- レッスンフェーズ：タップで単語を読む ----
  SENTENCE.forEach(function (word) {
    if (word === ".") {
      var dot = document.createElement("span");
      dot.textContent = ".";
      dot.style.cssText = "font-family:'Baloo 2',sans-serif; font-size:28px; color:#22333B; align-self:flex-end;";
      wordRowEl.appendChild(dot);
      return;
    }
    var btn = document.createElement("button");
    btn.textContent = word;
    btn.style.cssText =
      "background:white; border:2px solid #06AED5; border-radius:14px; padding:8px 14px;" +
      "font-family:'Baloo 2',sans-serif; font-weight:700; font-size:20px; color:#22333B; cursor:pointer;";
    btn.addEventListener("click", function () {
      btn.style.background = "#FFC43D";
      playSound(word, word);
      setTimeout(function () { btn.style.background = "white"; }, 400);
    });
    wordRowEl.appendChild(btn);
  });

  document.getElementById("playAllBtn").addEventListener("click", function () {
    var buttons = Array.prototype.filter.call(wordRowEl.children, function (el) { return el.tagName === "BUTTON"; });
    var text = SPEAKABLE.join(" ");

    // 各単語の文字位置（開始・終了）を事前計算し、読み上げ位置と単語ボタンを対応付ける
    var offsets = [];
    var pos = 0;
    SPEAKABLE.forEach(function (w) {
      offsets.push({ start: pos, end: pos + w.length });
      pos += w.length + 1; // 半角スペース分
    });

    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 0.72; // ゆっくりめ
      u.lang = "en-US";
      var lastBtn = null;

      u.onboundary = function (e) {
        if (e.name && e.name !== "word") return;
        var idx = -1;
        for (var i = 0; i < offsets.length; i++) {
          if (e.charIndex >= offsets[i].start && e.charIndex < offsets[i].end + 1) { idx = i; break; }
        }
        if (idx === -1) return;
        if (lastBtn) lastBtn.style.background = "white";
        lastBtn = buttons[idx];
        if (lastBtn) lastBtn.style.background = "#FFC43D";
      };
      u.onend = function () {
        if (lastBtn) lastBtn.style.background = "white";
      };
      window.speechSynthesis.speak(u);
    } catch (e) {
      /* no-op */
    }
  });

  document.getElementById("toQuizBtn").addEventListener("click", function () {
    buildScrambledOptions();
    showPhase(app, "quiz");
  });

  // ---- クイズフェーズ：語順並べ替え ----
  function buildScrambledOptions() {
    scrambledRowEl.innerHTML = "";
    scrambled.forEach(function (word, key) {
      var btn = document.createElement("button");
      btn.textContent = word;
      btn.dataset.word = word;
      btn.dataset.key = key;
      btn.style.cssText =
        "background:#FF6B6B; color:white; border:none; border-radius:14px; padding:10px 16px;" +
        "font-family:'Baloo 2',sans-serif; font-weight:700; font-size:18px; cursor:pointer;";
      btn.addEventListener("click", function () { handleTapWord(word, btn); });
      scrambledRowEl.appendChild(btn);
    });
  }

  function nextExpected() {
    return SPEAKABLE[built.length];
  }

  function handleTapWord(word, btn) {
    if (done) return;
    if (word === nextExpected()) {
      built.push(word);
      btn.disabled = true;
      btn.style.opacity = "0.5";
      renderBuilt();
      feedbackEl.innerHTML = "";
      if (built.length === SPEAKABLE.length) {
        done = true;
        stars = Math.min(5, stars + 1);
        renderStars(starsEl, stars);
        speak(SPEAKABLE.join(" "));
        var dot = document.createElement("span");
        dot.textContent = ".";
        dot.style.cssText = "font-family:'Baloo 2',sans-serif; font-size:18px;";
        builtRowEl.appendChild(dot);
        feedbackEl.innerHTML =
          '<div class="feedback-row feedback-correct">✔ Great job! 正しく読めました</div>';
        quizActionsEl.innerHTML = '<button id="nextBtn" class="btn-primary">次へ進む</button>';
        document.getElementById("nextBtn").addEventListener("click", function () {
          renderStars(starsDoneEl, stars);
          showPhase(app, "done");
          spawnConfetti(confettiEl);
          playCelebrationChime();
          setTimeout(function () { speak("次もがんばろう", 1, "ja-JP"); }, 550);
        });
      }
    } else {
      btn.classList.add("shake");
      setTimeout(function () { btn.classList.remove("shake"); }, 400);
      playWrongBuzzer();
      feedbackEl.innerHTML = '<div class="feedback-row feedback-wrong">✕ Try again!</div>';

      // 正しい文を一瞬ヒントとして表示してから、今までの進捗表示に戻す
      var prevHTML = builtRowEl.innerHTML;
      var hintEl = document.createElement("div");
      hintEl.style.cssText =
        "width:100%; font-family:'Nunito',sans-serif; font-style:italic; color:#B7AE9A; font-size:14px;";
      hintEl.textContent = SENTENCE.join(" ").replace(" .", ".");
      builtRowEl.innerHTML = "";
      builtRowEl.appendChild(hintEl);
      setTimeout(function () {
        builtRowEl.innerHTML = prevHTML;
      }, 1400);
    }
  }

  function renderBuilt() {
    if (built.length > 0 && builtPlaceholderEl.parentNode) {
      builtPlaceholderEl.remove();
    }
    builtRowEl.innerHTML = "";
    built.forEach(function (w) {
      var span = document.createElement("span");
      span.textContent = w;
      span.style.cssText = "font-family:'Baloo 2',sans-serif; font-weight:700; font-size:18px; color:#22333B;";
      builtRowEl.appendChild(span);
    });
  }

  document.getElementById("restartBtn").addEventListener("click", function () {
    built = [];
    done = false;
    scrambled = SPEAKABLE.slice().sort(function () { return Math.random() - 0.5; });
    builtRowEl.innerHTML = "";
    var ph = document.createElement("span");
    ph.id = "builtPlaceholder";
    ph.textContent = "ここに単語が並びます";
    ph.style.cssText = "font-family:'Nunito',sans-serif; color:#B7AE9A; font-size:13px;";
    builtRowEl.appendChild(ph);
    feedbackEl.innerHTML = "";
    quizActionsEl.innerHTML = "";
    showPhase(app, "lesson");
  });
})();
