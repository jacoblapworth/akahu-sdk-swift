const fs = require('fs');

const cssIncludeId = 'versionSelectorCssTag';
const jsIncludeId = 'versionSelectorJsIncludeTag';
const jsRunId = 'versionSelectorJsRunTag';

const cssIncludeRegex = new RegExp(`<link id="${cssIncludeId}"[^>]*>`, 'gm');
const jsScriptRegex = new RegExp(
  `<script id="${jsIncludeId}"[\\s\\S]*<script id="${jsRunId}"[\\s\\S]*<\\/script>`,
  'gm',
);

function makeCssInclude(relativePath) {
  return `<link id="${cssIncludeId}" rel="stylesheet" href="${relativePath}/versionSelector.min.css"/>`;
}

function makeJsScripts(relativePath, xuiVersion, isReactDocs, hasReactDocs) {
  return `<script id="${jsIncludeId}" src="${relativePath}/versionSelector.min.js"></script>
<script id="${jsRunId}">
  window.renderVersionSelector("${xuiVersion}", ${isReactDocs}, ${hasReactDocs});
</script>`;
}

function rewriteWithSelector(file, xuiVersion, isReactDocs, hasReactDocs) {
  const contents = fs.readFileSync(file, 'utf-8');
  const relativePath = isReactDocs ? '../..' : '..';
  const cssInclude = makeCssInclude(relativePath);
  const scriptInclude = makeJsScripts(relativePath, xuiVersion, isReactDocs, hasReactDocs);

  const newContents = contents
    .replace(jsScriptRegex, '')
    .replace(cssIncludeRegex, '')
    .replace('</body>', `${scriptInclude}</body>`)
    .replace('</head>', `${cssInclude}</head>`);

  fs.writeFileSync(file, newContents);
}

module.exports = rewriteWithSelector;
