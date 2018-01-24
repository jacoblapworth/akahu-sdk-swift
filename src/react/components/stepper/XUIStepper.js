import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import { NAME_SPACE } from './helpers/constants';
import StepperTab from './customElements/StepperTab';

const STACKED = 'stacked';
const SIDE_BAR = 'sidebar';
const INLINE = 'inline';
const LAYOUTS = [STACKED, SIDE_BAR, INLINE];

const HorizontalLayoutTest = ({ hasStackedButtons, tabs }) => {

	const wrapperClasses = cn(
		`${NAME_SPACE}-wrapper`,
		`${NAME_SPACE}-inline`,
		{ [`${NAME_SPACE}-stacked-links`]: hasStackedButtons }
	);

	return (
		<div className={`${NAME_SPACE}-testinline`}>
			<div className={wrapperClasses}>
				{tabs}
			</div>
			{/* Rendering the content area is irrelevant as we only care about the tab alignment. */}
		</div>
	);

};

HorizontalLayoutTest.propTypes = {
	hasStackedButtons: PropTypes.bool,
	tabs: PropTypes.node,
};

// To test the validity of the "inline" layout we make sure that the horizontally
// `display: flex` items do not wrap into a new line. In that regard we find the
// largest tab height and assert that it is the same size as the tabs <container />.
const testIsInline = (rootNode) => {

	const $testInline = rootNode.querySelector(`.${NAME_SPACE}-testinline`);
	const $tabs = $testInline.querySelectorAll(`.${NAME_SPACE}-tab`);
	const wrapperHeight = $testInline.clientHeight;
	const tabHeights = [...$tabs].map(({ clientHeight }) => clientHeight).sort().reverse();
	const maxHeight = tabHeights[0] || 0;
	const isInline = maxHeight >= wrapperHeight;

	return isInline;

};

const SidebarLayoutTest = ({ gridTemplateRows, tabs }) => (
	<div className={`${NAME_SPACE}-testsidebar`}>
		<div
			className={`${NAME_SPACE}-wrapper ${NAME_SPACE}-sidebar`}
			style={{ gridTemplateRows }}>
			{tabs}
			<div className={`${NAME_SPACE}-section`} />
		</div>
	</div>
);

SidebarLayoutTest.propTypes = {
	gridTemplateRows: PropTypes.string,
	tabs: PropTypes.node,
};

// To test the validity of the "side bar" layout we make assert that the content
// width meets a minimum requirement.
const testIsSideBar = (rootNode) => {

	const $testSideBar = rootNode.querySelector(`.${NAME_SPACE}-testsidebar`);
	const $section = $testSideBar.querySelector(`.${NAME_SPACE}-section`);
	const minWidth = 400;
	const sectionWidth = $section.clientWidth;
	const isSideBar = sectionWidth >= minWidth;

	return isSideBar;

};

const createAriaTabId = (id, index) => `${id}-tab-${index}`;
const createAriaPanelId = id => `${id}-panel`;

const createTabs = ({ qaHook, tabs, id, ariaPanelId, currentStep }, overrides) => (

	tabs.map((tabProps, index) => {

		const isFirst = !index;
		const isLast = Boolean(index === tabs.length - 1);
		const isActive = currentStep === index;
		const ariaTabId = createAriaTabId(id, index);
		const enrichedProps = { ...tabProps, ...overrides, id: ariaTabId, isActive };
		const tabClasses = cn(
			`${NAME_SPACE}-tab`, {
				[`${NAME_SPACE}-tab-first`]: isFirst,
				[`${NAME_SPACE}-tab-last`]: isLast
			});

		return (
			<div
				key={ariaTabId}
				id={ariaTabId}
				className={tabClasses}
				aria-controls={ariaPanelId}
				aria-selected={isActive}
				role="tab"
				style={{ order: index }}
				data-automationid={qaHook && `${qaHook}-tab-${index}`}>
				<StepperTab {...enrichedProps} />
			</div>
		);

	})

);

const enrichProps = (props, { layout }) => {

	const { qaHook, id, tabs, } = props;

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
	const gridTemplateRows = Boolean(Array().fill) && `${new Array(tabs.length).fill('auto').join(' ')} 1fr`;

	const ariaActiveTabId = createAriaTabId(id, currentStep);
	const ariaPanelId = createAriaPanelId(id);
	const tabProps = { qaHook, tabs, id, ariaPanelId, currentStep };
	const visibleTabs = createTabs(tabProps);

	// We use the override parameter here to ensure that the dummy UI's do not
	// render progress indicators as this will result in multiple progress indicator
	// instances with the same `id` value (which will blow up the page). The
	// progress indicator does not augment the space taken up by the tab (we fall
	// back to the icon layout that uses the same size) so it will not effect the math.
	const hiddenTabs = createTabs(tabProps, { isProgress: false });

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
		visibleTabs,
		hiddenTabs,
		wrapperClasses,
	};

};

class XUIStepper extends Component {

	state = { layout: STACKED };
	rootNode = null;
	throttled = null;

	componentDidUpdate = () => this.setCurrentLayout();

	componentDidMount = () => {

		this.setCurrentLayout();
		this.throttled = throttle(this.setCurrentLayout, 500);
		window.addEventListener('resize', this.throttled);

	};

	componentWillUnmount = () => {

		window.removeEventListener('resize', this.throttled);
		this.throttled.cancel();

	};

	setCurrentLayout = () => {

		const { rootNode, props, state } = this;
		const { lockLayout } = props;
		const currentLayout = state.layout;
		const setLayout = newLayout => (
			newLayout !== currentLayout) && this.setState({ layout: newLayout }
		);

		if (lockLayout) {

			setLayout(lockLayout);

		} else if (rootNode) {

			const isInline = testIsInline(rootNode);
			const isSideBar = testIsSideBar(rootNode);
			const layout = isInline ? INLINE : isSideBar ? SIDE_BAR : STACKED;

			setLayout(layout);

		}

	};

	render = () => {

		const { props, state } = this;
		const {
			children,
			qaHook,
			currentStep,
			lockLayout,
			hasStackedButtons,
			gridTemplateRows,
			ariaActiveTabId,
			ariaPanelId,
			visibleTabs,
			hiddenTabs,
			wrapperClasses
		} = enrichProps(props, state);

		return (
			<div
				className={NAME_SPACE}
				ref={($node) => this.rootNode = $node}
				data-automationid={qaHook}>

				{!lockLayout && (<div
					className={`${NAME_SPACE}-tests xui-u-hidden-content`}
					aria-hidden="true">

					{/* Render "dummy" UI scenarios in secret to determine what layout the
					component best conforms to the <XUIStepper /> width if no pre-defined
					layout has been supplied. */}
					<HorizontalLayoutTest {...{ hasStackedButtons, tabs: hiddenTabs }} />
					<SidebarLayoutTest {...{ gridTemplateRows, tabs: hiddenTabs }} />

				</div>)}

				<div
					className={wrapperClasses}
					style={{ gridTemplateRows }}
					role="tablist">

					{visibleTabs}

					{/*
					+ (Done) ACCESSIBILITY!!!!!!
					+ (Done) Error icon
					+ (Done) Complete icon
					+ (Done) Progress indocator integration
					+ (Done) Throttler
					+ (Done) Color transitions
					+ (Done) Target for progress and standard:
					  + "complete"
					  + "error"
					  + "disabled"
					  + "active"
						+ "focused"
					+ (Done) Augment stepper prop
					+ If disabled do not show content
					+ (Done) qaHook
					+ (Done) remove isLinear
					+ Change isStacked to hasStackedButtons
					+ Proptype documentation
					+ Storybook knobs
					+ (Done) Storybook variations
						+ Inline
							+ Stacked buttons
							+ Standard buttons
						+ Sidebar
						+ Stacked

						+ standard all combinations
							+ standard
							+ standard multi line
							+ complete
							+ complete + error
							+ complete + disabled
							+ error
							+ error + disabled
						+ progress all combinations
							+ standard
							+ standard multi line
							+ complete (forced)
							+ complete (automatic)
							+ complete + error
							+ complete + disabled
							+ error
							+ error + disabled

					+ React documentation
					+ Browser testing

					Questions:

					+ Linear system?
						+ How do we move backwards and keep previous tabs disabled?

					+ Show content area when a disabled button is set to active?
					*/}

					<div
						id={ariaPanelId}
						className={`${NAME_SPACE}-section`}
						style={{ order: currentStep }}
						role="tabpanel"
						aria-labelledby={ariaActiveTabId}
						data-automationid={qaHook && `${qaHook}-content`}>
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

	id: PropTypes.string.isRequired,

	/** The content associated with the active tab. */
	children: PropTypes.node,

	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			handleClick: PropTypes.func.isRequired,
			isError: PropTypes.bool,
			isProgress: PropTypes.bool
		})
	),

	currentStep: PropTypes.number.isRequired,

	hasStackedButtons: PropTypes.bool,

	lockLayout: PropTypes.oneOf(['stacked', 'sidebar', 'inline']),

};
