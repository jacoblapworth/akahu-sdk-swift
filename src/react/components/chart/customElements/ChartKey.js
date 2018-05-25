import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import infoPathData from '@xero/xui-icon/icons/info';

class ChartKey extends Component {
	render() {
		// const { currentPage, updatePage } = this.props;

		return (
			<div>


				<div>
					<XUIButton
						variant="icon"
						className={`xui-button-icon-large`}
						onClick={() => console.log('TOGGLE')}
						title="Toggle key">
						<XUIIcon
							path={infoPathData}
							className={`xui-u-flex-inherit`}
						/>
					</XUIButton>
				</div>

				<div>

				</div>


			</div>
		);
	}
}

export default ChartKey;
