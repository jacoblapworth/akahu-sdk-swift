import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

class SideBarDummyLayout extends PureComponent {

	render = () => {

		const { gridTemplateRows, tabs } = this.props;

		return (
			<div className={ `${NAME_SPACE}-testsidebar` }>
				<div
					className={ `${NAME_SPACE}-wrapper ${NAME_SPACE}-sidebar` }
					style={{ gridTemplateRows }}>
					{ tabs }
					<div className={ `${NAME_SPACE}-section` } />
				</div>
			</div>
		);

	}

}

SideBarDummyLayout.propTypes = {
	gridTemplateRows: PropTypes.string,
	tabs: PropTypes.node,
};

// To test the validity of the "side bar" layout we make assert that the content
// width meets a minimum requirement.
const testIsSideBarRelevant = (rootNode) => {

	const testSideBarNode = rootNode.querySelector(`.${NAME_SPACE}-testsidebar`);
	const sectionNode = testSideBarNode.querySelector(`.${NAME_SPACE}-section`);
	const minWidth = 400;
	const sectionWidth = sectionNode.clientWidth;
	const isSideBar = sectionWidth >= minWidth;

	return isSideBar;

};

export { SideBarDummyLayout as default, testIsSideBarRelevant };
