const puppeteer = require("puppeteer");

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("Title Page Displays Correct Text", async () => {
  const text = await page.$eval("h1.PrimaryHeading_Main", el => el.innerHTML);
  expect(text).toEqual("Tempo");
});

test("Clicking login starts oauth flow", async () => {
  await page.click("button.googleButton a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});
