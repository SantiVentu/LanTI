import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.5 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2800);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
// detalle del sector cálido (derecha-centro)
await page.screenshot({ path: "shot-detail.png", clip: { x: 700, y: 120, width: 760, height: 520 } });
await browser.close();
console.log("ok");
