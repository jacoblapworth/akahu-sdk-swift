import React from 'react';
import PropTypes from 'prop-types';

import backIcon from '@xero/xui-icon/icons/back';
import XUIIconButton from '../../button/XUIIconButton';
import PaginationSelect from './PaginationSelect';

import { baseClass, numberFormat } from './helpers';

const commonIconProps = {
  icon: backIcon,
  size: 'small',
};

const Paging = ({
  createPagingContent,
  currentPage,
  isSimple,
  nextPageLabel,
  onPageChange,
  pageCount,
  qaHook,
  selectLabel,
  previousPageLabel,
}) => {
  const { simple, enhanced } =
    createPagingContent && createPagingContent(numberFormat(currentPage), numberFormat(pageCount));
  const pagingContent = isSimple ? simple : enhanced;

  return (
    <div className={`${baseClass}--paging`} data-automationid={qaHook && `${qaHook}-paging`}>
      <XUIIconButton
        ariaLabel={previousPageLabel}
        isDisabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        {...commonIconProps}
      />
      {pageCount > 2 ? (
        <PaginationSelect
          buttonContent={pagingContent}
          currentOption={currentPage}
          isPaging
          label={selectLabel}
          onSelect={onPageChange}
          options={[...Array(pageCount + 1).keys()].slice(1)}
        />
      ) : (
        pagingContent
      )}
      <XUIIconButton
        ariaLabel={nextPageLabel}
        isDisabled={currentPage >= pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        rotation="180"
        {...commonIconProps}
      />
    </div>
  );
};

export default React.memo(Paging);

Paging.propTypes = {
  createPagingContent: PropTypes.func,
  currentPage: PropTypes.number,
  isSimple: PropTypes.bool,
  nextPageLabel: PropTypes.string,
  onPageChange: PropTypes.func,
  pageCount: PropTypes.number,
  previousPageLabel: PropTypes.string,
  qaHook: PropTypes.string,
  selectLabel: PropTypes.string,
};
