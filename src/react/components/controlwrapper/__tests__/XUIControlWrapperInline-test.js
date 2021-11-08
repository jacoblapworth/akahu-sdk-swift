import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';

import XUIControlWrapperInline from '../XUIControlWrapperInline';
import generateIds, { getAriaAttributesInline } from '../../helpers/ariaHelpers';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });

const setup = (props = {}, fn = renderer.create) => {
  const expected = fn(
    <XUIControlWrapperInline {...props}>
      <input type="checkbox" {...getAriaAttributesInline(props.wrapperIds, props)} />
    </XUIControlWrapperInline>,
  );

  return expected;
};

describe('<XUIControlWrapperInline>', () => {
  let settings, genIds, setIds;
  beforeEach(() => {
    genIds = generateIds();
    setIds = generateIds({ labelId: 'testSpecificLabel' });
    settings = {
      fieldClassName: undefined,
      labelId: undefined,
      qaHook: undefined,
      isInvalid: false,
      validationMessage: undefined,
      hintMessage: undefined,
      labelClassName: undefined,
      isLabelHidden: false,
      label: undefined,
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
    settings.hintMessage = 'I will give you a clue';
    settings.label = 'A label for testing';

    const wrapper = setup(settings);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a simple HTML label, when provided', () => {
    settings.wrapperIds = genIds;
    settings.label = <span>Impressive input label</span>;

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

  it('should throw an error if child is HTML rather than text for hidden label', () => {
    settings.wrapperIds = genIds;
    settings.label = <span>Impressive input label</span>;
    settings.isLabelHidden = true;

    expect(() => {
      setup(settings);
    }).toThrow();
  });
});
