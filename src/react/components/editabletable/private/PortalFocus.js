import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';
import { tableName } from './constants';
import useResizeObserver from '../../helpers/useResizeObserver';

const baseName = `${tableName}--portalfocus`;

const PortalFocus = ({ cellRef, isFocused, tableRef }) => {
  const [showPortal, setShowPortal] = useState(undefined);
  const [portalStyle, setPortalStyle] = useState({});
  const [cellCovered, setCellCovered] = useState(undefined);
  const { handleSizeChange } = useResizeObserver(cellRef?.current);

  useLayoutEffect(() => {
    const getPortalPosition = () => {
      const tableRect = tableRef?.current?.getBoundingClientRect();
      const cellRect = cellRef?.current?.getBoundingClientRect();
      if (!tableRect || !cellRect) {
        return;
      }
      let portalWidth = cellRect.width;
      let leftPosition = cellRect.left - tableRect.left;
      const rightCovered = cellRect.right >= tableRect.right;
      const leftCovered = cellRect.left <= tableRect.left;

      if (rightCovered && leftCovered) {
        setCellCovered('horizontal');
        portalWidth = tableRect.width - 2;
        leftPosition = 1;
      } else if (rightCovered) {
        setCellCovered('right');
        portalWidth = tableRect.width + tableRect.left - cellRect.left - 1;
      } else if (leftCovered) {
        setCellCovered('left');
        portalWidth = tableRect.width + cellRect.right - tableRect.right - 1;
        leftPosition = 1;
      } else {
        setCellCovered(false);
      }

      setShowPortal(portalWidth > 0);
      setPortalStyle({
        left: leftPosition,
        top: cellRect.top - tableRect.top,
        width: portalWidth,
        height: cellRect.height,
      });
    };
    if (isFocused) {
      getPortalPosition();
      handleSizeChange(getPortalPosition);
      tableRef?.current?.addEventListener('scroll', getPortalPosition);
    }
    return () => tableRef?.current?.removeEventListener('scroll', getPortalPosition);
  }, [cellRef, handleSizeChange, isFocused, tableRef]);

  return showPortal ? (
    <Portal node={tableRef?.current}>
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
  tableRef: PropTypes.object,
};

export default PortalFocus;
