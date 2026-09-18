import { test, expect } from '@playwright/test';

test.describe('Create Account Page', () => {

  // ทุก Test เริ่มที่หน้า Create Account
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/signin');

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
  });


  // TC-REGISTER-01.1
  test('Reject invalid email without @', async ({ page }) => {
    const email = page.getByPlaceholder('Enter Your Email');

    await email.fill('superpeet');

    await expect(email).toHaveJSProperty('validity.valid', false);
  });


  // TC-REGISTER-01.2
  test('Reject invalid email without domain', async ({ page }) => {
    const email = page.getByPlaceholder('Enter Your Email');

    await email.fill('superpeet@');

    await expect(email).toHaveJSProperty('validity.valid', false);
  });


  // TC-REGISTER-01.3
  test('Reject invalid email with incomplete domain', async ({ page }) => {
    const email = page.getByPlaceholder('Enter Your Email');

    await email.fill('superpeet@gmail');

    await expect(email).toHaveJSProperty('validity.valid', false);
  });


  // TC-REGISTER-02.1
  test('Reject password without special character, uppercase and lowercase', async ({ page }) => {

    await page
      .getByPlaceholder('Enter Your Email')
      .fill('superpeet@gmail.com');

    await page
      .getByPlaceholder('Enter Your Password')
      .fill('12345678');

    await page
      .getByPlaceholder('Confirm Your Password')
      .fill('12345678');

    await page.getByRole('button', { name: 'Sign In' }).click();

    // ต้องยังอยู่หน้า Create Account
    await expect(page).toHaveURL('http://localhost:3000/signin');

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
  });


  // TC-REGISTER-02.2
  test('Reject password without uppercase and lowercase letter', async ({ page }) => {

    await page
      .getByPlaceholder('Enter Your Email')
      .fill('superpeet@gmail.com');

    await page
      .getByPlaceholder('Enter Your Password')
      .fill('12345678!');

    await page
      .getByPlaceholder('Confirm Your Password')
      .fill('12345678!');

    await page.getByRole('button', { name: 'Sign In' }).click();

    // ต้องยังอยู่หน้า Create Account
    await expect(page).toHaveURL('http://localhost:3000/signin');

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
  });


  // TC-REGISTER-02.3
  test('Reject password without lowercase letter', async ({ page }) => {

    await page
      .getByPlaceholder('Enter Your Email')
      .fill('superpeet@gmail.com');

    await page
      .getByPlaceholder('Enter Your Password')
      .fill('12345678!J');

    await page
      .getByPlaceholder('Confirm Your Password')
      .fill('12345678!J');

    await page.getByRole('button', { name: 'Sign In' }).click();

    // ต้องยังอยู่หน้า Create Account
    await expect(page).toHaveURL('http://localhost:3000/signin');

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
  });


  // TC-REGISTER-03
  test('Create account with valid email and password', async ({ page }) => {

    // สร้าง Email ใหม่เพื่อป้องกัน Email ซ้ำใน Database
    const email = `test_${Date.now()}@gmail.com`;

    await page
      .getByPlaceholder('Enter Your Email')
      .fill(email);

    await page
      .getByPlaceholder('Enter Your Password')
      .fill('12345678!Jj');

    await page
      .getByPlaceholder('Confirm Your Password')
      .fill('12345678!Jj');

    await page.getByRole('button', { name: 'Sign In' }).click();

    // สมัครสำเร็จ → กลับไปหน้า Login
    await expect(page).toHaveURL('http://localhost:3000/login');

    await expect(
      page.getByRole('heading', { name: 'LOGIN' })
    ).toBeVisible();
  });


  // TC-REGISTER-04
  test('Return to Login from Create Account page', async ({ page }) => {

    await page.getByText('Back to Login').click();

    // ต้องกลับไปหน้า Login
    await expect(page).toHaveURL('http://localhost:3000/login');

    await expect(
      page.getByRole('heading', { name: 'LOGIN' })
    ).toBeVisible();
  });

});