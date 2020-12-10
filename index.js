require('dotenv').config();
const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto('https://unsplash.com/')
  await page.click('[href="/login"]')

  await page.type('[name="user[email]"]', process.env.UNSPLASH_EMAIL)
  await page.type('[name="user[password]"]', process.env.UNSPLASH_PASS)
  await page.click('[type="submit"]')

  await page.waitForNavigation();

  await page.click('[title="Your personal menu button"]')
  await page.click('[href="/account"]')
  const account = await page.evaluate(() => {
     return {
       firstName: document.querySelector('[name="user[first_name]"]').value,
       lastName: document.querySelector('[name="user[last_name]"]').value,
       email: document.querySelector('[name="user[email]"]').value,
     }
  });

  console.log(account)

  // await page.screenshot({path: 'screenshot.png'})
  // await browser.close()
})();
