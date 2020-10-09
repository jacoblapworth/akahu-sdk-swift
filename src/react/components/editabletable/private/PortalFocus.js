import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';
import { tableName } from './constants';
import useResizeObserver from '../../helpers/useResizeObserver';

const baseName = `${tableName}--portalfocus`;

const PortalFocus = ({ cellRef, isFocused, scrollContainerRef }) => {
  const [showPortal, setShowPortal] = useState(undefined);
  const [portalStyle, setPortalStyle] = useState({});
  const [cellCovered, setCellCovered] = useState(undefined);
  const { handleSizeChange } = useResizeObserver(cellRef?.current);

  useLayoutEffect(() => {
    const getPortalPosition = () => {
      const scrollContainerRect = scrollContainerRef?.current?.getBoundingClientRect();
      const cellRect = cellRef?.current?.getBoundingClientRect();
      if (!scrollContainerRect || !cellRect) {
        return;
      }
      let portalWidth = cellRect.width;
      let leftPosition = cellRect.left - scrollContainerRect.left;
      const rightCovered = cellRect.right >= scrollContainerRect.right;
      const leftCovered = cellRect.left <= scrollContainerRect.left;

      if (rightCovered && leftCovered) {
        setCellCovered('horizontal');
        portalWidth = scrollContainerRect.width - 2;
        leftPosition = 1;
      } else if (rightCovered) {
        setCellCovered('right');
        portalWidth = scrollContainerRect.width + scrollContainerRect.left - cellRect.left - 1;
      } else if (leftCovered) {
        setCellCovered('left');
        portalWidth = scrollContainerRect.width + cellRect.right - scrollContainerRect.right - 1;
        leftPosition = 1;
      } else {
        setCellCovered(false);
      }

      setShowPortal(portalWidth > 0);
      setPortalStyle({
        left: leftPosition,
        top: cellRect.top - scrollContainerRect.top,
        width: portalWidth,
        height: cellRect.height,
      });
    };
    if (isFocused) {
      getPortalPosition();
      handleSizeChange(getPortalPosition);
      scrollContainerRef?.current?.addEventListener('scroll', getPortalPosition);
    }
    return () => scrollContainerRef?.current?.removeEventListener('scroll', getPortalPosition);
  }, [cellRef, handleSizeChange, isFocused, scrollContainerRef]);

  return showPortal ? (
    <Portal node={scrollContainerRef?.current}>
      <div
        className={cn(
          baseName,
          cellCovered === 'right' && `${baseName}-rightCovered`,
          cellCovered === 'left' && `${baseName}-leftCovered`,
          cellCovered === 'horizontal' && `${baseName}-horizontalCovered`,
        )}
        style={{ ...portalStyle }}
      >
        <div className={`${baseName}--border`} />
      </div>
    </Portal>
  ) : null;
};

PortalFocus.propTypes = {
  cellRef: PropTypes.object,
  isFocused: PropTypes.bool,
  scrollContainerRef: PropTypes.object,
};

export default PortalFocus;
