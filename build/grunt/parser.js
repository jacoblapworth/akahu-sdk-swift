const postcss = require('postcss');
const syntax = require('postcss-scss');
const { templates, types, regexDictionary } = require('../../kss/builder/parser/constants');
const sass = require('node-sass');
const fs = require('fs');

const ignoreLine = 'xuidoc:ignore';
const ignoreStart = 'xuidoc:ignore:start';
const ignoreEnd = 'xuidoc:ignore:end';

const outputDir =  './src/sass/tmp'
const disclaimer = `/* This file is generated by ./build/grunt/parser.js. All changes to this file will be eaten.*/\n`;

templates.forEach(function (template) {
	const sourceFileContent = fs.readFileSync(template.source, {encoding: 'utf8'});
	const scss = stripIgnoredContent(sourceFileContent);

	postcss()
		.process(scss, {syntax: syntax})
		.then(function (result) {
			const nodes = result.root.nodes;
			const html = parseCss(template, nodes);

			try {
				fs.mkdirSync(outputDir);
			} catch (e) {} // eslint-disable-line no-empty
			fs.writeFileSync(makeOutputAddress(template.name), disclaimer + html.join('\n'));
			return;
		}).catch(function (e) { console.log(e) }); // eslint-disable-line no-console
});

function stripIgnoredContent(content) {
	const newContentLines = [];
	let isIgnoring = false;

	content.split('\n').forEach(function(line) {
		if(isIgnoring && line.includes(ignoreEnd)) {
			isIgnoring = false;
		} else if(line.includes(ignoreStart)) {
			isIgnoring = true;
		} else if(!isIgnoring && !line.includes(ignoreLine)) {
			newContentLines.push(line);
		}
	});

	return newContentLines.join('\n');
}

function makeOutputAddress(name) {
	return outputDir + '/_' + name.toLowerCase() + '.scss';
}

function parseCss(template, nodes) {
	const sections = [];
	const renderType = template.isGrid ? 'ColorTokens' : 'Tokens';
	const variables = {};

	let majorNumber = 100;
	let sectionCounter = 0;
	let shouldIgnore = false;
	let newSection = true;
	let type = null;
	let firstSection = true;

	nodes.forEach(function (node) {
		if (isComment(node)) {
			if (node.text === '@tokenparserendignore') {
				shouldIgnore = false;
				return;
			} else if (node.text === '@tokenparserignore'){
				shouldIgnore = true;
				return;
			}
			const headingRegexMatch = /@section\s*([\w\s]*)/.exec(node.text);
			const typeRegexMatch = /@type\s*([\w]*)/.exec(node.text);

			if (headingRegexMatch != null) {
				const styleGuide = template.isSubsection
					? `${template.name}.${majorNumber}.${sectionCounter}`
					: `${template.name}.${sectionCounter + majorNumber}`;

				if (!firstSection) {
					sections.push(`//`,`// Styleguide: ${styleGuide}`, ``);
				} else {
					firstSection = false;
				}
				sectionCounter += 1;
				sections.push(`// ${headingRegexMatch[1].trim()}`);
				sections.push('//');
				newSection = true;
			}

			if (typeRegexMatch != null) {
				type = typeRegexMatch[1];
			}

		} else if (node.type === 'decl') {
			// replace any variable references with the value
			let value = node.value.replace(regexDictionary.sassVariables, function (varName) {
				return variables[varName];
			});

			// compile any special sass functions
			if (regexDictionary.rgbaWithHex.test(value) || regexDictionary.mixedFunction.test(value)) {
				value = compileSass(value);
			}
			variables[node.prop] = value;

			const variable = translateVariable(node.prop, value, getType(node.prop, value) || type);

			if (!shouldIgnore) {
				if (newSection) {
					sections.push(`// ${renderType}:`);
					newSection = false;
				}
				const line = (renderType === "ColorTokens")
					? `// ${variable.value}${colourInformation(node)}`
					: `// ${variable.value}`;

				sections.push(line);
			}
		}
	});

	const styleGuide = template.isSubsection ? `${template.name}.${majorNumber}.${sectionCounter}` : `${template.name}.${sectionCounter + majorNumber}`;
	sections.push(`//`,`// Styleguide: ${styleGuide}`, ``);
	return sections;
}

function colourInformation(node) {
	const prev = node.prev();
	return (prev.type === 'comment' && prev.raws.inline && prev.text !== undefined)
		? `: ${prev.text}`
		: '';
}

function isComment(node) {
	return node.type === 'comment' && node.source.start.column < 2 && !!node.raws.inline;
}

function compileSass(expression) {
	const result = sass.renderSync({
		data: '.abc { border: ' + expression + ' }',
		outputStyle: 'compressed',
		sourceMap: false
	});
	return result.css.toString().match(regexDictionary.compiledSass)[1];
}

function translateVariable(name, value, type) {

	if (regexDictionary.rem.test(value)) {
		value = (value.match(regexDictionary.rem)[1] * 16) + 'px';
	}
	return {
		value: `${name} : ${value} : ${type}`
	};
}

function getType(name, value) {
	let type = '';

	if (regexDictionary.lineHeight.test(name)) {
		type = types.lineHeight;

	} else if (regexDictionary.fontWeight.test(name)) {
		type = types.fontWeight;

	} else if (regexDictionary.size.test(value)) {

		if (regexDictionary.font.test(name)) {
			type = types.fontSize;

		} else if(regexDictionary.spacing.test(name)) {
			type = types.spacing;
		}

	}

	return type;
}
