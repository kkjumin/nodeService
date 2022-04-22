var express = require("express");
var router = express.Router();
const axios = require("axios");
const request = require("request");
const https = require("https");

const NaverClientId = "kn4BNyrP3T3hPcYD6Lol";
const NaverClientSecret = "CkOSU7_WIz";
const boxOfficeKey = "2489637e01ee31f9dc9182235ac7c8a2";
const boxOfficeSubKey = "405022d93ae1097603106df9de0418b6";
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/search", async (req, res, next) => {
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

router.get("/api/boxOffice", async (req, res, next) => {
  const { targetDt, itemPerPage, multiMovieYn, repNationCd, wideAreaCd } =
    req.query;

  let contents = {};

  let url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";

  try {
    const { data } = await axios.get(url, {
      params: {
        key: boxOfficeKey,
        targetDt,
        itemPerPage,
        multiMovieYn,
        repNationCd,
        wideAreaCd,
      },
    });
    contents = data;
  } catch (error) {
    console.warn(error);
  }

  res.json(contents);
});

module.exports = router;
