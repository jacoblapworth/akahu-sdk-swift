import React, { PureComponent } from 'react';
import XUIToast, { XUIToastWrapper, XUIToastMessage } from '../../../../toast';
import XUIButton from '../../../../button';

const TOAST_TIMEOUT = 10000;
const MAX_TOASTS = 2;

class ExampleToast extends PureComponent {
  constructor(...args) {
    super(...args);

    this._toastCounter = 0;

    this.state = {
      toasts: [],
      timerHandles: [],
    };
    this.removeToast = this.removeToast.bind(this);
    this.addToast = this.addToast.bind(this);
    this.addToastTimeout = this.addToastTimeout.bind(this);
    this.stopToastTimeout = this.stopToastTimeout.bind(this);
    this.timeoutToast = this.timeoutToast.bind(this);
  }

  removeToast(toastToRemove) {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(toast => toast !== toastToRemove),
    }));
  }

  addToast() {
    this.setState(prevState => {
      const toastName = `Toast number ${(this._toastCounter += 1)}`;
      const handles = {
        ...prevState.timerHandles,
        [toastName]: this.timeoutToast(toastName, TOAST_TIMEOUT),
      };

      return {
        toasts: [...prevState.toasts.slice(-MAX_TOASTS + 1), toastName],
        timerHandles: handles,
      };
    });
  }

  addToastTimeout(toastToClose) {
    const handle = setTimeout(() => this.removeToast(toastToClose), TOAST_TIMEOUT);
    this.setState(prevState => {
      const handles = {
        ...prevState.timerHandles,
        [toastToClose]: handle,
      };
      return {
        timerHandles: handles,
      };
    });
  }

  timeoutToast(toastToClose, delay) {
    return setTimeout(() => this.removeToast(toastToClose), delay);
  }

  stopToastTimeout(toast) {
    clearTimeout(this.state.timerHandles[toast]);
  }

  render() {
    return (
      <div>
        <XUIButton onClick={this.addToast}>Add a toast</XUIButton>
        <XUIToastWrapper>
          {this.state.toasts.map((toast, idx) => (
            <XUIToast key={idx} onCloseClick={() => this.removeToast(toast)}>
              <XUIToastMessage>{toast}</XUIToastMessage>
            </XUIToast>
          ))}
        </XUIToastWrapper>
      </div>
    );
  }
}

export default ExampleToast;
