import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import { tableName } from './constants';

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

  React.useEffect(() => {
    if (scrollContainerRef?.current) {
      const wrapperNode = scrollContainerRef.current;
      // The action cell should stretch to the whole row
      setColSpan(wrapperNode.querySelector('tr')?.children.length);
      setWrapperWidth(wrapperNode.clientWidth - 2);
    }
  }, [scrollContainerRef]);

  return (
    <tr className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      <td className={`${baseName}--cell`} colSpan={colSpan}>
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
