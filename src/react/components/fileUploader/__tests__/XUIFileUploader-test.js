import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIFileUploader from '../XUIFileUploader';
import { defaultFileList, defaultProps } from '../private/helpers';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const testFileList = defaultFileList.map((file, index) => ({ ...file, uid: index }));
const FileUploaderWrapper = props => (
  <XUIFileUploader {...defaultProps} labelId="testLabel" {...props} />
);
const WithFileListWrapper = props => <FileUploaderWrapper fileList={testFileList} {...props} />;
const DragWrapper = props => <FileUploaderWrapper {...props} hasDragAndDrop />;

describe('<XUIFileUploader/>', () => {
  it('should render basic example', () => {
    const component = renderer.create(<FileUploaderWrapper />);
    expect(component).toMatchSnapshot();
  });

  it('should render with accept attr of input when acceptedFileExtensions is provided', () => {
    const component = renderer.create(<FileUploaderWrapper acceptedFileExtensions="image/*" />);
    expect(component).toMatchSnapshot();
  });

  it('should render with XUIControlWrapper props', () => {
    const component = renderer.create(
      <FileUploaderWrapper
        hintMessage="Test hint text"
        isInvalid
        isLabelHidden
        validationMessage="Test validation text"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render as disabled', () => {
    const component = renderer.create(<FileUploaderWrapper isDisabled />);
    expect(component).toMatchSnapshot();
  });

  it('should not show validationMessage when is disabled', () => {
    const component = renderer.create(
      <FileUploaderWrapper isDisabled validationMessage="Test validation text" />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render an automation id when a qahook is passed', () => {
    const component = renderer.create(<FileUploaderWrapper qaHook="fileUploader-test" />);
    expect(component).toMatchSnapshot();
  });

  it('should render with custom classes', () => {
    const component = renderer.create(
      <FileUploaderWrapper
        className="custom-root-class"
        fieldClassName="custom-filed-class"
        labelClassName="custom-label-class"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders the field layout class when isFieldLayout is true', () => {
    const wrapper = mount(<FileUploaderWrapper isFieldLayout />);

    expect(wrapper.find('.xui-field-layout')).toHaveLength(1);
  });

  it('should call the passed onFilesChange when open files', () => {
    const onFilesChange = jest.fn();
    const wrapper = mount(<FileUploaderWrapper onFilesChange={onFilesChange} />);

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { files: testFileList } });
    expect(onFilesChange).toHaveBeenCalledTimes(1);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<FileUploaderWrapper />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('<FileList/>', () => {
    it('should render basic example', () => {
      const component = renderer.create(<WithFileListWrapper />);
      expect(component).toMatchSnapshot();
    });

    it('should render with single line', () => {
      const component = renderer.create(<WithFileListWrapper showFilesAsMultiline={false} />);
      expect(component).toMatchSnapshot();
    });

    it('should render without icons', () => {
      const component = renderer.create(<WithFileListWrapper showIcon={false} />);
      expect(component).toMatchSnapshot();
    });

    it('should render a custom filelist class', () => {
      const component = renderer.create(
        <WithFileListWrapper fileListClassName="custom-filelist-class" />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render custom rightContent', () => {
      const component = renderer.create(
        <WithFileListWrapper
          fileList={[{ ...testFileList[1], rightContent: <button>test rightContent</button> }]}
        />,
      );
      expect(component).toMatchSnapshot();
    });

    it('should call the passed onCancel when the cancel button is clicked', () => {
      const onCancel = jest.fn();
      const wrapper = mount(<WithFileListWrapper onCancel={onCancel} />);

      wrapper.find('XUIButton[children="Cancel"]').at(0).simulate('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('should call the passed onDelete when the cancel button is clicked', () => {
      const onDelete = jest.fn();
      const wrapper = mount(<WithFileListWrapper onDelete={onDelete} />);

      wrapper.find('XUIIconButton').at(0).simulate('click');
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('should call the passed onRetry when the cancel button is clicked', () => {
      const onRetry = jest.fn();
      const wrapper = mount(<WithFileListWrapper onRetry={onRetry} />);

      wrapper.find('XUIButton[children="Retry"]').at(0).simulate('click');
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it.skip('should pass accessibility testing', async () => {
      const wrapper = mount(<WithFileListWrapper />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe('as drag', () => {
    it('should render basic example', () => {
      const component = renderer.create(<DragWrapper />);
      expect(component).toMatchSnapshot();
    });

    it('should render as disabled', () => {
      const component = renderer.create(<DragWrapper isDisabled />);
      expect(component).toMatchSnapshot();
    });

    it('should call the passed onFilesChange when drop files', () => {
      const onFilesChange = jest.fn();
      const wrapper = mount(<DragWrapper onFilesChange={onFilesChange} />);

      wrapper
        .find('.xui-fileuploader--dropzone')
        .at(0)
        .simulate('drop', { dataTransfer: { files: testFileList } });
      expect(onFilesChange).toHaveBeenCalledTimes(1);
    });

    it('should pass accessibility testing', async () => {
      const wrapper = mount(<DragWrapper />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });
});
