(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");

  var stars = 0;

  var ANIMALS = {
    cat: { word: 'CAT', svg: '<path d="M60 60 L75 25 L95 65 Z" fill="#F2A65A"/><path d="M140 60 L125 25 L105 65 Z" fill="#F2A65A"/><path d="M68 55 L76 38 L86 60 Z" fill="#FADCC2"/><path d="M132 55 L124 38 L114 60 Z" fill="#FADCC2"/><circle cx="100" cy="95" r="48" fill="#F2A65A"/><ellipse cx="100" cy="150" rx="48" ry="40" fill="#F2A65A"/><path d="M60 82 Q66 78 72 82" stroke="#D98A3D" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M128 82 Q134 78 140 82" stroke="#D98A3D" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="80" cy="90" rx="5" ry="7" fill="#2E2320"/><ellipse cx="120" cy="90" rx="5" ry="7" fill="#2E2320"/><path d="M92 108 Q100 114 108 108" stroke="#2E2320" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M100 102 L94 108 L106 108 Z" fill="#E4795C"/><path d="M55 100 L20 95 M55 108 L18 108 M55 116 L20 122" stroke="#2E2320" stroke-width="1.5" stroke-linecap="round"/><path d="M145 100 L180 95 M145 108 L182 108 M145 116 L180 122" stroke="#2E2320" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="72" cy="178" rx="15" ry="11" fill="#FADCC2"/><ellipse cx="128" cy="178" rx="15" ry="11" fill="#FADCC2"/><path d="M142 160 Q178 145 168 95" stroke="#F2A65A" stroke-width="14" fill="none" stroke-linecap="round"/>' },
    dog: { word: 'DOG', svg: '<ellipse cx="58" cy="118" rx="17" ry="36" fill="#8B5E3C" transform="rotate(-14 58 118)"/><ellipse cx="142" cy="118" rx="17" ry="36" fill="#8B5E3C" transform="rotate(14 142 118)"/><circle cx="100" cy="95" r="48" fill="#C98B52"/><ellipse cx="100" cy="155" rx="52" ry="42" fill="#C98B52"/><ellipse cx="100" cy="115" rx="22" ry="16" fill="#F0DCC0"/><circle cx="100" cy="106" r="6" fill="#2E2320"/><circle cx="82" cy="90" r="6" fill="#2E2320"/><circle cx="118" cy="90" r="6" fill="#2E2320"/><path d="M92 122 Q100 130 108 122" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="132" rx="7" ry="11" fill="#F28FA0"/><ellipse cx="74" cy="184" rx="16" ry="11" fill="#F0DCC0"/><ellipse cx="126" cy="184" rx="16" ry="11" fill="#F0DCC0"/><path d="M148 168 Q182 145 170 110" stroke="#C98B52" stroke-width="15" fill="none" stroke-linecap="round"/>' },
    elephant: { word: 'ELEPHANT', svg: '<ellipse cx="42" cy="95" rx="30" ry="36" fill="#A9B4B8"/><ellipse cx="158" cy="95" rx="30" ry="36" fill="#A9B4B8"/><ellipse cx="42" cy="95" rx="18" ry="24" fill="#C9D2D4"/><ellipse cx="158" cy="95" rx="18" ry="24" fill="#C9D2D4"/><circle cx="100" cy="100" r="46" fill="#9AA5AA"/><ellipse cx="100" cy="158" rx="54" ry="40" fill="#9AA5AA"/><circle cx="84" cy="94" r="6" fill="#2E2320"/><circle cx="116" cy="94" r="6" fill="#2E2320"/><path d="M90 110 Q100 102 110 110 Q116 130 112 155 Q108 178 96 182 Q88 178 92 160 Q80 130 90 110 Z" fill="#8B979C" stroke="#7C888D" stroke-width="1.5"/><path d="M78 118 Q70 122 76 130" stroke="#F5F3EE" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M122 118 Q130 122 124 130" stroke="#F5F3EE" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="70" cy="188" rx="14" ry="10" fill="#C9D2D4"/><ellipse cx="130" cy="188" rx="14" ry="10" fill="#C9D2D4"/><path d="M150 178 Q160 188 152 196" stroke="#9AA5AA" stroke-width="6" fill="none" stroke-linecap="round"/>' },
    horse: { word: 'HORSE', svg: '<ellipse cx="60" cy="70" rx="14" ry="20" fill="#6B4A38" transform="rotate(-18 60 70)"/><ellipse cx="70" cy="52" rx="13" ry="18" fill="#6B4A38" transform="rotate(-6 70 52)"/><ellipse cx="86" cy="44" rx="13" ry="17" fill="#6B4A38"/> <ellipse cx="72" cy="46" rx="11" ry="17" fill="#A9734A" transform="rotate(-18 72 46)"/><ellipse cx="128" cy="46" rx="11" ry="17" fill="#A9734A" transform="rotate(18 128 46)"/><ellipse cx="73" cy="48" rx="5" ry="9" fill="#E8CBA8" transform="rotate(-18 73 48)"/><ellipse cx="127" cy="48" rx="5" ry="9" fill="#E8CBA8" transform="rotate(18 127 48)"/> <circle cx="100" cy="92" r="46" fill="#A9734A"/> <ellipse cx="100" cy="128" rx="30" ry="26" fill="#E8CBA8"/> <ellipse cx="100" cy="160" rx="52" ry="38" fill="#A9734A"/> <path d="M92 50 Q100 40 108 50 Q104 58 100 60 Q96 58 92 50 Z" fill="#6B4A38"/> <circle cx="80" cy="90" r="7" fill="#2E2320"/><circle cx="120" cy="90" r="7" fill="#2E2320"/><circle cx="82" cy="87" r="2" fill="#fff"/><circle cx="122" cy="87" r="2" fill="#fff"/> <ellipse cx="90" cy="126" rx="3.5" ry="5" fill="#7A5638"/><ellipse cx="110" cy="126" rx="3.5" ry="5" fill="#7A5638"/> <path d="M90 138 Q100 144 110 138" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/> <ellipse cx="74" cy="192" rx="15" ry="10" fill="#3A2E24"/><ellipse cx="126" cy="192" rx="15" ry="10" fill="#3A2E24"/> <path d="M150 172 Q186 162 180 122 Q178 108 190 98" stroke="#6B4A38" stroke-width="14" fill="none" stroke-linecap="round"/>' },
    lion: { word: 'LION', svg: '<circle cx="100" cy="98" r="62" fill="#C97A2B"/><circle cx="100" cy="98" r="46" fill="#F2B84B"/><ellipse cx="100" cy="160" rx="50" ry="38" fill="#F2B84B"/><circle cx="66" cy="76" r="12" fill="#F2B84B"/><circle cx="134" cy="76" r="12" fill="#F2B84B"/><ellipse cx="100" cy="104" rx="24" ry="18" fill="#FBE7C6"/><circle cx="84" cy="92" r="6" fill="#2E2320"/><circle cx="116" cy="92" r="6" fill="#2E2320"/><circle cx="100" cy="110" r="5" fill="#2E2320"/><path d="M92 118 Q100 124 108 118" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="76" cy="188" rx="15" ry="10" fill="#FBE7C6"/><ellipse cx="124" cy="188" rx="15" ry="10" fill="#FBE7C6"/><path d="M146 172 Q180 160 176 130" stroke="#F2B84B" stroke-width="13" fill="none" stroke-linecap="round"/><circle cx="176" cy="126" r="9" fill="#C97A2B"/>' },
    mouse: { word: 'MOUSE', svg: '<circle cx="70" cy="66" r="21" fill="#C9BEB2"/><circle cx="130" cy="66" r="21" fill="#C9BEB2"/><circle cx="70" cy="66" r="12" fill="#F3CBCB"/><circle cx="130" cy="66" r="12" fill="#F3CBCB"/><circle cx="100" cy="100" r="34" fill="#C9BEB2"/><ellipse cx="100" cy="150" rx="30" ry="34" fill="#C9BEB2"/><path d="M100 118 Q88 128 100 136 Q112 128 100 118 Z" fill="#EADFD3"/><circle cx="100" cy="128" r="4" fill="#E4795C"/><circle cx="88" cy="96" r="4.5" fill="#2E2320"/><circle cx="112" cy="96" r="4.5" fill="#2E2320"/><path d="M92 128 L60 122 M92 133 L58 133 M108 128 L140 122 M108 133 L142 133" stroke="#2E2320" stroke-width="1.3" stroke-linecap="round"/><ellipse cx="82" cy="182" rx="9" ry="7" fill="#EADFD3"/><ellipse cx="118" cy="182" rx="9" ry="7" fill="#EADFD3"/><path d="M128 175 Q175 165 170 110 Q168 90 185 82" stroke="#C9BEB2" stroke-width="5" fill="none" stroke-linecap="round"/>' },
    rabbit: { word: 'RABBIT', svg: '<ellipse cx="72" cy="42" rx="16" ry="38" fill="#FFC9D9" transform="rotate(-16 72 42)"/><ellipse cx="128" cy="42" rx="16" ry="38" fill="#FFC9D9" transform="rotate(16 128 42)"/> <ellipse cx="73" cy="46" rx="8" ry="28" fill="#FF8FAE" transform="rotate(-16 73 46)"/><ellipse cx="127" cy="46" rx="8" ry="28" fill="#FF8FAE" transform="rotate(16 127 46)"/> <circle cx="100" cy="104" r="50" fill="#FFC9D9"/> <circle cx="52" cy="118" r="20" fill="#FFC9D9"/><circle cx="148" cy="118" r="20" fill="#FFC9D9"/> <circle cx="54" cy="122" r="10" fill="#FF8FAE" opacity="0.5"/><circle cx="146" cy="122" r="10" fill="#FF8FAE" opacity="0.5"/> <ellipse cx="100" cy="172" rx="58" ry="42" fill="#FFC9D9"/> <circle cx="76" cy="188" r="14" fill="#FFF6F2"/><circle cx="124" cy="188" r="14" fill="#FFF6F2"/> <circle cx="80" cy="100" r="9" fill="#2E2320"/><circle cx="120" cy="100" r="9" fill="#2E2320"/> <circle cx="83.5" cy="96" r="3.2" fill="#fff"/><circle cx="123.5" cy="96" r="3.2" fill="#fff"/> <circle cx="77" cy="104" r="1.6" fill="#fff"/><circle cx="117" cy="104" r="1.6" fill="#fff"/> <ellipse cx="70" cy="112" rx="9" ry="6" fill="#FF8FAE" opacity="0.7"/><ellipse cx="130" cy="112" rx="9" ry="6" fill="#FF8FAE" opacity="0.7"/> <path d="M100 116 Q94 114 96 120 Q100 124 104 120 Q106 114 100 116 Z" fill="#FF8FAE"/> <rect x="95" y="124" width="5" height="7" rx="1.5" fill="#FFFDF7" stroke="#F2D9C9" stroke-width="0.5"/><rect x="100" y="124" width="5" height="7" rx="1.5" fill="#FFFDF7" stroke="#F2D9C9" stroke-width="0.5"/> <path d="M88 122 Q94 126 100 122" stroke="#2E2320" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M112 122 Q106 126 100 122" stroke="#2E2320" stroke-width="2" fill="none" stroke-linecap="round"/> <ellipse cx="78" cy="206" rx="16" ry="8" fill="#FF8FAE"/><ellipse cx="122" cy="206" rx="16" ry="8" fill="#FF8FAE"/> <circle cx="164" cy="160" r="14" fill="#FFFFFF" stroke="#F2D9C9" stroke-width="1.5"/>' },
    sheep: { word: 'SHEEP', svg: '<circle cx="66" cy="66" r="19" fill="#F2EDE0"/><circle cx="100" cy="54" r="18" fill="#F2EDE0"/><circle cx="134" cy="66" r="19" fill="#F2EDE0"/><circle cx="54" cy="98" r="17" fill="#F2EDE0"/><circle cx="146" cy="98" r="17" fill="#F2EDE0"/> <circle cx="66" cy="128" r="17" fill="#F2EDE0"/><circle cx="100" cy="120" r="19" fill="#F2EDE0"/><circle cx="134" cy="128" r="17" fill="#F2EDE0"/><circle cx="50" cy="150" r="15" fill="#F2EDE0"/><circle cx="150" cy="150" r="15" fill="#F2EDE0"/> <ellipse cx="57" cy="102" rx="13" ry="19" fill="#C9A388" transform="rotate(-24 57 102)"/><ellipse cx="143" cy="102" rx="13" ry="19" fill="#C9A388" transform="rotate(24 143 102)"/> <circle cx="100" cy="98" r="44" fill="#F2EDE0"/> <ellipse cx="100" cy="158" rx="52" ry="40" fill="#F2EDE0"/> <ellipse cx="100" cy="106" rx="30" ry="26" fill="#8C7364"/> <circle cx="86" cy="100" r="6" fill="#2E2320"/><circle cx="114" cy="100" r="6" fill="#2E2320"/> <circle cx="100" cy="112" r="4" fill="#5C483C"/> <path d="M92 120 Q100 126 108 120" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/> <ellipse cx="76" cy="190" rx="14" ry="9" fill="#4A3F38"/><ellipse cx="124" cy="190" rx="14" ry="9" fill="#4A3F38"/> <path d="M148 168 Q176 158 170 138" stroke="#F2EDE0" stroke-width="13" fill="none" stroke-linecap="round"/><circle cx="170" cy="136" r="12" fill="#F2EDE0"/>' },
  };

  var ALL_NAMES = Object.keys(ANIMALS);
  var round = []; // このプレイで選ばれた4匹

  function pickRound() {
    var shuffled = ALL_NAMES.slice().sort(function () { return Math.random() - 0.5; });
    return shuffled.slice(0, 4);
  }

  function animalSvg(name) {
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' + ANIMALS[name].svg + '</svg>';
  }

  // ---- ① たんごレッスン ----
  function buildVocab() {
    round = pickRound();
    var grid = document.getElementById("vocabGrid");
    grid.innerHTML = "";
    round.forEach(function (name) {
      var card = document.createElement("div");
      card.className = "aa-card";
      var word = ANIMALS[name].word;
      card.innerHTML = animalSvg(name) + '<div class="aa-letters" data-name="' + name + '"></div>';
      card.addEventListener("click", function () {
        revealLetters(card.querySelector(".aa-letters"), word);
        speak(name, 0.85);
        card.classList.add("done");
      });
      grid.appendChild(card);
    });
  }

  function revealLetters(el, word, i) {
    i = i || 0;
    if (i === 0) el.textContent = "";
    if (i >= word.length) return;
    el.textContent = word.slice(0, i + 1).split("").join(" ");
    setTimeout(function () { revealLetters(el, word, i + 1); }, 260);
  }

  document.getElementById("toSpellBtn").addEventListener("click", function () {
    spellIndex = 0;
    buildSpell();
    showPhase(app, "spell");
  });

  // ---- ② スペリングクイズ ----
  var spellIndex = 0;
  var spellBuilt = [];
  var spellLetters = [];

  function buildSpell() {
    if (spellIndex >= round.length) {
      reverseIndex = 0;
      buildReverse();
      showPhase(app, "reverse");
      return;
    }
    var name = round[spellIndex];
    var word = ANIMALS[name].word;
    spellLetters = word.split("");
    spellBuilt = [];

    document.getElementById("spellAnimal").innerHTML = animalSvg(name);
    document.getElementById("spellFeedback").innerHTML = "";
    renderSpellBuilt();
    renderSpellTray();
  }

  function renderSpellBuilt() {
    var el = document.getElementById("spellBuilt");
    el.innerHTML = "";
    if (spellBuilt.length === 0) {
      var ph = document.createElement("span");
      ph.style.cssText = "font-family:'Nunito',sans-serif; color:#B7AE9A; font-size:13px;";
      ph.textContent = "ここに レターが ならびます";
      el.appendChild(ph);
      return;
    }
    spellBuilt.forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "aa-built-letter";
      span.textContent = ch;
      el.appendChild(span);
    });
  }

  function renderSpellTray() {
    var tray = document.getElementById("spellTray");
    tray.innerHTML = "";
    var scrambled = spellLetters.slice().sort(function () { return Math.random() - 0.5; });
    scrambled.forEach(function (ch) {
      var btn = document.createElement("button");
      btn.className = "aa-letter-tile";
      btn.textContent = ch;
      btn.addEventListener("click", function () { handleSpellTap(ch, btn); });
      tray.appendChild(btn);
    });
  }

  function handleSpellTap(ch, btn) {
    var expected = spellLetters[spellBuilt.length];
    if (ch === expected) {
      spellBuilt.push(ch);
      btn.remove();
      renderSpellBuilt();
      document.getElementById("spellFeedback").innerHTML = "";
      if (spellBuilt.length === spellLetters.length) {
        var name = round[spellIndex];
        playSound(name.toLowerCase(), name, 0.9);
        document.getElementById("spellFeedback").innerHTML = '<div class="feedback-row feedback-correct">✔ Great job!</div>';
        playCelebrationChime();
        var nextBtn = document.createElement("button");
        nextBtn.className = "btn-primary";
        nextBtn.textContent = "つぎへ →";
        nextBtn.style.marginTop = "10px";
        nextBtn.addEventListener("click", function () {
          spellIndex++;
          buildSpell();
        });
        document.getElementById("spellFeedback").appendChild(nextBtn);
      }
    } else {
      btn.classList.add("shake");
      setTimeout(function () { btn.classList.remove("shake"); }, 400);
      playWrongBuzzer();
      document.getElementById("spellFeedback").innerHTML = '<div class="feedback-row feedback-wrong">✕ Try again!</div>';

      var builtEl = document.getElementById("spellBuilt");
      var prevHTML = builtEl.innerHTML;
      var hint = document.createElement("div");
      hint.style.cssText = "width:100%; font-family:'Baloo 2',sans-serif; font-style:italic; color:#B7AE9A; font-size:16px; letter-spacing:2px;";
      hint.textContent = spellLetters.join(" ");
      builtEl.innerHTML = "";
      builtEl.appendChild(hint);
      setTimeout(function () { builtEl.innerHTML = prevHTML; }, 1400);
    }
  }

  // ---- ③ アルファベット逆引きクイズ ----
  var reverseIndex = 0;
  var reverseAnswered = false;

  function buildReverse() {
    if (reverseIndex >= round.length) {
      stars = Math.min(5, stars + 1);
      renderStars(starsEl, stars);
      renderStars(starsDoneEl, stars);
      showPhase(app, "done");
      spawnConfetti(confettiEl);
      playCelebrationChime();
      return;
    }
    reverseAnswered = false;
    var name = round[reverseIndex];
    var letter = ANIMALS[name].word[0];
    document.getElementById("reverseLetter").textContent = letter;
    document.getElementById("reverseFeedback").innerHTML = "";

    var grid = document.getElementById("reverseGrid");
    grid.innerHTML = "";
    var shuffled = round.slice().sort(function () { return Math.random() - 0.5; });
    shuffled.forEach(function (n) {
      var btn = document.createElement("button");
      btn.className = "aa-animal-btn";
      btn.innerHTML = animalSvg(n);
      btn.addEventListener("click", function () { handleReverseTap(n, name, btn); });
      grid.appendChild(btn);
    });
  }

  function handleReverseTap(tapped, correct, btn) {
    if (reverseAnswered) return;
    if (tapped === correct) {
      reverseAnswered = true;
      btn.classList.add("correct-flash");
      var word = ANIMALS[correct].word;
      var lettersLine = document.createElement("div");
      lettersLine.style.cssText = "font-family:'Baloo 2',sans-serif; font-weight:800; font-size:22px; letter-spacing:4px; color:#2E7D32; margin-top:12px;";
      lettersLine.textContent = word.split("").join(" ");
      var feedbackEl = document.getElementById("reverseFeedback");
      feedbackEl.innerHTML = '<div class="feedback-row feedback-correct">✔ Great job!</div>';
      feedbackEl.appendChild(lettersLine);
      playSound(correct.toLowerCase(), correct, 0.9);
      playCelebrationChime();
      var nextBtn = document.createElement("button");
      nextBtn.className = "btn-primary";
      nextBtn.textContent = "つぎへ →";
      nextBtn.style.marginTop = "14px";
      nextBtn.addEventListener("click", function () {
        reverseIndex++;
        buildReverse();
      });
      feedbackEl.appendChild(nextBtn);
    } else {
      btn.classList.add("wrong-shake");
      setTimeout(function () { btn.classList.remove("wrong-shake"); }, 400);
      playWrongBuzzer();
      document.getElementById("reverseFeedback").innerHTML = '<div class="feedback-row feedback-wrong">✕ Try again!</div>';
    }
  }

  document.getElementById("restartBtn").addEventListener("click", function () {
    stars = 0;
    renderStars(starsEl, stars);
    buildVocab();
    showPhase(app, "vocab");
  });

  buildVocab();
})();
