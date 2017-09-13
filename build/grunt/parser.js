/* eslint no-console: 0*/
const postcss = require('postcss');
const syntax = require('postcss-scss');
const { templates, types } = require('../../kss/builder/parser/constants');
const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

const ignoreStart = '@tokenparserstartignore';
const ignoreEnd = '@tokenparserendignore';

const outputDir =  './src/sass/tmp'
const disclaimer = `/* This file is generated by ./build/grunt/parser.js. All changes to this file will be eaten.*/\n`;

templates.forEach(function (template) {
	const sourceFileContent = fs.readFileSync(template.source, {encoding: 'utf8'});
	const trimFileRegex = new RegExp(`(${ignoreStart}(?:.|\n)*?${ignoreEnd})`, 'gm');
	const scss = sourceFileContent.replace(trimFileRegex, '');

	postcss()
		.process(scss, {syntax: syntax})
		.then(function (result) {
			const nodes = result.root.nodes;
			const html = parseCss(template, nodes, template.source);
			const outputFileName = path.join(outputDir,path.basename(template.source));

			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir);
			}
			fs.writeFileSync(outputFileName, disclaimer + html.join('\n'));
		}).catch(function (e) { console.log(e) });
});

function parseCss(template, nodes, source) {
	const sections = [];
	let majorNumber = 100;
	let sectionCounter = 0;
	let firstSection = true;

	nodes.forEach(function (node) {
		if (node.type === 'comment') {
			const headingRegexMatch = /@section\s*([\w\s]*)/.exec(node.text);
			const typeRegexMatch = /@type\s*([\S]*)/.exec(node.text);
			const descriptionRegexMatch = /@description\s*(.*)/.exec(node.text);

			if (headingRegexMatch != null) {
				const styleGuide = template.isSubsection
					? `${template.name}.${majorNumber}.${sectionCounter}`
					: `${template.name}.${sectionCounter + majorNumber}`;

				if (!firstSection) {
					sections.push(`//`,`// Styleguide: ${template.section}.${styleGuide}`, ``);
				} else {
					firstSection = false;
				}
				sections.push(`// ${headingRegexMatch[1].trim()}`, '//');
				sectionCounter += 1;
			} else if (typeRegexMatch != null) {
				if (Object.values(types).includes(typeRegexMatch[1])) {
					sections.push(`// TokenType: ${typeRegexMatch[1]}`,'//','// Tokens:');
				} else {
					console.error(`Unknown type '${typeRegexMatch[1]}' found`);
				}
			} else if (descriptionRegexMatch != null) {
				sections.push(`// ${descriptionRegexMatch[1]}`,'//');
			}

		} else if (node.type === 'decl') {
			const value = compileSass(node.value, source);
			const prev = node.prev();
			const additionalInfo = (prev.type === 'comment' && prev.text != null) ? `${prev.text}` : '';

			sections.push(`// ${node.prop} : ${value} : ${additionalInfo}`);
		}
	});

	const styleGuide = template.isSubsection ? `${template.name}.${majorNumber}.${sectionCounter}` : `${template.name}.${sectionCounter + majorNumber}`;
	sections.push(`//`,`// Styleguide: ${template.section}.${styleGuide}`, ``);
	return sections;
}

function compileSass(expression, source) {
	const result = sass.renderSync({
		includePaths: [source],
		data: `@import '${source}';\n#postCssOutput{content: ${expression} }`,
		outputStyle: 'compressed',
		sourceMap: false
	});
	return result.css.toString().match(/#postCssOutput{content:(.*)}/)[1];
}
