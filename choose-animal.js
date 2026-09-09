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
    cat: '<path d="M60 60 L75 25 L95 65 Z" fill="#F2A65A"/><path d="M140 60 L125 25 L105 65 Z" fill="#F2A65A"/><path d="M68 55 L76 38 L86 60 Z" fill="#FADCC2"/><path d="M132 55 L124 38 L114 60 Z" fill="#FADCC2"/><circle cx="100" cy="95" r="48" fill="#F2A65A"/><ellipse cx="100" cy="150" rx="48" ry="40" fill="#F2A65A"/><path d="M60 82 Q66 78 72 82" stroke="#D98A3D" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M128 82 Q134 78 140 82" stroke="#D98A3D" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="80" cy="90" rx="5" ry="7" fill="#2E2320"/><ellipse cx="120" cy="90" rx="5" ry="7" fill="#2E2320"/><path d="M92 108 Q100 114 108 108" stroke="#2E2320" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M100 102 L94 108 L106 108 Z" fill="#E4795C"/><path d="M55 100 L20 95 M55 108 L18 108 M55 116 L20 122" stroke="#2E2320" stroke-width="1.5" stroke-linecap="round"/><path d="M145 100 L180 95 M145 108 L182 108 M145 116 L180 122" stroke="#2E2320" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="72" cy="178" rx="15" ry="11" fill="#FADCC2"/><ellipse cx="128" cy="178" rx="15" ry="11" fill="#FADCC2"/><path d="M142 160 Q178 145 168 95" stroke="#F2A65A" stroke-width="14" fill="none" stroke-linecap="round"/>',
    mouse: '<circle cx="70" cy="66" r="21" fill="#C9BEB2"/><circle cx="130" cy="66" r="21" fill="#C9BEB2"/><circle cx="70" cy="66" r="12" fill="#F3CBCB"/><circle cx="130" cy="66" r="12" fill="#F3CBCB"/><circle cx="100" cy="100" r="34" fill="#C9BEB2"/><ellipse cx="100" cy="150" rx="30" ry="34" fill="#C9BEB2"/><path d="M100 118 Q88 128 100 136 Q112 128 100 118 Z" fill="#EADFD3"/><circle cx="100" cy="128" r="4" fill="#E4795C"/><circle cx="88" cy="96" r="4.5" fill="#2E2320"/><circle cx="112" cy="96" r="4.5" fill="#2E2320"/><path d="M92 128 L60 122 M92 133 L58 133 M108 128 L140 122 M108 133 L142 133" stroke="#2E2320" stroke-width="1.3" stroke-linecap="round"/><ellipse cx="82" cy="182" rx="9" ry="7" fill="#EADFD3"/><ellipse cx="118" cy="182" rx="9" ry="7" fill="#EADFD3"/><path d="M128 175 Q175 165 170 110 Q168 90 185 82" stroke="#C9BEB2" stroke-width="5" fill="none" stroke-linecap="round"/>',
    tiger: '<circle cx="66" cy="62" r="17" fill="#EF8C3C"/><circle cx="134" cy="62" r="17" fill="#EF8C3C"/><circle cx="66" cy="64" r="8" fill="#FFF3E6"/><circle cx="134" cy="64" r="8" fill="#FFF3E6"/><circle cx="100" cy="100" r="54" fill="#EF8C3C"/><ellipse cx="100" cy="102" rx="38" ry="34" fill="#FFF3E6"/><ellipse cx="100" cy="162" rx="62" ry="46" fill="#EF8C3C"/><path d="M56 70 Q70 60 82 68" stroke="#2E2320" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M144 70 Q130 60 118 68" stroke="#2E2320" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M100 58 L96 78 M100 58 L104 78" stroke="#2E2320" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="82" cy="96" rx="6" ry="8" fill="#2E2320"/><ellipse cx="118" cy="96" rx="6" ry="8" fill="#2E2320"/><path d="M92 118 Q100 124 108 118" stroke="#2E2320" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M100 110 L92 118 L108 118 Z" fill="#2E2320"/><path d="M55 112 L14 106 M55 121 L12 121 M55 130 L14 137" stroke="#2E2320" stroke-width="1.6" stroke-linecap="round"/><path d="M145 112 L186 106 M145 121 L188 121 M145 130 L186 137" stroke="#2E2320" stroke-width="1.6" stroke-linecap="round"/><path d="M60 145 Q70 155 62 165 M138 148 Q130 158 140 166 M100 195 Q95 205 105 210" stroke="#2E2320" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="66" cy="196" rx="18" ry="13" fill="#FFF3E6"/><ellipse cx="134" cy="196" rx="18" ry="13" fill="#FFF3E6"/><path d="M158 175 Q205 160 190 100" stroke="#EF8C3C" stroke-width="17" fill="none" stroke-linecap="round"/><path d="M170 145 L182 140 M182 155 L196 152 M170 165 L182 168" stroke="#2E2320" stroke-width="4" fill="none" stroke-linecap="round"/>',
    hamster: '<circle cx="72" cy="68" r="11" fill="#D9A868"/><circle cx="128" cy="68" r="11" fill="#D9A868"/><circle cx="100" cy="125" r="62" fill="#D9A868"/><ellipse cx="55" cy="135" rx="24" ry="22" fill="#E8C48F"/><ellipse cx="145" cy="135" rx="24" ry="22" fill="#E8C48F"/><ellipse cx="100" cy="168" rx="34" ry="24" fill="#F5E3C6"/><ellipse cx="86" cy="112" rx="5" ry="6" fill="#2E2320"/><ellipse cx="114" cy="112" rx="5" ry="6" fill="#2E2320"/><circle cx="100" cy="126" r="4" fill="#B5773F"/><path d="M94 138 Q100 142 106 138" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M65 128 L35 124 M65 134 L34 134 M135 128 L165 124 M135 134 L166 134" stroke="#2E2320" stroke-width="1.3" stroke-linecap="round"/><circle cx="163" cy="178" r="8" fill="#D9A868"/><ellipse cx="76" cy="196" rx="13" ry="9" fill="#E8C48F"/><ellipse cx="124" cy="196" rx="13" ry="9" fill="#E8C48F"/>',
    dog: '<ellipse cx="58" cy="118" rx="17" ry="36" fill="#8B5E3C" transform="rotate(-14 58 118)"/><ellipse cx="142" cy="118" rx="17" ry="36" fill="#8B5E3C" transform="rotate(14 142 118)"/><circle cx="100" cy="95" r="48" fill="#C98B52"/><ellipse cx="100" cy="155" rx="52" ry="42" fill="#C98B52"/><ellipse cx="100" cy="115" rx="22" ry="16" fill="#F0DCC0"/><circle cx="100" cy="106" r="6" fill="#2E2320"/><circle cx="82" cy="90" r="6" fill="#2E2320"/><circle cx="118" cy="90" r="6" fill="#2E2320"/><path d="M92 122 Q100 130 108 122" stroke="#2E2320" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="132" rx="7" ry="11" fill="#F28FA0"/><ellipse cx="74" cy="184" rx="16" ry="11" fill="#F0DCC0"/><ellipse cx="126" cy="184" rx="16" ry="11" fill="#F0DCC0"/><path d="M148 168 Q182 145 170 110" stroke="#C98B52" stroke-width="15" fill="none" stroke-linecap="round"/>',
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
