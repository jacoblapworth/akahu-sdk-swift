import 'babel-core/external-helpers.js';
import React from 'react';
import XUILoader  from '../../src/XUILoader';
import { sizeClassNames }  from '../../src/private/constants.js';
import '../../bower_components/component-renderer/src/renderer.styles.scss';
import RendererUtils from 'component-renderer'

(function() {

  const loaderKeys = Object.keys(sizeClassNames);

  const XUILoaderConfig = {
    componentName : 'XUILoader',
    devReady : true,
    properties : [
      {
        name: 'className',
        type: 'string',
        default: null,
        description: 'Additional classes to be put on the loader'
      },
      {
        name: 'qaHook',
        type: 'string',
        default: null,
        description: 'Adds data-automationid attribute to the mask and the loader'
      },
      {
        name: 'defaultLayout',
        type: 'boolean',
        default: true,
        description: 'If the loader will use the default XUI style layout'
      },
      {
        name: 'label',
        type: 'string',
        default: null,
        description: 'Adds an aria-label attribute to the loader.'
      },
      {
        name: 'size',
        type: 'enum',
        data: loaderKeys,
        default: loaderKeys[0],
        description: 'Sets the size of the loader to be, small, standard (no class added), and large'
      }
    ]
  };

  RendererUtils.init({
    components: {
      XUILoader
    },
    configs: {
      XUILoaderConfig
    },
    defaultComponent: XUILoader,
    defaultConfig: XUILoaderConfig
  });

})();
