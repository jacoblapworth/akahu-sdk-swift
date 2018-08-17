import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getRectangle, shouldAccordionPop } from '../private/helpers';
import { ns } from '../../helpers/xuiClassNamespace';

export default class AccordionWrapper extends PureComponent {
	state = { left: null, right: null };

	componentDidMount() {
		this.setRect();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) this.setRect();
	}

	popClassName() {
		if (!this.props.isOpen) return '';
		const accordionShouldPop = shouldAccordionPop({
			left: this.state.left,
			right: this.state.right,
		});
		if (accordionShouldPop) return `${ns}-accordionwrapper-new-pop`;
		return `${ns}-accordionwrapper-new-no-pop`;
	}

	setRect = () => {
		const { left, right } = getRectangle(this.accordionItem);
		this.setState({ left, right });
	};

	setRef = ref => {
		this.accordionItem = ref;
	};

	render() {
		const {
			children, isOpen, qaHook, trigger,
		} = this.props;

		return (
			<div
				ref={this.setRef}
				data-automationid={qaHook}
				className={cn(
					`${ns}-accordionwrapper-new`,
					{ [`${ns}-accordionwrapper-new-is-open`]: isOpen },
					this.popClassName(),
				)}
			>
				{trigger}
				<div className={cn(`${ns}-accordionwrapper-new--content`, {
					[`${ns}-accordionwrapper-new--content-is-open`]: isOpen,
				})}
				>
					{children}
				</div>
			</div>
		);
	}
}

AccordionWrapper.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
	isOpen: PropTypes.bool.isRequired,
	trigger: PropTypes.node.isRequired,
};
