import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('POM with Login Page Simple', () => {
    test('Login with valid credns', async ({ page }) => {

            // With POM
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login("standard_user","tta_secret");
            await expect(page).toHaveTitle("TTACart - Products");

    });
});
