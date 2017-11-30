import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const baseClass = 'xui-stepper';

const Tab = ({name, href, isActive, index, isFirst, isLast}) => {

	console.log({isFirst, isLast});

	const firstClass = isFirst && `${baseClass}-tab--first`;
	const lastClass = isLast && `${baseClass}-tab--last`;
	const activeClass = isActive && 'Placeholder-link--active'

	return (
		<div className={`${baseClass}-tab ${firstClass} ${lastClass}`} style={{ order: index }}>

			<a className={`Placeholder-link ${activeClass}`} href={href}>{name}</a>

		</div>
	);

};

class XUISteps extends Component {

	state = {layout: 'stacked'};
	$stepper = null;

	componentDidUpdate = () => {

		this.setCurrentLayout();
		// Throttle in production...
		window.addEventListener('resize', this.setCurrentLayout);

	};

	componentDidMount = () => {

		this.setCurrentLayout();

	};

	componentWillUnmount = () => {

		window.removeEventListener('resize', this.setCurrentLayout);

	};

	setCurrentLayout = () => {

		if (this.$stepper) {

			const isInline = this.testIsInline();
			const isColumns = this.testIsColumns();
			const layout = isInline ? 'inline' : isColumns ? 'columns' : 'stacked';

			// console.log({isInline, isColumn});

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

		console.log({isInline, maxHeight, wrapperHeight, $tabs});

		return isInline;

	};

	testIsColumns = () => {

		const $testColumns = this.$stepper.querySelector(`.${baseClass}-testcolumns`);
		const $section = $testColumns.querySelector(`.${baseClass}-section`);
		const minWidth = 400;
		const sectionWidth = $section.clientWidth;
		const isColumns = sectionWidth >= minWidth;

		console.log({isColumns, minWidth, sectionWidth, $section});

		return isColumns;

	};

	render = () => {

		const {layout} = this.state;
		const {tabs} = this.props;
		const gridTemplateRows = `${new Array(tabs.length).fill('auto').join(' ')} 1fr`;
		const tabElements = tabs.map(({name, href, isActive}, index) => (
			<Tab
				key={`${name}${href}`}
				{...{
					name,
					href,
					isActive,
					index,
					isFirst: !index,
					isLast: Boolean(index === tabs.length - 1)
				}} />
		));

		return (
			<div ref={($node) => this.$stepper = $node}>

				<div className={`${baseClass}-tests`}>

					<div>

						{/* Horizontal */}
						<div className={`${baseClass}-testinline`}>
							<div className={`${baseClass} ${baseClass}--inline`}>
								{tabElements}
							</div>
						</div>

						{/* Side Bar */}
						<div className={`${baseClass}-testcolumns`}>
							<div className={`${baseClass} ${baseClass}--columns`} style={{gridTemplateRows}}>
								{tabElements}
								<div className={`${baseClass}-section`}>Test</div>
							</div>
						</div>

					</div>

				</div>

				{/* - - - - - - - - */}
				<div className={`${baseClass} ${baseClass}--${layout}`} style={{gridTemplateRows}}>

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
