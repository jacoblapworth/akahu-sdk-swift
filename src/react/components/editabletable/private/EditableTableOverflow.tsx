import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import combineRefs from '../../helpers/combineRefs';
import { ns } from '../../helpers/xuiClassNamespace';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import useResizeObserver from './helpers/useResizeObserver';

const baseName = `${ns}-editabletableoverflow`;

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLDivElement>;

const EditableTableOverflow: React.FunctionComponent<Props> = React.forwardRef<HTMLElement, Props>(
  ({ children, className, ...spreadProps }, ref) => {
    const editableTableOverflowRef = React.useRef<HTMLElement>(null);
    const { scrollContainerRef, tableRef } = React.useContext(XUIEditableTableContext);
    const [hasLeftOverflow, setLeftOverflow] = React.useState<boolean>();
    const [hasRightOverflow, setRightOverflow] = React.useState<boolean>();

    const {
      contentRect: { height, width, x, y },
      observedElementRef,
    } = useResizeObserver();

    // Re-render on resize
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    React.useLayoutEffect(() => {}, [height, width, x, y]);

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

      setLeftOverflow(leftAction);
      setRightOverflow(rightAction);
    }, [scrollContainerRef, tableRef]);

    React.useLayoutEffect(() => {
      setScrollOverflow();

      scrollContainerRef?.current?.addEventListener('scroll', setScrollOverflow);

      return () => scrollContainerRef?.current?.removeEventListener('scroll', setScrollOverflow);
    });

    const hasFootAction = tableRef?.current?.querySelector(`.${ns}-editabletablefoot--action`);

    return (
      <div
        className={cn(
          className,
          baseName,
          hasFootAction && `${baseName}-has-footaction`,
          hasLeftOverflow && `${baseName}-overflowleft`,
          hasRightOverflow && `${baseName}-overflowright`,
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
};

export default EditableTableOverflow;
