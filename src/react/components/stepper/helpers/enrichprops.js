import cn from 'classnames';
import { NAME_SPACE, NOOP, INLINE, LAYOUTS } from '../helpers/constants';
import { createAriaTabId, createAriaPanelId } from '../helpers/utilities';

const enrichTabProps = (props) => {

	const { isDisabled, isError, totalProgress } = props;

	const currentProgress = props.currentProgress < 0
		? 0 : Math.min(props.currentProgress, totalProgress);

	const isActive = props.isActive && !isDisabled;

	const isComplete = props.isComplete || currentProgress === totalProgress;

	const isStandard = !(isError || isActive || isDisabled);

	const handleClick = !props.handleClick || isDisabled || isActive
		? NOOP : props.handleClick;

	const tabIndex = isDisabled ? -1 : 0;

	const linkClasses = cn(
		`${NAME_SPACE}-link`, {
			[`${NAME_SPACE}-link-standard`]: isStandard,
			[`${NAME_SPACE}-link-active`]: isActive,
			[`${NAME_SPACE}-link-error`]: isError,
			[`${NAME_SPACE}-link-disabled`]: isDisabled
		}
	);

	return {
		...props,
		currentProgress,
		isComplete,
		isStandard,
		handleClick,
		tabIndex,
		linkClasses,
	};

};

const enrichStepperProps = (props, { layout }) => {

	const { id, tabs, } = props;

	const currentStep = props.currentStep < 0
		? 0 : Math.min(props.currentStep, tabs.length - 1);

	const lockLayout = LAYOUTS.indexOf(props.lockLayout) >= 0 && props.lockLayout;

	const hasStackedButtons = props.hasStackedButtons && layout === INLINE;

	// The "side bar" layout uses CSS Grid. The layout is a two column format with
	// all of the tabs in the left and the content in the right hand column. Because
	// the amount of tabs is variable we need to build the grid template rows dynamically
	// by giving each tab an `auto` value and the column `1fr`.
	// NOTE: We also test that the Array.fill method exists for browsers like IE11
	// (which does not support CSS grid anyway).
	const gridTemplateRows = Boolean(Array().fill)
		&& `${new Array(tabs.length).fill('auto').join(' ')} 1fr`;

	const ariaActiveTabId = createAriaTabId(id, currentStep);
	const ariaPanelId = createAriaPanelId(id);

	const wrapperClasses = cn(
		`${NAME_SPACE}-wrapper`,
		`${NAME_SPACE}-${layout}`,
		{ [`${NAME_SPACE}-stacked-links`]: hasStackedButtons }
	);

	return {
		...props,
		currentStep,
		lockLayout,
		hasStackedButtons,
		gridTemplateRows,
		ariaActiveTabId,
		ariaPanelId,
		wrapperClasses,
	};

};

const enrichProps = { enrichTabProps, enrichStepperProps };

export { enrichProps as default, enrichTabProps, enrichStepperProps };
