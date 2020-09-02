import React, { Component } from 'react';
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../../modal';
import XUIButton from '../../../../button';
import Example2 from './Example2';

class Example extends Component {
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
        <XUIButton onClick={() => this.setState({ showModal: true })}>First modal</XUIButton>
        <XUIModal
          closeButtonLabel="Close"
          isOpen={showModal}
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

export default Example;
