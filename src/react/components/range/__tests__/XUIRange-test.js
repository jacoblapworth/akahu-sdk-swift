import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import XUIRange from '../XUIRange';
import XUIIcon from '../../../icon';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testRangeId');

describe('Range', () => {
  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIRange label="Range" />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  // type range
  it('Simple case', () => {
    const component = shallow(<XUIRange />);
    const simpleRangeComponent = renderer.create(<XUIRange />);
    expect(simpleRangeComponent).toMatchSnapshot();
  });

  it('invalid', () => {
    const invalidRangeComponent = renderer.create(
      <XUIRange
        id="range1"
        isInvalid
        label="invalid"
        max={80}
        min={16}
        validationMessage="validationMessage"
      />,
    );
    expect(invalidRangeComponent).toMatchSnapshot();
  });

  it('should be disabled', () => {
    const disabledRangeComponent = renderer.create(
      <XUIRange
        id="range1"
        isDisabled
        label="disabled"
        max={80}
        min={16}
        validationMessage="validationMessage"
      />,
    );
    expect(disabledRangeComponent).toMatchSnapshot();
  });

  it('LeftElement and RightElement work', () => {
    const { default: plus } = require('@xero/xui-icon/icons/plus');
    const svgRangeComponent = renderer.create(
      <XUIRange
        hintMessage="hintMessage"
        id="range1"
        label="svgs work"
        leftElement={<XUIIcon icon={plus} size="large" />}
        rightElement={<XUIIcon icon={plus} size="large" />}
        validationMessage="validationMessage"
      />,
    );
    expect(svgRangeComponent).toMatchSnapshot();
  });

  it('should call the onClick callback on the range component', () => {
    const onClick = jest.fn();
    const comp = mount(<XUIRange id="rangeComponent" onClick={onClick} />);

    comp.find('#rangeComponent').first().simulate('click');
    setTimeout(() => {
      expect(onSelect.mock.calls.length).toEqual(1);
    }, 0);
  });

  it('All options selected', () => {
    const { default: plus } = require('@xero/xui-icon/icons/plus');
    const allOptionsRangeComponent = renderer.create(
      <XUIRange
        containerClassName="containerClassName"
        defaultValue="20"
        hintMessage="hintMessage"
        id="range1"
        inputClassName="inputClassName"
        isDisabled
        isInvalid
        label="All options selected"
        leftElement={<XUIIcon icon={plus} size="large" />}
        max="80"
        min="16"
        qaHook="qaHook"
        rightElement={<XUIIcon icon={plus} size="large" />}
        size="xsmall"
        step="4"
        validationMessage="validationMessage"
      />,
    );
    expect(allOptionsRangeComponent).toMatchSnapshot();
  });
});
