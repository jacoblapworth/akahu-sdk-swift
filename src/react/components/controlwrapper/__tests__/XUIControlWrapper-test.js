import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { v4 as uuidv4 } from 'uuid';

import XUIControlWrapper from '../XUIControlWrapper';
import generateIds, {
  generateIdsFromControlId,
  getAriaAttributes,
} from '../../helpers/ariaHelpers';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });

const setup = (props = {}, fn = renderer.create) => {
  const expected = fn(
    <XUIControlWrapper {...props}>
      <input type="text" {...getAriaAttributes(props.wrapperIds, props)} />
    </XUIControlWrapper>,
  );

  return expected;
};

describe('<XUIControlWrapper>', () => {
  let settings, genIds, setIds, genIdsFromControl;
  beforeEach(() => {
    genIds = generateIds();
    genIdsFromControl = generateIdsFromControlId('controlSpecificId');
    setIds = generateIds('testSpecificLabel');
    settings = {
      fieldClassName: undefined,
      labelId: undefined,
      qaHook: undefined,
      label: undefined,
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
    settings.label = 'Small input label';
    settings.hintMessage = 'I will give you a clue';

    const wrapper = setup(settings);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a simple label based on control ID, when provided', () => {
    settings.wrapperIds = genIdsFromControl;
    settings.label = 'Impressive input label';

    const wrapper = setup(settings);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a hidden label, invalid, and an error message', () => {
    settings.wrapperIds = genIds;
    settings.label = 'Impressive input label';
    settings.isLabelHidden = true;
    settings.validationMessage = 'oh no!';
    settings.isInvalid = true;

    const wrapper = setup(settings);
    expect(wrapper).toMatchSnapshot();
  });
});
