import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import arrowPathData from '@xero/xui-icon/icons/arrow';
import XUIIconButton from '../../button/XUIIconButton';
import { NAME_SPACE } from '../helpers/constants';

class ContentPagination extends PureComponent {
  render = () => {
    const {
      qaHook,
      current,
      total,
      updatePanel,
      createMessage,
      paginationLabel,
      paginationNextTitle,
      paginationPreviousTitle,
    } = this.props;
    const message = createMessage && createMessage(current, total);

    return (
      <nav
        data-automationid={qaHook && `${qaHook}--pagination`}
        className={`${NAME_SPACE}-chart--pagination`}
        aria-label={paginationLabel}
      >
        <XUIIconButton
          icon={arrowPathData}
          ariaLabel={paginationPreviousTitle}
          onClick={() => updatePanel(current - 1)}
          title={paginationPreviousTitle}
          isDisabled={current === 1}
          rotation="90"
        />

        {message}

        <XUIIconButton
          icon={arrowPathData}
          ariaLabel={paginationNextTitle}
          onClick={() => updatePanel(current + 1)}
          title={paginationNextTitle}
          isDisabled={current === total}
          rotation="270"
        />
      </nav>
    );
  };
}

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
