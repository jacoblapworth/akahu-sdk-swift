import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import accessibility from '@xero/xui-icon/icons/accessibility';
import renderer from 'react-test-renderer';
import XUIIcon from '../XUIIcon';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIIcon', () => {
  it('Should render with any additional classes provided through the className prop', function () {
    const wrapper = mount(<XUIIcon className="classyMcClassFace" icon={accessibility} />);
    expect(wrapper.getDOMNode().getAttribute('class')).toEqual(
      expect.stringContaining('classyMcClassFace'),
    );
  });

  it('Should render with the correct classes and dimensions', function () {
    const wrapper = renderer.create(
      <div>
        <XUIIcon icon={accessibility} isBoxed size="xsmall" />
        <XUIIcon icon={accessibility} isBoxed size="small" />
        <XUIIcon icon={accessibility} isBoxed />
        <XUIIcon icon={accessibility} isBoxed size="large" />
        <XUIIcon icon={accessibility} isBoxed size="xlarge" />
      </div>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('Should render with the correct rotation classes when rotations are provided', function () {
    const wrapper = mount(
      <div>
        <XUIIcon icon={accessibility} />
        <XUIIcon icon={accessibility} rotation="90" />
        <XUIIcon icon={accessibility} rotation="180" />
        <XUIIcon icon={accessibility} rotation="270" />
      </div>,
    );

    const icons = wrapper.find('.xui-icon');
    expect(icons.at(0).hasClass('xui-icon-rotate-90')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-rotate-180')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-rotate-270')).toBeFalsy();

    expect(icons.at(1).hasClass('xui-icon-rotate-90')).toBeTruthy();

    expect(icons.at(2).hasClass('xui-icon-rotate-180')).toBeTruthy();

    expect(icons.at(3).hasClass('xui-icon-rotate-270')).toBeTruthy();
  });

  it('Should render with the correct color class when color is provided', function () {
    const wrapper = mount(
      <div>
        <XUIIcon icon={accessibility} />
        <XUIIcon color="black-muted" icon={accessibility} />
        <XUIIcon color="red" icon={accessibility} />
        <XUIIcon color="green" icon={accessibility} />
        <XUIIcon color="white" icon={accessibility} />
        <XUIIcon color="blue" icon={accessibility} />
        <XUIIcon color="file_spreadsheet" icon={accessibility} />
        <XUIIcon color="file_pdf" icon={accessibility} />
        <XUIIcon color="white_faint" icon={accessibility} />
        <XUIIcon color="white_muted" icon={accessibility} />
      </div>,
    );

    const icons = wrapper.find('.xui-icon');
    expect(icons.at(0).hasClass('xui-icon-color-black-muted')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-red')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-green')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-white')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-blue')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-file-spreadsheet')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-file-pdf')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-white-faint')).toBeFalsy();
    expect(icons.at(0).hasClass('xui-icon-color-white-muted')).toBeFalsy();

    expect(icons.at(1).hasClass('xui-icon-color-black-muted')).toBeTruthy();

    expect(icons.at(2).hasClass('xui-icon-color-red')).toBeTruthy();

    expect(icons.at(3).hasClass('xui-icon-color-green')).toBeTruthy();

    expect(icons.at(4).hasClass('xui-icon-color-white')).toBeTruthy();

    expect(icons.at(5).hasClass('xui-icon-color-blue')).toBeTruthy();

    expect(icons.at(6).hasClass('xui-icon-color-file-spreadsheet')).toBeTruthy();

    expect(icons.at(7).hasClass('xui-icon-color-file-pdf')).toBeTruthy();

    expect(icons.at(8).hasClass('xui-icon-color-white-faint')).toBeTruthy();

    expect(icons.at(9).hasClass('xui-icon-color-white-muted')).toBeTruthy();
  });

  it('Should render title and desc elements within the SVG element based on the props provided', function () {
    const wrapper = render(
      <XUIIcon description="Happy poop desc 💩" icon={accessibility} title="Happy poop title 💩" />,
    );

    const title = wrapper.find('title').first();
    const desc = wrapper.find('desc').first();
    expect(title).toBeDefined();
    expect(title.text()).toEqual('Happy poop title 💩');
    expect(desc).toBeDefined();
    expect(desc.text()).toEqual('Happy poop desc 💩');
  });

  it('Should render with role="presentation" on the path element by default', function () {
    const wrapper = mount(<XUIIcon icon={accessibility} />);
    expect(wrapper.find('path').prop('role')).toEqual('presentation');
  });

  it('Should render with the given role applied to the path element', function () {
    const wrapper = mount(<XUIIcon icon={accessibility} role="img" />);
    expect(wrapper.find('path').prop('role')).toEqual('img');
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIIcon icon={accessibility} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
