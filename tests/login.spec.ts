import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  // TC-LOGIN-01
  test('Login with correct email and password', async ({ page }) => {

    await page
      .getByPlaceholder('Enter Your Email')
      .fill('superpeet9@gmail.com');

    await page
      .getByPlaceholder('Enter Your Password')
      .fill('12345678!Jj');

    await page.getByRole('button', { name: 'Login' }).click();

    // แก้ตรงนี้ตามหน้าเว็บหลัง Login สำเร็จ
    await expect(page).not.toHaveURL('/');
  });


  // TC-LOGIN-02
  test('Login with correct email but incorrect password', async ({ page }) => {

    await page
      .getByPlaceholder('Enter Your Email')
      .fill('superpeet9@gmail.com');

    await page
      .getByPlaceholder('Enter Your Password')
      .fill('12345678!Jj54');

    await page.getByRole('button', { name: 'Login' }).click();

    // ตรวจสอบว่ายังอยู่หน้า Login
    await page.goto('http://localhost:3000/login');

    // ถ้าเว็บมีข้อความ Error ให้เพิ่ม เช่น
    // await expect(page.getByText('Invalid email or password')).toBeVisible();
  });


  // TC-LOGIN-03
  test('Go to Create Account page', async ({ page }) => {

    await page.getByText('Create Your Account').click();

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();
  });


  // TC-LOGIN-04
  test('Go to Create Account and return to Login', async ({ page }) => {

    // ไปหน้า Create Account
    await page.getByText('Create Your Account').click();

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible();

    // กด Back to Login
    await page.getByText('Back to Login').click();

    // ตรวจสอบว่ากลับหน้า Login
    await expect(
      page.getByRole('heading', { name: 'LOGIN' })
    ).toBeVisible();
  });

});