import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Paging from './private/Paging';
import ItemsElement from './private/ItemsElement';
import useResizeObserver from '../helpers/useResizeObserver';

import {
  baseClass,
  checkRequiredProps,
  defaultCreateCountContent,
  defaultCreatePagingContent,
  defaultPerPageContent,
  defaultPerPageCountOptions,
} from './private/helpers';

const XUIPagination = ({
  ariaLabel,
  className,
  count,
  createCountContent = defaultCreateCountContent,
  createPagingContent = defaultCreatePagingContent,
  defaultPage = 1,
  defaultPerPageCount = defaultPerPageCountOptions[0],
  isResponsive = true,
  nextPageLabel,
  onPageChange,
  onPerPageCountChange,
  page,
  perPageCount,
  perPageCountOptions = defaultPerPageCountOptions,
  pageSelectLabel,
  perPageContent = defaultPerPageContent,
  previousPageLabel,
  qaHook,
  perPageCountSelectLabel,
  showCount = true,
  showPerPageCountSelect = true,
}) => {
  const [ref, handleBreakpoint] = useResizeObserver();
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentPerPageCount, setCurrentPerPageCount] = useState(defaultPerPageCount);

  const handlePageChange = useCallback(
    pageNum => {
      if (onPageChange) {
        onPageChange(pageNum);
      }
      if (!page) {
        setCurrentPage(pageNum);
      }
    },
    [onPageChange, page],
  );

  const handlePerPageCountChange = useCallback(
    perPageCountNum => {
      setCurrentPerPageCount(perPageCountNum);
      if (onPerPageCountChange) {
        onPerPageCountChange(perPageCountNum);
      }
      // When perPageCount changed, jump to the first page.
      if (!page) {
        setCurrentPage(1);
      }
    },
    [onPerPageCountChange, page],
  );

  const paginationClasses = cn(className, baseClass);
  const isMedium = isResponsive && handleBreakpoint('medium');
  const isSmall = isResponsive && handleBreakpoint('small');

  const perPageCountNum = perPageCount || currentPerPageCount;
  const pageCount = Math.ceil(count / perPageCountNum);
  const currentPageNum = page || (currentPage > pageCount ? pageCount : currentPage);

  return (
    <nav aria-label={ariaLabel} className={paginationClasses} data-automationid={qaHook} ref={ref}>
      {(showPerPageCountSelect || showCount) && (
        <ItemsElement
          count={count}
          createCountContent={createCountContent}
          currentPage={currentPageNum}
          isEnhancedCount={!isMedium}
          isSimple={isSmall}
          onPerPageCountChange={handlePerPageCountChange}
          perPageContent={perPageContent}
          perPageCount={perPageCountNum}
          perPageCountOptions={perPageCountOptions}
          qaHook={qaHook}
          selectLabel={perPageCountSelectLabel}
          showCount={showCount}
          showPerPageCountSelect={showPerPageCountSelect}
        />
      )}
      {pageCount > 1 && (
        <Paging
          createPagingContent={createPagingContent}
          currentPage={currentPageNum}
          isSimple={isSmall}
          nextPageLabel={nextPageLabel}
          onPageChange={handlePageChange}
          pageCount={pageCount}
          previousPageLabel={previousPageLabel}
          qaHook={qaHook}
          selectLabel={pageSelectLabel}
        />
      )}
    </nav>
  );
};

export default React.memo(XUIPagination);

XUIPagination.propTypes = {
  /**
   * Adds aria-label to the pagination wrapping div
   * <br />
   * Recommended English value: *Pagination*
   */
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  /**
   * The total number of data items
   */
  count: PropTypes.number.isRequired,
  /**
   * Function to create both the simple and enhanced version of count content
   * Simple is used when container width < 800px, enhanced used when container with >= 800px.
   * <br />
   * `(from, to, count) => ({ simple: string, enhanced: string })`
   */
  createCountContent: PropTypes.func,
  /**
   * Function to create both the simple and enhanced version of paging content.
   * Simple is used when container width < 600px, enhanced used when container with >= 600px.
   * <br />
   * `(page, pageCount) => ({ simple: string, enhanced: string })`
   */
  createPagingContent: PropTypes.func,
  /**
   *  _Uncontrolled only_: The default one-based index of the current page
   */
  defaultPage: PropTypes.number,
  /**
   *  _Uncontrolled only_: The default perPageCount, which is one of the perPageCountOptions
   */
  defaultPerPageCount: PropTypes.number,
  isResponsive: PropTypes.bool,
  /**
   * Adds aria-label to next page icon.
   * <br />
   * Recommended English value: *Next Page*
   */
  nextPageLabel: PropTypes.string.isRequired,
  /**
   * Called when page is changed
   * <br />
   * `page => {}`
   */
  onPageChange: PropTypes.func,
  /**
   * Called when perPageCount is changed
   * <br />
   * `perPageCount => {}`
   */
  onPerPageCountChange: PropTypes.func,
  /**
   * _Controlled only_: The one-based index of the current page
   */
  page: PropTypes.number,
  /**
   * _Controlled only_: Per page count
   */
  perPageCount: PropTypes.number,
  /**
   * The per page count options
   */
  perPageCountOptions: PropTypes.array,
  /**
   * Adds label to the page select.
   * <br />
   * Recommended English value: *Select a page*
   */
  pageSelectLabel: PropTypes.string.isRequired,
  /**
   * The content at the left of the page select
   * <br />
   * Default is *Items per page*
   */
  perPageContent: PropTypes.string,
  /**
   * Adds aria-label to previous page icon.
   * <br />
   * Recommended English value: *Previous Page*
   */
  previousPageLabel: PropTypes.string.isRequired,
  qaHook: PropTypes.string,
  /**
   * Adds label to the perPageCount select. This is required if the
   * `showPerPageCountSelect` prop is set to `true`.
   * <br />
   * Recommended English value: *Select a per page count*
   */
  perPageCountSelectLabel(...parameters) {
    return checkRequiredProps('showPerPageCountSelect', ...parameters);
  },
  /**
   * Whether to show the count
   */
  showCount: PropTypes.bool,
  /**
   * Whether to show the PerPageCount select
   */
  showPerPageCountSelect: PropTypes.bool,
};
