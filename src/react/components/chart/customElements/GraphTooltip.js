import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';

class GraphTooltip extends PureComponent {
	render() {
		const {message, offset, left, top, width, height, preferred} = this.props;
		return (
			<div
				style={{
					top, height, width,
					left: left - offset,
					background: 'transparent',
					pointerEvents: 'none',
					position: 'absolute',
				}}
			>
				<XUITooltip
					trigger={<div style={{width, height}}/>}
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

GraphTooltip.propTypes = {
	message: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	offset: PropTypes.number,
	left: PropTypes.number,
	top: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	preferred: PropTypes.string,
};

GraphTooltip.defaultProps = {
  preferred: 'top'
};
