import * as React from 'react';

// These helpers were taken from https://github.dev.xero.com/UXE/xui/blob/17.0.0/src/react/components/table/helpers/utilities.js

const createTruncationArea = (
  actionWidth: number,
  rootWidth: number,
  { hasCheckbox, hasOverflowMenu }: { hasCheckbox?: boolean; hasOverflowMenu?: boolean },
) => {
  switch (true) {
    case hasCheckbox && hasOverflowMenu:
      return rootWidth - actionWidth * 2;
    case hasCheckbox || hasOverflowMenu:
      return rootWidth - actionWidth;
    default:
      return rootWidth;
  }
};

const canTruncate = (
  { rootWidth }: { rootWidth?: number },
  props: { children: React.ReactNode; hasCheckbox?: boolean; hasOverflowMenu?: boolean },
) => {
  if (typeof rootWidth !== 'number') {
    return false;
  }
  const actionWidth = 50;
  const minColumnWidth = 80;
  const maxColumnWidth = 200;
  const { children: columns } = props;
  const totalColumns = React.Children.count(columns);
  const truncationArea = createTruncationArea(actionWidth, rootWidth, props);
  const oneTruncatedColumn = Math.floor(truncationArea / totalColumns);
  const isTruncated = oneTruncatedColumn >= minColumnWidth && oneTruncatedColumn <= maxColumnWidth;

  return isTruncated;
};

export default canTruncate;
