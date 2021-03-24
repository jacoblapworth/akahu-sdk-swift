import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import combineRefs from '../../helpers/combineRefs';
import useResizeObserver from '../../helpers/useResizeObserver';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import { tableVariantClassNames } from './constants';

const baseName = `${tableVariantClassNames.editable}utilitybar`;

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type Props = BaseProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

const EditableTableUtilityBar: React.FunctionComponent<Props> = ({
  children,
  className,
  qaHook,
  ...spreadProps
}) => {
  const { scrollContainerRef } = React.useContext(XUIEditableTableContext);
  const [colSpan, setColSpan] = React.useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = React.useState<number>();

  const {
    contentRect: { width },
    observedElementRef,
  } = useResizeObserver();

  const combinedRef = combineRefs(observedElementRef);

  React.useLayoutEffect(() => {
    const wrapperNode = scrollContainerRef?.current;
    if (wrapperNode) {
      const tableCells = wrapperNode?.querySelector('tr')?.children;
      if (tableCells) {
        // The action cell should stretch to the whole row
        setColSpan(tableCells.length);
        setWrapperWidth(wrapperNode.clientWidth - 2);
      }
    }
  }, [scrollContainerRef, width]);

  return (
    <tr className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      <td
        className={`${baseName}--cell`}
        colSpan={colSpan}
        ref={element => combinedRef(element as HTMLElement)}
      >
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
