import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';
import debounce from 'lodash.debounce';
import XUIPanel from '../structural/XUIPanel';
import Dropdown from '../dropdown/DropDown';
import portalContainer from '../helpers/portalContainer';
import { ns } from '../helpers/xuiClassNamespace';
import '../../../sass/7-components/_gridarea-paneldropdown.scss';

export const XUIGridAreaMasterPanelDropdownEventLabel = 'xui:composition2:nav:toggle';

function isWideScreen(navContainer) {
	const {
		gridArea,
		msGridRow,
	} = window.getComputedStyle(navContainer);

	return navContainer &&
		(
			(gridArea && gridArea.indexOf('nav') > -1) ||
			(msGridRow && parseInt(msGridRow) < 3)
		);
}

export default class XUIGridAreaMasterPanelDropdown extends PureComponent {
	state = {
		isDropdown: false,
		dropdownHidden: true,
		wideScreen: true,
	};

	wrapper = React.createRef()

	componentDidMount() {
		const {
			toggleHidden,
			forceHidden,
			toggleDropdownPanel,
		} = this;

		this._debouncedForceHidden = debounce(forceHidden, 100, { leading: true, trailing: false });
		this._debouncedToggleDropdownPanel = debounce(toggleDropdownPanel, 100, {
			leading: false,
			trailing: true,
		});

		window.addEventListener(XUIGridAreaMasterPanelDropdownEventLabel, toggleHidden);
		window.addEventListener('resize', this._debouncedForceHidden);
		window.addEventListener('resize', this._debouncedToggleDropdownPanel);

		/*
			As at React ~16.4.2 / 30 Oct 2018
			https://reactjs.org/docs/react-component.html#componentdidmount
			You may call setState() immediately in componentDidMount().
			It will trigger an extra rendering, but it will happen before the browser updates the screen.
			This guarantees that even though the render() will be called twice in this case, the user
			won’t see the intermediate state. Use this pattern with caution because it often causes
			performance issues. In most cases, you should be able to assign the initial state in the
			constructor() instead. It can, however, be necessary for cases like modals and tooltips
			when you need to measure a DOM node before rendering something that depends on its size
			or position
		*/
		this.setState(({ // eslint-disable-line react/no-did-mount-set-state
			wideScreen: isWideScreen(this.wrapper.current.parentElement),
			isDropdown: !isWideScreen(this.wrapper.current.parentElement),
		}));
	}

	toggleDropdownPanel = () => {
		this.setState(() => ({
			isDropdown: !isWideScreen(this.wrapper.current.parentElement),
		}));
	}

	forceHidden = () => {
		this.setState(prevState => (prevState.dropdownHidden === false ? ({
			dropdownHidden: true,
		}) : null));
	}

	componentWillUnmount() {
		const {
			toggleHidden,
		} = this;

		window.removeEventListener(XUIGridAreaMasterPanelDropdown, toggleHidden);
		window.removeEventListener('resize', this._debouncedForceHidden);
		window.removeEventListener('resize', this._debouncedToggleDropdownPanel);
	}

	toggleHidden = () => {
		const wideScreen = isWideScreen(this.wrapper.current.parentElement);
		this.setState(prevState => ({
			dropdownHidden: wideScreen ? true : !prevState.dropdownHidden,
			wideScreen,
		}));
	}

	render() {
		const {
			children,
			className,
			...otherProps
		} = this.props;

		const {
			dropdownHidden,
			wideScreen,
			isDropdown,
		} = this.state;

		const classNames = cn(
			`${ns}-gridarea-paneldropdown`,
			className,
		);

		const ChildElements = !isDropdown ? XUIPanel : Dropdown;

		const contents = (
			<div
				ref={this.wrapper}
				className={wideScreen ? undefined : `${ns}-container`} // TODO REMOVE UTIL
			>
				<ChildElements
					className={classNames}
					{...otherProps}
				>
					{children}
				</ChildElements>
			</div>
		);

		return !dropdownHidden ? (
			<Portal node={portalContainer()}>
				{contents}
			</Portal>
		) : contents;
	}
}

XUIGridAreaMasterPanelDropdown.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
};
