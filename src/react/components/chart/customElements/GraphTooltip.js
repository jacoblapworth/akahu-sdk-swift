import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';

class GraphTooltip extends PureComponent {

	render() {
		const { message, position: { left, top, width, height, preferred = 'top' } } = this.props;
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
					trigger={<div style={{ width, height }}/>}
					isHidden={false}
					preferredPosition={preferred}
					triggerOnFocus={false}
					triggerOnBlur={false}
					triggerOnClick={false}
					triggerOnHover={false}>
					{message}
				</XUITooltip>
			</div>
		);
	}

}

export default GraphTooltip;
