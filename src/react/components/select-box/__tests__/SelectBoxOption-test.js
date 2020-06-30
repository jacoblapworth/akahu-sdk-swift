import React from 'react';
import PropTypes from 'prop-types';
import SelectBoxOption from '../SelectBoxOption';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { v4 as uuidv4 } from 'uuid';

Enzyme.configure({ adapter: new Adapter() });

const createComponent = props => (
  <SelectBoxOption id="1" value="A sample option" label="test" {...props}>
    {(props && props.children) || '.'}
  </SelectBoxOption>
);
createComponent.propTypes = {
  children: PropTypes.node,
};

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testCheckboxId');

describe('<SelectBoxOption />', () => {
  it('should render an automaion id when provided with a qaHook', () => {
    const automationid = renderer.create(
      createComponent({ qaHook: 'test-sbo', children: 'Child' }),
    );

    expect(automationid).toMatchSnapshot();
  });

  it('should render text as truncated when the truncatedText prop is set to true', () => {
    const truncated = renderer.create(
      createComponent({
        truncatedText: true,
        children:
          "This text should be truncated and only visible on one line because it's so long.",
      }),
    );

    expect(truncated).toMatchSnapshot();
  });

  it("shouldn't render text as truncated when the truncatedText prop is set to false", () => {
    const truncated = renderer.create(
      createComponent({
        truncatedText: false,
        children: "This text should not be truncated even though it's long.",
      }),
    );

    expect(truncated).toMatchSnapshot();
  });

  it('should render checkboxes when the showCheckboxes prop is set to true', () => {
    const checkboxes = renderer.create(
      createComponent({
        showCheckboxes: true,
      }),
    );

    expect(checkboxes).toMatchSnapshot();
  });

  it("shouldn't render checkboxes when the showCheckboxes prop is set to false", () => {
    const checkboxes = renderer.create(
      createComponent({
        showCheckboxes: false,
      }),
    );

    expect(checkboxes).toMatchSnapshot();
  });

  it('should render extra classes on the option element when values are added to the optionClasses prop', () => {
    const optionClasses = renderer.create(
      createComponent({
        optionClasses: 'option-class',
      }),
    );

    expect(optionClasses).toMatchSnapshot();
  });

  it('should render the option as disabled when the isDisabled prop is true', () => {
    const checkboxes = renderer.create(
      createComponent({
        isDisabled: true,
      }),
    );

    expect(checkboxes).toMatchSnapshot();
  });

  it('should render the option and the checkboxes as disabled when the isDisabled and showCheckboxes props are true', () => {
    const checkboxes = renderer.create(
      createComponent({
        isDisabled: true,
        showCheckboxes: true,
      }),
    );

    expect(checkboxes).toMatchSnapshot();
  });

  it('should render the option as disabled when the isDisabled prop is false', () => {
    const checkboxes = renderer.create(
      createComponent({
        isDisabled: false,
      }),
    );

    expect(checkboxes).toMatchSnapshot();
  });

  it('should render the correct value passed in', () => {
    const valueComp = renderer.create(
      createComponent({
        value: 'value text',
      }),
    );

    expect(valueComp).toMatchSnapshot();
  });

  it('should render the selected class if isSelected is true', () => {
    const selected = renderer.create(
      createComponent({
        isSelected: true,
      }),
    );

    expect(selected).toMatchSnapshot();
  });

  it("shouldn't render the selected class if isSelected is false", () => {
    const selected = renderer.create(
      createComponent({
        isSelected: false,
      }),
    );

    expect(selected).toMatchSnapshot();
  });

  it("shouldn't render the selected class by default", () => {
    const selected = renderer.create(createComponent());

    expect(selected).toMatchSnapshot();
  });

  it('should render the highlighted class if isHighlighted is true', () => {
    const highlighted = renderer.create(
      createComponent({
        isHighlighted: true,
      }),
    );

    expect(highlighted).toMatchSnapshot();
  });

  it("shouldn't render the highlighted class if isHighlighted is false", () => {
    const highlighted = renderer.create(
      createComponent({
        isHighlighted: false,
      }),
    );

    expect(highlighted).toMatchSnapshot();
  });

  it("shouldn't render the highlighted class by default", () => {
    const highlighted = renderer.create(createComponent());

    expect(highlighted).toMatchSnapshot();
  });

  it('should render an a tag if an href prop is provided', () => {
    const hrefComp = renderer.create(createComponent({ href: 'http://xero.com' }));

    expect(hrefComp).toMatchSnapshot();
  });

  it('should render an button element by default', () => {
    const hrefComp = renderer.create(createComponent());

    expect(hrefComp).toMatchSnapshot();
  });

  it('should render an aria role if the ariaRole prop has a value', () => {
    const ariaComp = renderer.create(createComponent({ ariaRole: 'item' }));

    expect(ariaComp).toMatchSnapshot();
  });

  it('should render an aria role of option by default', () => {
    const ariaComp = renderer.create(createComponent());

    expect(ariaComp).toMatchSnapshot();
  });
});
