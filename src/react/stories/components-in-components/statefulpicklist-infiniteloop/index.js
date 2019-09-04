// Libs
import React from 'react';

// Components we need to test with
import Picklist, { Pickitem } from '../../../picklist';
import { DropDownFooter } from '../../../dropdown';
import XUIAutoCompleter from '../../../autocompleter';

import { nonBackstopStoryNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

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
    state = {
      loading: false,
      value: '',
    };

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
      return (
        <div id="spl-wrapper" ref={comp => (this._rootNode = comp)} style={{ width: '300px' }}>
          <XUIAutoCompleter
            loading={this.state.loading}
            className="xui-u-fullwidth"
            footer={this.renderFooter(false)}
            onSearch={this.onSearch}
            value={this.state.value}
            inputLabel="label here"
            isInputLabelHidden
            openOnFocus
            loadingLabel="Loading"
          >
            <Picklist>
              {[1, 2, 3, 4].map(item => (
                <Pickitem key={item} id={item}>
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
