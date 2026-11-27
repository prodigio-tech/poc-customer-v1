"use strict";

const apickliModule = require("apickli");
const { Before, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(10 * 1000); // ms

Before(function () {
  const host = "organization_hostname".replace(/^https?:\/\//, "");
  const basePath = "base_path";
  console.log(`Test Base URI: https://${host}${basePath}`);
  this.apickli = new apickliModule.Apickli("https", `${host}${basePath}`);
  this.apickli.addRequestHeader("Cache-Control", "no-cache");
});

Before({ tags: "not @sin-apikey" }, function () {
  this.apickli.addRequestHeader("x-apikey", process.env.APIKEY || "");
});
