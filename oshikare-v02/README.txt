推しカレ 0.2 / Netlify
既存サイトと同じURLを維持するには、同じNetlifyプロジェクトにGitリポジトリを接続してデプロイしてください。ZIPを展開し、public、netlify、netlify.tomlをリポジトリのルートに配置します。ビルドコマンド不要、公開ディレクトリ public、Functions netlify/functions。HTMLだけのドラッグ＆ドロップではFunctionsは動作しません。
代替：Netlify CLIでログインし、展開したディレクトリで npx netlify-cli link を実行して既存サイトを選択し、npx netlify-cli deploy --prod を実行。
APIキー不要。GoogleニュースRSSのみ。地域設定は保存されますが自動地域判定は未実装。追加キーワードに地域名を入力できます。起動時に6時間間隔で取得、手動再取得可能。記事の日付は開催日ではありません。公開サイトでの通信テストは未実施。無料枠の上限と利用状況をNetlifyで確認してください。公開APIに認証はありません。少人数試験用です。
