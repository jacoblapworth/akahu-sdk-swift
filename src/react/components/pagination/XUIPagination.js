import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Paging from './private/Paging';
import ItemsElement from './private/ItemsElement';
import useContainerQuery from '../helpers/useContainerQuery';

import { baseClass, defaultPerPageCountOptions } from './private/helpers';
import checkRequiredProps from '../../helpers/checkRequiredProps';
import labelRequiredWarning, { ariaLabelOnly } from '../helpers/labelRequiredWarning';

const XUIPagination = ({
  ariaLabel,
  className,
  count,
  createCountContent,
  createPagingContent,
  defaultPage = 1,
  defaultPerPageCount = defaultPerPageCountOptions[0],
  isResponsive = true,
  nextPageLabel,
  onPageChange,
  onPerPageCountChange,
  page,
  pageSelectLabel,
  perPageContent,
  perPageCount,
  perPageCountOptions = defaultPerPageCountOptions,
  perPageCountSelectLabel,
  previousPageLabel,
  qaHook,
  showCount = true,
  showPerPageCountSelect = true,
}) => {
  const { observedElementRef, isWidthAboveBreakpoint } = useContainerQuery();

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

  const shouldShowSimplified = isResponsive && !isWidthAboveBreakpoint('small');
  const shouldShowEnhancedCount = isResponsive && isWidthAboveBreakpoint('medium');

  const perPageCountNum = perPageCount || currentPerPageCount;
  const pageCount = Math.ceil(count / perPageCountNum);
  const currentPageNum = page || (currentPage > pageCount ? pageCount : currentPage);

  useEffect(() => {
    labelRequiredWarning(XUIPagination.name, ariaLabelOnly, [ariaLabel]);
  }, [ariaLabel]);

  return (
    <nav
      aria-label={ariaLabel}
      className={paginationClasses}
      data-automationid={qaHook}
      ref={observedElementRef}
    >
      {(showPerPageCountSelect || showCount) && (
        <ItemsElement
          count={count}
          createCountContent={createCountContent}
          currentPage={currentPageNum}
          isEnhancedCount={shouldShowEnhancedCount}
          isSimple={shouldShowSimplified}
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
          isSimple={shouldShowSimplified}
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
   * This is required if the `showCount` prop is set to `true`.
   * <br />
   * Sample function with recommended English value:
   * (`from`, `to` and `count` should be formatted for internationalization in the returned strings)
   * <br />
   * ``(from, to, count) => ({  enhanced: `Showing items ${from}-${to} of ${count}`, simple: `Total items: ${count}`, })``
   */
  createCountContent(...parameters) {
    return checkRequiredProps('showCount', PropTypes.func.isRequired, ...parameters);
  },
  /**
   * Function to create both the simple and enhanced version of paging content.
   * Simple is used when container width < 600px, enhanced used when container with >= 600px.
   * <br />
   * Sample function with recommended English value:
   * (`page` and `pageCount` should be formatted for internationalization in the returned strings)
   * <br />
   * ``(page, pageCount) => ({ enhanced: `Page ${page} of ${pageCount}`, simple: `${page} of ${pageCount}`, })``
   */
  createPagingContent: PropTypes.func.isRequired,
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
   * Adds label to the page select.
   * <br />
   * Recommended English value: *Select a page*
   */
  pageSelectLabel: PropTypes.string.isRequired,
  /**
   * The content at the left of the page select. This is required if the
   * `showPerPageCountSelect` prop is set to `true`.
   * <br />
   * Recommended English value: *Items per page*
   */
  perPageContent(...parameters) {
    return checkRequiredProps('showPerPageCountSelect', PropTypes.string.isRequired, ...parameters);
  },
  /**
   * _Controlled only_: Per page count
   */
  perPageCount: PropTypes.number,
  /**
   * The per page count options
   * <br />
   * Default: [10, 25, 50, 100, 200]
   */
  perPageCountOptions: PropTypes.array,
  /**
   * Adds label to the perPageCount select. This is required if the
   * `showPerPageCountSelect` prop is set to `true`.
   * <br />
   * Recommended English value: *Select a per page count*
   */
  perPageCountSelectLabel(...parameters) {
    return checkRequiredProps('showPerPageCountSelect', PropTypes.string.isRequired, ...parameters);
  },
  /**
   * Adds aria-label to previous page icon.
   * <br />
   * Recommended English value: *Previous Page*
   */
  previousPageLabel: PropTypes.string.isRequired,
  qaHook: PropTypes.string,
  /**
   * Whether to show the count
   */
  showCount: PropTypes.bool,
  /**
   * Whether to show the PerPageCount select
   */
  showPerPageCountSelect: PropTypes.bool,
};
