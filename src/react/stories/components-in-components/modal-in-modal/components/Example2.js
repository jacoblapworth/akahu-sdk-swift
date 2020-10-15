import React, { Component } from 'react';
import XUIDropdown, { XUIDropdownToggled } from '../../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../../picklist';
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../../modal';
import XUIButton from '../../../../button';
import * as lists from '../../../../components/helpers/list';

const buildDropdownPicklist = items => {
  const pickItems = items.map((text, id) => (
    <XUIPickitem id={text} isSelected={false} key={id}>
      {text}
    </XUIPickitem>
  ));
  return (
    <XUIDropdown>
      <XUIPicklist>{pickItems}</XUIPicklist>
    </XUIDropdown>
  );
};

const buildTrigger = text => <XUIButton hasCaret>{text}</XUIButton>;

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
              <XUIDropdownToggled
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

export default Example2;
