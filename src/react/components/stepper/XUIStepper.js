import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import { BASE_CLASS } from './helpers/constants';
import StepperTab from './customElements/StepperTab';

const STACKED = 'stacked';
const SIDE_BAR = 'sidebar';
const INLINE = 'inline';
const LAYOUTS = [STACKED, SIDE_BAR, INLINE];

const HorizontalLayoutTest = ({ isStacked, tabElements }) => {

	const wrapperClasses = cn(
		`${BASE_CLASS}-wrapper`,
		`${BASE_CLASS}-inline`,
		{ [`${BASE_CLASS}-stacked-links`]: isStacked }
	);

	return (
		<div className={`${BASE_CLASS}-testinline`}>
			<div className={wrapperClasses}>
				{tabElements}
			</div>
			{/* Rendering the content area is irrelevant as we only care about the tab alignment. */}
		</div>
	);

};

HorizontalLayoutTest.propTypes = {
	isStacked: PropTypes.bool,
	tabElements: PropTypes.node,
};

// To test the validity of the "inline" layout we make sure that the horizontally
// `display: flex` items do not wrap into a new line. In that regard we find the
// largest tab height and assert that it is the same size as the tabs <container />.
const testIsInline = ($stepper) => {

	const $testInline = $stepper.querySelector(`.${BASE_CLASS}-testinline`);
	const $tabs = $testInline.querySelectorAll(`.${BASE_CLASS}-tab`);

	console.log('$stepper', $stepper);
	console.log('$testInline', $testInline);
	console.log('$tabs', $tabs);

	const wrapperHeight = $testInline.clientHeight;
	const tabHeights = [...$tabs].map(({ clientHeight }) => clientHeight).sort().reverse();
	const maxHeight = tabHeights[0] || 0;
	const isInline = maxHeight >= wrapperHeight;

	return isInline;

};

const SidebarLayoutTest = ({ gridTemplateRows, tabElements }) => (
	<div className={`${BASE_CLASS}-testsidebar`}>
		<div
			className={`${BASE_CLASS}-wrapper ${BASE_CLASS}-sidebar`}
			style={{ gridTemplateRows }}>
			{tabElements}
			<div className={`${BASE_CLASS}-section`} />
		</div>
	</div>
);

SidebarLayoutTest.propTypes = {
	gridTemplateRows: PropTypes.string,
	tabElements: PropTypes.node,
};

// To test the validity of the "side bar" layout we make assert that the content
// width meets a minimum requirement.
const testIsSideBar = ($stepper) => {

	const $testSideBar = $stepper.querySelector(`.${BASE_CLASS}-testsidebar`);
	const $section = $testSideBar.querySelector(`.${BASE_CLASS}-section`);
	const minWidth = 400;
	const sectionWidth = $section.clientWidth;
	const isSideBar = sectionWidth >= minWidth;

	return isSideBar;

};

// The "side bar" layout uses CSS Grid. The layout is a two column format with
// all of the tabs in the left and the content in the right hand column. Because
// the amount of tabs is variable we need to build the grid template rows dynamically
// by giving each tab an `auto` value and the column `1fr`.
// NOTE: We also test that the Array.fill method exists for browsers like IE11
// (which does not support CSS grid anyway).
const createGridTemplateRows = tabs => (
	Boolean(Array().fill) && `${new Array(tabs.length).fill('auto').join(' ')} 1fr`
);

const testIsLock = lock => lock && LAYOUTS.indexOf(lock) >= 0;

class XUIStepper extends Component {

	state = { layout: STACKED };
	$stepper = null;
	throttled = null;

	componentDidUpdate = () => {

		this.setCurrentLayout();

	};

	componentDidMount = () => {

		this.setCurrentLayout();
		this.throttled = throttle(this.setCurrentLayout, 500);
		window.addEventListener('resize', this.throttled);

	};

	componentWillUnmount = () => {

		window.removeEventListener('resize', this.setCurrentLayout);
		this.throttled.cancel;

	};

	setCurrentLayout = () => {

		const { $stepper, props, state } = this;
		const { lock } = props;
		const currentLayout = state.layout;
		const setLayout = newLayout => (
			newLayout !== currentLayout) && this.setState({ layout: newLayout }
			);

		if (testIsLock(lock)) {

			setLayout(lock);

		} else if ($stepper) {

			const isInline = testIsInline($stepper);
			const isSideBar = testIsSideBar($stepper);
			const layout = isInline ? INLINE : isSideBar ? SIDE_BAR : STACKED;

			setLayout(layout);

		}

	};

	createTab = ({ index, currentStep, totalTabs, isLinear, isStacked, ...tab }) => {

		const isFirst = !index;
		const isInline = Boolean(index === totalTabs - 1);
		const isActive = currentStep === index;
		const isDisabled = isLinear && currentStep < index;
		const tabClasses = cn(
			`${BASE_CLASS}-tab`, {
				[`${BASE_CLASS}-tab-first`]: isFirst,
				[`${BASE_CLASS}-tab-last`]: isInline
			});

		return (
			<div
				key={index}
				className={tabClasses}
				style={{ order: index }}>
				<StepperTab {...{ ...tab, isActive, isDisabled, isStacked }} />
			</div>
		);

	};

	render = () => {

		const { layout } = this.state;
		const { children, tabs, currentStep, isLinear, lock, isStacked: isStackedProp = true } = this.props;
		const isStacked = isStackedProp && layout === INLINE;
		const totalTabs = tabs.length;
		const gridTemplateRows = createGridTemplateRows(tabs);
		const tabElements = tabs.map((tab, index) => this.createTab({ ...tab, index, currentStep, totalTabs, isLinear }));
		const wrapperClasses = cn(
			`${BASE_CLASS}-wrapper`,
			`${BASE_CLASS}-${layout}`,
			{ [`${BASE_CLASS}-stacked-links`]: isStacked }
		);

		return (
			<div
				className={BASE_CLASS}
				ref={($node) => this.$stepper = $node}>

				{!testIsLock(lock) && (<div
					className={`${BASE_CLASS}-tests xui-u-hidden-content`}
					aria-hidden="true">

					{/* Render "dummy" UI scenarios in secret to determine what layout the
					component best conforms to the <XUIStepper /> width if no pre-defined
					layout has been supplied. */}
					<HorizontalLayoutTest {...{ isStacked, tabElements }} />
					<SidebarLayoutTest {...{ gridTemplateRows, tabElements }} />

				</div>)}

				<div
					className={wrapperClasses}
					style={{ gridTemplateRows }}>

					{tabElements}

					{/*
					+ ACCESSIBILITY!!!!!!
					+ Error icon
					+ Complete icon
					+ Progress indocator integration
					*/}

					<div
						className={`${BASE_CLASS}-section`}
						style={{ order: currentStep }}>
						{children}
					</div>

				</div>

			</div>
		);

	};

}

export default XUIStepper;

XUIStepper.propTypes = {

	/**`. */
	qaHook: PropTypes.string,

	/** Content to place inside the "track" circle. */
	children: PropTypes.node,

	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			description: PropTypes.string,
			handleClick: PropTypes.func,
			isError: PropTypes.bool
		})
	),

	currentStep: PropTypes.number,

	isLinear: PropTypes.bool,

	isStacked: PropTypes.bool,

	lock: PropTypes.oneOf(['stacked', 'sidebar', 'inline']),

};
