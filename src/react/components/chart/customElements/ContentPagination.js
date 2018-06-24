import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import arrowPathData from '@xero/xui-icon/icons/arrow';
import {NAME_SPACE} from '../helpers/constants';

class ContentPagination extends PureComponent {
	render = () => {
		const {
			qaHook,
			current,
			total,
			updatePanel,
			createMessage,
			paginationNextTitle,
			paginationPreviousTitle,
		} = this.props;
		const message = createMessage && createMessage(current, total);

		return (
			<nav
				data-automationid={qaHook && `${qaHook}--pagination`}
				className={`${NAME_SPACE}-chart--pagination`}
				role="navigation"
				aria-label="Pagination">

				<XUIButton
					variant="icon-large"
					onClick={() => updatePanel(current - 1)}
					title={paginationPreviousTitle}
					isDisabled={current === 1}>
					<XUIIcon
						path={arrowPathData}
						rotation="90"
					/>
				</XUIButton>

				{message}

				<XUIButton
					variant="icon-large"
					onClick={() => updatePanel(current + 1)}
					title={paginationNextTitle}
					isDisabled={current === total}>
					<XUIIcon
						path={arrowPathData}
						rotation="270"
					/>
				</XUIButton>

			</nav>
		);
	}
}

export default ContentPagination;

ContentPagination.propTypes = {
	qaHook: PropTypes.string,
	current: PropTypes.number,
	total: PropTypes.number,
	updatePanel: PropTypes.func,
	createMessage: PropTypes.func,
	paginationNextTitle: PropTypes.string,
	paginationPreviousTitle: PropTypes.string,
};
