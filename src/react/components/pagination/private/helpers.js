import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-pagination`;

export const defaultPerPageCountOptions = [10, 25, 50, 100, 200];

export const defaultPerPageContent = 'Items per page';

export const numberFormat = number => new Intl.NumberFormat().format(number);

export const defaultCreateCountContent = (from, to, count) => ({
  enhanced: `Showing items ${from}-${to} of ${count}`, // $xui-breakpoint-medium-up
  simple: `Total items: ${count}`, // $xui-breakpoint-medium-down
});

export const defaultCreatePagingContent = (page, pageCount) => ({
  enhanced: `Page ${page} of ${pageCount}`, // $xui-breakpoint-small-down
  simple: `${page} of ${pageCount}`, // $xui-breakpoint-small-up
});
