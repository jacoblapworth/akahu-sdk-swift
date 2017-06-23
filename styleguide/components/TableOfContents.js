import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

const styles = ({ space, color, fontFamily, fontSize, borderRadius }) => ({
	root: {
		fontFamily: fontFamily.base,
	},
	search: {
		padding: space[2],
	},
	clw: {
		paddingLeft: space[2]
	},
	input: {
		'display': 'block',
		'width': '100%',
		'padding': space[1],
		'color': color.base,
		'backgroundColor': color.baseBackground,
		'fontFamily': fontFamily.base,
		'fontSize': fontSize.base,
		'border': [[1, color.border, 'solid']],
		borderRadius,
		'transition': 'border-color ease-in-out .15s',
		'&:focus': {
			isolate: false,
			borderColor: color.link,
			outline: 0,
		},
		'&::placeholder': {
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			color: color.light,
		},
	},
});

export function TableOfContentsRenderer({ classes, children, searchTerm, onSearchTermChange }) {
	return (
		<div>
			<div className={classes.root}>
				<div className={classes.search}>
					<input
						value={searchTerm}
						className={classes.input}
						placeholder="Filter by name"
						onChange={event => onSearchTermChange(event.target.value)}
					/>
				</div>
				<div className={classes.clw}>
					{children}
				</div>
			</div>
		</div>
	);
}

TableOfContentsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);