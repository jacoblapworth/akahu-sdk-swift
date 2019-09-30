import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import PickitemBody from '../private/PickitemBody';

Enzyme.configure({ adapter: new Adapter() });

describe('<PickitemBody />', () => {
  it('creates a button by default', () => {
    const button = renderer.create(<PickitemBody>Item</PickitemBody>);
    expect(button).toMatchSnapshot();
  });

  it('adds truncation classes', () => {
    const truncation = renderer.create(<PickitemBody shouldTruncate>Item</PickitemBody>);
    expect(truncation).toMatchSnapshot();
  });

  it('creates an `a` tag when href is provided', () => {
    const anchor = renderer.create(<PickitemBody href="https://xero.com">Item</PickitemBody>);
    expect(anchor).toMatchSnapshot();
  });
});
