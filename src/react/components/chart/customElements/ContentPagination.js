import React from 'react';
import PropTypes from 'prop-types';
import arrowPathData from '@xero/xui-icon/icons/arrow';
import XUIIconButton from '../../button/XUIIconButton';
import { NAME_SPACE } from '../helpers/constants';

const ContentPagination = ({
  createMessage,
  current,
  paginationLabel,
  paginationNextTitle,
  paginationPreviousTitle,
  qaHook,
  total,
  updatePanel,
}) => {
  const message = createMessage && createMessage(current, total);

  return (
    <nav
      aria-label={paginationLabel}
      className={`${NAME_SPACE}-chart--pagination`}
      data-automationid={qaHook && `${qaHook}--pagination`}
    >
      <XUIIconButton
        ariaLabel={paginationPreviousTitle}
        icon={arrowPathData}
        isDisabled={current === 1}
        onClick={() => updatePanel(current - 1)}
        rotation="90"
        title={paginationPreviousTitle}
      />

      {message}

      <XUIIconButton
        ariaLabel={paginationNextTitle}
        icon={arrowPathData}
        isDisabled={current === total}
        onClick={() => updatePanel(current + 1)}
        rotation="270"
        title={paginationNextTitle}
      />
    </nav>
  );
};

export default ContentPagination;

ContentPagination.propTypes = {
  qaHook: PropTypes.string,
  current: PropTypes.number,
  total: PropTypes.number,
  updatePanel: PropTypes.func,
  createMessage: PropTypes.func,
  paginationLabel: PropTypes.string,
  paginationNextTitle: PropTypes.string,
  paginationPreviousTitle: PropTypes.string,
};
