import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIIllustration from '../XUIIllustration';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const illustrationURL = 'illustration.svg';

describe('XUIIllustration', () => {
  it('Should render with the correct classes for small, medium, and large sizes', function() {
    const wrapper = renderer.create(
      <div>
        <XUIIllustration src={illustrationURL} size="small" />
        <XUIIllustration src={illustrationURL} size="medium" />
        <XUIIllustration src={illustrationURL} size="large" />
      </div>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('Should render with any additional classes provided through the className prop', () => {
    const wrapper = renderer.create(
      <XUIIllustration src={illustrationURL} className={'classyMcClassFace'} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe('Custom height and padding values', () => {
    const theories = [
      { props: { height: 100 }, expectedStyling: { height: '100px' } },
      { props: { padding: 10 }, expectedStyling: { padding: '10px' } },
      {
        props: { height: '100px', padding: '10px' },
        expectedStyling: { height: '100px', padding: '10px' },
      },
      {
        props: { size: 'small', padding: '10px' },
        expectedStyling: { className: 'xui-illustration-small', padding: '10px' },
      },
      {
        props: { size: 'small', height: '100px', padding: '10px' },
        expectedStyling: {
          className: 'xui-illustration-small',
          height: '100px',
          padding: '10px',
        },
      },
      {
        props: { height: 'invalid height', padding: 'invalid padding' },
        expectedStyling: {
          height: '',
          padding: '',
        },
      },
    ];

    theories.map(theory => {
      it(`Size: ${String(theory.props.size).padEnd(10)} | Height: ${String(
        theory.props.height,
      ).padEnd(10)} | Padding: ${theory.props.padding}`, () => {
        const wrapper = mount(<XUIIllustration src={illustrationURL} {...theory.props} />);

        const element = wrapper.getDOMNode();

        if (theory.expectedStyling.className) {
          expect(element.classList.contains(theory.expectedStyling.className)).toBe(true);
        }
        expect(getComputedStyle(element).height).toEqual(theory.expectedStyling.height || '');
        expect(getComputedStyle(element).padding).toEqual(theory.expectedStyling.padding || '');
      });
    });
  });
});
