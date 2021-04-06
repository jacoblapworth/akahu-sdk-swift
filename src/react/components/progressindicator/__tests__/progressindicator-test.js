import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIProgressLinear from '../XUIProgressLinear';
import XUIProgressCircular from '../XUIProgressCircular';
import noop from '../../helpers/noop';
import { variations } from '../stories/variations';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const baseProps = {
  id: 'myCustomProgressId',
  total: 5,
  progress: 3,
};

// Jest is configured to throw an error for any console.warn. I have some PropType
// tests that in addition to logging a warning need to be handled succinctly in
// production environment also (thus the need to bypass the warning).
// eslint-disable-next-line no-console
const disableConsoleError = () => (console.error = noop);

describe('<XUIProgressIndicator />', () => {
  it('should set a negative total value to 0', () => {
    const component = mount(<XUIProgressCircular {...baseProps} total={-1} />);
    const valueMax = component.find({ 'aria-valuemax': 0 });

    expect(valueMax).toHaveLength(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should set a negative progress value to 0', () => {
    const component = mount(<XUIProgressCircular {...baseProps} progress={-1} />);
    const valueNow = component.find({ 'aria-valuenow': 0 });

    expect(valueNow).toHaveLength(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should default to a standard format when segments are calculated at less than one', () => {
    const component = mount(<XUIProgressCircular {...baseProps} total={0} isLinear isSegmented />);
    const isSegmented = component.find('ProgressWrapper').prop('isSegmented');

    expect(isSegmented).toBeFalsy();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should override a complete alert with a soft error alert', () => {
    const component = mount(
      <XUIProgressCircular {...baseProps} progress={5} isAlertOnComplete isSoftError />,
    );
    const isSoftError = component.find('.xui-progress').hasClass('xui-progress-error-soft');

    expect(isSoftError).toBeTruthy();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should override a soft error alert with a hard error alert', () => {
    const component = mount(<XUIProgressCircular {...baseProps} isSoftError isHardError />);
    const isHardError = component.find('.xui-progress').hasClass('xui-progress-error-hard');

    expect(isHardError).toBeTruthy();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render supplied content as a child of the nested progress indicator', () => {
    const qaHook = 'progress-indicator';
    const component = mount(
      <XUIProgressCircular {...baseProps} qaHook={qaHook}>
        <img src="/my-image.png" />
      </XUIProgressCircular>,
    );
    const customContent = component
      .find({ 'data-automationid': `${qaHook}-custom-content` })
      .find('img');

    expect(customContent).toHaveLength(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  describe('circular growth', () => {
    const component = mount(<XUIProgressCircular {...baseProps} isGrow />);
    const findElementSize = () => component.find('ElementSize');

    it('should mount <ElementSize /> only when receiving the isGrow prop', () => {
      expect(findElementSize()).toHaveLength(1);
    });

    it('should not render the track until ElementSize has defined width and height', () => {
      expect(component.find('CircularTrack')).toHaveLength(0);
    });

    it('should render the track once ElementSize has defined width and height', () => {
      component.find('ElementSize').setState({ elementWidth: 40, elementHeight: 40 });
      expect(component.find('CircularTrack')).toHaveLength(1);
    });

    it('should render to the width and height of its wrapping div', () => {
      expect(component.find('.xui-progress-circular-wrapper').props().width).toBe(40);
      expect(component.find('#myCustomProgressId-progress-mask').props().height).toBe(40);
    });

    it('should unmount <ElementSize /> when the isGrow prop is not present', () => {
      component.setProps({ isGrow: false });

      expect(findElementSize()).toHaveLength(0);
    });
  });

  it('should render hard error alert override as text', () => {
    const component = mount(<XUIProgressCircular {...baseProps} isHardError hardErrorAlert="S" />);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render hard error alert override as jsx', () => {
    const component = mount(
      <XUIProgressCircular
        {...baseProps}
        isHardError
        hardErrorAlert={<img src="http://via.placeholder.com/20x20" alt="error alert" />}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  describe('custom colors', () => {
    it('should override default color with an applicable color key', () => {
      const totalColor = 'turquoise';
      const progressColor = 'orange';
      const component = mount(
        <XUIProgressCircular
          {...baseProps}
          totalColor={totalColor}
          progressColor={progressColor}
        />,
      );
      const totalColorClass = component.find({ 'data-xui-progress-total-color': totalColor });
      const progressColorClass = component.find({
        'data-xui-progress-current-color': progressColor,
      });

      expect(totalColorClass).toHaveLength(1);
      expect(progressColorClass).toHaveLength(1);
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should not create a color override from a key that is not recognise', () => {
      disableConsoleError();

      const totalColor = 'potato';
      const progressColor = 'banana';
      const component = mount(
        <XUIProgressCircular
          {...baseProps}
          totalColor={totalColor}
          progressColor={progressColor}
        />,
      );
      const totalColorClass = component.find({ 'data-xui-progress-total-color': totalColor });
      const progressColorClass = component.find({
        'data-xui-progress-current-color': progressColor,
      });

      expect(totalColorClass).toHaveLength(0);
      expect(progressColorClass).toHaveLength(0);
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe('accessibility testing', () => {
    it('<XUIProgressCircular /> should pass accessibility testing', async () => {
      const wrapper = mount(
        <XUIProgressCircular
          ariaLabel="Circular progress indicator"
          id="standard-circular"
          progress={3}
          total={5}
        />,
      );
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });

    it('<XUIProgressLinear /> should pass accessibility testing', async () => {
      const wrapper = mount(
        <XUIProgressLinear
          ariaLabel="Linear progress indicator"
          id="segments-linear"
          progress={3}
          total={5}
        />,
      );
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe('emulate stories', () => {
    variations.forEach(({ storyKind, storyTitle, ...props }) => {
      // NOTE: the "color" variation will be omitted from this generic testing
      // format as it is addressed above with more detailed assertions.
      it(`should render scenario "${storyKind} ${storyTitle}" correctly`, () => {
        const isLinear = storyTitle.startsWith('linear');
        const isCircular = storyTitle.startsWith('circular');
        const Variant = isLinear ? XUIProgressLinear : isCircular ? XUIProgressCircular : null;

        if (Variant) {
          const component = mount(<Variant {...props} />);
          if (props.isGrow) {
            // ElementSize depends on a re-render normally, so manually setting the state here
            component.find('ElementSize').setState({ elementWidth: 20, elementHeight: 20 });
          }
          expect(toJson(component)).toMatchSnapshot();
        }
      });
    });
  });
});
