import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import AccordionWrapper from './customElements/AccordionWrapper';
import AccordionTrigger from './customElements/AccordionTrigger';
import EmptyState from './customElements/EmptyState';

export default class XUIAccordion extends PureComponent {
	state = {
		openId: null,
	};

	updateOpenId = id => () => {
		this.setState(prevState => ({
			openId: prevState.openId === id ? null : id,
		}));
	};

	createAccordionItem = ({props: {children, ...item}}, index) => {
		const {items, idKey, qaHook, emptyStateComponent, emptyMessage} = this.props;
		const itemId = items[index][idKey];
		const isOpen = this.state.openId === itemId;

		return (
			<AccordionWrapper
				key={itemId}
				isOpen={isOpen}
				qaHook={qaHook && `${qaHook}-wrapper`}
				trigger={(
					<AccordionTrigger
						qaHook={qaHook && `${qaHook}-trigger`}
						isOpen={isOpen}
						onClick={this.updateOpenId(itemId)}
						{...item}
					/>
				)}>
				{isOpen && (
					children ||
					emptyStateComponent ||
					<EmptyState qaHook={qaHook && `${qaHook}-empty`}>{emptyMessage}</EmptyState>
				)}
			</AccordionWrapper>
		);
	};

	render() {
		const { qaHook, className, items, createItem } = this.props;
		const shouldCreateItems = Boolean(items.length && createItem);

		return (
			<div
				data-automationid={qaHook}
				className={cn('xui-accordion-new', className)}>
				{shouldCreateItems && items.map(createItem).map(this.createAccordionItem)}
			</div>
		);
	}
}

XUIAccordion.propTypes = {
	qaHook: PropTypes.string,

	/** Attached to the outer most element of the accordion component. */
	className: PropTypes.string,

	/** A list of the data to be displayed in the accordion. Each list item should match the shape of the 'item' in the ListItem component used. */
	items: PropTypes.array,

	/** String representing the key of the unique identifier for each item in data. */
	idKey: PropTypes.string,

	/** A function that receives an item from the "items" prop and expects a populated `<XUIAccordionItem />` component back. */
	createItem: PropTypes.func,

	/** Customise the default "empty" message. */
	emptyMessage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),

	/** Override the default "empty" component. */
	emptyStateComponent: PropTypes.element,
};

XUIAccordion.defaultProps = {
	idKey: 'id',
	items: []
};
