import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DropDownHeader from '../DropDownHeader';

Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<DropDownHeader/>', () => {
  it('should render with an automation id when passed in the qaHook prop', () => {
    const qaHook = renderer.create(<DropDownHeader qaHook="test-qahook" />);

    expect(qaHook).toMatchSnapshot();
  });

  it('should render with a title if one is present', () => {
    const title = renderer.create(<DropDownHeader title="Title" />);

    expect(title).toMatchSnapshot();
  });

  it('should render with additional classes on the main element if className is provided', () => {
    const title = renderer.create(<DropDownHeader className="classy" />);

    expect(title).toMatchSnapshot();
  });

  it('should render a back button if back button click handler is provided', () => {
    const backButton = renderer.create(<DropDownHeader onBackButtonClick={() => {}} />);

    expect(backButton).toMatchSnapshot();
  });

  it('should render leftContent when provided', () => {
    const leftContent = renderer.create(
      <DropDownHeader leftContent={<div className="test">content</div>} />,
    );

    expect(leftContent).toMatchSnapshot();
  });

  it('should render rightContent when provided', () => {
    const rightContent = renderer.create(
      <DropDownHeader rightContent={<div className="test">content</div>} />,
    );

    expect(rightContent).toMatchSnapshot();
  });

  it('should render primary button with default text when onPrimaryButtonClick is provided', () => {
    const primaryClick = renderer.create(<DropDownHeader onPrimaryButtonClick={noop} />);

    expect(primaryClick).toMatchSnapshot();
  });

  it('should render secondary button with default text when onSecondaryButtonClick is provided', () => {
    const secondaryClick = renderer.create(<DropDownHeader onSecondaryButtonClick={noop} />);

    expect(secondaryClick).toMatchSnapshot();
  });

  it('should render primary button with custom content when onPrimaryButtonClick and primaryButtonContent are provided', () => {
    const primaryContent = renderer.create(
      <DropDownHeader onPrimaryButtonClick={noop} primaryButtonContent={'Test'} />,
    );

    expect(primaryContent).toMatchSnapshot();
  });

  it('should render secondary button with custom content when onSecondaryButtonClick and secondaryButtonContent are provided', () => {
    const secondaryContent = renderer.create(
      <DropDownHeader onSecondaryButtonClick={noop} secondaryButtonContent={'Test'} />,
    );

    expect(secondaryContent).toMatchSnapshot();
  });

  it('should render all header contents in the correct order', () => {
    const allContents = renderer.create(
      <DropDownHeader
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
});
