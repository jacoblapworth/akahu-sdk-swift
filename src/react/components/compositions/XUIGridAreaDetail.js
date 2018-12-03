import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';
import { observe, unobserve, getWidthClasses } from '../helpers/resizeObserver';

import '../../../sass/5-structure/_gridarea-detail.scss';

export default class XUIGridAreaDetail extends PureComponent {
	_area = React.createRef();

	componentDidMount() {
		this._area.current && observe(this);
	}

	componentWillUnmount() {
		this._area.current && unobserve(this);
	}

	render() {
		const {
			children,
			...otherProps
		} = this.props;

		const classNames = cn(
			`${ns}-gridarea-detail`,
			...getWidthClasses(this.state),
		);


		return (
			<div
				ref={this._area}
				className={classNames}
				{...otherProps}
			>
				{children}
			</div>
		);
	}
}

XUIGridAreaDetail.propTypes = {
	children: PropTypes.any,
};
