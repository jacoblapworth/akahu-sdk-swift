import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';
import { tableName } from './constants';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';

const baseName = `${tableName}--portalfocus`;

const PortalFocus = ({ focusedCellRef, isFocused, scrollContainerRef }) => {
  const [showPortal, setShowPortal] = useState(undefined);
  const [portalStyle, setPortalStyle] = useState({});
  const [focusedCellCovered, setFocusedCellCovered] = useState(undefined);

  const { hasPinnedFirstColumn, hasPinnedLastColumn } = React.useContext(XUIEditableTableContext);

  const isFocusedCellPinned = focusedCellRef?.current?.matches(
    `.${tableName}-pinlast .${tableName}cell:last-child, .${tableName}-pinfirst .${tableName}cell:first-child`,
  );

  useLayoutEffect(() => {
    const getPortalPosition = () => {
      if (!scrollContainerRef?.current || !focusedCellRef?.current) {
        return;
      }

      const scrollContainerRect = scrollContainerRef?.current?.getBoundingClientRect();
      const focusedCellRect = focusedCellRef?.current?.getBoundingClientRect();

      if (!scrollContainerRect || !focusedCellRect) {
        return;
      }

      const safeAreaRight =
        !isFocusedCellPinned && hasPinnedLastColumn
          ? scrollContainerRef?.current?.querySelector('td:last-child').clientWidth
          : 1;

      const safeAreaLeft =
        !isFocusedCellPinned && hasPinnedFirstColumn
          ? scrollContainerRef?.current?.querySelector('td:first-child').clientWidth
          : 1;

      let portalWidth = focusedCellRect.width;
      let leftPosition = focusedCellRect.left - scrollContainerRect.left;
      const rightCovered = focusedCellRect.right > scrollContainerRect.right - safeAreaRight;
      const leftCovered = focusedCellRect.left < scrollContainerRect.left + safeAreaLeft;

      if (rightCovered && leftCovered) {
        setFocusedCellCovered('horizontal');
        portalWidth = scrollContainerRect.width - safeAreaLeft - safeAreaRight;
        leftPosition = safeAreaLeft;
      } else if (rightCovered) {
        setFocusedCellCovered('right');
        portalWidth =
          scrollContainerRect.width +
          scrollContainerRect.left -
          focusedCellRect.left -
          safeAreaRight;
      } else if (leftCovered) {
        setFocusedCellCovered('left');
        portalWidth =
          scrollContainerRect.width +
          focusedCellRect.right -
          scrollContainerRect.right -
          safeAreaLeft;
        leftPosition = safeAreaLeft;
      } else {
        setFocusedCellCovered(false);
      }

      setShowPortal(portalWidth > 0);
      setPortalStyle({
        left: leftPosition,
        top: focusedCellRect.top - scrollContainerRect.top,
        width: portalWidth,
        height: focusedCellRect.height,
      });
    };
    if (isFocused) {
      getPortalPosition();
      scrollContainerRef?.current?.addEventListener('scroll', getPortalPosition);
    }
    return () => scrollContainerRef?.current?.removeEventListener('scroll', getPortalPosition);
  }, [
    focusedCellRef,
    hasPinnedFirstColumn,
    hasPinnedLastColumn,
    focusedCellRef.current?.clientWidth,
    isFocusedCellPinned,
    isFocused,
    scrollContainerRef,
    focusedCellRef.current?.clientHeight,
  ]);

  return showPortal ? (
    <Portal node={scrollContainerRef?.current}>
      <div
        className={cn(
          baseName,
          focusedCellCovered === 'right' && `${baseName}-rightCovered`,
          focusedCellCovered === 'left' && `${baseName}-leftCovered`,
          focusedCellCovered === 'horizontal' && `${baseName}-horizontalCovered`,
          isFocusedCellPinned && `${baseName}-pinned`,
        )}
        style={{ ...portalStyle }}
      >
        <div className={`${baseName}--border`} />
      </div>
    </Portal>
  ) : null;
};

PortalFocus.propTypes = {
  focusedCellRef: PropTypes.object,
  isFocused: PropTypes.bool,
  scrollContainerRef: PropTypes.object,
};

export default PortalFocus;
