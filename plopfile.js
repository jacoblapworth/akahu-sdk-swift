const { pathCase, xuiCase } = require('./.plop/helpers');

const defaultAddActionConfig = {
  skipIfExists: true,
  type: 'add',
};

const defaultModifyActionConfig = {
  pattern: /(\/\* PLOP_INJECT_IMPORT \*\/)/,
  type: 'modify',
};

const generator = plop => {
  plop.setHelper('pathCase', pathCase);
  plop.setHelper('xuiCase', xuiCase);

  plop.setGenerator('newComponent', {
    description: 'Add a new component',
    prompts: [
      {
        type: 'input',
        name: 'displayName',
        message: 'Component display name, e.g. “New component”',
      },
    ],
    actions: [
      {
        ...defaultAddActionConfig,
        path: './src/docs/components/_{{pathCase displayName}}.scss',
        templateFile: '.plop/templates/kssDocs.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/react/{{pathCase displayName}}.md',
        templateFile: '.plop/templates/reactDocs.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/react/{{pathCase displayName}}.ts',
        templateFile: '.plop/templates/exports.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/react/components/{{pathCase displayName}}/{{xuiCase displayName}}.d.ts',
        templateFile: '.plop/templates/typeDefs.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/react/components/{{pathCase displayName}}/{{xuiCase displayName}}.js',
        templateFile: '.plop/templates/component.hbs',
      },
      {
        ...defaultAddActionConfig,
        path:
          './src/react/components/{{pathCase displayName}}/__tests__/{{xuiCase displayName}}-test.js',
        templateFile: '.plop/templates/unitTests.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/react/components/{{pathCase displayName}}/stories/stories.js',
        templateFile: '.plop/templates/storybookStories.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/react/components/{{pathCase displayName}}/stories/variations.js',
        templateFile: '.plop/templates/storybookVariations.hbs',
      },
      {
        ...defaultAddActionConfig,
        path: './src/sass/7-components/_{{pathCase displayName}}.scss',
        templateFile: '.plop/templates/scss.hbs',
      },
      {
        type: 'append',
        path: './.styleguidist/sections.json',
        pattern: '"sections": [',
        templateFile: './.plop/templates/styleguidistConfig.hbs',
      },
      {
        ...defaultModifyActionConfig,
        path: './.visual-testing/index.js',
        templateFile: './.plop/templates/storybookConfig.hbs',
      },
      {
        ...defaultModifyActionConfig,
        path: './src/sass/xui.scss',
        template: "@import '7-components/{{pathCase displayName}}';\n$1",
      },
    ],
  });
};

module.exports = generator;
