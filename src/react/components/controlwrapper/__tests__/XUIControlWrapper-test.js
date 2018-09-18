import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import uuidv4 from 'uuid/v4';

import XUIControlWrapper, { getAriaAttributes } from '../XUIControlWrapper';
import generateIds from '../helpers';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });

const setup = (props = {}, fn = renderer.create) => {
	const expected = fn(
		<XUIControlWrapper {...props}>
			<input type="text" {...getAriaAttributes(props.wrapperIds, props)} />
		</XUIControlWrapper>
	);

	return expected;
};

describe('<XUIControlWrapper>', () => {
	let settings, genIds, setIds;
	beforeEach(() => {
		genIds = generateIds();
		setIds = generateIds('testSpecificLabel');
		settings = {
			fieldClassName: undefined,
			labelId: undefined,
			qaHook: undefined,
			labelText: undefined,
			isInvalid: false,
			validationMessage: undefined,
			hintMessage: undefined,
			isFieldLayout: true,
			labelClassName: undefined,
			isLabelHidden: false,
		};
	});

	it('renders basic example', () => {
		settings.wrapperIds = genIds;
		const wrapper = setup(settings);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders classes and qaHook on all elements', () => {
		settings.wrapperIds = setIds;
		settings.fieldClassName = 'test-field-class';
		settings.labelClassName = 'test-label-class';
		settings.qaHook = 'ctrl-wrapper';
		settings.labelText = 'Small input label';
		settings.hintMessage = 'I will give you a clue';

		const wrapper = setup(settings);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders a simple label, when provided', () => {
		settings.wrapperIds = genIds;
		settings.labelText = 'Impressive input label';

		const wrapper = setup(settings);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders a hidden label, invalid, and an error message', () => {
		settings.wrapperIds = genIds;
		settings.labelText = 'Impressive input label';
		settings.isLabelHidden = true;
		settings.validationMessage = 'oh no!';
		settings.isInvalid = true;

		const wrapper = setup(settings);
		expect(wrapper).toMatchSnapshot();
	});

});
