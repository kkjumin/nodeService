var express = require("express");
var router = express.Router();
const axios = require("axios");
const request = require("request");
const https = require("https");

const NaverClientId = "kn4BNyrP3T3hPcYD6Lol";
const NaverClientSecret = "CkOSU7_WIz";
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/search", async (req, res, next) => {
  const { query, display, start, genre, country, yearform, yearto } = req.query;

  let contents = {};
  if (!query) {
    (contents.message = "키워드를 입력하세요"), (contents.code = "N");
  }

  let headers = {
    "X-Naver-Client-Id": NaverClientId,
    "X-Naver-Client-Secret": NaverClientSecret,
  };
  let url = "https://openapi.naver.com/v1/search/movie.json";

  try {
    const { data } = await axios.get(url, {
      params: { query, display, start, genre, country, yearform, yearto },
      headers,
    });
    contents = data;
  } catch (error) {
    console.warn(error);
  }

  res.json(contents);
});

module.exports = router;
