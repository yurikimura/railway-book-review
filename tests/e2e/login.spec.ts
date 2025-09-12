import { test, expect } from '@playwright/test';

test.describe('ログイン画面のE2Eテスト', () => {
  test.beforeEach(async ({ page }) => {
    // ログイン画面に移動
    await page.goto('/');
  });

  test('ログインフォームが正しく表示される', async ({ page }) => {
    // ページタイトルを確認
    await expect(page).toHaveTitle(/Vite \+ React/);
    
    // ログインタイトルが表示されることを確認
    await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
    
    // フォーム要素が存在することを確認
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // メールアドレス入力フィールドが存在することを確認
    const emailInput = page.getByLabel('メールアドレス');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
    
    // パスワード入力フィールドが存在することを確認
    const passwordInput = page.getByLabel('パスワード');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('placeholder', 'パスワードを入力');
    
    // ログインボタンが存在することを確認
    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveAttribute('type', 'submit');
  });

  test('フォーム入力と送信が正しく動作する', async ({ page }) => {
    // メールアドレスを入力
    const emailInput = page.getByLabel('メールアドレス');
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
    
    // パスワードを入力
    const passwordInput = page.getByLabel('パスワード');
    await passwordInput.fill('password123');
    await expect(passwordInput).toHaveValue('password123');
    
    // フォーム送信を監視
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    // ログインボタンをクリック
    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await loginButton.click();
    
    // コンソールログが出力されることを確認
    await page.waitForTimeout(100); // ログ出力を待つ
    expect(consoleLogs.some(log => log.includes('ログイン試行:'))).toBeTruthy();
  });

  test('必須フィールドのバリデーションが動作する', async ({ page }) => {
    // 空の状態でログインボタンをクリック
    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await loginButton.click();
    
    // メールアドレスフィールドがrequiredであることを確認
    const emailInput = page.getByLabel('メールアドレス');
    await expect(emailInput).toHaveAttribute('required');
    
    // パスワードフィールドがrequiredであることを確認
    const passwordInput = page.getByLabel('パスワード');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('レスポンシブデザインが正しく動作する', async ({ page }) => {
    // デスクトップ表示を確認
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
    
    // モバイル表示を確認
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
    await expect(page.getByLabel('メールアドレス')).toBeVisible();
    await expect(page.getByLabel('パスワード')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();
  });
});
