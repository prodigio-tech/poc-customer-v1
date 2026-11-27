const reporter = require("cucumber-html-reporter");

reporter.generate({
  theme: "bootstrap",
  jsonFile: "./report.json",
  output: "./cucumber_report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "API": "poc-customer-v1",
    "Test Environment": "environment",
    "Platform": "GitHub Actions",
  },
});
