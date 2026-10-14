(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");

  var stars = 0;

  var ANIMALS = {
    cat: { word: 'CAT', svg: '<title>Cat — version 1.5</title><path d="M167 188 Q206 190 197 151" fill="none" stroke="#62534B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M167 188 Q206 190 197 151" fill="none" stroke="#D8AA77" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><path d="M79 100 L80 49 L113 80 Z" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M143 80 L176 49 L177 100 Z" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="134" rx="4" ry="3" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(0 128 134)"/><path d="M91 133 L69 130 M165 133 L187 130" fill="none" stroke="#62534B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    dog: { word: 'DOG', svg: '<title>Dog — version 1.5</title><path d="M167 190 Q191 182 191 163" fill="none" stroke="#62534B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M167 190 Q191 182 191 163" fill="none" stroke="#BB916D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#BB916D" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#BB916D" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="82" cy="113" rx="13" ry="28" fill="#886A55" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 82 113)"/><ellipse cx="174" cy="113" rx="13" ry="28" fill="#886A55" stroke="#62534B" stroke-width="2.8" transform="rotate(12 174 113)"/><ellipse cx="128" cy="138" rx="21" ry="15" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 138)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="133" rx="5" ry="3.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 128 133)"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    elephant: { word: 'ELEPHANT', svg: '<title>Elephant — version 1.5</title><ellipse cx="128" cy="181" rx="39" ry="37" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="67" cy="119" rx="25" ry="33" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 67 119)"/><ellipse cx="189" cy="119" rx="25" ry="33" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 189 119)"/><ellipse cx="67" cy="119" rx="14" ry="22" fill="#C8D4DB" stroke="none" stroke-width="0" transform="rotate(0 67 119)"/><ellipse cx="189" cy="119" rx="14" ry="22" fill="#C8D4DB" stroke="none" stroke-width="0" transform="rotate(0 189 119)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M118 139 C115 167 120 183 132 184 Q149 184 151 170" fill="none" stroke="#62534B" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/><path d="M118 139 C115 167 120 183 132 184 Q149 184 151 170" fill="none" stroke="#9CAFB9" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#C8D4DB" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#C8D4DB" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    horse: { word: 'HORSE', svg: '<title>Horse — version 1.5</title><ellipse cx="128" cy="181" rx="39" ry="37" fill="#A9876C" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="94" cy="58" rx="10" ry="23" fill="#A9876C" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 58)"/><ellipse cx="162" cy="58" rx="10" ry="23" fill="#A9876C" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 58)"/><ellipse cx="94" cy="58" rx="4.5" ry="13.799999999999999" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(-12 94 58)"/><ellipse cx="162" cy="58" rx="4.5" ry="13.799999999999999" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(12 162 58)"/><ellipse cx="128" cy="120" rx="43" ry="51" fill="#A9876C" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 120)"/><path d="M108 76 Q127 59 148 76 L130 95 Z" fill="#756050" stroke="#62534B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="147" rx="28" ry="20" fill="#DDC3A2" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 147)"/><ellipse cx="108" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 116)"/><ellipse cx="150" cy="113" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 113)"/><ellipse cx="117" cy="145" rx="3" ry="4" fill="#856C55" stroke="none" stroke-width="0" transform="rotate(0 117 145)"/><ellipse cx="139" cy="145" rx="3" ry="4" fill="#856C55" stroke="none" stroke-width="0" transform="rotate(0 139 145)"/><path d="M120 156 Q128 160 136 156" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#756050" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#756050" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    lion: { word: 'LION', svg: '<title>Lion — version 1.5</title><path d="M165 191 Q194 189 193 166" fill="none" stroke="#62534B" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="M165 191 Q194 189 193 166" fill="none" stroke="#D6B36E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="193" cy="163" rx="8" ry="11" fill="#A67A54" stroke="#62534B" stroke-width="2.8" transform="rotate(0 193 163)"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="128" cy="115" rx="65" ry="62" fill="#A67A54" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 115)"/><ellipse cx="94" cy="81" rx="10" ry="11" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 81)"/><ellipse cx="162" cy="81" rx="10" ry="11" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 81)"/><ellipse cx="128" cy="121" rx="44" ry="41" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 121)"/><ellipse cx="128" cy="141" rx="22" ry="14" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 141)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    mouse: { word: 'MOUSE', svg: '<title>Mouse — version 1.5</title><path d="M161 194 Q208 218 205 181" fill="none" stroke="#62534B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M161 194 Q208 218 205 181" fill="none" stroke="#DBA0A6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="94" cy="80" rx="23" ry="23" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 80)"/><ellipse cx="162" cy="80" rx="23" ry="23" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 80)"/><ellipse cx="94" cy="80" rx="10.35" ry="13.799999999999999" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(-12 94 80)"/><ellipse cx="162" cy="80" rx="10.35" ry="13.799999999999999" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(12 162 80)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="134" rx="4" ry="3" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(0 128 134)"/><path d="M92 139 L72 135 M164 139 L184 135" fill="none" stroke="#62534B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#DDB5B5" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#DDB5B5" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    rabbit: { word: 'RABBIT', svg: '<title>Rabbit — version 1.5</title><ellipse cx="176" cy="184" rx="12" ry="12" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 176 184)"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#DDAFC1" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="94" cy="48" rx="12" ry="33" fill="#DDAFC1" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 48)"/><ellipse cx="162" cy="48" rx="12" ry="33" fill="#DDAFC1" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 48)"/><ellipse cx="94" cy="48" rx="5.4" ry="19.8" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(-12 94 48)"/><ellipse cx="162" cy="48" rx="5.4" ry="19.8" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(12 162 48)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#DDAFC1" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="134" rx="4" ry="3" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(0 128 134)"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>' },
    sheep: { word: 'SHEEP', svg: '<title>Sheep — version 1.5</title><ellipse cx="128" cy="181" rx="39" ry="37" fill="#E8D8B8" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#827265" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#827265" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/><path d="M79 91 Q66 74 82 65 Q96 56 106 70 Q110 48 129 55 Q145 48 150 70 Q173 57 182 76 Q192 88 178 100 Q190 121 175 139 Q157 165 128 163 Q93 168 79 144 Q62 126 79 112 Q66 103 79 91 Z" fill="#E8D8B8" stroke="#62534B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="82" cy="117" rx="15" ry="9" fill="#A28B74" stroke="#62534B" stroke-width="2.8" transform="rotate(-15 82 117)"/><ellipse cx="174" cy="117" rx="15" ry="9" fill="#A28B74" stroke="#62534B" stroke-width="2.8" transform="rotate(15 174 117)"/><ellipse cx="128" cy="125" rx="31" ry="34" fill="#A28B74" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 125)"/><ellipse cx="108" cy="123" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 123)"/><ellipse cx="150" cy="120" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 120)"/><path d="M128 138 v5 M120 146 Q128 151 136 146" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>' },
  };

  var ALL_NAMES = Object.keys(ANIMALS);
  var round = []; // このプレイで選ばれた4匹

  function pickRound() {
    var shuffled = ALL_NAMES.slice().sort(function () { return Math.random() - 0.5; });
    return shuffled.slice(0, 4);
  }

  function animalSvg(name) {
    return '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">' + ANIMALS[name].svg + '</svg>';
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
