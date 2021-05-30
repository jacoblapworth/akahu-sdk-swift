import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const NOOP = () => {}; // No operation function

describe('XUICheckboxGroup', function () {
  // children property checkboxes
  it('should contain XUICheckbox components if provided', function () {
    const wrapper = mount(
      <XUICheckboxGroup>
        <XUICheckbox onChange={NOOP} />
        <XUICheckbox onChange={NOOP} />
        <XUICheckbox onChange={NOOP} />
      </XUICheckboxGroup>,
    );

    expect(wrapper.find('.xui-styledcheckboxradio')).toHaveLength(3);
  });

  // children property non-checkboxes
  it('should contain children regardless of type', function () {
    const wrapper = mount(
      <div>
        <XUICheckboxGroup>
          <div className="dogs">dogs</div>
          <span className="patotes">patotes</span>
          <label className="cats">cats</label>
        </XUICheckboxGroup>
      </div>,
    );

    expect(wrapper.find('div.dogs').first().text()).toEqual('dogs');
    expect(wrapper.find('span.patotes').first().text()).toEqual('patotes');
    expect(wrapper.find('label.cats').first().text()).toEqual('cats');
  });

  // className property (additional classes)
  it('should use additional classes if provided', function () {
    const wrapper = mount(<XUICheckboxGroup className="dogs-are-totes-patotes" />);
    expect(wrapper.find('.dogs-are-totes-patotes.xui-styledcheckboxradio-group')).toHaveLength(1);
  });

  // qaHook property
  it('should have a qaHook if provided', function () {
    const wrapper = mount(<XUICheckboxGroup qaHook="cheese-and-crackers" />);

    expect(wrapper.find('[data-automationid="cheese-and-crackers"]')).toHaveLength(1);
  });

  it('should include a visible label', () => {
    const labelTest = mount(<XUICheckboxGroup label="Birds" />);
    expect(labelTest.find('.xui-text-label')).toHaveLength(1);
  });

  it('should include a hidden ARIA label, if provided a label and flagged to hide', () => {
    const testLabel = 'Birds';
    const hiddenLabelTest = mount(<XUICheckboxGroup label={testLabel} isLabelHidden />);
    expect(hiddenLabelTest.find('[aria-label="Birds"]')).toHaveLength(1);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUICheckboxGroup>
        <div className="dogs">dogs</div>
        <div className="cats">cats</div>
      </XUICheckboxGroup>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
