import { test, expect } from '@playwright/test';

test.describe('書籍レビュー機能のE2Eテスト', () => {
  test.beforeEach(async ({ page }) => {
    // アプリケーションに移動
    await page.goto('/');
  });

  test('書籍レビューアプリのメインページが正しく表示される', async ({ page }) => {
    // ページタイトルを確認
    await expect(page).toHaveTitle(/Vite \+ React/);
    
    // ヘッダーが表示されることを確認
    await expect(page.getByRole('heading', { name: '書籍レビューアプリ' })).toBeVisible();
    await expect(page.getByText('お気に入りの書籍をレビューして共有しましょう')).toBeVisible();
    
    // レビュー投稿フォームが表示されることを確認
    await expect(page.getByRole('heading', { name: '書籍レビューを投稿' })).toBeVisible();
    
    // レビュー一覧セクションが表示されることを確認
    await expect(page.getByRole('heading', { name: '投稿されたレビュー' })).toBeVisible();
  });

  test('書籍レビュー投稿フォームが正しく表示される', async ({ page }) => {
    // フォームの各フィールドが存在することを確認
    const titleInput = page.getByLabel('書籍タイトル');
    await expect(titleInput).toBeVisible();
    await expect(titleInput).toHaveAttribute('placeholder', '書籍のタイトルを入力してください');
    
    const urlInput = page.getByLabel('URL');
    await expect(urlInput).toBeVisible();
    await expect(urlInput).toHaveAttribute('type', 'url');
    await expect(urlInput).toHaveAttribute('placeholder', 'https://example.com/book');
    
    const reviewerInput = page.getByLabel('レビュワー（名前）');
    await expect(reviewerInput).toBeVisible();
    await expect(reviewerInput).toHaveAttribute('placeholder', 'あなたのお名前を入力してください');
    
    const reviewTextarea = page.getByLabel('書籍レビュー本文');
    await expect(reviewTextarea).toBeVisible();
    await expect(reviewTextarea).toHaveAttribute('placeholder', '書籍の感想やレビューを入力してください');
    
    // 投稿ボタンが存在することを確認
    const submitButton = page.getByRole('button', { name: 'レビューを投稿' });
    await expect(submitButton).toBeVisible();
  });

  test('書籍レビューの投稿が正しく動作する', async ({ page }) => {
    // フォームにデータを入力
    await page.getByLabel('書籍タイトル').fill('テスト書籍タイトル');
    await page.getByLabel('URL').fill('https://example.com/test-book');
    await page.getByLabel('レビュワー（名前）').fill('テストレビュワー');
    await page.getByLabel('書籍レビュー本文').fill('これは素晴らしい本でした。内容が非常に興味深く、読んでいて楽しかったです。');
    
    // 投稿ボタンをクリック
    await page.getByRole('button', { name: 'レビューを投稿' }).click();
    
    // 投稿されたレビューが表示されることを確認
    await expect(page.getByText('テスト書籍タイトル')).toBeVisible();
    await expect(page.getByText('https://example.com/test-book')).toBeVisible();
    await expect(page.getByText('レビュワー: テストレビュワー')).toBeVisible();
    await expect(page.getByText('これは素晴らしい本でした。内容が非常に興味深く、読んでいて楽しかったです。')).toBeVisible();
    
    // レビュー数が更新されることを確認
    await expect(page.getByText('投稿されたレビュー (1件)')).toBeVisible();
  });

  test('書籍タイトルがクリック可能なリンクとして動作する', async ({ page }) => {
    // レビューを投稿
    await page.getByLabel('書籍タイトル').fill('リンクテスト書籍');
    await page.getByLabel('URL').fill('https://example.com/link-test');
    await page.getByLabel('レビュワー（名前）').fill('リンクテスト');
    await page.getByLabel('書籍レビュー本文').fill('リンクテストのレビューです。');
    await page.getByRole('button', { name: 'レビューを投稿' }).click();
    
    // 書籍タイトルリンクをクリック
    const bookLink = page.getByRole('link', { name: 'リンクテスト書籍' });
    await expect(bookLink).toBeVisible();
    await expect(bookLink).toHaveAttribute('href', 'https://example.com/link-test');
    await expect(bookLink).toHaveAttribute('target', '_blank');
  });

  test('複数のレビューが正しく表示される', async ({ page }) => {
    // 最初のレビューを投稿
    await page.getByLabel('書籍タイトル').fill('最初の書籍');
    await page.getByLabel('URL').fill('https://example.com/first');
    await page.getByLabel('レビュワー（名前）').fill('レビュワー1');
    await page.getByLabel('書籍レビュー本文').fill('最初のレビューです。');
    await page.getByRole('button', { name: 'レビューを投稿' }).click();
    
    // 2番目のレビューを投稿
    await page.getByLabel('書籍タイトル').fill('2番目の書籍');
    await page.getByLabel('URL').fill('https://example.com/second');
    await page.getByLabel('レビュワー（名前）').fill('レビュワー2');
    await page.getByLabel('書籍レビュー本文').fill('2番目のレビューです。');
    await page.getByRole('button', { name: 'レビューを投稿' }).click();
    
    // 両方のレビューが表示されることを確認
    await expect(page.getByText('投稿されたレビュー (2件)')).toBeVisible();
    await expect(page.getByText('2番目の書籍')).toBeVisible();
    await expect(page.getByText('最初の書籍')).toBeVisible();
    
    // 最新のレビューが上に表示されることを確認（投稿順）
    const reviewCards = page.locator('.review-card');
    await expect(reviewCards.first()).toContainText('2番目の書籍');
  });

  test('空のフィールドでの投稿はバリデーションエラーが表示される', async ({ page }) => {
    // 空の状態で投稿ボタンをクリック
    await page.getByRole('button', { name: 'レビューを投稿' }).click();
    
    // アラートが表示されることを確認
    page.on('dialog', dialog => {
      expect(dialog.message()).toBe('すべてのフィールドを入力してください');
      dialog.accept();
    });
    
    // フィールドがrequiredであることを確認
    await expect(page.getByLabel('書籍タイトル')).toHaveAttribute('required');
    await expect(page.getByLabel('URL')).toHaveAttribute('required');
    await expect(page.getByLabel('レビュワー（名前）')).toHaveAttribute('required');
    await expect(page.getByLabel('書籍レビュー本文')).toHaveAttribute('required');
  });

  test('レスポンシブデザインが正しく動作する', async ({ page }) => {
    // デスクトップ表示を確認
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: '書籍レビューアプリ' })).toBeVisible();
    await expect(page.getByLabel('書籍タイトル')).toBeVisible();
    
    // モバイル表示を確認
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: '書籍レビューアプリ' })).toBeVisible();
    await expect(page.getByLabel('書籍タイトル')).toBeVisible();
    await expect(page.getByLabel('URL')).toBeVisible();
    await expect(page.getByLabel('レビュワー（名前）')).toBeVisible();
    await expect(page.getByLabel('書籍レビュー本文')).toBeVisible();
  });
});
