import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIPicklistHeader from '../XUIPicklistHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIPicklistHeader />', () => {
  it('basic example', () => {
    const header = renderer.create(<XUIPicklistHeader>Some header text</XUIPicklistHeader>);
    expect(header).toMatchSnapshot();
  });

  it('with all options', () => {
    const allOptions = renderer.create(
      <XUIPicklistHeader id="headerId" className="custom-header-class" ariaRole="presentation">
        Some header text
      </XUIPicklistHeader>,
    );
    expect(allOptions).toMatchSnapshot();
  });
});
