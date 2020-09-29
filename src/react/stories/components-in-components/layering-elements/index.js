// Libs
import React, { Component, PureComponent, Fragment } from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody, XUIModalHeader } from '../../../modal';
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIButton, { XUIIconButton, XUISplitButtonGroup, XUISecondaryButton } from '../../../button';
import XUITextInput from '../../../textinput';
import { XUICompositionDetail } from '../../../compositions';
import { XUIPageHeader } from '../../../pageheader';
import XUITooltip from '../../../tooltip';
import XUIToast, { XUIToastWrapper, XUIToastMessage } from '../../../toast';
import XUIActions from '../../../actions';
import XUIFixedFooterWIP from '../../../fixedfooter';
import info from '@xero/xui-icon/icons/info';

import * as lists from '../../../components/helpers/list';
import { nonBackstopStoryNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

const TOAST_TIMEOUT = 10000;
const MAX_TOASTS = 2;

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

const splitButtonExample = (
  <XUISplitButtonGroup variant="primary">
    <XUIButton size="small">Split action</XUIButton>
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown fixedWidth size="small">
          <XUIPicklist>
            <XUIPickitem id="aa" key="aa" value="aa">
              Option 1
            </XUIPickitem>
            <XUIPickitem id="bb" key="bb" value="bb">
              Option 2
            </XUIPickitem>
          </XUIPicklist>
        </XUIDropdown>
      }
      trigger={
        <XUISecondaryButton aria-label="Other actions" key="split" size="small" variant="primary" />
      }
    />
  </XUISplitButtonGroup>
);

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
<Example />;

const test = storiesOf(compositionKind, module);
test.addDecorator(withKnobs);

test.add(nonBackstopStoryNames.layeringElements, () => {
  const body = document.querySelector('body.xui-container');
  if (body && body.style) {
    body.style.height = '200%';
  }
  const isUsingPortal = boolean('isUsingPortal', true);
  return (
    <Fragment>
      <XUIPageHeader contentClassName="xui-page-width-large" title="Something" />
      <XUICompositionDetail
        detail={
          <Fragment>
            <XUITooltip
              trigger={<XUIIconButton ariaLabel="Info" icon={info} />}
              triggerOnClick
              triggerOnHover={false}
            >
              Hello. I am a clue.
            </XUITooltip>
            <XUIDropdownToggled
              closeOnSelect={false}
              dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
              trigger={buildTrigger('Short Trigger')}
            />
            <ExampleToast />
            <Example settings={{ isUsingPortal }} textLabel="first">
              This is some Modal content.
              <XUITextInput fieldClassName="xui-column-6-of-12" isLabelHidden label="Input label" />
              <XUITooltip
                trigger={<XUIIconButton ariaLabel="Info" icon={info} />}
                triggerOnClick
                triggerOnHover={false}
              >
                Hello. I am a clue.
              </XUITooltip>
              <XUIDropdownToggled
                closeOnSelect={false}
                dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
                trigger={buildTrigger('Short Trigger')}
              />
              This is some Modal content.
              <XUITextInput isLabelHidden label="Input label" />
              <XUIDropdownToggled
                dropdown={buildDropdownPicklist(lists.MedListMedItems)}
                trigger={buildTrigger('Medium Dropdown Trigger')}
              />
              <XUITextInput isLabelHidden label="Input label" />
              <Example settings={{ size: 'xlarge', isUsingPortal }} textLabel="second">
                <div style={{ height: '1000px' }} />
              </Example>
              <ExampleToast />
            </Example>
          </Fragment>
        }
      />
      <XUIFixedFooterWIP>
        <XUIActions
          className="xui-padding-small"
          hasLayout
          isLinear
          primaryAction={splitButtonExample}
          secondaryAction={
            <XUIButton href="https://xui.xero.com" size="small">
              XUI
            </XUIButton>
          }
        />
      </XUIFixedFooterWIP>
    </Fragment>
  );
});
