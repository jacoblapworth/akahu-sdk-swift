interface Props {
  /**
   * Adds aria-label to the pagination wrapping div
   *
   * Recommended English value: *Pagination*
   */
  ariaLabel?: string;
  className?: string;
  /**
   * The total number of data items
   */
  count: number;
  /**
   * Function to create both the simple and enhanced version of count content
   * Simple is used when container width < 800px, enhanced used when container with >= 800px.
   * This is required if the `showCount` prop is set to `true`.
   *
   * Sample function with recommended English value:
   *
   * ``(from, to, count) => ({ enhanced: `Showing items ${from}-${to} of ${count}`, simple: `Total items: ${count}`, })``
   */
  createCountContent?: (
    from: number,
    to: number,
    count: number,
  ) => { enhanced: string; simple: string };
  /**
   * Function to create both the simple and enhanced version of paging content.
   * Simple is used when container width < 600px, enhanced used when container with >= 600px.
   *
   * Sample function with recommended English value:
   *
   * ``(page, pageCount) => ({ enhanced: `Page ${page} of ${pageCount}`, simple: `${page} of ${pageCount}`, })``
   */
  createPagingContent: (page: number, pageCount: number) => { enhanced: string; simple: string };
  /**
   *  _Uncontrolled only_: The default one-based index of the current page
   */
  defaultPage?: number;
  /**
   *  _Uncontrolled only_: The default perPageCount, which is one of the perPageCountOptions
   */
  defaultPerPageCount?: number;
  isResponsive?: boolean;
  /**
   * Adds aria-label to next page icon.
   *
   * Recommended English value: *Next Page*
   */
  nextPageLabel: string;
  /**
   * Called when page is changed
   *
   * `page => {}`
   */
  onPageChange?: (page?: number) => void;
  /**
   * Called when perPageCount is changed
   *
   * `perPageCount => {}`
   */
  onPerPageCountChange?: (perPageCount?: number) => void;
  /**
   * _Controlled only_: The one-based index of the current page
   */
  page?: number;
  /**
   * Adds label to the page select.
   *
   * Recommended English value: *Select a page*
   */
  pageSelectLabel: string;
  /**
   * The content at the left of the page select. This is required if the
   * `showPerPageCountSelect` prop is set to `true`.
   *
   * Recommended English value: *Items per page*
   */
  perPageContent?: string;
  /**
   * _Controlled only_: Per page count
   */
  perPageCount?: number;
  /**
   * The per page count options
   */
  perPageCountOptions?: number[];
  /**
   * Adds label to the perPageCount select. This is required if the
   * `showPerPageCountSelect` prop is set to `true`.
   *
   * Recommended English value: *Select a per page count*
   */
  perPageCountSelectLabel?: string;
  /**
   * Adds aria-label to previous page icon.
   *
   * Recommended English value: *Previous Page*
   */
  previousPageLabel: string;
  qaHook?: string;
  /**
   * Whether to show the count
   */
  showCount?: boolean;
  /**
   * Whether to show the PerPageCount select
   */
  showPerPageCountSelect?: boolean;
}

declare const XUIPagination: React.FunctionComponent<Props>;
export default XUIPagination;
