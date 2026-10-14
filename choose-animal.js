(function () {
  var app = document.getElementById("app");
  var starsEl = document.getElementById("stars");
  var starsDoneEl = document.getElementById("starsDone");
  var confettiEl = document.getElementById("confetti");
  var grid = document.getElementById("animalGrid");

  var TARGET = "cat";
  var stars = 0;
  var answered = false;

  var ANIMALS = {
    cat: '<title>Cat — version 1.5</title><path d="M167 188 Q206 190 197 151" fill="none" stroke="#62534B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M167 188 Q206 190 197 151" fill="none" stroke="#D8AA77" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><path d="M79 100 L80 49 L113 80 Z" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M143 80 L176 49 L177 100 Z" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#D8AA77" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="134" rx="4" ry="3" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(0 128 134)"/><path d="M91 133 L69 130 M165 133 L187 130" fill="none" stroke="#62534B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
    mouse: '<title>Mouse — version 1.5</title><path d="M161 194 Q208 218 205 181" fill="none" stroke="#62534B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M161 194 Q208 218 205 181" fill="none" stroke="#DBA0A6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="94" cy="80" rx="23" ry="23" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 80)"/><ellipse cx="162" cy="80" rx="23" ry="23" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 80)"/><ellipse cx="94" cy="80" rx="10.35" ry="13.799999999999999" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(-12 94 80)"/><ellipse cx="162" cy="80" rx="10.35" ry="13.799999999999999" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(12 162 80)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#ADA9A3" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="134" rx="4" ry="3" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(0 128 134)"/><path d="M92 139 L72 135 M164 139 L184 135" fill="none" stroke="#62534B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#DDB5B5" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#DDB5B5" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
    tiger: '<title>Tiger — version 1.5</title><path d="M166 193 Q207 195 200 157" fill="none" stroke="#62534B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M166 193 Q207 195 200 157" fill="none" stroke="#DEA05B" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#DEA05B" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="94" cy="79" rx="13" ry="14" fill="#DEA05B" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 79)"/><ellipse cx="162" cy="79" rx="13" ry="14" fill="#DEA05B" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 79)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#DEA05B" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="128" cy="139" rx="25" ry="16" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 139)"/><path d="M120 74 L128 94 L136 74 Z" fill="#62534B" stroke="#62534B" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"/><path d="M79 113 L95 120 L79 126 Z" fill="#62534B" stroke="#62534B" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"/><path d="M177 113 L161 120 L177 126 Z" fill="#62534B" stroke="#62534B" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M93 179 L103 183 M163 179 L153 183" fill="none" stroke="#62534B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
    hamster: '<title>Hamster — version 1.5</title><ellipse cx="94" cy="100" rx="12" ry="13" fill="#C6A274" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 100)"/><ellipse cx="162" cy="100" rx="12" ry="13" fill="#C6A274" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 100)"/><ellipse cx="94" cy="100" rx="5.4" ry="7.8" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(-12 94 100)"/><ellipse cx="162" cy="100" rx="5.4" ry="7.8" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(12 162 100)"/><ellipse cx="128" cy="159" rx="58" ry="58" fill="#C6A274" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 159)"/><ellipse cx="128" cy="188" rx="27" ry="22" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="91" cy="140" rx="21" ry="18" fill="#EBD0A7" stroke="none" stroke-width="0" transform="rotate(0 91 140)"/><ellipse cx="165" cy="140" rx="21" ry="18" fill="#EBD0A7" stroke="none" stroke-width="0" transform="rotate(0 165 140)"/><ellipse cx="108" cy="125" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 125)"/><ellipse cx="150" cy="122" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 122)"/><path d="M128 140 v5 M120 148 Q128 153 136 148" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="140" rx="4" ry="3" fill="#DBA0A6" stroke="none" stroke-width="0" transform="rotate(0 128 140)"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
    dog: '<title>Dog — version 1.5</title><path d="M167 190 Q191 182 191 163" fill="none" stroke="#62534B" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M167 190 Q191 182 191 163" fill="none" stroke="#BB916D" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#BB916D" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#BB916D" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="82" cy="113" rx="13" ry="28" fill="#886A55" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 82 113)"/><ellipse cx="174" cy="113" rx="13" ry="28" fill="#886A55" stroke="#62534B" stroke-width="2.8" transform="rotate(12 174 113)"/><ellipse cx="128" cy="138" rx="21" ry="15" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 138)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="128" cy="133" rx="5" ry="3.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 128 133)"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
    elephant: '<title>Elephant — version 1.5</title><ellipse cx="128" cy="181" rx="39" ry="37" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="67" cy="119" rx="25" ry="33" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 67 119)"/><ellipse cx="189" cy="119" rx="25" ry="33" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 189 119)"/><ellipse cx="67" cy="119" rx="14" ry="22" fill="#C8D4DB" stroke="none" stroke-width="0" transform="rotate(0 67 119)"/><ellipse cx="189" cy="119" rx="14" ry="22" fill="#C8D4DB" stroke="none" stroke-width="0" transform="rotate(0 189 119)"/><ellipse cx="128" cy="117" rx="51" ry="46" fill="#9CAFB9" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 117)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M118 139 C115 167 120 183 132 184 Q149 184 151 170" fill="none" stroke="#62534B" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/><path d="M118 139 C115 167 120 183 132 184 Q149 184 151 170" fill="none" stroke="#9CAFB9" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#C8D4DB" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#C8D4DB" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
    lion: '<title>Lion — version 1.5</title><path d="M165 191 Q194 189 193 166" fill="none" stroke="#62534B" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="M165 191 Q194 189 193 166" fill="none" stroke="#D6B36E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="193" cy="163" rx="8" ry="11" fill="#A67A54" stroke="#62534B" stroke-width="2.8" transform="rotate(0 193 163)"/><ellipse cx="128" cy="181" rx="39" ry="37" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 181)"/><ellipse cx="128" cy="188" rx="22" ry="25" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 188)"/><ellipse cx="128" cy="115" rx="65" ry="62" fill="#A67A54" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 115)"/><ellipse cx="94" cy="81" rx="10" ry="11" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(-12 94 81)"/><ellipse cx="162" cy="81" rx="10" ry="11" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(12 162 81)"/><ellipse cx="128" cy="121" rx="44" ry="41" fill="#D6B36E" stroke="#62534B" stroke-width="2.8" transform="rotate(0 128 121)"/><ellipse cx="128" cy="141" rx="22" ry="14" fill="#F7E8CE" stroke="none" stroke-width="0" transform="rotate(0 128 141)"/><ellipse cx="108" cy="119" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 108 119)"/><ellipse cx="150" cy="116" rx="4.5" ry="5.5" fill="#62534B" stroke="none" stroke-width="0" transform="rotate(0 150 116)"/><path d="M128 134 v5 M120 142 Q128 147 136 142" fill="none" stroke="#62534B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="104" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 104 213)"/><ellipse cx="152" cy="213" rx="15" ry="9" fill="#F7E8CE" stroke="#62534B" stroke-width="2.8" transform="rotate(0 152 213)"/>',
  };

  function animalSvg(name) {
    return '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">' + ANIMALS[name] + '</svg>';
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
