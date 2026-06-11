export default {
  port: 4173,
  extends: 'lighthouse:default',
  settings: {
    throttlingMethod: 'devtools',
    onlyCategories: ['performance', "accessibility", "best-practices"],
  },
}
