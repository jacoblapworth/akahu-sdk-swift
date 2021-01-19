import React from 'react';
import PropTypes from 'prop-types';
import PaginationSelect from './PaginationSelect';

import { baseClass, numberFormat } from './helpers';

const itemsBaseClass = `${baseClass}--items`;

const ItemsElement = ({
  count,
  createCountContent,
  currentPage,
  isEnhancedCount,
  isSimple,
  onPerPageCountChange,
  perPageCount,
  perPageCountOptions,
  perPageContent,
  qaHook,
  selectLabel,
  showCount,
  showPerPageCountSelect,
}) => {
  const from = count === 0 ? 0 : (currentPage - 1) * perPageCount + 1;
  const to = Math.min(count, currentPage * perPageCount);
  const { simple, enhanced } = createCountContent && createCountContent(from, to, count);

  return (
    <div className={itemsBaseClass}>
      {!isSimple && showPerPageCountSelect && count > perPageCountOptions[0] && (
        <div
          className={`${itemsBaseClass}--select`}
          data-automationid={qaHook && `${qaHook}-select`}
        >
          {perPageContent}
          <PaginationSelect
            buttonContent={numberFormat(perPageCount)}
            currentOption={perPageCount}
            label={selectLabel}
            onSelect={onPerPageCountChange}
            options={perPageCountOptions}
          />
        </div>
      )}
      {showCount && (
        <div className={`${itemsBaseClass}--count`} data-automationid={qaHook && `${qaHook}-count`}>
          {isEnhancedCount ? enhanced : simple}
        </div>
      )}
    </div>
  );
};

export default React.memo(ItemsElement);

ItemsElement.propTypes = {
  count: PropTypes.number,
  createCountContent: PropTypes.func,
  currentPage: PropTypes.number,
  isEnhancedCount: PropTypes.bool,
  isSimple: PropTypes.bool,
  onPerPageCountChange: PropTypes.func,
  perPageContent: PropTypes.string,
  perPageCount: PropTypes.number,
  perPageCountOptions: PropTypes.array,
  qaHook: PropTypes.string,
  selectLabel: PropTypes.string,
  showCount: PropTypes.bool,
  showPerPageCountSelect: PropTypes.bool,
};
