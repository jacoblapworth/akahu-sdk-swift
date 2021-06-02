import React, { Component } from 'react';
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../../modal';
import XUIButton from '../../../../button';

class Example extends Component {
  state = { showModal: false };

  render() {
    return (
      <div>
        <XUIButton onClick={() => this.setState({ showModal: true })}>
          {this.props.textLabel} modal
        </XUIButton>
        <XUIModal
          closeButtonLabel="Close"
          {...this.props.settings}
          isOpen={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
        >
          <XUIModalHeader>{this.props.textLabel} modal</XUIModalHeader>
          <XUIModalBody className="xui-padding">
            <div className="xui-padding-bottom">
              This is the {this.props.textLabel} layer modal
              {this.props.children}
            </div>
          </XUIModalBody>
        </XUIModal>
      </div>
    );
  }
}

export default Example;
