// ---- 教室向け 年間カリキュラム仮データ ------------------------------------
// ここを差し替えるだけで、実際の教室独自の12ヶ月シーケンスに対応できます。
// href は各レッスンページへのパス。placeholder:true の月は「準備中」表示。
var CURRICULUM = [
  { month: 1, units: [
    { icon: "🧩", module: "モジュール1", title: "パズル（トピックレッスン）", desc: "文字なし・絵と音でCATを覚える", href: "puzzle.html", color: "#9B95D5" },
    { icon: "🐾", module: "モジュール1", title: "どうぶつクイズ", desc: "文字なし・音を聞いて絵を選ぶ", href: "choose-animal.html", color: "#9B95D5" }
  ]},
  { month: 2, units: [
    { icon: "🔤", module: "モジュール2", title: "レターレッスン", desc: "Letter A の文字と音", href: "letter-lesson.html", color: "#FF6B6B" }
  ]},
  { month: 3, units: [
    { icon: "🔤", module: "モジュール2", title: "レターレッスン（復習）", desc: "Letter A の文字と音", href: "letter-lesson.html", color: "#FF6B6B" }
  ]},
  { month: 4, units: [
    { icon: "🚢", module: "モジュール3", title: "ブレンディング", desc: "sh + ip = ship", href: "blending.html", color: "#06AED5" }
  ]},
  { month: 5, units: [
    { icon: "🚢", module: "モジュール3", title: "ブレンディング（復習）", desc: "sh + ip = ship", href: "blending.html", color: "#06AED5" }
  ]},
  { month: 6, units: [
    { icon: "📖", module: "モジュール6", title: "センテンスリーディング", desc: "The shop sells fresh fish from the ship.", href: "sentence-reading.html", color: "#FFC43D" }
  ]},
  { month: 7, units: [] },
  { month: 8, units: [] },
  { month: 9, units: [] },
  { month: 10, units: [] },
  { month: 11, units: [] },
  { month: 12, units: [] }
];

(function () {
  var current = 0; // インデックス（0始まり）
  var timelineEl = document.getElementById("monthTimeline");
  var unitGridEl = document.getElementById("unitGrid");
  var monthLabelEl = document.getElementById("monthLabel");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  function renderTimeline() {
    timelineEl.innerHTML = "";
    CURRICULUM.forEach(function (m, i) {
      var btn = document.createElement("button");
      btn.className = "month-btn" + (i === current ? " active" : "");
      btn.textContent = m.month;
      btn.addEventListener("click", function () {
        current = i;
        render();
      });
      timelineEl.appendChild(btn);
    });
  }

  function renderUnits() {
    var data = CURRICULUM[current];
    unitGridEl.innerHTML = "";

    if (!data.units || data.units.length === 0) {
      var ph = document.createElement("div");
      ph.className = "unit-card placeholder";
      ph.textContent = "この月のコンテンツは準備中です（年間シーケンスをいただき次第、設定します）";
      unitGridEl.appendChild(ph);
      return;
    }

    data.units.forEach(function (u) {
      var a = document.createElement("a");
      a.className = "unit-card";
      a.href = u.href;
      a.innerHTML =
        '<div class="unit-icon">' + u.icon + "</div>" +
        '<div class="unit-info">' +
          '<div class="unit-module" style="color:' + u.color + ';">' + u.module + "</div>" +
          '<div class="unit-title">' + u.title + "</div>" +
          '<div class="unit-desc">' + u.desc + "</div>" +
        "</div>" +
        '<div class="unit-start">はじめる ▶</div>';
      unitGridEl.appendChild(a);
    });
  }

  function render() {
    monthLabelEl.textContent = CURRICULUM[current].month + "ヶ月目 / " + CURRICULUM.length;
    renderTimeline();
    renderUnits();
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === CURRICULUM.length - 1;
  }

  prevBtn.addEventListener("click", function () {
    if (current > 0) { current--; render(); }
  });
  nextBtn.addEventListener("click", function () {
    if (current < CURRICULUM.length - 1) { current++; render(); }
  });

  render();
})();
