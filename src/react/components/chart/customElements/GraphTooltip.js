import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';

class GraphTooltip extends PureComponent {

	render() {
		const { toolTipContent, toolTipY, toolTipX } = this.props;
		return (
			<div
				style={{
					left: 0,
					top: 0,
					transform: `translate(${toolTipX}px, ${toolTipY - 15}px)`,
					height: 0,
					width: 0,
					background: 'transparent',
					position: 'absolute'
				}}
			>
				<XUITooltip
					trigger={<div />}
					isHidden={false}
					triggerOnFocus={false}
					triggerOnBlur={false}
					triggerOnClick={false}
					triggerOnHover={false}
					>
					{toolTipContent}
				</XUITooltip>
			</div>
		);
	}

}

export default GraphTooltip;
