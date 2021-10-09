const puppeteer = require('puppeteer');

export class Utility {

    async switchTab(targetPage) {
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
        const [page] = await browser.pages();
        await page.goto(targetPage);
    }

}

export const utility = new Utility();