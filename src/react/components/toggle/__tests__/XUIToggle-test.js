import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import XUIToggleOption from '../XUIToggleOption';
import XUIToggle from '../XUIToggle';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testCheckboxId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIToggle', function () {
  // children property toggles
  it('should contain XUIToggleOption components if provided', function () {
    const wrapper = mount(
      <XUIToggle>
        <XUIToggleOption onChange={() => {}} />
        <XUIToggleOption onChange={() => {}} />
        <XUIToggleOption onChange={() => {}} />
      </XUIToggle>,
    );

    expect(wrapper.find(XUIToggleOption)).toHaveLength(3);
  });

  // className property (additional classes)
  it('should use additional classes if provided', function () {
    const c = 'dogs-are-totes-patotes';
    const wrapper = mount(<XUIToggle className={c} />);

    expect(wrapper.hasClass(c)).toBeTruthy();
  });

  // qaHook property
  it('should have a qaHook if provided', function () {
    const automationid = renderer.create(<XUIToggle qaHook="cheese-and-crackers" />);
    expect(automationid).toMatchSnapshot();
  });

  // label property
  it('should have a visible label if provided', function () {
    const labelTest = renderer.create(<XUIToggle label="This is a toggle" />);
    expect(labelTest).toMatchSnapshot();
  });

  // isLabelHidden property
  it('should have a hidden label as aria-label if provided and flagged', function () {
    const labelHiddenTest = renderer.create(<XUIToggle label="This is a toggle" isLabelHidden />);
    expect(labelHiddenTest).toMatchSnapshot();
  });

  // labelId property
  it('should have the fieldLayout class and a custom labelID, if provided', function () {
    const labelTest = renderer.create(
      <XUIToggle label="This is a toggle" labelId="testing123" isFieldLayout />,
    );
    expect(labelTest).toMatchSnapshot();
  });

  // color inverted
  it('should use the inverted color if defined', function () {
    const wrapper = mount(<XUIToggle color="inverted" />);
    expect(wrapper.find('.xui-toggle-inverted')).toHaveLength(1);
  });

  // small variant inverted
  it('should use the small modifier if the small size is specified', function () {
    const wrapper = mount(<XUIToggle size="small" />);
    expect(wrapper.find('.xui-toggle-small')).toHaveLength(1);
  });

  // layout fullwidth
  it('should use the fullwidth layout if defined', function () {
    const wrapper = mount(<XUIToggle layout="fullwidth" />);
    expect(wrapper.find('.xui-toggle-fullwidth-layout')).toHaveLength(1);
  });

  // accessibility
  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIToggle>
        <XUIToggleOption onChange={() => {}}>Option</XUIToggleOption>
      </XUIToggle>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
