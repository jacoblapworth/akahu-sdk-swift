import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';

import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIIsolationHeader from '../XUIIsolationHeader';
import XUITag from '../../tag/XUITag';

import cross from '@xero/xui-icon/icons/cross';
import overflow from '@xero/xui-icon/icons/overflow';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIIsolationHeader>', () => {
  const actions = (
    <React.Fragment>
      <XUIButton size="small" variant="primary">
        Primary
      </XUIButton>
      <XUIButton size="small" variant="standard">
        Secondary
      </XUIButton>
      <XUIIconButton ariaLabel="action" icon={overflow} />
    </React.Fragment>
  );
  const avatar = <XUIAvatar size="small" value="ABC" />;
  const navigationButton = <XUIIconButton ariaLabel="navigate" icon={cross} />;
  const tags = [
    <XUITag size="small" variant="positive" key="tag-1">
      First tag
    </XUITag>,
    <XUITag size="small" variant="positive" key="tag-2">
      Second tag
    </XUITag>,
  ];

  it('renders correctly', () => {
    const isolationHeader = renderer.create(
      <XUIIsolationHeader
        actions={actions}
        avatar={avatar}
        className="my-awesome-classname"
        hasLayout
        navigationButton={navigationButton}
        qaHook="qaHook"
        secondary="My secondary title"
        supplementary="My supplementary text"
        tags={tags}
        title="Main title"
      >
        <div>All my children</div>
      </XUIIsolationHeader>,
    );

    expect(isolationHeader).toMatchSnapshot();
  });

  it('renders fixed position class', () => {
    const isolationHeader = shallow(
      <XUIIsolationHeader
        hasLayout
        title="Main title"
        navigationButton={navigationButton}
        isPositionFixed
      >
        <div>All my children</div>
      </XUIIsolationHeader>,
    );
    expect(isolationHeader.hasClass('xui-isolationheader-fixed')).toBeTruthy();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIIsolationHeader
        actions={actions}
        avatar={avatar}
        className="my-awesome-classname"
        hasLayout
        navigationButton={navigationButton}
        qaHook="qaHook"
        secondary="My secondary title"
        supplementary="My supplementary text"
        tags={tags}
        title="Main title"
      >
        <div>All my children</div>
      </XUIIsolationHeader>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
