# AIこども英語教育 プロトタイプ（静的HTML版）

ビルド不要・npm不要の、素のHTML/CSS/JavaScriptのみで作られたプロトタイプです。
GitHub Pagesにそのままアップロードするだけで公開できます。

- `index.html` … 3レッスンへのリンク一覧
- `letter-lesson.html` … レターレッスン（Letter A）
- `blending.html` … ブレンディング（sh + ip = ship）
- `sentence-reading.html` … センテンスリーディング（The cat sits on the mat.）
- `style.css` / `common.js` … 3ページ共通のスタイルと関数（音声・チャイム・紙吹雪・スター表示）

## ローカルでの確認（任意）

ファイルをダブルクリックするだけでもブラウザで開けますが、`file://`扱いになるため
一部のブラウザではフォント等が正しく読み込まれないことがあります。
気になる場合は、フォルダごとVS Code等の「Live Server」拡張機能で開くと、
`http://localhost` 扱いで確認できます（必須ではありません）。

## GitHub Pagesでの公開手順

これまでお使いのGitHub + GASの構成と同じ感覚で進められます。npmのインストールも
社内ネットワークの許可も不要です。

1. このフォルダの中身を、いつも使っているGitHubリポジトリにpush
   ```bash
   git add -A
   git commit -m "静的HTML版プロトタイプを追加"
   git push origin main
   ```
2. GitHubのリポジトリ画面で「Settings」→「Pages」を開く
3. 「Source」を「Deploy from a branch」に設定し、ブランチを`main`、フォルダを
   このファイル群を置いた場所（リポジトリ直下なら`/ (root)`）に指定して保存
4. 数十秒〜数分後、`https://（あなたのGitHubアカウント）.github.io/（リポジトリ名）/`
   というURLで公開される

以後は、`git push`するだけで自動的に内容が更新されます（GASの「デプロイ」操作は不要です）。

## 社内限定にしたい場合

GitHub Pagesの標準機能には、Vercelのような「パスワード保護」はありません。
社内限定にしたい場合は、以下のいずれかが選択肢になります。

- リポジトリを**Private**にし、GitHub Pagesの有料プラン（Pro等）で
  「Private repository向けのPages公開」を使う
- 前回ご案内したVercel側で公開し、そちらのパスワード保護機能を使う
- 一時的な企画書用のデモであれば、URLを関係者にのみ個別共有する運用に留める

企画書用のデモとして関係者数名にだけ見せる、という当面の目的であれば、
最後の「URLを個別共有」で十分実用的です。

## 音声ファイルの差し替え（収録済みmp3がある場合）

`common.js`の`speak()`関数の呼び出し箇所を、mp3再生に置き換えることで対応できます。
mp3ファイルをいただければ差し替え版をお渡しします。
