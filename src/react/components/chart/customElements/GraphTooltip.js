import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';

class GraphTooltip extends PureComponent {

	render() {
		const { toolTipContent, toolTipY, toolTipX } = this.props;
		return (
			<div
				style={{
					top: `${toolTipY - 15}px`,
					left: `${toolTipX}px`,
					height: 10,
					width: 10,
					background: 'red',
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
