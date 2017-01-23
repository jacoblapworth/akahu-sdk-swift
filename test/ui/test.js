import 'babel-core/external-helpers.js';
import React from 'react';
import XUILoader  from '../../src/XUILoader';

import '../../bower_components/component-renderer/src/renderer.styles.scss';

import {default as RendererUtils} from 'component-renderer';

(function() {

  const XUILoaderConfig = {
    componentName : 'XUILoader',
    devReady : true,
    properties : [
      {
        name: 'className',
        type: 'text',
        default: '',
        description: 'Additional classes to be put on the loader'
      },
      {
        name: 'qaHook',
        type: 'text',
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
        type: 'text',
        default: '',
        description: 'Adds an aria-label attribute to the loader.'
      }

    ]
  };


  const ExampleConfig = {
    componentName : 'Example',
    devReady : true,
    properties : [...XUILoaderConfig.properties]
};

  class Example extends React.Component {

    constructor(props) {
      super(props);

      this.state = this.props;
    }

    componentDidUpdate(prevProps) {
      Object.keys(prevProps).forEach(propName => {
        if (this.props[propName] !== prevProps[propName]) {
        this.setState({
          [propName]: this.props[propName]
        });
      }
    });
    }

    render () {
      return (
        <div>
          <XUILoader qaHook="my-id" label="Something is loading, please wait" />
          <XUILoader size="small" label="Something is loading, please wait" />
          <XUILoader size="large" label="Something is loading, please wait" />
          <XUILoader defaultLayout={false} size="large" label="Something is loading, please wait" />
        </div>
        )

    }

  }

  RendererUtils.init({
    components : {
      Example,
      XUILoader,
    },
    configs : {
      ExampleConfig,
      XUILoaderConfig,
    },
    defaultComponent : Example,
    defaultConfig: ExampleConfig
  });

})();
