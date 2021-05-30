import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIToastWrapper from '../XUIToastWrapper';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIToastWrapper /> accessibility tests', () => {
  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIToastWrapper>Wrapper</XUIToastWrapper>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

describe('<XUIToastWrapper />', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('should render a passed qaHook as an automation id', () => {
    const toastWrapper = renderer.create(
      <XUIToastWrapper qaHook="toast-actions">Wrapper</XUIToastWrapper>,
    );

    expect(toastWrapper).toMatchSnapshot();
  });

  it('should render a passed custom class', () => {
    const toastWrapper = renderer.create(
      <XUIToastWrapper className="custom-class">Message Content</XUIToastWrapper>,
    );

    expect(toastWrapper).toMatchSnapshot();
  });

  it('should render closed', () => {
    const toastWrapper = renderer.create(<XUIToastWrapper />);

    expect(toastWrapper).toMatchSnapshot();
  });
});
