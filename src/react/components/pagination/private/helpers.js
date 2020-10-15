import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-pagination`;

export const defaultPerPageCountOptions = [10, 25, 50, 100, 200];

export const defaultPerPageContent = 'Items per page';

export const numberFormat = number => new Intl.NumberFormat().format(number);

export const defaultCreateCountContent = (from, to, count) => ({
  enhanced: `Showing items ${numberFormat(from)}-${numberFormat(to)} of ${numberFormat(count)}`, // $xui-breakpoint-medium-up
  simple: `Total items: ${numberFormat(count)}`, // $xui-breakpoint-medium-down
});

export const defaultCreatePagingContent = (page, pageCount) => ({
  enhanced: `Page ${numberFormat(page)} of ${numberFormat(pageCount)}`, // $xui-breakpoint-small-down
  simple: `${numberFormat(page)} of ${numberFormat(pageCount)}`, // $xui-breakpoint-small-up
});
