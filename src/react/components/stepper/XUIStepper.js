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

		const { $stepper, props: { lock } } = this;
		const setLayout = layout => (layout !== this.state.layout) && this.setState({ layout });

		if (lock && LAYOUTS.includes(lock)) {

			setLayout(lock);

		} else if ($stepper) {

			const isInline = this.testIsInline();
			const isSideBar = this.testIsSideBar();
			const layout = isInline ? INLINE : isSideBar ? SIDE_BAR : STACKED;

			setLayout(layout);

		}

	};

	testIsInline = () => {

		const $testInline = this.$stepper.querySelector(`.${BASE_CLASS}-testinline`);
		const $tabs = $testInline.querySelectorAll(`.${BASE_CLASS}-tab`);
		const wrapperHeight = $testInline.clientHeight;
		const tabHeights = [...$tabs].map(($tab) => $tab.clientHeight).sort().reverse();
		const maxHeight = tabHeights[0] || 0;
		const isInline = maxHeight >= wrapperHeight;

		return isInline;

	};

	testIsSideBar = () => {

		const $testSideBar = this.$stepper.querySelector(`.${BASE_CLASS}-testsidebar`);
		const $section = $testSideBar.querySelector(`.${BASE_CLASS}-section`);
		const minWidth = 400;
		const sectionWidth = $section.clientWidth;
		const isSideBar = sectionWidth >= minWidth;

		return isSideBar;

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
		const { children, tabs, currentStep, isLinear, isStacked: isStackedProp = true } = this.props;
		const isStacked = isStackedProp && layout === INLINE;
		const totalTabs = tabs.length;
		const gridTemplateRows = `${new Array(tabs.length).fill('auto').join(' ')} 1fr`;
		const tabElements = tabs.map((tab, index) => this.createTab({ ...tab, index, currentStep, totalTabs, isLinear }));
		const wrapperClasses = cn(
			`${BASE_CLASS}-wrapper`,
			`${BASE_CLASS}-${layout}`,
			{ [`${BASE_CLASS}-stacked-links`]: isStacked }
		);

		return (
			<div
				className={BASE_CLASS}
				ref={($node) => this.$stepper = $node}
			>

				<div
					className={`${BASE_CLASS}-tests xui-u-hidden-content`}
					aria-hidden="true"
				>

					{/* Horizontal */}
					<div className={`${BASE_CLASS}-testinline`}>
						<div className={cn(
							`${BASE_CLASS}-wrapper`,
							`${BASE_CLASS}-inline`,
							{ [`${BASE_CLASS}-stacked-links`]: isStacked }
						)}>
							{tabElements}
						</div>
					</div>

					{/* Side Bar */}
					<div className={`${BASE_CLASS}-testsidebar`}>
						<div
							className={`${BASE_CLASS}-wrapper ${BASE_CLASS}-sidebar`}
							style={{ gridTemplateRows }}
						>
							{tabElements}
							<div className={`${BASE_CLASS}-section`} />
						</div>
					</div>

				</div>

				{/* - - - - - - - - */}

				<div
					className={wrapperClasses}
					style={{ gridTemplateRows }}
				>

					{tabElements}

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
