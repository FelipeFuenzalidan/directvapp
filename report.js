const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonFile: 'e2e/report/selfareAppReport.json',
  output: 'e2e/report/selfareAppReport.html',
  name: 'SelfCare App Report',
  brandTitle: 'Directv Automation Report',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
}

reporter.generate(options)
