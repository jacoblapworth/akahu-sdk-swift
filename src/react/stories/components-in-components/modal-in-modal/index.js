// Libs
import React, { Component } from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../modal';
import XUIButton from '../../../button';
import DropDown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import * as lists from '../../../components/helpers/list';

import { nonBackstopStoryNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

const buildDropdownPicklist = items => {
  const pickItems = items.map((text, id) => (
    <Pickitem id={text} isSelected={false} key={id}>
      {text}
    </Pickitem>
  ));
  return (
    <DropDown>
      <Picklist>{pickItems}</Picklist>
    </DropDown>
  );
};

const buildTrigger = text => <XUIButton hasCaret>{text}</XUIButton>;

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <div>
        <XUIButton onClick={() => this.setState({ showModal: true })}>First modal</XUIButton>
        <XUIModal
          closeButtonLabel="Close"
          isOpen={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
        >
          <XUIModalHeader>First modal</XUIModalHeader>
          <XUIModalBody className="xui-padding">
            <div className="xui-padding-bottom">
              This is the first layer modal
              <Example2 />
            </div>
          </XUIModalBody>
        </XUIModal>
      </div>
    );
  }
}
<Example />;

class Example2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <div>
        <XUIButton onClick={() => this.setState({ showModal: true })}>Second modal</XUIButton>
        <XUIModal
          closeButtonLabel="Close"
          isOpen={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
        >
          <XUIModalHeader>Second modal</XUIModalHeader>
          <XUIModalBody className="xui-padding">
            <div className="xui-padding-bottom" style={{ height: '1000px' }}>
              This is the second layer modal
              <DropDownToggled
                dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
                isHidden={false}
                isLegacyDisplay={false}
                repositionOnScroll
                trigger={buildTrigger('Short Trigger')}
              />
            </div>
          </XUIModalBody>
        </XUIModal>
      </div>
    );
  }
}
<Example2 />;

const test = storiesOf(compositionKind, module);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

test.add(nonBackstopStoryNames.modalInModal, () => {
  const body = document.querySelector('body.xui-container');
  if (body && body.style) {
    body.style.height = '200%';
  }
  return <Example />;
});
