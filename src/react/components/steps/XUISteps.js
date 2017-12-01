import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';

const baseClass = 'xui-stepper';

const Tab = ({name, href, isActive, index, isFirst, isLast}) => {

	// console.log({isFirst, isLast});

	const firstClass = isFirst && `${baseClass}-tab-first`;
	const lastClass = isLast && `${baseClass}-tab-last`;
	const activeClass = isActive && 'Placeholder-link-active'

	return (
		<div className={`${baseClass}-tab ${firstClass} ${lastClass}`} style={{ order: index }}>

			<a className={`Placeholder-link ${activeClass}`} href={href}>{name}</a>

		</div>
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

		if (this.$stepper) {

			const isInline = this.testIsInline();
			const isSideBar = this.testIsSideBar();
			const layout = isInline ? 'inline' : isSideBar ? 'sidebar' : 'stacked';

			// console.log({isInline, isSideBar});

			if (layout !== this.state.layout) this.setState({layout});

		}

	};

	testIsInline = () => {

		const $testInline = this.$stepper.querySelector(`.${baseClass}-testinline`);
		const $tabs = $testInline.querySelectorAll(`.${baseClass}-tab`);
		const wrapperHeight = $testInline.clientHeight;
		const tabHeights = [...$tabs].map(($tab) => $tab.clientHeight).sort().reverse();
		const maxHeight = tabHeights[0] || 0;
		const isInline = maxHeight >= wrapperHeight;

		// console.log({isInline, maxHeight, wrapperHeight, $tabs});

		return isInline;

	};

	testIsSideBar = () => {

		const $testSideBar = this.$stepper.querySelector(`.${baseClass}-testsidebar`);
		const $section = $testSideBar.querySelector(`.${baseClass}-section`);
		const minWidth = 400;
		const sectionWidth = $section.clientWidth;
		const isSideBar = sectionWidth >= minWidth;

		// console.log({isSideBar, minWidth, sectionWidth, $section});

		return isSideBar;

	};

	createTab = ({name, href, isActive, index, total}) => (
		<Tab
			key={index}
			{...{
				name,
				href,
				isActive,
				index,
				isFirst: !index,
				isLast: Boolean(index === total - 1)
			}} />
	);

	render = () => {

		const {layout} = this.state;
		const {tabs} = this.props;
		const gridTemplateRows = `${new Array(tabs.length).fill('auto').join(' ')} 1fr`;
		const tabElements = tabs.map((tab, index) => this.createTab({...tab, index, total: tabs.length}));

		return (
			<div
				className={baseClass}
				ref={($node) => this.$stepper = $node}
			>

				<div
					className={`${baseClass}-tests`}
					aria-hidden="true"
				>

					{/* Horizontal */}
					<div className={`${baseClass}-testinline`}>
						<div className={`${baseClass}-wrapper ${baseClass}-inline`}>
							{tabElements}
						</div>
					</div>

					{/* Side Bar */}
					<div className={`${baseClass}-testsidebar`}>
						<div
							className={`${baseClass}-wrapper ${baseClass}-sidebar`}
							style={{gridTemplateRows}}
						>
							{tabElements}
							<div className={`${baseClass}-section`} />
						</div>
					</div>

				</div>

				{/* - - - - - - - - */}
				<div
					className={`${baseClass}-wrapper ${baseClass}-${layout}`}
					style={{gridTemplateRows}}
				>

					{tabElements}

					<div className={`${baseClass}-section`}>

						<h3>Link One Content:</h3>
						<p>...</p>
						<p>...</p>
						<p>...</p>
						<p>...</p>
						<p>...</p>

					</div>

				</div>

			</div>
		);

	};

}

export default XUISteps;
