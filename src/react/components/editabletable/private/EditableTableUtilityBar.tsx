import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import combineRefs from '../../helpers/combineRefs';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import { tableName } from './constants';
import useResizeObserver from './helpers/useResizeObserver';

const baseName = `${tableName}utilitybar`;

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
    if (scrollContainerRef?.current) {
      const wrapperNode = scrollContainerRef.current;
      // The action cell should stretch to the whole row
      setColSpan(wrapperNode.querySelector('tr')?.children.length);
      setWrapperWidth(wrapperNode.clientWidth - 2);
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
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default EditableTableUtilityBar;
