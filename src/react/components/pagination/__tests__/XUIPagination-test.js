import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { nanoid } from 'nanoid';
import XUIPagination from '../XUIPagination';
import {
  defaultPerPageContent,
  defaultCreateCountContent,
  defaultCreatePagingContent,
} from '../private/helpers';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testPaginationId');
Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const defaultProps = {
  ariaLabel: 'Pagination',
  count: 97,
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page',
};

const DefaultPagination = props => <XUIPagination {...defaultProps} {...props} />;

describe('<XUIPagination/>', () => {
  let wrapper;
  afterEach(() => {
    // Will get heap out of memory error if don't unmount
    // (Another solution is turn off restrictFocus, but it isn't exposed in Pagination)
    // Probably a jsdom bug related to portal
    // Ref: https://github.com/reactjs/react-modal/issues/593
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders basic example', () => {
    const component = renderer.create(<DefaultPagination />);
    expect(component).toMatchSnapshot();
  });

  it('should render a custom class', () => {
    const component = renderer.create(<DefaultPagination className="custom-class" />);
    expect(component).toMatchSnapshot();
  });

  it('should only render Paging', () => {
    const component = renderer.create(
      <DefaultPagination showCount={false} showPerPageCountSelect={false} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render customized contents', () => {
    const createCountContent = (from, to, count) => ({
      simple: `Count ${from} test ${to} simple ${count}`,
      enhanced: `Count ${from} test ${to} enhanced ${count}`,
    });
    const createPagingContent = (page, pageCount) => ({
      simple: `Paging ${page} test ${pageCount} simple`,
      enhanced: `Paging ${page} test ${pageCount} enhanced`,
    });
    const perPageContent = 'Test per page';
    const component = renderer.create(
      <DefaultPagination
        createCountContent={createCountContent}
        createPagingContent={createPagingContent}
        perPageContent={perPageContent}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with customized defaultPage', () => {
    const component = renderer.create(<DefaultPagination defaultPage={5} />);
    expect(component).toMatchSnapshot();
  });

  it('should render with customized defaultPerPageCount', () => {
    const component = renderer.create(<DefaultPagination defaultPerPageCount={25} />);
    expect(component).toMatchSnapshot();
  });

  it('should render an automation id when a qahook is passed', () => {
    const component = renderer.create(<DefaultPagination qaHook="pagination-test" />);
    expect(component).toMatchSnapshot();
  });

  it('should hide the paging when only one page', () => {
    wrapper = mount(<DefaultPagination count={9} />);
    expect(wrapper.find('.xui-pagination--paging').length).toBe(0);
  });

  it('should hide the paging select when only two pages', () => {
    wrapper = mount(<DefaultPagination count={19} />);
    expect(wrapper.find('.xui-pagination--paging .xui-select--button').length).toBe(0);
  });

  it('should disable the previous button on the first page', () => {
    wrapper = mount(<DefaultPagination defaultPage={1} />);
    const previousButton = wrapper.find('XUIIconButton').at(0);
    expect(previousButton.prop('isDisabled')).toBeTruthy();
  });

  it('should disable the next button on the last page', () => {
    wrapper = mount(<DefaultPagination defaultPage={10} />);

    const nextButton = wrapper.find('XUIIconButton').at(1);
    expect(nextButton.prop('isDisabled')).toBeTruthy();
  });

  it('should handle previous button properly', () => {
    wrapper = mount(<DefaultPagination defaultPage={3} />);

    const previousButton = wrapper.find('XUIIconButton').at(0);
    previousButton.simulate('click');
    expect(wrapper.find('.xui-pagination--paging .xui-select--content').at(0).text()).toContain(
      'Page 2',
    );
  });

  it('should handle next button properly', () => {
    wrapper = mount(<DefaultPagination defaultPage={2} />);

    const nextButton = wrapper.find('XUIIconButton').at(1);
    nextButton.simulate('click');
    expect(wrapper.find('.xui-pagination--paging .xui-select--content').at(0).text()).toContain(
      'Page 3',
    );
  });

  it('should handle page select properly', () => {
    wrapper = mount(<DefaultPagination defaultPage={5} />);
    const pagingSelect = wrapper.find('.xui-pagination--paging .xui-select--button').at(0);
    pagingSelect.simulate('click');
    const firstPickitem = document.querySelector('.xui-pickitem button');
    firstPickitem.click();
    expect(wrapper.find('.xui-pagination--paging .xui-select--content').at(0).text()).toContain(
      'Page 1',
    );
    expect(wrapper.find('.xui-pagination--items--count').at(0).text()).toContain('1-10');
  });

  it('should handle perPageCount select properly', () => {
    wrapper = mount(<DefaultPagination defaultPerPageCount={100} />);
    const perPageCountSelect = wrapper
      .find('.xui-pagination--items--select .xui-select--button')
      .at(0);
    perPageCountSelect.simulate('click');
    const firstPickitem = document.querySelector('.xui-pickitem button');
    firstPickitem.click();
    expect(
      wrapper.find('.xui-pagination--items--select .xui-select--content').at(0).text(),
    ).toContain('10');
    expect(wrapper.find('.xui-pagination--items--count').at(0).text()).toContain('1-10');
  });

  it('should call onPageChange when page is selected', () => {
    const onPageChange = jest.fn();
    wrapper = mount(<DefaultPagination onPageChange={onPageChange} />);
    const pagingSelect = wrapper.find('.xui-pagination--paging .xui-select--button').at(0);
    pagingSelect.simulate('click');
    const firstPickitem = document.querySelector('.xui-pickitem button');
    firstPickitem.click();
    expect(onPageChange).toBeCalled();
  });

  it('should call onPerPageCountChange when perPageCount is selected', () => {
    const onPerPageCountChange = jest.fn();
    wrapper = mount(<DefaultPagination onPerPageCountChange={onPerPageCountChange} />);
    const perPageCountSelect = wrapper
      .find('.xui-pagination--items--select .xui-select--button')
      .at(0);
    perPageCountSelect.simulate('click');
    const firstPickitem = document.querySelector('.xui-pickitem button');
    firstPickitem.click();
    expect(onPerPageCountChange).toBeCalled();
  });

  it.skip('should pass accessibility testing', async () => {
    wrapper = mount(<DefaultPagination />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('as controlled', () => {
    it('should have an initial page 5', () => {
      wrapper = mount(<DefaultPagination page={5} />);
      expect(wrapper.find('.xui-pagination--paging .xui-select--content').at(0).text()).toContain(
        'Page 5',
      );
    });

    it('should have an initial perPageCount 25', () => {
      wrapper = mount(<DefaultPagination perPageCount={25} />);
      expect(
        wrapper.find('.xui-pagination--items--select .xui-select--content').at(0).text(),
      ).toContain('25');
    });
  });
});
