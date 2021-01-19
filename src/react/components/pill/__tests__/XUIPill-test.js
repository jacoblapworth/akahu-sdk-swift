import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIPill from '../XUIPill';
import XUIAvatar from '../../avatar/XUIAvatar';

Enzyme.configure({ adapter: new Adapter() });

const NOOP = () => {};

describe('<XUIPill />', () => {
  it('renders the pill with the specified value prop', () => {
    const pill = renderer.create(<XUIPill value="Value Pill" />);

    expect(pill).toMatchSnapshot();
  });

  it('renders the pill with the specified className prop', () => {
    const pill = render(<XUIPill className="xui-test-class" />);

    expect(pill.hasClass('xui-test-class')).toBeTruthy();
  });

  it('will render the pill text in an "a" tag when a href prop is provided', () => {
    const pill = shallow(<XUIPill href="http://xero.com" />);

    expect(pill.find('a')).toBeTruthy();
  });

  it('renders the pill with the invalid class when the isInvalid prop is true', () => {
    const pill = render(<XUIPill isInvalid />);

    expect(pill.hasClass('xui-pill-is-invalid')).toBeTruthy();
  });

  it('will render avatars when passed as an avatar prop', () => {
    const imageUrl =
      'https://i.picsum.photos/id/1033/100/100.jpg?hmac=tomT-dDv5vivqHh5P2NCXMYcsD8G3D4-hAqxbdQ7O2c';
    const avatarProps = {
      imageUrl,
      size: 'small',
      role: 'presentation',
      value: 'A',
    };
    const pill = shallow(<XUIPill avatarProps={avatarProps} />);

    expect(pill.find('.xui-avatar')).toBeTruthy();
  });

  it('renders the pill with the provided avatar component', () => {
    const avatar = <XUIAvatar size="small" value="value pill" />;
    const pill = renderer.create(<XUIPill avatar={avatar} value="Value Pill" />);

    expect(pill).toMatchSnapshot();
  });

  it('renders the pill with the business avatar prop', () => {
    const imageUrl =
      'https://i.picsum.photos/id/1044/100/100.jpg?hmac=IGzsuFyCgR4u_DgqnNlOHxY-ThKh9C02XhZAqHyVy0Q';
    const avatarProps = {
      imageUrl,
      size: 'small',
      role: 'presentation',
      value: 'A',
      variant: 'business',
    };
    const pill = renderer.create(<XUIPill avatarProps={avatarProps} />);

    expect(pill).toMatchSnapshot();
  });

  it('renders the pill with the provided business avatar component', () => {
    const avatar = <XUIAvatar size="small" value="value pill" variant="business" />;
    const pill = renderer.create(<XUIPill avatar={avatar} value="Value Pill" />);

    expect(pill).toMatchSnapshot();
  });

  it('expect an error if both avatar and avatarProps are provided', () => {
    const imageUrl =
      'https://i.picsum.photos/id/931/100/100.jpg?hmac=BJxOJGnnDF4jriUgv211ZTiatGsYZ2ORIKXGZAu6VkA';
    const avatar = <XUIAvatar size="small" value="value pill" />;
    const avatarProps = {
      imageUrl,
      size: 'small',
      role: 'presentation',
      value: 'A',
    };
    expect(() =>
      renderer.create(<XUIPill avatar={avatar} avatarProps={avatarProps} value="Value Pill" />),
    ).toThrow();
  });

  it('invokes the callback passed into the onDeleteClick prop with itself passed in as an argument', () => {
    const callback = jest.fn();
    const pill = mount(
      <XUIPill deleteButtonLabel="Delete" onDeleteClick={callback} value="Pill" />,
    );

    pill.find('.xui-pill--button-icon').first().simulate('click');
    expect(callback.mock.calls.length).toEqual(1);
  });

  it('invokes the callback passed into the onClick prop', () => {
    const callback = jest.fn();
    const pill = mount(<XUIPill onClick={callback} value="Pill" />);

    pill.find('.xui-button').simulate('click');
    expect(callback.mock.calls.length).toEqual(1);
  });

  it('renders the text passed in the secondaryText prop', () => {
    const pill = mount(<XUIPill secondaryText="supplementary" />);

    expect(pill.find('.xui-pill--secondary').text()).toEqual('supplementary');
  });

  it('renders itself as focused appropriately', () => {
    const pill = mount(<XUIPill />);

    pill.childAt(0).simulate('focus');

    expect(pill.childAt(0).hasClass('xui-pill-is-focused')).toBeTruthy();
  });

  it('should render an automation id when a qaHook is passed in', () => {
    const automationid = renderer.create(<XUIPill qaHook="pill-test" />);

    expect(automationid).toMatchSnapshot();
  });

  it('should render a title when passed', () => {
    const pill = renderer.create(<XUIPill title="pill title" />);

    expect(pill).toMatchSnapshot();
  });

  it('should render a target when passed in', () => {
    const pill = renderer.create(<XUIPill href="http://xero.com" target="_blank" />);

    expect(pill).toMatchSnapshot();
  });

  it('should render an error icon when invalid', () => {
    const pill = renderer.create(<XUIPill isInvalid value="Error pill" />);

    expect(pill).toMatchSnapshot();
  });

  it('should render an error icon when invalid even with an avatar', () => {
    const imageUrl =
      'https://i.picsum.photos/id/2/100/100.jpg?hmac=Y2da7WhwSnMn7y41c8WEc1ZO_AGIhVD3zTzghi4-Hiw';
    const avatarProps = {
      imageUrl,
      size: 'small',
      role: 'presentation',
      value: 'A',
    };

    const pill = renderer.create(<XUIPill isInvalid value="Error pill" {...avatarProps} />);

    expect(pill).toMatchSnapshot();
  });

  it('should render a label for the delete button when passed in', () => {
    const pill = mount(<XUIPill deleteButtonLabel="alternate delete label" onDeleteClick={NOOP} />);

    expect(pill.find('.xui-pill--button-icon').first().html()).toContain(
      'title="alternate delete label"',
    );
  });

  it("should render a delete button label of 'Delete' by default", () => {
    const pill = mount(<XUIPill deleteButtonLabel="Delete" onDeleteClick={NOOP} />);

    expect(pill.find('.xui-pill--button-icon').first().html()).toContain('title="Delete"');
  });

  it('should render a pills with correct size modifiers', () => {
    const sizes = ['medium', 'small'];
    sizes.forEach(size => {
      const pill = renderer.create(
        <XUIPill
          avatarProps={{
            value: 'Test Render',
          }}
          deleteButtonLabel="Delete"
          onDeleteClick={NOOP}
          size={size}
          value="Test"
        />,
      );
      expect(pill).toMatchSnapshot();
    });
  });

  it('should render inside a tooltip when using the debug flag', () => {
    const pill = renderer.create(<XUIPill debugShowToolTip />);

    expect(pill).toMatchSnapshot();
  });

  it('should render a pill with the maxwidth limiting class', () => {
    const pill = renderer.create(<XUIPill isLimitedWidth />);

    expect(pill).toMatchSnapshot();
  });
});
