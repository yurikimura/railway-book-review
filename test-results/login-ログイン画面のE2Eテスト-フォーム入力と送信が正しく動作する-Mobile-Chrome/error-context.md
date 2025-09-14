# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "書籍レビューアプリ" [level=1] [ref=e5]
    - paragraph [ref=e6]: お気に入りの書籍をレビューして共有しましょう
  - main [ref=e7]:
    - generic [ref=e8]:
      - paragraph [ref=e9]: "エラー: ネットワークエラー: サーバーに接続できません。インターネット接続を確認してください。"
      - button "閉じる" [ref=e10] [cursor=pointer]
    - generic [ref=e12]:
      - heading "ログイン" [level=2] [ref=e13]
      - generic [ref=e14]:
        - generic [ref=e15]: メールアドレス
        - textbox "メールアドレス" [ref=e16]: test@example.com
      - generic [ref=e17]:
        - generic [ref=e18]: パスワード
        - textbox "パスワード" [ref=e19]: password123
      - button "ログイン" [active] [ref=e20] [cursor=pointer]
      - paragraph [ref=e22]:
        - text: アカウントをお持ちでないですか？
        - button "新規登録" [ref=e23] [cursor=pointer]
```