import React from 'react';
import PropTypes from 'prop-types';
import {NAME_SPACE, COLORS} from '../helpers/constants';
import ProgressToolTip from './ProgressToolTip';

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
			{...createColorOverride(progressColor, 'current')}
			{...toolTipId && {'aria-describedby': toolTipId}}>

			{children && children(props)}
			{hasToolTip && (
				<ProgressToolTip
					{...{toolTipId, toolTipMessage}}
					qaHook={qaHook && `${qaHook}-tooltip`}
				/>
			)}

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
