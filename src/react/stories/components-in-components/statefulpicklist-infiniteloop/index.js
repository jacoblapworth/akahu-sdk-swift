// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

// Components we need to test with
import Picklist, { Pickitem } from '../../../picklist';
import { DropDownFooter } from '../../../dropdown';
import XUIAutoCompleter from '../../../autocompleter';

import { nonBackstopStoryNames, compositionKind } from '../tests';

const test = storiesOf(compositionKind, module);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

test.add(nonBackstopStoryNames.inifiniteStatefulPicklist, () => {
  const ConditionalRender = ({ shouldRender, render, children }) => {
    if (render) {
      return shouldRender ? render : null;
    }
    return shouldRender ? children : null;
  };

  class BasicStatefulPicklist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        value: '',
      };
    }

    onSearch = value => {
      this.setState(() => ({
        loading: true,
        value,
      }));
    };

    onSelect = () => {};

    renderFooter = shouldRender => (
      <ConditionalRender shouldRender={shouldRender}>
        <DropDownFooter
          pickItems={
            <Pickitem id="footerAction" onSelect={this.onSelect}>
              <span>Add New Fruit</span>
            </Pickitem>
          }
        />
      </ConditionalRender>
    );

    render() {
      const { loading, value } = this.state;
      return (
        <div id="spl-wrapper" ref={comp => (this._rootNode = comp)} style={{ width: '300px' }}>
          <XUIAutoCompleter
            className="xui-u-fullwidth"
            footer={this.renderFooter(false)}
            inputLabel="label here"
            isInputLabelHidden
            loading={loading}
            loadingLabel="Loading"
            onSearch={this.onSearch}
            openOnFocus
            value={value}
          >
            <Picklist>
              {[1, 2, 3, 4].map(item => (
                <Pickitem id={item} key={item}>
                  {item}
                </Pickitem>
              ))}
            </Picklist>
          </XUIAutoCompleter>
        </div>
      );
    }
  }

  return <BasicStatefulPicklist />;
});
