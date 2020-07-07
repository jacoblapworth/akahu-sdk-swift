import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIPicklistDivider from '../XUIPicklistDivider';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIPicklistDivider />', () => {
  it('basic example', () => {
    const header = renderer.create(<XUIPicklistDivider />);
    expect(header).toMatchSnapshot();
  });

  it('with custom class', () => {
    const header = renderer.create(<XUIPicklistDivider className="custom-divider" />);
    expect(header).toMatchSnapshot();
  });
});
