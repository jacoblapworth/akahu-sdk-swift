import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import useResizeObserver from '../../helpers/useResizeObserver';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import { tableVariantClassNames } from './constants';

const baseName = `${tableVariantClassNames.editable}utilitybar`;

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>,
  keyof BaseProps
>;

type Props = BaseProps & SpreadProps;

const EditableTableUtilityBar: React.FunctionComponent<Props> = ({
  children,
  className,
  qaHook,
  ...spreadProps
}) => {
  const { scrollContainerRef } = React.useContext(XUIEditableTableContext);
  const [colSpan, setColSpan] = React.useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = React.useState<number>();

  const { observedElementRef } = useResizeObserver<HTMLTableDataCellElement>();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  React.useLayoutEffect(() => {
    const wrapperNode = scrollContainerRef?.current;
    if (wrapperNode) {
      const tableCells = wrapperNode?.querySelector('tr')?.children;
      if (tableCells) {
        // The action cell should stretch to the whole row
        setWrapperWidth(wrapperNode.clientWidth - 2);
      }
    }
  });

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const tableCells = scrollContainerRef?.current?.querySelector('tr')?.children;
    if (tableCells) {
      const visibleTableCells = Array.from(tableCells).filter(
        tableCell => getComputedStyle(tableCell).display !== 'none',
      );
      // The action cell should stretch to the whole row
      setColSpan(visibleTableCells.length);
    }
  });

  return (
    <tr className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      <td className={`${baseName}--cell`} colSpan={colSpan} ref={observedElementRef}>
        <div className={`${baseName}--cell--wrapper`} style={{ width: wrapperWidth }}>
          {children}
        </div>
      </td>
    </tr>
  );
};

EditableTableUtilityBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default EditableTableUtilityBar;
