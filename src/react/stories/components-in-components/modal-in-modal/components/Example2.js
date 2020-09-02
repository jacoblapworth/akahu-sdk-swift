import React, { Component } from 'react';
import DropDown, { DropDownToggled } from '../../../../dropdown';
import Picklist, { Pickitem } from '../../../../picklist';
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../../modal';
import XUIButton, { XUIButtonCaret } from '../../../../button';
import * as lists from '../../../../components/helpers/list';

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

const buildTrigger = text => (
  <XUIButton>
    {text}
    <XUIButtonCaret />
  </XUIButton>
);

class Example2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <XUIButton onClick={() => this.setState({ showModal: true })}>Second modal</XUIButton>
        <XUIModal
          closeButtonLabel="Close"
          isOpen={showModal}
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

export default Example2;
