import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import listIcon from '@xero/xui-icon/icons/list';
import { ns } from '../helpers/xuiClassNamespace';
import AccordionWrapper from './customElements/AccordionWrapper';
import AccordionTrigger from './customElements/AccordionTrigger';
import EmptyState from './customElements/EmptyState';

export default class XUIAccordion extends PureComponent {
	state = {
		openId: null,
	};

	updateOpenId = id => {
		this.setState(prevState => ({
			openId: prevState.openId === id ? null : id,
		}));
	};

	createAccordionItem = ({ props: itemProps }, index) => {
		const {
			items,
			idKey,
			qaHook,
			toggleLabel,
			emptyMessage,
			emptyIcon,
			emptyStateComponent,
		} = this.props;
		const { children, onItemClick, ...triggerProps } = itemProps;
		const itemData = items[index];
		const itemId = itemData[idKey];
		const isOpen = this.state.openId === itemId;
		const handleClick = () => {
			this.updateOpenId(itemId);
			onItemClick && onItemClick({ ...itemData, isOpen: !isOpen });
		};

		return (
			<AccordionWrapper
				key={itemId}
				isOpen={isOpen}
				qaHook={qaHook && `${qaHook}-wrapper`}
				trigger={(
					<AccordionTrigger
						{...triggerProps}
						qaHook={qaHook && `${qaHook}-trigger`}
						isOpen={isOpen}
						onClick={handleClick}
						toggleLabel={toggleLabel}
					/>
				)}
			>
				{isOpen && (
					children ||
					emptyStateComponent ||
					<EmptyState
						qaHook={qaHook && `${qaHook}-empty`}
						emptyIcon={emptyIcon}
					>
						{emptyMessage}
					</EmptyState>
				)}
			</AccordionWrapper>
		);
	};

	render() {
		const {
			qaHook, className, items, createItem,
		} = this.props;
		const shouldCreateItems = Boolean(items.length && createItem);

		return (
			<div
				data-automationid={qaHook}
				className={cn(`${ns}-accordion`, className)}
			>
				{shouldCreateItems && items.map(createItem).map(this.createAccordionItem)}
			</div>
		);
	}
}

XUIAccordion.propTypes = {
	qaHook: PropTypes.string,

	/** Attached to the outer most element of the accordion component. */
	className: PropTypes.string,

	/** A list of the data to be displayed in the accordion. item in the array is individually
	 * passed through to the `createItem` function to create an `<XUIAccordionItem />`. */
	items: PropTypes.array,

	/** String representing the key of the unique identifier for each item in data. */
	idKey: PropTypes.string,

	/** A function that receives an item from the "items" prop and expects a populated
	 * `<XUIAccordionItem />` component back. */
	createItem: PropTypes.func,

	/** Accessibility label representing the `<XUIAccordionItem />` toggle functionality. */
	toggleLabel: PropTypes.string,

	/** Customise the default "empty" message. */
	emptyMessage: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),

	/** Customise the default "empty" icon path data. */
	emptyIcon: PropTypes.object,

	/** Override the default "empty" component. */
	emptyStateComponent: PropTypes.element,
};

XUIAccordion.defaultProps = {
	idKey: 'id',
	items: [],
	toggleLabel: 'Toggle',
	emptyMessage: 'Nothing available to show',
	emptyIcon: listIcon,
};
