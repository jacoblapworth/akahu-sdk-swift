'use strict';

/**
 * This module is a sub class of https://github.com/kss-node/kss-node/blob/063fd5039fb7f773a2087b2349dbaaf36aa724f9/builder/handlebars/builder.js
 * This module does three things for XUI.
 * 1. In the constructor we register a new config option for child pages. This enables the child-pages property to work in config.json.
 * 2. We overwrite `buildGuide`. This is a shame. It's a huge method and we only modify the latter part that manages iterating over sections
 *    and adding them to the buidTasks queue. The key thing is calling `buildPage` with the correct section so we get a full HTML page
 *    generated for the correct section. This has been structured to include numeric sections for any page and to not include sub sections that
 *    should render their own page.
 *    If there is a better way to hook this we should find it and refactor this. Its a bit risky overwritting such a large method.
 * 3. Overwrite `createMenu`. This changes the KSS behaviour of parent, children and a gradChild flag to using a recursive menu.
 *
 * @module kss/builder/handlebars
 */

const KssBuilderBaseHandlebars = require('kss/builder/handlebars');
const path = require('path');
const Promise = require('bluebird');
const glob = Promise.promisify(require('glob'));

/**
 * A kss-node builder that takes input files and builds a style guide using
 * Handlebars templates.
 */
class KssBuilderHandlebars extends KssBuilderBaseHandlebars {

	constructor() {
		// First call the constructor of KssBuilderBaseHandlebars.
		super();

		// Then tell kss which Yargs-like options this builder adds.
		this.addOptionDefinitions({
			"child-pages": {
				group: 'Style guide:',
				string: true,
				describe: 'List of Sections to treat sub sections as child pages',
			}
		});
	}

	/**
	 * A helper method that can be used by sub-classes of KssBuilderBase when
	 * implementing their build() method.
	 * The following options are required to use this helper method:
	 * - readBuilderTemplate: A function that returns a promise to read/load a
	 *   template provided by the builder.
	 * - readSectionTemplate: A function that returns a promise to read/load a
	 *   template specified by a section.
	 * - loadInlineTemplate: A function that returns a promise to load an inline
	 *   template from markup.
	 * - loadContext: A function that returns a promise to load the data context
	 *   given a template file path.
	 * - getTemplate: A function that returns a promise to get a template by name.
	 * - templateRender: A function that renders a template and returns the
	 *   markup.
	 * - filenameToTemplateRef: A function that converts a filename into a unique
	 *   name used by the templating system.
	 * - templateExtension: A string containing the file extension used by the
	 *   templates.
	 * - emptyTemplate: A string containing markup for an empty template.
	 *
	 * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
	 * @param {object} options The options necessary to use this helper method.
	 * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to a
	 *   `KssStyleGuide` object.
	 */
	buildGuide(styleGuide, options) {
		let readBuilderTemplate = options.readBuilderTemplate,
			readSectionTemplate = options.readSectionTemplate,
			loadInlineTemplate = options.loadInlineTemplate,
			loadContext = options.loadContext,
			// getTemplate = options.getTemplate,
			// templateRender = options.templateRender,
			filenameToTemplateRef = options.filenameToTemplateRef,
			templateExtension = options.templateExtension,
			emptyTemplate = options.emptyTemplate;

		this.styleGuide = styleGuide;
		this.sectionTemplates = {};

		if (typeof this.templates === 'undefined') {
			this.templates = {};
		}

		let buildTasks = [],
			readBuilderTask;

		// Optionally load/compile the index template.
		if (typeof this.templates.index === 'undefined') {
			readBuilderTask = readBuilderTemplate('index').then(template => {
				this.templates.index = template;
				return Promise.resolve();
			});
		} else {
			readBuilderTask = Promise.resolve();
		}

		// Optionally load/compile the section template.
		if (typeof this.templates.section === 'undefined') {
			readBuilderTask = readBuilderTask.then(() => {
				return readBuilderTemplate('section').then(template => {
					this.templates.section = template;
					return Promise.resolve();
				}).catch(() => {
					// If the section template cannot be read, use the index template.
					this.templates.section = this.templates.index;
					return Promise.resolve();
				});
			});
		}

		// Optionally load/compile the item template.
		if (typeof this.templates.item === 'undefined') {
			readBuilderTask = readBuilderTask.then(() => {
				return readBuilderTemplate('item').then(template => {
					this.templates.item = template;
					return Promise.resolve();
				}).catch(() => {
					// If the item template cannot be read, use the section template.
					this.templates.item = this.templates.section;
					return Promise.resolve();
				});
			});
		}
		buildTasks.push(readBuilderTask);

		let sections = this.styleGuide.sections();

		if (this.options.verbose && this.styleGuide.meta.files) {
			this.log(this.styleGuide.meta.files.map(file => {
				return ' - ' + file;
			}).join('\n'));
		}

		if (this.options.verbose) {
			this.log('...Determining section markup:');
		}

		let sectionRoots = [];

		// Save the name of the template and its context for retrieval in
		// buildPage(), where we only know the reference.
		let saveTemplate = template => {
			this.sectionTemplates[template.reference] = {
				name: template.name,
				context: template.context,
				filename: template.file,
				exampleName: template.exampleName,
				exampleContext: template.exampleContext
			};

			return Promise.resolve();
		};

		sections.forEach(section => {
			// Accumulate an array of section references for all sections at the root
			// of the style guide.
			let currentRoot = section.reference().split(/(?:\.|\ \-\ )/)[0];
			if (sectionRoots.indexOf(currentRoot) === -1) {
				sectionRoots.push(currentRoot);
			}

			if (!section.markup()) {
				return;
			}

			// Register all the markup blocks as templates.
			let template = {
				name: section.reference(),
				reference: section.reference(),
				file: '',
				markup: section.markup(),
				context: {},
				exampleName: false,
				exampleContext: {}
			};

			// Check if the markup is a file path.
			if (template.markup.search('^[^\n]+\.(html|' + templateExtension + ')$') === -1) {
				if (this.options.verbose) {
					this.log(' - ' + template.reference + ': inline markup');
				}
				buildTasks.push(
					loadInlineTemplate(template.name, template.markup).then(() => {
						return saveTemplate(template);
					})
				);
			} else {
				// Attempt to load the file path.
				section.custom('markupFile', template.markup);
				template.file = template.markup;
				template.name = filenameToTemplateRef(template.file);

				let findTemplates = [],
					matchFilename = path.basename(template.file),
					matchExampleFilename = 'kss-example-' + matchFilename;
				this.options.source.forEach(source => {
					let returnFilesAndSource = function (files) {
						return {
							source: source,
							files: files
						};
					};
					findTemplates.push(glob(source + '/**/' + template.file).then(returnFilesAndSource));
					findTemplates.push(glob(source + '/**/' + path.join(path.dirname(template.file), matchExampleFilename)).then(returnFilesAndSource));
				});
				buildTasks.push(
					Promise.all(findTemplates).then(globMatches => {
						let foundTemplate = false,
							foundExample = false,
							loadTemplates = [];
						for (let globMatch of globMatches) {
							let files = globMatch.files,
								source = globMatch.source;
							if (!foundTemplate || !foundExample) {
								for (let file of files) {
									// Read the template from the first matched path.
									let filename = path.basename(file);
									if (!foundTemplate && filename === matchFilename) {
										foundTemplate = true;
										section.custom('markupFile', path.relative(source, file));
										template.file = file;
										loadTemplates.push(
											readSectionTemplate(template.name, file).then(() => {
												/* eslint-disable max-nested-callbacks */
												return loadContext(file).then(context => {
													template.context = context;
													return Promise.resolve();
												});
												/* eslint-enable max-nested-callbacks */
											})
										);
									} else if (!foundExample && filename === matchExampleFilename) {
										foundExample = true;
										template.exampleName = 'kss-example-' + template.name;
										loadTemplates.push(
											readSectionTemplate(template.exampleName, file).then(() => {
												/* eslint-disable max-nested-callbacks */
												return loadContext(file).then(context => {
													template.exampleContext = context;
													return Promise.resolve();
												});
												/* eslint-enable max-nested-callbacks */
											})
										);
									}
								}
							}
						}

						// If the markup file is not found, note that in the style guide.
						if (!foundTemplate && !foundExample) {
							template.markup += ' NOT FOUND!';
							if (!this.options.verbose) {
								this.log('WARNING: In section ' + template.reference + ', ' + template.markup);
							}
							loadTemplates.push(
								loadInlineTemplate(template.name, template.markup)
							);
						} else if (!foundTemplate) {
							// If we found an example, but no template, load an empty
							// template.
							loadTemplates.push(
								loadInlineTemplate(template.name, emptyTemplate)
							);
						}

						if (this.options.verbose) {
							this.log(' - ' + template.reference + ': ' + template.markup);
						}

						return Promise.all(loadTemplates).then(() => {
							return template;
						});
					}).then(saveTemplate)
				);
			}
		});

		return Promise.all(buildTasks).then(() => {
			if (this.options.verbose) {
				this.log('...Building style guide pages:');
				this.log('...XUI mods follow:');
			}

			let buildPageTasks = [];

			// Build the homepage.
			buildPageTasks.push(this.buildPage('index', options, null, []));

			// Group all of the sections by their root reference, and make a page for
			// each.
			sectionRoots.forEach(rootReference => {
				// Create Top level page
				const hasChildren = this.options.childPages.indexOf(rootReference) !== -1;
				if (hasChildren) {
					// If has children get all sections and build
					const sectionRootSections = this.styleGuide.sections(rootReference + '.*');

					buildPageTasks.push(this.buildPage('section', options, rootReference, [this.styleGuide.sections(rootReference)]));

					sectionRootSections.forEach(s => {
						const rootReference = s.reference();
						const refParts = rootReference.split('.');
						const hasChildren = this.options.childPages.indexOf(rootReference) !== -1;
						const offset = 1 - s.depth();
						// All sections for root reference.
						let selector = rootReference + '.*';

						// Don't build full section pages for sub sections that are numeric.
						if (!isNaN(refParts[refParts.length - 1])) {
							return;
						}

						if (hasChildren) {
							// Landing Pages
							// All content sections no child page sections (Selectors ending in numbers)
							selector = new RegExp(rootReference + '(\\.\\d+)*');
						}
						// query sections and offset to ensure top levels start at depth 1
						sections = this.styleGuide.sections(selector).map(s => s.depth(s.depth() + offset));
						buildPageTasks.push(this.buildPage('section', options, rootReference, sections));
					});
				} else {
					// Root pages without children (Updates, feedback, etc.)
					// All sections for root reference.
					buildPageTasks.push(this.buildPage('section', options, rootReference, this.styleGuide.sections(rootReference + '.*')));
				}
			});

			// For each section, build a page which only has a single section on it.
			// istanbul ignore else
			if (this.templates.item) {
				sections.forEach(section => {
					buildPageTasks.push(this.buildPage('item', options, section.reference(), [section]));
				});
			}

			if (this.options.verbose) {
				this.log('...XUI mods end.');
			}
			return Promise.all(buildPageTasks);
		}).then(() => {
			// We return the KssStyleGuide, just like KssBuilderBase.build() does.
			return Promise.resolve(styleGuide);
		});
	}

	/**
	* Create custom nested menu based on custom property child-pages
	*
	* @param {string} pageReference The reference of the root section of the page
	*   being built.
	* @returns {Array} An array of menu items that can be used as a template
	*   variable.
	*/
	createMenu(pageReference) {
		// Helper function that converts a section to a menu item.
		// sections have a custom toJSON method that combines the section classes meta and data
		// properties. Leaving this the same seems like the easiest thing to do
		const toMenuItem = section => {
			// @TODO: Add an option to "include" the specific properties returned.
			const menuItem = section.toJSON();

			// Remove data we definitely won't need for the menu.
			delete menuItem.markup;
			delete menuItem.modifiers;
			delete menuItem.parameters;

			// Mark the current page in the menu.
			menuItem.isActive = (menuItem.reference === pageReference);

			// Mark any "deep" menu items.
			menuItem.isGrandChild = (menuItem.depth > 2);
			return menuItem;
		};

		// Recursive function to build up the nested navigation
		// curried to take a parentHeader
		const buildMenu = (parentHeader, parentReferenceURI) => rootSection => {
			const menuItem = toMenuItem(rootSection);
			const reference = rootSection.reference();

			menuItem.children = this.styleGuide.sections(rootSection.reference() + '.*').slice(1).map(toMenuItem);
			menuItem.parentHeader = parentHeader;
			menuItem.parentReferenceURI = parentReferenceURI ? parentReferenceURI : rootSection.reference();
			// Check if the current menu item has child pages
			if (this.options.childPages.indexOf(reference) !== -1) {
				// get all child sections and remove any that are not pages
				// using a convention of a numbered section name over a string.
				const items = this.styleGuide.sections(reference + '.x').filter(x => {
					return isNaN(x.reference().split('.').pop());
				});
				// set the child pages of the current menu item
				menuItem.menu = items.map(buildMenu(menuItem.header, menuItem.referenceURI));
				menuItem.isActive = menuItem.menu.some(i => i.isActive) || menuItem.isActive;
			}

			return menuItem;
		};

		// Seed buildMenu with the top level menu items
		return this.styleGuide.sections('x').map(buildMenu(null));
	}

}

module.exports = KssBuilderHandlebars;
