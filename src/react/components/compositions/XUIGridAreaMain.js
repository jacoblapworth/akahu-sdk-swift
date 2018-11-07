import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';
import { observe, unobserve, getWidthClasses } from '../helpers/resizeObserver';

import '../../../sass/5-structure/_gridarea-main.scss';

export default class XUIGridAreaMain extends PureComponent {
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
			`${ns}-gridarea-main`,
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

XUIGridAreaMain.propTypes = {
	children: PropTypes.any,
};
