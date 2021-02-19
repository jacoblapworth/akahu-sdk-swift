import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
  it.skip('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIRange />);
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
        label="invalid"
        id="range1"
        isInvalid
        validationMessage="validationMessage"
        min={16}
        max={80}
      />,
    );
    expect(invalidRangeComponent).toMatchSnapshot();
  });

  it('should be disabled', () => {
    const disabledRangeComponent = renderer.create(
      <XUIRange
        label="disabled"
        id="range1"
        validationMessage="validationMessage"
        min={16}
        max={80}
        isDisabled
      />,
    );
    expect(disabledRangeComponent).toMatchSnapshot();
  });

  it('LeftElement and RightElement work', () => {
    const { default: plus } = require('@xero/xui-icon/icons/plus');
    const svgRangeComponent = renderer.create(
      <XUIRange
        label="svgs work"
        leftElement={<XUIIcon size="large" icon={plus} />}
        rightElement={<XUIIcon size="large" icon={plus} />}
        id="range1"
        hintMessage="hintMessage"
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
        label="All options selected"
        leftElement={<XUIIcon size="large" icon={plus} />}
        rightElement={<XUIIcon size="large" icon={plus} />}
        qaHook="qaHook"
        hintMessage="hintMessage"
        id="range1"
        inputClasses="inputClasses"
        containerClasses="containerClasses"
        isInvalid
        validationMessage="validationMessage"
        isDisabled
        min={'16'}
        max={'80'}
        size="xsmall"
        step={'4'}
        defaultValue={'20'}
      />,
    );
    expect(allOptionsRangeComponent).toMatchSnapshot();
  });
});
