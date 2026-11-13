import { test, expect } from '@playwright/test';
import { DataGenerator } from '../../utils/DataGenerator';

const url = 'https://app.thetestingacademy.com/playwright/tta-bank/dashboard';

test('Funds Transfer', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId("login-email").fill('priya.tester@ttabank.in');
    await page.getByTestId("login-password").fill('Test@1234');
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("balance-amount")).toBeVisible();
    await expect(page.getByTestId("balance-amount")).toHaveText('₹50,000');
    await expect(page.getByText("+₹50,000")).toBeVisible();
    await page.getByTestId("qa-send").click();

    await page.getByRole("option", { name: "Pay Meera Iyer" }).click();
    await page.getByTestId("send-amount").fill('5000');
    await page.getByTestId("send-category").selectOption('Travel');
    await page.getByLabel('Transfer note').fill(DataGenerator.transferNote());
    await page.getByTestId("send-submit").click();

    const confirmPopup = page.getByRole('dialog', { name: 'Confirm transfer' });
    await expect(confirmPopup).toContainText('Meera Iyer');
    await expect(confirmPopup).toContainText('₹5,000');
    await expect(confirmPopup).toContainText('Travel');
    await confirmPopup.getByRole('button', { name: 'Confirm and send' }).click();

    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page.getByTestId("balance-amount")).toHaveText('₹45,000');
    const debitRow = page.getByRole('table', { name: 'Recent transactions table' })
        .getByRole('row')
        .filter({ hasText: 'Meera Iyer' });

    await expect(debitRow).toContainText('Travel');
    await expect(debitRow).toContainText('debit');
    await expect(debitRow).toContainText('-₹5,000');

});