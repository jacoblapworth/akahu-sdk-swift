import React, { PureComponent } from 'react';
import {
	XUIPanel,
} from '../../../structural';
import XUIButton from '../../../button';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import XUISelect from '../../../select-box';
import XUIIcon from '../../../icon';
import calendar from '@xero/xui-icon/icons/date-start';
import caret from '@xero/xui-icon/icons/caret';

export default class CustomForm extends PureComponent {
	render() {
		return (
			<XUIPanel>
				<form
					role="presentation"
					className='xui-form-layout xui-padding-small'
				>
					<header className="xui-panel--header xui-u-flex xui-u-flex-align-center">
						<div className="xui-panel--heading">Receipt Information</div>
					</header>

					<XUITextInput
						id='form_title'
						label="Title"
						name='form_title'
						placeholder='What was the purchase?'
						fieldClassName='xui-field-layout'
					/>

					<XUITextInput
						id='form_description'
						label="Description"
						name='form_description'
						placeholder='What was it for?'
						fieldClassName='xui-field-layout'
					/>

					<XUISelect
						label="Project"
						buttonContent="Choose a project"
						containerClasses='xui-field-layout'
					/>

					<XUITextInput
						leftElement={
							<XUITextInputSideElement type="icon">
								<XUIIcon isBoxed icon={calendar} />
							</XUITextInputSideElement>}
						rightElement={
							<XUIButton
								variant="icon"
								aria-label="pick a date"
							>
								<XUIIcon icon={caret} />
							</XUIButton>
						}
						onChange={this.onChange}
						placeholder='10 Jan 2019'
						label='Spent on'
						fieldClassName='xui-field-layout'
					/>

				</form>
			</XUIPanel>
		)
	}
}
