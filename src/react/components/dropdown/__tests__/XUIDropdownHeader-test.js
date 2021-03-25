import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDropdownHeader from '../XUIDropdownHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const noop = () => {};

const defaultProps = {
  primaryButtonContent: 'Apply',
  secondaryButtonContent: 'Cancel',
  backButtonAriaLabel: 'Back',
};

describe('<XUIDropdownHeader/>', () => {
  it('should render with an automation id when passed in the qaHook prop', () => {
    const qaHook = renderer.create(<XUIDropdownHeader {...defaultProps} qaHook="test-qahook" />);

    expect(qaHook).toMatchSnapshot();
  });

  it('should render with a title if one is present', () => {
    const title = renderer.create(<XUIDropdownHeader {...defaultProps} title="Title" />);

    expect(title).toMatchSnapshot();
  });

  it('should render with additional classes on the main element if className is provided', () => {
    const title = renderer.create(<XUIDropdownHeader {...defaultProps} className="classy" />);

    expect(title).toMatchSnapshot();
  });

  it('should render a back button if back button click handler is provided', () => {
    const backButton = renderer.create(
      <XUIDropdownHeader {...defaultProps} onBackButtonClick={() => {}} />,
    );

    expect(backButton).toMatchSnapshot();
  });

  it('should render leftContent when provided', () => {
    const leftContent = renderer.create(
      <XUIDropdownHeader {...defaultProps} leftContent={<div className="test">content</div>} />,
    );

    expect(leftContent).toMatchSnapshot();
  });

  it('should render rightContent when provided', () => {
    const rightContent = renderer.create(
      <XUIDropdownHeader {...defaultProps} rightContent={<div className="test">content</div>} />,
    );

    expect(rightContent).toMatchSnapshot();
  });

  it('should render primary button with default text when onPrimaryButtonClick is provided', () => {
    const primaryClick = renderer.create(
      <XUIDropdownHeader {...defaultProps} onPrimaryButtonClick={noop} />,
    );

    expect(primaryClick).toMatchSnapshot();
  });

  it('should render secondary button with default text when onSecondaryButtonClick is provided', () => {
    const secondaryClick = renderer.create(
      <XUIDropdownHeader {...defaultProps} onSecondaryButtonClick={noop} />,
    );

    expect(secondaryClick).toMatchSnapshot();
  });

  it('should render primary button with custom content when onPrimaryButtonClick and primaryButtonContent are provided', () => {
    const primaryContent = renderer.create(
      <XUIDropdownHeader
        {...defaultProps}
        onPrimaryButtonClick={noop}
        primaryButtonContent={'Test'}
      />,
    );

    expect(primaryContent).toMatchSnapshot();
  });

  it('should render secondary button with custom content when onSecondaryButtonClick and secondaryButtonContent are provided', () => {
    const secondaryContent = renderer.create(
      <XUIDropdownHeader
        {...defaultProps}
        onSecondaryButtonClick={noop}
        secondaryButtonContent={'Test'}
      />,
    );

    expect(secondaryContent).toMatchSnapshot();
  });

  it('should render all header contents in the correct order', () => {
    const allContents = renderer.create(
      <XUIDropdownHeader
        {...defaultProps}
        onBackButtonClick={noop}
        leftContent={<div>left content</div>}
        title="Title"
        rightContent={<div>right content</div>}
        onPrimaryButtonClick={noop}
        onSecondaryButtonClick={noop}
      />,
    );

    expect(allContents).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIDropdownHeader {...defaultProps} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
