require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/pdf", async (req, res) => {
  const url = process.env.WEBSITE_URL;

  const browser = await puppeteer.launch({
    headless: true,
  });

  const webPage = await browser.newPage();

  await webPage.goto(url, {
    waitUntil: "networkidle0",
  });

  await webPage.emulateMediaType("screen");

  const pdf = await webPage.pdf({
    printBackground: true,
  });

  await browser.close();

  res.contentType("application/pdf");
  res.send(pdf);
});

app.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
