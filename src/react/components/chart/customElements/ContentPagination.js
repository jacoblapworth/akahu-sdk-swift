import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import arrowPathData from '@xero/xui-icon/icons/arrow';

class ContentPagination extends Component {
	render() {
		const {current, total, updatePanel, createMessage} = this.props;
		const message = createMessage && createMessage(current, total);

		return (
			<nav
				className="xui-chart--pagination"
				role="navigation"
				aria-label="Pagination">

				<XUIButton
					variant="icon"
					className={`xui-button-icon-large`}
					onClick={() => updatePanel(current - 1)}
					title="Previous page"
					isDisabled={current === 1}>
					<XUIIcon
						path={arrowPathData}
						rotation="90"
					/>
				</XUIButton>

				{message}

				<XUIButton
					variant="icon"
					className={`xui-button-icon-large`}
					onClick={() => updatePanel(current + 1)}
					title="Next Page"
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
