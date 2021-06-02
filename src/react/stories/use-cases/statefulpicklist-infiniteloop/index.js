// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';

// Components we need to test with
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import { XUIDropdownFooter } from '../../../dropdown';
import XUIAutoCompleter from '../../../autocompleter';

import { nonBackstopStoryNames, compositionKind } from '../tests';

const test = storiesOf(
  `${compositionKind}/${nonBackstopStoryNames.inifiniteStatefulPicklist}`,
  module,
);

test.add(nonBackstopStoryNames.inifiniteStatefulPicklist, () => {
  const ConditionalRender = ({ shouldRender, render, children }) => {
    if (render) {
      return shouldRender ? render : null;
    }
    return shouldRender ? children : null;
  };

  class BasicStatefulPicklist extends React.Component {
    state = {
      isLoading: false,
      value: '',
    };

    _rootNode = React.createRef();

    onSearch = value => {
      this.setState(() => ({
        isLoading: true,
        value,
      }));
    };

    onSelect = () => {};

    renderFooter = shouldRender => (
      <ConditionalRender shouldRender={shouldRender}>
        <XUIDropdownFooter
          pickItems={
            <XUIPickitem id="footerAction" onSelect={this.onSelect}>
              <span>Add New Fruit</span>
            </XUIPickitem>
          }
        />
      </ConditionalRender>
    );

    render() {
      return (
        <div id="spl-wrapper" ref={this._rootNode} style={{ width: '300px' }}>
          <XUIAutoCompleter
            className="xui-u-fullwidth"
            footer={this.renderFooter(false)}
            inputLabel="label here"
            isInputLabelHidden
            isLoading={this.state.isLoading}
            loadingAriaLabel="Loading"
            onSearch={this.onSearch}
            openOnFocus
            value={this.state.value}
          >
            <XUIPicklist>
              {[1, 2, 3, 4].map(item => (
                <XUIPickitem id={item} key={item}>
                  {item}
                </XUIPickitem>
              ))}
            </XUIPicklist>
          </XUIAutoCompleter>
        </div>
      );
    }
  }

  return <BasicStatefulPicklist />;
});
