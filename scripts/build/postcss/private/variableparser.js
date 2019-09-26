/* eslint no-console: 0*/
const sass = require('node-sass');

module.exports = (template, root, source, types) => {
  const nodes = root.nodes;
  const sections = [];
  let majorNumber = 100;
  let sectionCounter = 0;
  let firstSection = true;

  nodes.forEach(function(node) {
    if (node.type === 'comment') {
      const headingRegexMatch = /@section\s*([\w\s]*)/.exec(node.text);
      const typeRegexMatch = /@type\s*([\S]*)/.exec(node.text);
      const descriptionRegexMatch = /@description\s*(.*)/.exec(node.text);

      if (headingRegexMatch != null) {
        const styleGuide =
          template.name != null
            ? `${template.page}.${template.name}.${sectionCounter}`
            : `${template.page}.${sectionCounter + majorNumber}`;

        if (!firstSection) {
          sections.push(`//`, `// Styleguide: ${template.section}.${styleGuide}`, ``);
        } else {
          firstSection = false;
        }
        sections.push(`// ${headingRegexMatch[1].trim()}`, '//');
        sectionCounter += 1;
      } else if (typeRegexMatch != null) {
        if (
          Object.keys(types)
            .map(type => types[type])
            .includes(typeRegexMatch[1])
        ) {
          sections.push(`// TokenType: ${typeRegexMatch[1]}`, '//', '// Tokens:');
        } else {
          console.error(`Unknown type '${typeRegexMatch[1]}' found`);
        }
      } else if (descriptionRegexMatch != null) {
        sections.push(`// ${descriptionRegexMatch[1]}`, '//');
      }
    } else if (node.type === 'decl') {
      const value = compileSass(node.value, source);
      const prev = node.prev();
      const additionalInfo = prev.type === 'comment' && prev.text != null ? `${prev.text}` : '';

      sections.push(`// ${node.prop} : ${value} : ${additionalInfo}`);
    }
  });

  const styleGuide =
    template.name != null
      ? `${template.page}.${template.name}.${sectionCounter}`
      : `${template.page}.${sectionCounter + majorNumber}`;
  sections.push(`//`, `// Styleguide: ${template.section}.${styleGuide}`, ``);
  return sections;
};

function compileSass(expression, source) {
  const result = sass.renderSync({
    includePaths: [source],
    data: `@import '${source}';\n#postCssOutput{content: ${expression} }`,
    outputStyle: 'compressed',
    sourceMap: false,
  });
  return result.css.toString().match(/#postCssOutput{content:(.*)}/)[1];
}
