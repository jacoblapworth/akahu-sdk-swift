import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';

const BASE_CLASS = 'xui-stepper';
const STACKED = 'stacked';
const SIDE_BAR = 'sidebar';
const INLINE = 'inline';
const LAYOUTS = [STACKED, SIDE_BAR, INLINE];

const Tab = ({name, description, href, isActive}) => {

	const linkClasses = cn(
		`${BASE_CLASS}-link`,
		`${BASE_CLASS}-link-inline`, {
			[`${BASE_CLASS}-link-active`]: isActive
		}
	);

	return (
		<a
			className={linkClasses}
			href={href}
		>

			<div className={`${BASE_CLASS}-link-wrapper`}>

				<div className={`${BASE_CLASS}-link-icon`}>

					<svg className="xui-icon-svg" key="info" id="xui-icon-info" viewBox="0 0 30 30"><path d="M15.5,23 C19.6421356,23 23,19.6421356 23,15.5 C23,11.3578644 19.6421356,8 15.5,8 C11.3578644,8 8,11.3578644 8,15.5 C8,19.6421356 11.3578644,23 15.5,23 Z M15,11 L16.9980196,11 L16.9980196,12.9979757 L15,12.9979757 L15,11 Z M14,14 L17,14 L17,18 L18,18 L18,19 L14,19 L14,18 L15,18 L15,15 L14,15 L14,14 Z"></path></svg>

				</div>

				<div className={`${BASE_CLASS}-link-text`}>

					<span className={`${BASE_CLASS}-link-heading xui-heading-small`}>{name}</span>
					<span className={`${BASE_CLASS}-link-description xui-heading-xsmall`}>{description}</span>

				</div>

			</div>

		</a>
	);

};

class XUISteps extends Component {

	state = {layout: 'stacked'};
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

		const {$stepper, props: { lock }} = this;
		const setLayout = layout => (layout !== this.state.layout) && this.setState({layout});

		if (lock && LAYOUTS.includes(lock)) {

			setLayout(lock);

		} else if ($stepper) {

			const isInline = this.testIsInline();
			const isSideBar = this.testIsSideBar();
			const layout = isInline ? 'inline' : isSideBar ? 'sidebar' : 'stacked';

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

	createTab = ({name, description, href, isActive, index, total}) => {

		const tabClasses = cn(
			`${BASE_CLASS}-tab`, {
				[`${BASE_CLASS}-tab-first`]: !index,
				[`${BASE_CLASS}-tab-last`]: Boolean(index === total - 1)
			});

		// isDisabled

		return (
			<div
				key={index}
				className={tabClasses}
				style={{ order: index }}
			>
				<Tab
					{...{
						name,
						description,
						href,
						isActive,
						index
					}} />
				</div>
		);

	};

	render = () => {

		const {layout} = this.state;
		const {children, tabs} = this.props;
		const gridTemplateRows = `${new Array(tabs.length).fill('auto').join(' ')} 1fr`;
		const tabElements = tabs.map((tab, index) => this.createTab({...tab, index, total: tabs.length}));

		return (
			<div
				className={BASE_CLASS}
				ref={($node) => this.$stepper = $node}
			>

				<div
					className={`${BASE_CLASS}-tests`}
					aria-hidden="true"
				>

					{/* Horizontal */}
					<div className={`${BASE_CLASS}-testinline`}>
						<div className={`${BASE_CLASS}-wrapper ${BASE_CLASS}-inline`}>
							{tabElements}
						</div>
					</div>

					{/* Side Bar */}
					<div className={`${BASE_CLASS}-testsidebar`}>
						<div
							className={`${BASE_CLASS}-wrapper ${BASE_CLASS}-sidebar`}
							style={{gridTemplateRows}}
						>
							{tabElements}
							<div className={`${BASE_CLASS}-section`} />
						</div>
					</div>

				</div>

				{/* - - - - - - - - */}

				<div
					className={`${BASE_CLASS}-wrapper ${BASE_CLASS}-${layout}`}
					style={{gridTemplateRows}}
				>

					{tabElements}

					<div className={`${BASE_CLASS}-section`}>

						{children}

					</div>

				</div>

			</div>
		);

	};

}

export default XUISteps;
