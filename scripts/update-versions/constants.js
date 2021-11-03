module.exports = {
  edgeRegex: /(http[s]?:\/\/edge.xero.com\/style\/xui\/)(\d+.\d+.\d+[^/]*)(\/\w+.*\w*?)/g,
  githubRegex:
    /(git(?:@|:\/\/)github\.dev\.xero\.com(?:\/|:)UXE\/xui\.git#\^?)(\d+.\d+.\d+[^/^ ]*)/g,
  umdRegex: /(assets\/xui\.umd\.)(\d+.\d+.\d+[^/]*)(\.(?:css|js))/g,
  yamlXUIRegex: /(\n\s*version: ')(\d+.\d+.\d+[^/]*)(')/g,
  yamlReactRegex: /(React\s*\n\s*version: )(\d+.\d+.\d+)(\n)/g,
};
