import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import arrowPathData from '@xero/xui-icon/icons/arrow';
// import { alwaysPositive } from '../helpers';

class ContentPagination extends Component {
	render() {
		const { currentPage, updatePage } = this.props;

		return (
			<nav role="navigation" aria-label="Pagination">
				<XUIButton
					variant="icon"
					className={`xui-button-icon-large`}
					onClick={() => updatePage(currentPage - 1)}
					title="Previous page">
					<XUIIcon
						path={arrowPathData}
						rotation="90"
						className={`xui-u-flex-inherit`}
					/>
				</XUIButton>
				Page {currentPage}
				<XUIButton
					variant="icon"
					className={`xui-button-icon-large`}
					onClick={() => updatePage(currentPage + 1)}
					title="Next Page">
					<XUIIcon
						path={arrowPathData}
						rotation="270"
						className={`xui-u-flex-inherit`}
					/>
				</XUIButton>
			</nav>
		);
	}
}

export default ContentPagination;
