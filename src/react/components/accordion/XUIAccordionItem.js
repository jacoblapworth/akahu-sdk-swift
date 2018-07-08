import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIAccordionItemEmptyState from './XUIAccordionItemEmptyState';
import { getRectangle, shouldAccordionPop } from './private/helpers';

export default class XUIAccordionItem extends Component {
	state = { left: null, right: null };

	componentDidMount() {
		this.setRect();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) this.setRect();
	}

	popClassName() {
		if (!this.props.isOpen) return '';

		if (shouldAccordionPop(this.state)) return 'xui-accordionitem-new-pop';

		return 'xui-accordionitem-new-no-pop';
	}

	setRect = () => {
		const { left, right } = getRectangle(this.accordionItem);
		this.setState({ left, right });
	};

	setRef = ref => {
		this.accordionItem = ref;
	};

	render() {
		const { children, isOpen, qaHook, trigger } = this.props;

		return (
			<div
				ref={this.setRef}
				className={cn(
					'xui-accordionitem-new',
					{ 'xui-accordionitem-new-is-open': isOpen },
					this.popClassName()
				)}
				data-automationid={qaHook}
			>
				{trigger}
				<div
					className={cn('xui-accordionitem-new--content', {
						'xui-accordionitem-new--content-is-open': isOpen,
					})}
				>
					{isOpen && (children || <XUIAccordionItemEmptyState />)}
				</div>
			</div>
		);
	}
}

XUIAccordionItem.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
	// Accordion item will display different (including showing children) based on this value
	isOpen: PropTypes.bool.isRequired,
	/**
	 * Element that will always be display (open or closed)
	 * Clicking should toggle the open state of the accordion item
	 */
	trigger: PropTypes.node.isRequired,
};
