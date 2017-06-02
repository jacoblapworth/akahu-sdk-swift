module.exports = {
  env: {
    jasmine: true,
    node: true
  },
  globals: {
    sinon: true
  },
  extends: ["@xero/eslint-config-xero-react-base"],
  rules: {
    "no-console": "warn",
  }
};
