import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';

class GraphTooltip extends PureComponent {

	render() {
		const { createMessage, toolTipPosition: { left, top, width, height } } = this.props;
		console.log('toolTip', { left, top, width, height });
		return (
			<div
				style={{
					left, top, height, width,
					background: 'transparent',
					pointerEvents: 'none',
					position: 'absolute',
				}}
			>
				<XUITooltip
					trigger={<div />}
					isHidden={false}
					triggerOnFocus={false}
					triggerOnBlur={false}
					triggerOnClick={false}
					triggerOnHover={false}>
					{createMessage}
				</XUITooltip>
			</div>
		);
	}

}

export default GraphTooltip;
