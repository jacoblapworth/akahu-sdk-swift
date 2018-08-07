import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getId } from './private/helpers';
import {ns} from "../helpers/xuiClassNamespace";

export default class NestedPicklistContainer extends PureComponent {
	constructor(props) {
		super(props);

		const container = this;
		container.state = {
			open: props.isOpen
		};
		container.toggle = container.toggle.bind(container);
		container.open = container.open.bind(container);
		container.close = container.close.bind(container);
		container.isOpen = container.isOpen.bind(container);
	}

	getChildContext() {
		return {
			id: getId(this)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isOpen !== nextProps.isOpen) {
			this.setState({
				open: nextProps.isOpen
			});
		}
	}

	componentDidUpdate(prevProps) {
		const { props } = this;
		if (prevProps.isOpen !== props.isOpen) {
			const callback = props.isOpen ? props.onOpen : props.onClose;
			if (callback) {
				callback();
			}
		}
	}

	isOpen() {
		return !!(this.state && this.state.open);
	}

	open() {
		this.setState({
			open: true
		});
	}

	close() {
		this.setState({
			open: false
		});
	}

	toggle() {
		this.state.open ? this.close() : this.open();
	}

	render() {
		const container = this;
		const isExpanded = container.state.open;
		const { className, children, qaHook, id, secondaryProps } = container.props;
		return (
			<li
				data-automationid={qaHook}
				className={cn(className, `${ns}-picklist--nestedcontainer`)}
				aria-expanded={isExpanded}
			>
				<input
					{...secondaryProps}
					data-automationid={qaHook && `${qaHook}--checkbox`}
					type="checkbox"
					checked={isExpanded}
					className={`${ns}-pickitem--submenucontrol`}
					id={`${id}-checkbox`}
					tabIndex="-1"
					onChange={container.toggle}
					aria-owns={id}
				/>
				{children}
			</li>
		);
	}
}

NestedPicklistContainer.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	className: PropTypes.string,
	isOpen: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	secondaryProps: PropTypes.object
};

NestedPicklistContainer.defaultProps = {
	isOpen: false,
	secondaryProps: {
		role: 'treeitem'
	},
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this as the container for
	 a nested list while traversing the children tree.
	 */
	_isGroupContainer: true
};

NestedPicklistContainer.childContextTypes = {
	id: PropTypes.string
};
