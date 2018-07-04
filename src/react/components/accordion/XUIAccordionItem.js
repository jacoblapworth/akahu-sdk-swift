import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIAccordionItemEmptyState from './XUIAccordionItemEmptyState';

export default class XUIAccordionItem extends PureComponent {
	render() {
		const { children, isOpen, qaHook, trigger } = this.props;

		return (
			<div
				className={cn(
					'xui-accordionitem-new',
					{
						'xui-accordionitem-new-is-open': isOpen,
						'xui-accordionitem-new-pop': isOpen
					}
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
