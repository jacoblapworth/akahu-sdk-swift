import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import combineRefs from '../../helpers/combineRefs';
import useResizeObserver from '../../helpers/useResizeObserver';
import { ns } from '../../helpers/xuiClassNamespace';
import XUIEditableTableClassContext from '../contexts/XUIEditableTableClassContext';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  hasPinnedFirstColumn?: boolean;
  hasPinnedLastColumn?: boolean;
}

type Props = BaseProps & React.HTMLAttributes<HTMLDivElement>;

const EditableTableOverflow: React.FunctionComponent<Props> = React.forwardRef<HTMLElement, Props>(
  ({ children, className, hasPinnedFirstColumn, hasPinnedLastColumn, ...spreadProps }, ref) => {
    const editableTableOverflowRef = React.useRef<HTMLElement>(null);
    const { scrollContainerRef, tableRef } = React.useContext(XUIEditableTableContext);
    const tableClassName = React.useContext(XUIEditableTableClassContext);
    const [hasLeftOverflow, setLeftOverflow] = React.useState<boolean>();
    const [hasRightOverflow, setRightOverflow] = React.useState<boolean>();
    const [hasFirstPinOverflow, setFirstPinOverflow] = React.useState<boolean>();
    const [hasLastPinOverflow, setLastPinOverflow] = React.useState<boolean>();
    const { observedElementRef } = useResizeObserver();

    const baseName = `${tableClassName}overflow`;

    const combinedRef = combineRefs(ref, editableTableOverflowRef, observedElementRef);

    const setScrollOverflow = React.useCallback(() => {
      if (!scrollContainerRef?.current || !tableRef?.current) {
        return;
      }

      const wrapperNode = scrollContainerRef.current;
      const tableNode = tableRef.current;
      const scrollLeft = wrapperNode && wrapperNode.scrollLeft;
      const wrapperWidth = wrapperNode && wrapperNode.clientWidth;
      const tableWidth = tableNode && tableNode.clientWidth;
      const leftAction = scrollLeft > 0;
      const rightAction = scrollLeft + wrapperWidth < tableWidth - 1; // `scrollLeft + wrapper width` is 1px less than `tableWidth` in Firefox when fully scrolled to the right
      const firstPin = leftAction && hasPinnedFirstColumn;
      const lastPin = rightAction && hasPinnedLastColumn;
      setLeftOverflow(leftAction);
      setRightOverflow(rightAction);
      setFirstPinOverflow(firstPin);
      setLastPinOverflow(lastPin);
    }, [hasPinnedFirstColumn, hasPinnedLastColumn, scrollContainerRef, tableRef]);

    React.useLayoutEffect(() => {
      setScrollOverflow();

      const scrollContainerElement = scrollContainerRef?.current;
      if (scrollContainerElement) {
        scrollContainerElement.addEventListener('scroll', setScrollOverflow);

        // The CSS variable is used to calculate the overflow shadow height
        const scrollbarHeight =
          scrollContainerElement.offsetHeight - scrollContainerElement.clientHeight;

        editableTableOverflowRef.current?.style.setProperty(
          '--xui-editableoverflow--scrollbar-height',
          `${scrollbarHeight}px`,
        );
      }

      return () => scrollContainerElement?.removeEventListener('scroll', setScrollOverflow);
    });

    const hasFootAction = tableRef?.current?.querySelector(`.${ns}-editabletablefoot--action`);
    return (
      <div
        className={cn(
          className,
          baseName,
          hasFootAction && `${baseName}-has-footaction`,
          hasLeftOverflow && !hasFirstPinOverflow && `${baseName}-overflowleft`,
          hasRightOverflow && !hasLastPinOverflow && `${baseName}-overflowright`,
          hasFirstPinOverflow && `${baseName}-pinoverflowleft`,
          hasLastPinOverflow && `${baseName}-pinoverflowright`,
        )}
        ref={element => combinedRef(element as HTMLElement)}
        {...spreadProps}
      >
        {children}
      </div>
    );
  },
);

EditableTableOverflow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasPinnedFirstColumn: PropTypes.bool,
  hasPinnedLastColumn: PropTypes.bool,
};

export default EditableTableOverflow;
