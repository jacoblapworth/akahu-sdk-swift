import React, { PureComponent } from 'react';
import { XUIPanel } from '../../../contentblock';
import { XUIIconButton } from '../../../button';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import XUISelect from '../../../select-box';
import XUIIcon from '../../../icon';
import calendar from '@xero/xui-icon/icons/date-start';
import caret from '@xero/xui-icon/icons/caret';

export default class CustomForm extends PureComponent {
  render() {
    return (
      <XUIPanel>
        <form className="xui-form-layout xui-padding-small" role="presentation">
          <header className="xui-panel--header xui-u-flex xui-u-flex-align-center">
            <div className="xui-panel--heading">Receipt Information</div>
          </header>

          <XUITextInput
            fieldClassName="xui-field-layout"
            id="form_title"
            label="Title"
            name="form_title"
            placeholder="What was the purchase?"
          />

          <XUITextInput
            fieldClassName="xui-field-layout"
            id="form_description"
            label="Description"
            name="form_description"
            placeholder="What was it for?"
          />

          <XUISelect
            buttonContent="Choose a project"
            containerClasses="xui-field-layout"
            label="Project"
          />

          <XUITextInput
            fieldClassName="xui-field-layout"
            label="Spent on"
            leftElement={
              <XUITextInputSideElement type="icon">
                <XUIIcon icon={calendar} isBoxed />
              </XUITextInputSideElement>
            }
            onChange={this.onChange}
            placeholder="10 Jan 2019"
            rightElement={<XUIIconButton ariaLabel="pick a date" icon={caret} />}
          />
        </form>
      </XUIPanel>
    );
  }
}
