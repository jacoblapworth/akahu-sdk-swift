import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import { NAME_SPACE, STACKED, SIDE_BAR, INLINE } from './helpers/constants';
import { enrichStepperProps } from './helpers/enrichprops';
import { createAriaTabId } from './helpers/utilities';
import StepperTab from './customElements/StepperTab';
import InlineDummyLayout, { testIsInlineRelevant } from './customElements/InlineDummyLayout';
import SideBarDummyLayout, { testIsSideBarRelevant } from './customElements/SideBarDummyLayout';

const createTabs = ({ qaHook, tabs, id, ariaPanelId, currentStep }, overrides) => (

	tabs.map((tabProps, index) => {

		const isFirst = !index;
		const isLast = Boolean(index === tabs.length - 1);
		const isActive = currentStep === index;
		const ariaTabId = createAriaTabId(id, index);
		const enrichedProps = {
			...tabProps,
			...overrides,
			isActive,
			id: ariaTabId,
			step: index + 1,
		};
		const tabClasses = cn(
			`${NAME_SPACE}-tab`, {
				[`${NAME_SPACE}-tab-first`]: isFirst,
				[`${NAME_SPACE}-tab-last`]: isLast
			});

		return (
			<div
				key={ ariaTabId }
				id={ ariaTabId }
				className={ tabClasses }
				aria-controls={ ariaPanelId }
				aria-selected={ isActive }
				role="tab"
				style={{ order: index }}
				data-automationid={ qaHook && `${qaHook}-tab-${index}` }>
				<StepperTab {...enrichedProps} />
			</div>
		);

	})

);

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

			const isInline = testIsInlineRelevant(rootNode);
			const isSideBar = testIsSideBarRelevant(rootNode);
			const layout = isInline
				? INLINE
				: (isSideBar ? SIDE_BAR : STACKED);

			setLayout(layout);

		}

	};

	render = () => {

		const { props, state } = this;
		const {
			children,
			tabs,
			id,
			qaHook,
			currentStep,
			lockLayout,
			hasStackedButtons,
			gridTemplateRows,
			ariaActiveTabId,
			ariaPanelId,
			wrapperClasses
		} = enrichStepperProps(props, state);

		const tabProps = { qaHook, tabs, id, ariaPanelId, currentStep };
		const visibleTabs = createTabs(tabProps);

		// We use the override parameter here to ensure that the dummy UI's do not
		// render progress indicators as this will result in multiple progress indicator
		// instances with the same `id` value (which will blow up the page). The
		// progress indicator does not augment the space taken up by the tab (we fall
		// back to the icon layout that uses the same size) so it will not effect the math.
		const hiddenTabs = createTabs(tabProps, { isProgress: false });

		return (
			<div
				className={ NAME_SPACE }
				ref={ (node) => this.rootNode = node }
				data-automationid={ qaHook }>

				{!lockLayout && (<div
					className={ `${NAME_SPACE}-tests xui-u-hidden-content` }
					aria-hidden="true">

					{/* Render "dummy" UI scenarios in secret to determine what layout the
					component best conforms to the <XUIStepper /> width if no pre-defined
					layout has been supplied. */}
					<InlineDummyLayout {...{ hasStackedButtons, tabs: hiddenTabs }} />
					<SideBarDummyLayout {...{ gridTemplateRows, tabs: hiddenTabs }} />

				</div>)}

				<div
					className={ wrapperClasses }
					style={{ gridTemplateRows }}
					role="tablist">

					{ visibleTabs }

					<div
						id={ ariaPanelId }
						className={ `${NAME_SPACE}-section` }
						style={{ order: currentStep }}
						role="tabpanel"
						aria-labelledby={ ariaActiveTabId }
						data-automationid={ qaHook && `${qaHook}-content` }>
						{ children }
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

	/** A unique ID that is used to generate Aria references. */
	id: PropTypes.string.isRequired,

	/** The content associated with the current tab. */
	children: PropTypes.node,

	/** The group of Stepper tabs */
	tabs: PropTypes.arrayOf(
		PropTypes.shape({

			/** Main display text. */
			name: PropTypes.string.isRequired,

			/** Secondary display text. */
			description: PropTypes.string,

			/**`. */
			handleClick: PropTypes.func,

			/**`. */
			isError: PropTypes.bool,

			/**`. */
			isComplete: PropTypes.bool,

			/**`. */
			isDisabled: PropTypes.bool,

			/** Render a Progress Indicator. */
			isProgress: PropTypes.bool,

			/** Set the maximum Progress Indicator value. */
			totalProgress: PropTypes.number,

			/** Set the current Progress Indicator value. */
			currentProgress: PropTypes.number,

		})
	).isRequired,

	/** Target a tab by its index in the "tabs" array and set it to its "active" state (index is zero based). */
	currentStep: PropTypes.number.isRequired,

	/** Set the tab buttons to have a "stacked" layout (only applicable in the "inline" layout) */
	hasStackedButtons: PropTypes.bool,

	/** Lock the Stepper to only use a single layout style (the Stepper will augment its layout automatically by default). */
	lockLayout: PropTypes.oneOf(['stacked', 'sidebar', 'inline']),

};
