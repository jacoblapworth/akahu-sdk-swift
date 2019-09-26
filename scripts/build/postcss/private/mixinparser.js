/* eslint no-console: 0*/

module.exports = (template, root) => {
  const sections = [];
  let sectionCounter = 1;

  root.walkAtRules(node => {
    const prev = node.prev();
    if (prev == null || prev.type !== 'comment') {
      return;
    }

    const ruleName = getRuleName(node.params);
    const params = getParams(node.params);
    let description = prev.text;

    if (params != null) {
      Object.keys(params).forEach(param => {
        if (params[param] != null) {
          description = description.replace(param, `${param} = ${params[param]}`);
        }
      });
    }
    const paramSection = params != null ? `(${Object.keys(params).join(', ')})` : '';
    sections.push(`// ${ruleName}${paramSection}`, '//');
    description.split('\n').forEach(line => sections.push(`// ${line}`));
    sections.push(
      `//`,
      `// Styleguide: ${template.section}.${template.page}.${template.name}.${sectionCounter}`,
      ``,
    );
    sectionCounter++;
  });
  return sections;
};

const getParams = mixin => {
  const bracketRegex = /\((.*)\)/;
  const paramSplitRegex = /([^:]+)(?:\s*:\s*([^:]+))?/;
  const bracketRegexMatch = mixin.match(bracketRegex);
  if (bracketRegexMatch == null) {
    return null;
  }
  return bracketRegexMatch[1].split(',').reduce((params, param) => {
    const paramRegexMatch = param.match(paramSplitRegex);
    if (paramRegexMatch != null) {
      params[paramRegexMatch[1].trim()] = paramRegexMatch[2] ? paramRegexMatch[2].trim() : null;
    }
    return params;
  }, {});
};

const getRuleName = mixin => {
  return mixin.match(/[\w-]+/)[0];
};
