import React, { Component } from 'react';
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../../modal';
import XUIButton from '../../../../button';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  render() {
    const { textLabel, settings, children } = this.props;
    const { showModal } = this.state;
    return (
      <div>
        <XUIButton onClick={() => this.setState({ showModal: true })}>{textLabel} modal</XUIButton>
        <XUIModal
          closeButtonLabel="Close"
          {...settings}
          isOpen={showModal}
          onClose={() => this.setState({ showModal: false })}
        >
          <XUIModalHeader>{textLabel} modal</XUIModalHeader>
          <XUIModalBody className="xui-padding">
            <div className="xui-padding-bottom">
              This is the {textLabel} layer modal
              {children}
            </div>
          </XUIModalBody>
        </XUIModal>
      </div>
    );
  }
}

export default Example;
