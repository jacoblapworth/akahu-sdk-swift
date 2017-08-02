import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getId } from './private/helpers';

export default class NestedPicklistContainer extends PureComponent {
	constructor(props) {
		super(props);

		const container = this;
		container.state = {
			open: false
		};
		[
			container.toggle,
			container.open,
			container.close,
			container.isOpen
		].forEach(fn => {
			container[fn.name] = fn.bind(container);
		});
	}

	getChildContext() {
		return {
			id: getId(this)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.open !== nextProps.open) {
			this.setState({
				open: nextProps.open
			});
		}
	}

	componentDidUpdate(prevProps) {
		const { props } = this;
		if (prevProps.open !== props.open) {
			const callback = props.open ? props.onOpen : props.onClose;
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
			<li data-automationid={qaHook} className={cn(className, 'xui-picklist--nestedcontainer')}>
				<input
					data-automationid={qaHook ? `${qaHook}-checkbox` : null}
					type="checkbox"
					checked={isExpanded}
					className="xui-pickitem--submenucontrol"
					id={`${id}-checkbox`}
					tabIndex="-1"
					onChange={container.toggle}
					aria-owns={id}
					aria-expanded={isExpanded}
					{...secondaryProps}
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
	open: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	secondaryProps: PropTypes.object
};

NestedPicklistContainer.defaultProps = {
	open: false,
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
