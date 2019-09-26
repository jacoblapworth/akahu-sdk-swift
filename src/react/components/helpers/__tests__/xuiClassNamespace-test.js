import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { XUIBannerAction } from '../../../banner';
import { setXUIClassNamespace } from '../xuiClassNamespace';

Enzyme.configure({ adapter: new Adapter() });

describe('setXUIClassNamespace', () => {
  it('should render elements with differently-prefixed class names after calling setXUIClassNamespace', () => {
    setXUIClassNamespace('zooey');

    // Note the elements we test here should have ns referenced in render, rather
    // than in a constants file
    const banner = shallow(<XUIBannerAction>Hai</XUIBannerAction>);
    expect(banner.hasClass('zooey-banner--action')).toBeTruthy();

    // Restore class namespace
    setXUIClassNamespace('xui');
  });
});
