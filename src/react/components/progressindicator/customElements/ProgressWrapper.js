import React from 'react';
import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';
import {NAME_SPACE, COLORS} from '../helpers/constants';

const createColorOverride = (color, type) => (COLORS.indexOf(color) >= 0 && {[`data-${NAME_SPACE}-${type}-color`]: color});

const ProgressWrapper = (props) => {

	const {
		children,
		qaHook,
		classes,
		ariaNow,
		ariaMin,
		ariaMax,
		totalColor,
		progressColor,
		hasToolTip,
		toolTipId,
		toolTipMessage,
	} = props;

	return (
		<div
			className={classes}
			role="progressbar"
			aria-valuenow={ariaNow}
			aria-valuemin={ariaMin}
			aria-valuemax={ariaMax}
			aria-valuetext={toolTipMessage}
			data-automationid={qaHook}
			{...createColorOverride(totalColor, 'total')}
			{...createColorOverride(progressColor, 'current')}>

			{hasToolTip

				? (<XUITooltip
						id={toolTipId}
						qaHook={qaHook && `${qaHook}-tooltip`}
						wrapperClassName={`${NAME_SPACE}--tooltip`}
						trigger={children(props)}>
						{toolTipMessage}
					</XUITooltip>)

				: (children(props))}

		</div>
	);

};

ProgressWrapper.propTypes = {
	children: PropTypes.func.isRequired,
	qaHook: PropTypes.string,
	classes: PropTypes.string.isRequired,
	ariaNow: PropTypes.number.isRequired,
	ariaMin: PropTypes.number.isRequired,
	ariaMax: PropTypes.number.isRequired,
	totalColor: PropTypes.string,
	progressColor: PropTypes.string,
	hasToolTip: PropTypes.bool,
	toolTipId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	toolTipMessage: PropTypes.string.isRequired,
};

export default ProgressWrapper;
